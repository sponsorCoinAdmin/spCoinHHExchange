const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchangeMin {
  constructor() {
    this.contractName = "SpCoinExchange";
    this.spCoinExchangeContract;
  }

  init(_spCoinExchangeContract) {
    this.spCoinExchangeContract = _spCoinExchangeContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_account, tokenInContract, _ethAmount) {
    // consoleLog("EXECUTING: depositEthToWeth( _account = " + _account.address + "_amount = " + _amount +" )");
    await tokenInContract.connect(_account).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_account, _tokenContract, _amount) {
    consoleLog("EXECUTING: approve( _amount = " + _amount + " )")
    let spenderAddress = this.spCoinExchangeContract.address;
    return await _tokenContract.connect(_account).approve(spenderAddress, _amount);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
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
    consoleLogLineChar(100, "R");
    consoleLog("BEFORE");
    await this.spCoinExchangeContract.swapExactOutputSingle(
      _tokenIn,
      _tokenOut,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96
    );
    consoleLog("AFTER");
    consoleLogLineChar(100, "S");
  }

}

module.exports = {
  SpCoinExchangeMin
};
