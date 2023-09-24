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
  async depositEthToWeth(_signerAccount, tokenInContract, _ethAmount) {
    consoleLog("EXECUTING: depositEthToWeth( _signerAccount = " + _signerAccount.address + " _ethAmount = " + _ethAmount +" )");
    await tokenInContract.connect(_signerAccount).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_signerAccount, _tokenContract, _amount) {
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

  async swapExactInputMultihop(
    _tokenIn,
    _tokenIntermediary,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
  ) {
    await this.spCoinExchangeContract.swapExactInputMultihop(
      _tokenIn,
      _tokenIntermediary,
      _tokenOut,
      _poolFee,
      _amountIn,
      _amountOutMin,
      );
  }

  async swapExactOutputMultihop(
    _tokenIn,
    _tokenIntermediary,
    _tokenOut,
    _poolFee,
    _amountOut,
    _amountInMaximum,
  ) {
    await this.spCoinExchangeContract.swapExactOutputSingle(
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
  SpCoinExchangeMin
};
