const { SwapExactSingle } = require("./swapExactSingle");

class SpCoinExchange {
  constructor(ethers) {
    this.swapExactSingle = new SwapExactSingle(ethers);
    this.ethers = ethers,
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinContract;
    this.indent = "    ";
  }

  async deploy() {
    let contractName = this.contractName;
    let ethers = this.ethers;
    this.accounts = await ethers.getSigners(1);
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinContract = await contractFactory.deploy();
    await this.spCoinContract.deployed();

    await this.swapExactSingle.deploy();
    return this.spCoinContract;
  }




  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
      await this.swapExactSingle.depositEthToWeth(tokenInContract, _ethAmount);
  }

  async approve(_tokenContract, _amount) {
    return await this.swapExactSingle.approve(_tokenContract, _amount);
  }

  setConsoleLoggingOn() {
    this.swapExactSingle.setConsoleLoggingOn();
  }

  setConsoleLoggingOff() {
    this.swapExactSingle.setConsoleLoggingOff();
  }

  logHeader(headerStr) {
    this.swapExactSingle.logHeader(headerStr);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
      await this.swapExactSingle.swapExactInputSingle(
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96 );
    }

  async logSwapExactInputSingle (
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
      await this.swapExactSingle.logSwapExactInputSingle (
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