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
    _tokenInContract,
    _tokenOutContract,
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

      let signerAccount = this.signerAccount;
      let indent = this.indent;

      let tokenInName = await _tokenInContract.name()
      let tokenInSymbol = await _tokenInContract.symbol()
      let tokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address)
      let tokenOutName = await _tokenOutContract.name()
      let tokenOutSymbol = await _tokenOutContract.symbol()
      let tokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address)


      consoleLogLineChar(100, "-");
      consoleLog("swapExactInputSingle ~",_tokenInName+"( "+_amountIn+" )", "=>",_tokenOutName)

      let beforeTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address);
      let beforeTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address);

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
      
      let afterTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address);
      let afterTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }
}

module.exports = {
  SwapExactInputSingle
};
