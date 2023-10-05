require("dotenv").config();

const { AlphaRouterService } = require('./AlphaRouterService')

class AlphaRouterServiceDebug {
    constructor() {
      this.ars = new AlphaRouterService()
      console.log( "DEBUG MODE ON: AlphaRouterServiceDebug");
  }

    getRoute = async(_recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent) => {
      console.log( " EXECUTING getRoute(", _recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent, ")" );
      let result = await this.ars.getRoute(_recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent);
      console.log( "getRoute result:", result);
      return result;
  }
    
    getStrPriceQuote = async( _tokenIn, _tokenOut, _inputAmount, _slippagePercent, _decimals) => {
        console.log( " EXECUTING getStrPriceQuote(", _tokenIn, _tokenOut, _inputAmount, _slippagePercent, _decimals, ")" );
        let result = await this.ars.getStrPriceQuote("", _tokenIn, _tokenOut, _inputAmount, _slippagePercent, _decimals)
        console.log( "getStrPriceQuote result:", result);
        return result;
   }
    
    getPriceQuote = async( _tokenIn, _tokenOut, _inputAmount, _slippagePercent) => {
      console.log( " EXECUTING getPriceQuote(", _tokenIn, _tokenOut, _inputAmount, _slippagePercent, ")" );
      let result = await this.ars.getPriceQuote( _tokenIn, _tokenOut, _inputAmount, _slippagePercent)
      console.log( "getPriceQuote result:", result);
      return result;
   }
    
    getTransaction = ( _route, _walletAddress, _gasLimit ) => {
      console.log( " EXECUTING getTransaction(", _route, _walletAddress, _gasLimit, ")" );
      let result = this.ars.getTransaction = ( _route, _walletAddress, _gasLimit )
      console.log( "getTransaction result:", result);
      return result;
   }
    
    exeRouteTransaction = async( _walletAddress, _walletPvtKey, _tokenInAddr, _route, _gasLimit) => {
      console.log( " EXECUTING exeRouteTransaction(", re_walletAddress, _walletPvtKey, _tokenInAddr, _route, _gasLimitsult, ")" );
      let result = await this.ars.exeRouteTransaction( _walletAddress, _walletPvtKey, _tokenInAddr, _route, _gasLimit)
      console.log( "exeRouteTransaction result:", result);
      return result;
  }
    
    exeTransaction = async(
      _walletAddress,
      _walletPvtKey,
      _tokenIn,
      _tokenOut,
      _inputAmount,
      _slippagePercent,
      _gasLimit) => {
        console.log( " EXECUTING exeTransaction(", _walletAddress,
        _walletPvtKey,
        _tokenIn,
        _tokenOut,
        _inputAmount,
        _slippagePercent,
        _gasLimit, ")" );
        let result = await this.ars.exeTransaction(
          _walletAddress,
          _walletPvtKey,
          _tokenIn,
          _tokenOut,
          _inputAmount,
          _slippagePercent,
          _gasLimit)
        console.log( "exeTransaction result:", result);
        return result;
      }
}

module.exports = {
  AlphaRouterServiceDebug
}
