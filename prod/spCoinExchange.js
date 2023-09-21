const { SwapExactInputSingle } = require("./swapExactInputSingle");
const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchange {
  constructor(ethers) {
    this.swapEIS = new SwapExactInputSingle(ethers);
    this.ethers = ethers,
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinContract;
  }

  async deploy() {
    let contractName = this.contractName;
    let ethers = this.ethers;
    this.accounts = await ethers.getSigners(1);
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinContract = await contractFactory.deploy();
    await this.spCoinContract.deployed();

    this.swapEIS.init(this.spCoinContract, this.accounts);
    return this.spCoinContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
      await this.swapEIS.depositEthToWeth(tokenInContract, _ethAmount);
  }

 // Approve a specified account to spend a specified amount of a specific token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    consoleLog("approve( "+_amount+" )")
    let account = this.accounts[0];
    let spenderAddress = this.spCoinContract.address;
    return await _tokenContract.connect(account).approve(spenderAddress, _amount);
  }

  async swapExactInputSingle (
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _tokenInABI,
    _tokenOutABI,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {
      await this.swapEIS.swapExactInputSingle (
        _tokenInName,
        _tokenOutName,
        _tokenIn,
        _tokenOut,
        _tokenInABI,
        _tokenOutABI,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96);
    }
}

module.exports = {
  SpCoinExchange
};