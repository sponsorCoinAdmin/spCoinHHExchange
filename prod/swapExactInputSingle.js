const { spCoinLogger } = require("./lib/logger/spCoinLogger.js");
const { SpCoinExchangeMin } = require("./spCoinExchangeMin");

class SwapExactInputSingle {
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
    // _tokenInContract,
    // _tokenOutContract,
    _tokenInABI,
    _tokenOutABI,
    _tokenInName,
    _tokenOutName,
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      consoleLogLineChar(100, "-");
      consoleLog("swapExactInputSingle ~",_tokenInName+"( "+_amountIn+" )", "=>",_tokenOutName)
      let signerAccount = this.signerAccount;
      let indent = this.indent;

      let tokenInContract = await ethers.getContractAt(_tokenInABI, _tokenInAddress);
      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOutAddress);

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(signerAccount.address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await this.spCoinExchangeMin.swapExactInputSingle(
        _tokenInAddress, 
        _tokenOutAddress,
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
}

module.exports = {
  SwapExactInputSingle
};
