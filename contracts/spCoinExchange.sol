// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity = 0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract SpCoinExchange {

    address internal constant swapRouterDefaultAddress = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
 
    ISwapRouter internal swapRouter = 
                setSwapRouterAddress(swapRouterDefaultAddress); 

    function setSwapRouterAddress(address swapRouterAddress) public pure returns (ISwapRouter newRouter) {
        newRouter = ISwapRouter(swapRouterAddress);
        return newRouter;
    }

    /// @notice Swaps a fixed amount of _tokenIn for a maximum possible amount of _tokenOut
    function swapExactInputSingle(address _tokenIn,
                                  address _tokenOut,
                                  uint24  _poolFee,
                                  uint256 _amountIn,
                                  uint256 _amountOutMinimum,
                                  uint160 _sqrtPriceLimitX96) external returns (uint256 amountOut) {
        // msg.sender must approve this contract

        // Transfer the specified amount of _tokenOut to this contract.
        TransferHelper.safeTransferFrom(_tokenIn, msg.sender, address(this), 
            _amountIn
        );

        // Approve the router to spend _tokenIn.
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), _amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: _tokenIn,
                tokenOut: _tokenOut,
                fee: _poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amountIn,
                amountOutMinimum: _amountOutMinimum,
                sqrtPriceLimitX96: _sqrtPriceLimitX96
            });
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }

    /// @notice swaps a minimum possible amount of WETH for a fixed amount of _tokenIn.
     function swapExactOutputSingle(
                                address _tokenIn,
                                address _tokenOut,
                                uint24  _poolFee,
                                uint256 _amountOut,
                                uint256 _amountInMaximum,
                                uint160 _sqrtPriceLimitX96) external returns (uint256 amountIn) {
        // Transfer the specified amount of _tokenIn to this contract.
        TransferHelper.safeTransferFrom(
            _tokenIn,
            msg.sender,
            address(this),
            _amountInMaximum
        );

        // Approve the router to spend the specified `amountInMaximum` of _tokenIn.
        // In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap.
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), _amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: _tokenIn,
                tokenOut: _tokenOut,
                fee: _poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: _amountOut,
                amountInMaximum: _amountInMaximum,
                sqrtPriceLimitX96: _sqrtPriceLimitX96
            });

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountIn = swapRouter.exactOutputSingle(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < _amountInMaximum) {
            TransferHelper.safeApprove(_tokenIn, address(swapRouter), 0);
            TransferHelper.safeTransfer(
                _tokenIn,
                msg.sender,
                _amountInMaximum - amountIn
            );
        }
    }

    /// @notice swapInputMultiplePools swaps a fixed amount of WETH for a maximum possible amount of _tokenIn
    /// swap _tokenIn --> _tokenIntermediary --> _tokenOut
   function swapExactInputMultiHop(
                                address _tokenIn,
                                address _tokenIntermediary,
                                address _tokenOut,
                                uint24  _poolFee,
                                uint256 _amountIn,
                                uint256 _amountOutMinimum) external returns (uint256 amountOut) {
        // Transfer `amountIn` of _tokenIn to this contract.
        TransferHelper.safeTransferFrom(_tokenIn, msg.sender, address(this), _amountIn);

        // Approve the router to spend _tokenIn.
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), _amountIn);

        // Multiple pool swaps are encoded through bytes called a `path`. A path is a sequence of token addresses and poolFees that define the pools used in the swaps.
        // The format for pool encoding is (tokenIn, fee, tokenOut/tokenIn, fee, tokenOut) where tokenIn/tokenOut parameter is the shared token across the pools.
        // Since we are swapping _tokenIn to _tokenIntermediary and then _tokenIntermediary to _tokenIn the path encoding is (_tokenIn, 0.3%, _tokenIntermediary, 0.3%, _tokenIn).
        ISwapRouter.ExactInputParams memory params =
            ISwapRouter.ExactInputParams({
                path: abi.encodePacked(_tokenIn, uint24(_poolFee), _tokenIntermediary, uint24(100), _tokenOut),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amountIn,
                amountOutMinimum: _amountOutMinimum
            });

        // Executes the swap.
        amountOut = swapRouter.exactInput(params);
    }

    /// @notice swapExactOutputMultiHop swaps a minimum possible amount of WETH for a fixed amount of _tokenIntermediary
    /// swap _tokenIn --> _tokenIntermediary --> _tokenOut
    function swapExactOutputMultiHop(
        address _tokenIn,
        address _tokenIntermediary,
        address _tokenOut,
        uint24  _poolFee,
        uint256 amountOut,
        uint256 amountInMaximum) external returns (uint256 amountIn)
    {
        TransferHelper.safeTransferFrom(
            _tokenIn,
            msg.sender,
            address(this),
            amountInMaximum
        );
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), amountInMaximum);

        // The parameter path is encoded as (tokenOut, fee, tokenIn/tokenOut, fee, tokenIn)
        ISwapRouter.ExactOutputParams memory params = ISwapRouter
            .ExactOutputParams({
                path: abi.encodePacked(
                    _tokenOut,
                    uint24(100),
                    _tokenIntermediary,
                    uint24(_poolFee),
                    _tokenIn
                ),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum
            });

        amountIn = swapRouter.exactOutput(params);
        
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(_tokenIn, address(swapRouter), 0);
            TransferHelper.safeTransferFrom(
                _tokenIn,
                address(this),
                msg.sender,
                amountInMaximum - amountIn
            );
        }
    }    
}