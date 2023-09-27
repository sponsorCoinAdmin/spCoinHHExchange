const { SpCoinExchangeMin } = require("./spCoinExchangeMin");
const { SwapExactInputSingle } = require("./swapExactInputSingleDebug");
const { SwapExactOutputSingle } = require("./swapExactOutputSingleDebug");
const { SwapExactInputMultiHop } = require("./swapExactInputMultiHopDebug");
const { SwapExactOutputMultiHop } = require("./swapExactOutputMultiHopDebug");

const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchange {
  constructor() {
    this.sCoinExchangeMin = new SpCoinExchangeMin();
    this.spCoinExchangeMin = new SpCoinExchangeMin();
    this.accounts;
    this.signerAccount;
    this.spCoinExchangeContract;
    this.indent = "    ";
  }

  async init(spCoinExchangeContract, signerAccount, swapClass) {

    this.spCoinExchangeContract = spCoinExchangeContract;
    this.signerAccount = signerAccount;
    this.swapClass = swapClass;

    this.swapClass.init(this.spCoinExchangeContract, this.signerAccount);
    this.spCoinExchangeMin.init(this.spCoinExchangeContract);
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    await this.spCoinExchangeMin.depositEthToWeth(this.signerAccount, tokenInContract, _ethAmount);
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    await this.spCoinExchangeMin.approve(this.signerAccount, _tokenContract, _amount);
  }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactInputSingle (
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96,
    _tokenInContract,
    _tokenOutContract) {

      console.log("arguments.length", arguments.length);
      if ( arguments.length === 8 )
      {
        await this.swapClass.swapExactInputSingle (
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _sqrtPriceLimitX96,
          _tokenInContract,
          _tokenOutContract
        )
      }
      else{
        this.sCoinExchangeMin.swapExactInputSingle (
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _sqrtPriceLimitX96
        )
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputSingle (
      _tokenInAddress,
      _tokenOutAddress,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96,
      _tokenInContract,
      _tokenOutContract  
    ) {
      if ( arguments.length === 8 )
      {
        // console.log("swapExactOutputSingle:", JSON.stringify(this.swapEOS, null, 2))
        await this.swapClass.swapExactOutputSingle(
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountInMax,
          _amountOutMin,
          _sqrtPriceLimitX96,
          _tokenInContract,
          _tokenOutContract
        );
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactInputMultiHop(
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountIn,
      _amountOutMin,
      _tokenInContract,
      _tokenIntermediaryContract,  
      _tokenOutContract
    ) {
      if ( arguments.length === 9 )
      {
        await this.swapEIMH.swapExactInputMultiHop(
          _tokenInAddress,
          _tokenIntermediaryAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _tokenInContract,
          _tokenIntermediaryContract,  
          _tokenOutContract
        );
      }
    }
  
/////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputMultiHop(
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountOut,
        _amountInMaximum,
        _tokenInContract,
        _tokenIntermediaryContract,
        _tokenOutContract
    ) {
      if ( arguments.length === 9 )
      {
        await this.swapEOMH.swapExactOutputMultiHop(
          _tokenInAddress,
          _tokenIntermediaryAddress,
          _tokenOutAddress,
          _poolFee,
          _amountOut,
          _amountInMaximum,
          _tokenInContract,
          _tokenIntermediaryContract,
          _tokenOutContract
        );
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
  }

module.exports = {
  SpCoinExchange
};
