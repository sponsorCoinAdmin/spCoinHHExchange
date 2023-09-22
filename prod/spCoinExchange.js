const { SwapExactInputSingle } = require("./swapExactInputSingle");
const { spCoinLogger } = require("./lib/logger/spCoinLogger");
const { SpCoinExchangeMin } = require("./spCoinExchangeMin");

class SpCoinExchange {
  constructor() {
    this.swapEIS = new SwapExactInputSingle();
    this.spCoinExchangeMin = new SpCoinExchangeMin();
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.signerAccount;
    this.spCoinExchangeContract;
  }

  async deploy() {
    let contractName = this.contractName;
    this.accounts = await ethers.getSigners();
    this.signerAccount = this.accounts[0]
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinExchangeContract = await contractFactory.deploy();
    await this.spCoinExchangeContract.deployed();

    this.swapEIS.init(this.spCoinExchangeContract, this.signerAccount);
    this.spCoinExchangeMin.init(this.spCoinExchangeContract);
    return this.spCoinExchangeContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    await this.spCoinExchangeMin.depositEthToWeth(this.signerAccount, tokenInContract, _ethAmount);
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    consoleLog("approve( "+_amount+" )")
    await this.spCoinExchangeMin.approve(this.signerAccount, _tokenContract, _amount);
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