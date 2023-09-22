const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchangeMin {
  constructor(ethers) {
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinContract;
    this.indent = "    ";
  }

  init(spCoinContract, accounts ) {
    this.spCoinContract = spCoinContract;
    this.accounts = accounts;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    let account = this.accounts[0];
    await tokenInContract.connect(this.accounts[0]).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified amount of a specific token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    let account = this.accounts[0];
    let spenderAddress = this.spCoinContract.address;
    return await _tokenContract.connect(account).approve(spenderAddress, _amount);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
      await this.spCoinContract.swapExactInputSingle(
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
