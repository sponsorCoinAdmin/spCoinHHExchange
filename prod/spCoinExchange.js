class SpCoinExchange {
    constructor(ethers, spCoinExchangeContract, accounts) {
      this.ethers = ethers,
      this.spCoinExchangeContract = spCoinExchangeContract;
      this.accounts = accounts;
      this.tokenInContract;
      this.tokenOutContract;
      this.indent = "    ";
    }

    async swapExactInputSingle(
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96) {
            await this.spCoinExchangeContract.swapExactInputSingle(
                _tokenIn, 
                _tokenOut, 
                _poolFee, 
                _amountIn, 
                _amountOutMin, 
                _sqrtPriceLimitX96
            );
    }

    async logSwapExactInputSingle(
        _tokenInName,
        _tokenOutName,
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96) {

          let accounts = this.accounts;
          let tokenInContract = this.tokenInContract;
          let tokenOutContract = this.tokenOutContract;
          let indent = this.indent;
    
          let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
          let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);
    
          console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
          console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
            
          // Swap Exact Input Single
          await this.swapExactInputSingle(
            _tokenIn, 
            _tokenOut,
            _poolFee,
            _amountIn,
            _amountOutMin,
            _sqrtPriceLimitX96
          );
          
          let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
          let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);
    
          console.log(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
          console.log(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);
    
          console.log(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
          console.log(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
      }

  }

  module.exports = {
    SpCoinExchange
  };
