const { spCoinLogger } = require("./lib/logger/spCoinLogger.js");
const { SpCoinExchangeMin } = require("./spCoinExchangeMin");

class SwapExactOutputSingle {
  constructor() {
    this.spCoinExchangeMin = new SpCoinExchangeMin();
    this.contractName = "SpCoinExchange";
    this.signerAccount;
    this.spCoinExchangeContract;
    this.indent = "    ";
  }

  init(_spCoinExchangeContract, _signerAccount ) {
     this.spCoinExchangeContract = _spCoinExchangeContract;
     this.signerAccount = _signerAccount;
     this.spCoinExchangeMin.init( this.spCoinExchangeContract );
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_signerAccount, _tokenInContract, _ethAmount) {
    consoleLog("depositEthToWeth( "+_ethAmount+" )")
    this.spCoinExchangeMin.depositEthToWeth(_signerAccount, _tokenInContract, _ethAmount);
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
      consoleLog("swapExactInputSingle ~",_tokenInName+"( "+_amountIn+" )", "=>",_tokenOutName)
      let signerAccount = this.signerAccount;
      let indent = this.indent;

      let tokenInContract = await ethers.getContractAt(_tokenInABI, _tokenIn);
      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOut);

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(signerAccount.address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(signerAccount.address);

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
      
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(signerAccount.address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

  async swapExactOutputSingle (
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _tokenInABI,
    _tokenOutABI,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      consoleLogLineChar(100, "T");
      consoleLog("AFTER");
      consoleLog("_tokenInName", _tokenInName);
      consoleLog("_tokenOutName", _tokenOutName);
      consoleLog("_tokenIn", _tokenIn);
      consoleLog("_tokenOut", _tokenOut);
      // consoleLog("_tokenInABI", JSON.stringify(_tokenInABI, null ,2));
      // consoleLog("_tokenOutABI", JSON.stringify(_tokenOutABI, null ,2));
      consoleLog("_poolFee", _poolFee);
      consoleLog("_amountInMax", _amountInMax);
      consoleLog("_amountOutMin", _amountOutMin);
      consoleLog("_sqrtPriceLimitX96", _sqrtPriceLimitX96);

      consoleLog("BEFORE 2");
      consoleLog("swapExactOutputSingle ~",_tokenInName+"( "+_amountInMax+" )", "=>",_tokenOutName)
      consoleLog("AFTER 2");

      let signerAccount = this.signerAccount;
      let indent = this.indent;

      let tokenInContract = await ethers.getContractAt(_tokenInABI, _tokenIn);
      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOut);

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(signerAccount.address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
      consoleLogLineChar(100, "*");

      // Swap Exact Input Single
      // await swapExactOutputSingle(_tokenIn, _tokenOut, _poolFee, _amountInMax, _amountOutMin, _sqrtPriceLimitX96);
      await this.spCoinExchangeMin.swapExactOutputSingle(
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountInMax,
        _amountOutMin,
        _sqrtPriceLimitX96);
  
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(signerAccount.address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }


}

module.exports = {
  SwapExactOutputSingle
};
