const { SpCoinExchange } = require("../prod/spCoinExchange");
const { SwapExactInputSingle } = require("./swapExactInputSingleDebug");
const { SwapExactOutputSingle } = require("./swapExactOutputSingleDebug");
const { SwapExactInputMultiHop } = require("./swapExactInputMultiHopDebug");
const { SwapExactOutputMultiHop } = require("./swapExactOutputMultiHopDebug");
const { spCoinLogger } = require("../logger/spCoinLogger");

class SpCoinExchangeDebug {
  constructor(_spCoinExchange) {
    this.spCoinExchange = _spCoinExchange;
    this.signerAccount = _spCoinExchange.signerAccount;
    this.swapEIS  = new SwapExactInputSingle(this.spCoinExchange)
    this.swapEOS  = new SwapExactOutputSingle(this.spCoinExchange)
    this.swapEIMH = new SwapExactInputMultiHop(this.spCoinExchange)
    this.swapEOMH = new SwapExactOutputMultiHop(this.spCoinExchange)
    console.log("this.signerAccount.address =", this.signerAccount.address)

  }

  async init( _signerAccount, _spCoinExchangeContract ) {

    // console.log("_spCoinExchangeContract :", JSON.stringify(_spCoinExchangeContract,null,2));
    this.signerAccount = _signerAccount;
   }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    consoleLog(indent + "approve( _tokenContract = " + await _tokenContract.name() + "( " + await _tokenContract.symbol() +" )");
    consoleLog(indent + "         _amount        = " + _amount +" )");
    await this.spCoinExchange.approve(_tokenContract, _amount);
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_wethContract, _ethAmountInWei) {
    let signerAccountAddress = this.signerAccount.address;
    let beforeWethBalanceOf = await _wethContract.balanceOf(signerAccountAddress)
    let ethBalanceInWei = await hre.ethers.provider.getBalance(signerAccountAddress);
    consoleLog("BEFORE deposit ETH to WETH, WETH Balance in WEI:", beforeWethBalanceOf);
    consoleLog("BEFORE deposit ETH to WETH, ETH Balance in WEI:", ethBalanceInWei);
 
    consoleLog(indent + "depositEthToWeth( _wethContract = " +await _wethContract.name() + "( " + await _wethContract.symbol() +" )");
    consoleLog(indent + "                  _ethAmountInWei  = " + _ethAmountInWei +" )");
    await this.spCoinExchange.depositEthToWeth(_wethContract, _ethAmountInWei);
    beforeWethBalanceOf = await _wethContract.balanceOf(signerAccountAddress)
    ethBalanceInWei = await hre.ethers.provider.getBalance(signerAccountAddress);
    consoleLog("AFTER deposit ETH to WETH, WETH Balance in WEI:", beforeWethBalanceOf);
    consoleLog("AFTER deposit ETH to WETH, ETH Balance in WEI:", ethBalanceInWei);  
  }

  async withdrawEthFromWeth(_wethContract, _ethAmountInWei) {
    let signerAccountAddress = this.signerAccount.address;
    let beforeWethBalanceOf = await _wethContract.balanceOf(signerAccountAddress)
    let ethBalanceInWei = await hre.ethers.provider.getBalance(signerAccountAddress);
    consoleLog("BEFORE withdraw ETH from WETH, WETH Balance in WEI:", beforeWethBalanceOf);
    consoleLog("BEFORE withdraw ETH from WETH, ETH Balance in WEI:", ethBalanceInWei);
 
    consoleLog(indent + "withdrawEthFromWeth( _wethContract = " +await _wethContract.name() + "( " + await _wethContract.symbol() +" )");
    consoleLog(indent + "                     _ethAmountInWei  = " + _ethAmountInWei +" )");
    await this.spCoinExchange.withdrawEthFromWeth(_wethContract, _ethAmountInWei);
    beforeWethBalanceOf = await _wethContract.balanceOf(signerAccountAddress)
    ethBalanceInWei = await hre.ethers.provider.getBalance(signerAccountAddress);
    consoleLog("AFTER withdraw ETH from WETH, WETH Balance in WEI:", beforeWethBalanceOf);
    consoleLog("AFTER withdraw ETH from WETH, ETH Balance in WEI:", ethBalanceInWei);  
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  async swapExactInputSingle (
  _tokenInAddress,
  _tokenOutAddress,
  _poolFee,
  _amountIn,
  _amountOutMin,
  _sqrtPriceLimitX96,
  _tokenInContract,
  _tokenOutContract) {

    // consoleLog("arguments.length", arguments.length);
    if ( arguments.length === 8 )
    {
      await this.swapEIS.swapExactInputSingle (
        _tokenInAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96,
        _tokenInContract,
        _tokenOutContract
      )
    }
    else{
      this.spCoinExchange.swapExactInputSingle (
        _tokenInAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96
      )
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  async swapExactOutputSingle (
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96,
    _tokenInContract,
    _tokenOutContract  
  ) {
    if ( arguments.length === 8 )
    {
      await this.swapEOS.swapExactOutputSingle(
        _tokenInAddress,
        _tokenOutAddress,
        _poolFee,
        _amountInMax,
        _amountOutMin,
        _sqrtPriceLimitX96,
        _tokenInContract,
        _tokenOutContract
      );
    }
    else{
      this.spCoinExchange.swapExactOutputSingle (
        _tokenInAddress,
        _tokenOutAddress,
        _poolFee,
        _amountInMax,
        _amountOutMin,
        _sqrtPriceLimitX96,
      )
    }

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  async swapExactInputMultiHop(
    _tokenInAddress,
    _tokenIntermediaryAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _tokenInContract,
    _tokenIntermediaryContract,  
    _tokenOutContract
  ) {
    if ( arguments.length === 9 )
    {
      await this.swapEIMH.swapExactInputMultiHop(
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _tokenInContract,
        _tokenIntermediaryContract,  
        _tokenOutContract
      );
    }
    else{
      this.spCoinExchange.swapExactInputMultiHop (
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _tokenInContract,
      )
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////
  async swapExactOutputMultiHop(
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountOut,
      _amountInMaximum,
      _tokenInContract,
      _tokenIntermediaryContract,
      _tokenOutContract
  ) {
    if ( arguments.length === 9 )
    {
      await this.swapEOMH.swapExactOutputMultiHop(
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountOut,
        _amountInMaximum,
        _tokenInContract,
        _tokenIntermediaryContract,
        _tokenOutContract
      );
    }
    else{
      this.spCoinExchange.swapExactOutputMultiHop (
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountOut,
        _amountInMaximum,
      )
    }

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
}

module.exports = {
  SpCoinExchange,
  SpCoinExchangeDebug,
};
