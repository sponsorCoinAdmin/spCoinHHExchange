const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchange {
  constructor() {
    this.contractName = "SpCoinExchange";
    this.spCoinExchangeContract;
  }

  init(_spCoinExchangeContract) {
    this.spCoinExchangeContract = _spCoinExchangeContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_signerAccount, tokenInContract, _ethAmount) {
    consoleLog("EXECUTING: depositEthToWeth( _signerAccount = " + _signerAccount.address + " _ethAmount = " + _ethAmount +" )");
    await tokenInContract.connect(_signerAccount).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_signerAccount, _tokenContract, _amount) {
    consoleLog("EXECUTING: approve( _signerAccount.address = " + _signerAccount.address + " )")
    consoleLog("EXECUTING: approve( _tokenContract = " + _tokenContract + " )")
    consoleLog("EXECUTING: approve( _amount = " + _amount + " )")
    let spenderAddress = this.spCoinExchangeContract.address;
    return await _tokenContract.connect(_signerAccount).approve(spenderAddress, _amount);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
      // consoleLog("ZZZZZZZZZZZZZZZZZZZZ SpCoinExchange.swapExactInputSingle Parameters ZZZZZZZZZZZZZZZZZZZ");
      // consoleLog("_tokenIn           :", _tokenIn);
      // consoleLog("_tokenOut          :", _tokenOut);
      // consoleLog("_poolFee           :", _poolFee);
      // consoleLog("_amountIn          :", _amountIn);
      // consoleLog("_amountOutMin      :", _amountOutMin);
      // consoleLog("_sqrtPriceLimitX96 :", _sqrtPriceLimitX96);
  
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
    // consoleLog("ZZZZZZZZZZZZZZZZZZZZ SpCoinExchange.swapExactOutputMultiHop Parameters ZZZZZZZZZZZZZZZZZZZ");
    // consoleLog("_tokenIn           :", _tokenIn);
    // consoleLog("_tokenIntermediary :", _tokenIntermediary);
    // consoleLog("_tokenOut          :", _tokenOut);
    // consoleLog("_poolFee           :", _poolFee);
    // consoleLog("_amountOut         :", _amountOut);
    // consoleLog("_amountInMaximum   :", _amountInMaximum);
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
