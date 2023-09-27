const { spCoinLogger } = require("./lib/logger/spCoinLogger.js");
const { SpCoinExchange } = require("./spCoinExchange");

class SwapExactOutputMultiHop {
  constructor() {
    this.spCoinExchangeMin = new SpCoinExchange();
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

  async swapExactOutputMultiHop (
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountIn,
      _amountOutMin,
      _tokenInContract,
      _tokenIntermediaryContract, 
      _tokenOutContract,  
  ) {

    let signerAccount = this.signerAccount;
    let indent = this.indent;

    let tokenInName = await _tokenInContract.name()
    let tokenInSymbol = await _tokenInContract.symbol()
    let beforeTokenInBalanceOf = await _tokenInContract.balanceOf(signerAccount.address)

    let tokenIntermediaryName = await _tokenIntermediaryContract.name()
    let tokenIntermediarySymbol = await _tokenIntermediaryContract.symbol()
    let beforeTokenIntermediaryBalanceOf = await _tokenIntermediaryContract.balanceOf(signerAccount.address)

    let tokenOutName = await _tokenOutContract.name()
    let tokenOutSymbol = await _tokenOutContract.symbol()
    let beforeTokenOutBalanceOf = await _tokenOutContract.balanceOf(signerAccount.address)

    consoleLogLineChar(100, "-");
    consoleLog("swapExactOutputMultiHop ~", tokenInName+"( "+_amountIn+" )", "=>",tokenOutName)

    consoleLog(indent + "BEFORE TOKEN_IN                ~", tokenInName + "(" + tokenInSymbol + ") balance:", beforeTokenInBalanceOf);
    consoleLog(indent + "BEFORE TOKEN_INTERMEDIARY      ~", tokenIntermediaryName + "(" + tokenIntermediarySymbol + ") balance:", beforeTokenIntermediaryBalanceOf);
    consoleLog(indent + "BEFORE TOKEN_OUT               ~", tokenOutName + "(" + tokenOutSymbol + ") balance:", beforeTokenOutBalanceOf);
      
    // Swap Exact Output MultiHop
    
    await this.spCoinExchangeMin.swapExactOutputMultiHop(
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountIn,
      _amountOutMin,
    );
    
    let afterTokenInBalanceOf           = await _tokenInContract.balanceOf(signerAccount.address);
    let afterTokenIntermediaryBalanceOf = await _tokenIntermediaryContract.balanceOf(signerAccount.address);
    let afterTokenOutBalanceOf          = await _tokenOutContract.balanceOf(signerAccount.address);

    consoleLog(indent + "AFTER TOKEN_IN                 ~", tokenInName, "balance:", afterTokenInBalanceOf);
    consoleLog(indent + "AFTER TOKEN_INTERMEDIARY       ~", afterTokenIntermediaryBalanceOf, "balance:", afterTokenIntermediaryBalanceOf);
    consoleLog(indent + "AFTER TOKEN_OUT                ~", tokenOutName, " balance:", afterTokenOutBalanceOf);

    consoleLog(indent + "DIFFERENCE TOKEN_IN            ~", tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
    consoleLog(indent + "DIFFERENCE TOKEN_INTERMEDIARY  ~", tokenInName, BigInt(afterTokenIntermediaryBalanceOf) - BigInt(beforeTokenOutBalanceOf));
    consoleLog(indent + "DIFFERENCE TOKEN_OUT           ~", tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }
}

module.exports = {
  SwapExactOutputMultiHop
};
