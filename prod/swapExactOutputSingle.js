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
  
  async swapExactOutputSingle(
    _tokenInContract,
    _tokenOutContract,
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      consoleLogLineChar(100, "-");
      consoleLog("swapExactOutputSingle ~", _tokenInName + "( _amountInMax = " + _amountInMax + ", _amountOutMin = ", _amountOutMin + ")", "=>",_tokenOutName)
      let signer = this.signerAccount;
      let indent = this.indent;

      let beforeTokenInBalanceOf = await _tokenInContract.balanceOf(signer.address);
      let beforeTokenOutBalanceOf = await _tokenOutContract.balanceOf(signer.address);

      consoleLog(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);

      // Swap
      await this.spCoinExchangeMin.swapExactOutputSingle(
      _tokenIn,
      _tokenOut,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96);

      let afterTokenInBalanceOf = await _tokenInContract.balanceOf(signer.address);
      let afterTokenOutBalanceOf = await _tokenOutContract.balanceOf(signer.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

}

module.exports = {
  SwapExactOutputSingle
};
