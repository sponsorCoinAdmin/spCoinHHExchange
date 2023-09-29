class SpCoinExchange {
  constructor(_signerAccount, _spCoinExchangeContract) {
    this.contractName = "SpCoinExchange";
    this.signerAccount = _signerAccount;
    this.spCoinExchangeContract = _spCoinExchangeContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(wethContract, _ethAmount) {
    await wethContract.connect(this.signerAccount).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    let spenderAddress = this.spCoinExchangeContract.address;
    return await _tokenContract.connect(this.signerAccount).approve(spenderAddress, _amount);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
      // console.log("XXXXXXXXXXXXXXXXXX SpCoinExchange.swapExactInputSingle Parameters XXXXXXXXXXXXXXXXXXXX");
      // console.log("_tokenIn           :", _tokenIn);
      // console.log("_tokenOut          :", _tokenOut);
      // console.log("_poolFee           :", _poolFee);
      // console.log("_amountIn          :", _amountIn);
      // console.log("_amountOutMin      :", _amountOutMin);
      // console.log("_sqrtPriceLimitX96 :", _sqrtPriceLimitX96);
      // console.log("this.spCoinExchangeContract :", JSON.stringify(this.spCoinExchangeContract,null,2));
  
      await this.spCoinExchangeContract.swapExactInputSingle(
        _tokenIn, 
        _tokenOut, 
        _poolFee, 
        _amountIn, 
        _amountOutMin, 
        _sqrtPriceLimitX96
      );
  }

async swapExactOutputSingle (
  _tokenIn,
  _tokenOut,
  _poolFee,
  _amountInMax,
  _amountOutMin,
  _sqrtPriceLimitX96) {
    await this.spCoinExchangeContract.swapExactOutputSingle(
      _tokenIn,
      _tokenOut,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96
    );
  }

  async swapExactInputMultiHop(
    _tokenIn,
    _tokenIntermediary,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
  ) {
    await this.spCoinExchangeContract.swapExactInputMultiHop(
      _tokenIn,
      _tokenIntermediary,
      _tokenOut,
      _poolFee,
      _amountIn,
      _amountOutMin,
      );
  }

  async swapExactOutputMultiHop(
    _tokenIn,
    _tokenIntermediary,
    _tokenOut,
    _poolFee,
    _amountOut,
    _amountInMaximum,
  ) {
    // console.log("PPPPPPPPPPPPPPP SpCoinExchange.swapExactOutputMultiHop Parameters PPPPPPPPPPPPPPPPPPPP");
    // console.log("_tokenIn           :", _tokenIn);
    // console.log("_tokenIntermediary :", _tokenIntermediary);
    // console.log("_tokenOut          :", _tokenOut);
    // console.log("_poolFee           :", _poolFee);
    // console.log("_amountOut         :", _amountOut);
    // console.log("_amountInMaximum   :", _amountInMaximum);
    await this.spCoinExchangeContract.swapExactOutputMultiHop(
      _tokenIn,
      _tokenIntermediary,
      _tokenOut,
      _poolFee,
      _amountOut,
      _amountInMaximum,
    );
  }

}

module.exports = {
  SpCoinExchange
};
