const { spCoinLogger } = require("./lib/logger/spCoinLogger.js");
const { SpCoinExchangeMin } = require("./spCoinExchangeMin");

class SwapExactInputSingle {
  constructor() {
    this.spCoinExchangeMin = new SpCoinExchangeMin();
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinExchangeContract;
    this.indent = "    ";
  }

  init(spCoinExchangeContract, accounts ) {
     this.spCoinExchangeContract = spCoinExchangeContract;
     this.accounts = accounts;
     this.spCoinExchangeMin.init(this.spCoinExchangeContract, this.accounts);
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_account, tokenInContract, _ethAmount) {
    consoleLog("depositEthToWeth( "+_ethAmount+" )")
    this.spCoinExchangeMin.depositEthToWeth(_account, tokenInContract, _ethAmount);
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

      consoleLogLineChar(100, "-");
      consoleLog("logSwapExactInputSingle ~",_tokenInName+"( "+_amountIn+" )", "=>",_tokenOutName)
      let accounts = this.accounts;
      let indent = this.indent;

      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOut);
      let tokenInContract = await ethers.getContractAt(_tokenInABI, _tokenIn);

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      consoleLog(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await this.spCoinExchangeMin.swapExactInputSingle(
        _tokenIn, 
        _tokenOut,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96
      );
      
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }
}

module.exports = {
  SwapExactInputSingle
};
