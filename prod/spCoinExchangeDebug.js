const { SpCoinExchange } = require("./spCoinExchange");
const { SwapExactInputSingle } = require("../prod/swapExactInputSingleDebug");
const { SwapExactOutputSingle } = require("../prod/swapExactOutputSingleDebug");
const { SwapExactInputMultiHop } = require("../prod/swapExactInputMultiHopDebug");
const { SwapExactOutputMultiHop } = require("../prod/swapExactOutputMultiHopDebug");

const { spCoinLogger } = require("./lib/logger/spCoinLogger");


class SpCoinExchangeDebug {
  constructor(_spCoinExchange) {
    this.spCoinExchange = _spCoinExchange;
    this.swapEIS  = new SwapExactInputSingle(this.spCoinExchange)
    this.swapEOS  = new SwapExactOutputSingle(this.spCoinExchange)
    this.swapEIMH = new SwapExactInputMultiHop(this.spCoinExchange)
    this.swapEOMH = new SwapExactOutputMultiHop(this.spCoinExchange)
  }

  async init( _signerAccount, _spCoinExchangeContract ) {

    // console.log("_spCoinExchangeContract :", JSON.stringify(_spCoinExchangeContract,null,2));
    this.signerAccount = _signerAccount;
    // this.swapClass = swapClass;

    // this.swapClass.init(spCoinExchangeContract, signerAccount);
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    // consoleLog("                    _tokenContract = " + await _tokenContract.name() + "( " + await _tokenContract.symbol() +" )");
    // consoleLog("                    _amount        = " + _amount +" )");
     await this.spCoinExchange.approve(_tokenContract, _amount);
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(_tokenInContract, _ethAmount) {
    // consoleLog("                             _tokenInContract = " +await _tokenInContract.name() + "( " + await _tokenInContract.symbol() +" )");
    // consoleLog("                             _ethAmount       = " + _ethAmount +" )");
    await this.spCoinExchange.depositEthToWeth(_tokenInContract, _ethAmount);
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

      console.log("arguments.length", arguments.length);
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
        await this.swapEIMH.swapExactOutputMultiHop(
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
  spCoinLogger
};
