const { spCoinLogger } = require("./lib/logger/spCoinLogger.js");
const { SpCoinExchange } = require("./spCoinExchange");

class SwapExactOutputSingle {
  constructor(_spCoinExchange) {
    this.contractName = "SpCoinExchange";
    this.spCoinExchange = _spCoinExchange;
    this.spCoinExchangeContract = _spCoinExchange.spCoinExchangeContract;
    this.signerAccount = _spCoinExchange.signerAccount;
      }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_signerAccount, _tokenInContract, _ethAmountInWei) {
    consoleLog("depositEthToWeth( "+_ethAmountInWei+" )")
    this.spCoinExchange.depositEthToWeth(_signerAccount, _tokenInContract, _ethAmountInWei);
  }
  
  async swapExactOutputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96,
    _tokenInContract,
    _tokenOutContract,
  ) {

      let signerAccount = this.signerAccount;
     
      let tokenInName = await _tokenInContract.name()
      let tokenInSymbol = await _tokenInContract.symbol()
      let beforeTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address)
      let tokenOutName = await _tokenOutContract.name()
      let tokenOutSymbol = await _tokenOutContract.symbol()
      let beforeTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address)

      consoleLogLineChar(100, "-");
      consoleLog("swapExactOutputSingle ~", tokenInName + "( _amountInMax = " + _amountInMax + ", _amountOutMin = ", _amountOutMin + ")", "=>",tokenOutName)
      let signer = this.signerAccount;

      consoleLog(indent + "BEFORE TOKEN_IN  ~", tokenInName, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "BEFORE TOKEN_OUT ~", tokenOutName, " balance:", beforeTokenOutBalanceOf);

      // Swap
      await this.spCoinExchange.swapExactOutputSingle(
      _tokenIn,
      _tokenOut,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96);

      let afterTokenInBalanceOf = await _tokenInContract.balanceOf(signer.address);
      let afterTokenOutBalanceOf = await _tokenOutContract.balanceOf(signer.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

}

module.exports = {
  SwapExactOutputSingle
};
