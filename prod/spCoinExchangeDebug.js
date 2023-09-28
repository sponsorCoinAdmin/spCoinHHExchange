const { SpCoinExchange } = require("./spCoinExchange");
const { SwapExactInputSingle } = require("../prod/swapExactInputSingleDebug");
const { SwapExactOutputSingle } = require("../prod/swapExactOutputSingleDebug");
const { SwapExactInputMultiHop } = require("../prod/swapExactInputMultiHopDebug");
const { SwapExactOutputMultiHop } = require("../prod/swapExactOutputMultiHopDebug");

const { spCoinLogger } = require("./lib/logger/spCoinLogger");

const spCoinExchange = new SpCoinExchange();

class SpCoinExchangeDebug {
  constructor() {
    this.swapEIS  = new SwapExactInputSingle()
    this.swapEOS  = new SwapExactOutputSingle()
    this.swapEIMH = new SwapExactInputMultiHop()
    this.swapEOMH = new SwapExactOutputMultiHop()
  }

  async init( _signerAccount, _spCoinExchangeContract ) {

    this.signerAccount = _signerAccount;
    // this.swapClass = swapClass;

    // this.swapClass.init(spCoinExchangeContract, signerAccount);
    this.swapEIS.init( _signerAccount, _spCoinExchangeContract );
    this.swapEOS.init( _signerAccount, _spCoinExchangeContract );
    this.swapEIMH.init( _signerAccount, _spCoinExchangeContract );
    this.swapEOMH.init( _signerAccount, _spCoinExchangeContract );
    spCoinExchange.init(_spCoinExchangeContract);
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    await spCoinExchange.depositEthToWeth(this.signerAccount, tokenInContract, _ethAmount);
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_signerAccount, _tokenContract, _amount) {
    await spCoinExchange.approve(_signerAccount, _tokenContract, _amount);
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
        this.sCoinExchangeMin.swapExactInputSingle (
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
        // console.log("swapExactOutputSingle:", JSON.stringify(this.swapEOS, null, 2))
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
        this.sCoinExchangeMin.swapExactOutputSingle (
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
        this.sCoinExchangeMin.swapExactInputMultiHop (
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
        this.sCoinExchangeMin.swapExactOutputMultiHop (
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
  SpCoinExchangeDebug
};
