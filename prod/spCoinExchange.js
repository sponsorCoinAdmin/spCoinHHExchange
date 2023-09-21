consoleLogging = false;

consoleLog = (...parms) => {
  if (consoleLogging)
     console.log(parms.join(' '));
} 

consoleLogLine = (length) => {
  consoleLogLineChar(length, "=");
} 

consoleLogLineChar = (length, lineChar) => {
  line = "";
  for(var i=0; i < length; i++){
    line += lineChar;
  }
  consoleLog(line);
} 


class SpCoinExchange {
  constructor(ethers) {
    this.ethers = ethers,
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.spCoinContract;
    this.indent = "    ";
  }

  async deploy() {
    let contractName = this.contractName;
    let ethers = this.ethers;
    this.accounts = await ethers.getSigners(1);
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinContract = await contractFactory.deploy();
    await this.spCoinContract.deployed();
    return this.spCoinContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    consoleLog("depositEthToWeth( "+_ethAmount+" )")

    let account = this.accounts[0];
    await tokenInContract.connect(this.accounts[0]).deposit({ value: _ethAmount });

    // return await _wethContract.connect(account).deposit({ value: _ethAmount });
  }

  // Approve a specified account to spend a specified amount of a specific token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    consoleLog("approve( "+_amount+" )")
    let account = this.accounts[0];
    let spenderAddress = this.spCoinContract.address;
    return await _tokenContract.connect(account).approve(spenderAddress, _amount);
  }

  setConsoleLoggingOn() {
    consoleLogging = true;
  }

  setConsoleLoggingOff() {
    consoleLogging = false;
  }

  logHeader(headerStr) {
    consoleLogLine(100);
    consoleLog(headerStr);
  }

  async swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96 ) {
      await this.spCoinContract.swapExactInputSingle(
        _tokenIn, 
        _tokenOut, 
        _poolFee, 
        _amountIn, 
        _amountOutMin, 
        _sqrtPriceLimitX96
      );
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

      consoleLog(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      consoleLog(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      consoleLog(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      consoleLog(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }
}

module.exports = {
  SpCoinExchange
};
