const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchangeMin {
  constructor(ethers) {
    this.ethers = ethers,
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinContract;
    this.indent = "    ";
  }

  async deploy() {
    let contractName = this.contractName;
    let ethers = this.ethers;
consoleLog("contractName:",contractName);
    this.accounts = await ethers.getSigners(1);
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinContract = await contractFactory.deploy();
    await this.spCoinContract.deployed();
consoleLog("this.spCoinContract.address:",this.spCoinContract.address);
    return this.spCoinContract;
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
