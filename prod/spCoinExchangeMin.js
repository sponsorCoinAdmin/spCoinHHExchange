const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchangeMin {
  constructor() {
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinExchangeContract;
  }

  init(spCoinExchangeContract, accounts ) {
    this.spCoinExchangeContract = spCoinExchangeContract;
    this.accounts = accounts;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_account, tokenInContract, _ethAmount) {
    await tokenInContract.connect(_account).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_account, _tokenContract, _amount) {
    let spenderAddress = this.spCoinExchangeContract.address;
    return await _tokenContract.connect(account).approve(spenderAddress, _amount);
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
}

module.exports = {
  SpCoinExchangeMin
};
