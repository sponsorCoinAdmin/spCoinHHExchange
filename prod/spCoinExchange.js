class SpCoinExchange {
  constructor(ethers, contractName, accounts) {
    this.ethers = ethers,
    this.contractName = contractName;
    this.accounts = accounts;
    this.spCoinContract;
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
      await this.spCoinContract.swapExactInputSingle(
        _tokenIn, 
        _tokenOut, 
        _poolFee, 
        _amountIn, 
        _amountOutMin, 
        _sqrtPriceLimitX96
      );
  }

  setSpCoinContract(spCoinContract) {
    this.spCoinContract = spCoinContract;
  }

  async deployContract(contract) {
    this.accounts = await this.ethers.getSigners(1);
    const contractFactory = await ethers.getContractFactory(contract);
    this.spCoinContract = await contractFactory.deploy();
    await this.spCoinContract.deployed();
    return this.spCoinContract;
  }

  async logSwapExactInputSingle (
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

      let accounts = this.accounts;
      let indent = this.indent;

      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOut);
      let tokenInContract = await ethers.getContractAt(_tokenInABI, _tokenIn);

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
