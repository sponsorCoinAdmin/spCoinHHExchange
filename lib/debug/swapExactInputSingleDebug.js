const { SpCoinExchange } = require("../prod/spCoinExchange");
const { spCoinLogger } = require("../../lib/logger/spCoinLogger.js");

class SwapExactInputSingle {
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

  async swapExactInputSingle (
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96,
    _tokenInContract,
    _tokenOutContract
  ) {

      let signerAccount = this.signerAccount;

      consoleLog ("this.signerAccount.address", this.signerAccount.address);

     
      let tokenInName = await _tokenInContract.name()

      let tokenInSymbol = await _tokenInContract.symbol()
      let beforeTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address)
      let tokenOutName = await _tokenOutContract.name()
      let tokenOutSymbol = await _tokenOutContract.symbol()
      let beforeTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address)

      consoleLogLineChar(100, "-");
      consoleLog("swapExactInputSingle ~",tokenInName+"( "+_amountIn+" )", "=>",tokenOutName)

      consoleLog(indent + "TOKEN_IN  ~", tokenInName, "SYMBOL", tokenInSymbol, "balance:", beforeTokenInBalanceOf);
      consoleLog(indent + "TOKEN_OUT ~", tokenOutName, "SYMBOL", tokenOutSymbol, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await this.spCoinExchange.swapExactInputSingle(
        _tokenInAddress, 
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96
      );
      
      let afterTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address);
      let afterTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address);

      consoleLog(indent + "AFTER TOKEN_IN   ~", tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }
}

module.exports = {
  SwapExactInputSingle
};
