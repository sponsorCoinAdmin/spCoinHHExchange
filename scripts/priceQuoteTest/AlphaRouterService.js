require("dotenv").config();
const ERC20ABI = require('./abi.json')

const { AlphaRouter } = require('@uniswap/smart-order-router')
const { TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const { UniTokenServices } = require('./uniTokenServices')

const UNISWAP_SWAPROUTER_02 = process.env.UNISWAP_SWAPROUTER_02
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const router = new AlphaRouter({ chainId: CHAIN_ID, provider: provider})
const BURN_ADDRESS = "0x0000000000000000000000000000000000000000";
let UTS = new UniTokenServices(ethers, CHAIN_ID, provider)

class AlphaRouterService {
    constructor() {
    }

    getRoute = async(_tradeType, _recipientAddr, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent) => {
    // console.log( "==========================================================================================================" );
    // console.log( " EXECUTING getRoute( tradeType, ", _recipientAddr, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent, ")" );

    let uniTokenOut = await UTS.wrapAddrToUniToken(_tokenAddrOut)    
    let inputAmount = await UTS.addrAmountToCurrencyInWei(_inputAmount, _tokenAddrIn)

    let route = await router.route(
      inputAmount,
      uniTokenOut,
      _tradeType,
      {
        recipient: _recipientAddr,
        slippageTolerance: new Percent(_slippagePercent, 100),
        deadline: Math.floor(Date.now()/1000 + 1800)
      }
    )
    return route;
  }

  // getStrPriceQuote = async( _tradeType, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent, _decimals) => {
  getStrPriceQuote = async( _tradeType, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent, _decimals) => {
    let tradeType = TradeType.EXACT_INPUT;
    let decimals = (_decimals === undefined) ? await uniContractFrom.decimals() : _decimals;
    let quote = await this.getPriceQuote( _tradeType, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent);
    let strPriceQuote = quote.toFixed(decimals);
    return strPriceQuote;
  }

  getPriceQuote = async( _tradeType, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent) => {
    const route = await this.getRoute( _tradeType, BURN_ADDRESS, _tokenAddrIn, _tokenAddrOut, _inputAmount, _slippagePercent);
    return route.quote
  }

  getTransaction = ( _route, _walletAddress, _gasLimit ) => {
    const transaction = {
      data: _route.methodParameters.calldata,
      to: UNISWAP_SWAPROUTER_02,
      value: BigNumber.from(_route.methodParameters.value),
      from: _walletAddress,
      gasPrice: BigNumber.from(_route.gasPriceWei),
      gasLimit: ethers.utils.hexlify(_gasLimit)
    }
    return transaction;
  }
  
  exeRouteTransaction = async( _recipientAddress, _walletPvtKey, _tokenAddrIn, _route, _gasLimit) => {
    const transaction = this.getTransaction(_route, _recipientAddress, _gasLimit )
    const wallet = new ethers.Wallet(_walletPvtKey)
    const connectedWallet = wallet.connect(provider)
    const approvalAmount = ethers.utils.parseUnits('1', 18).toString()
    const contractIn = new ethers.Contract(_tokenAddrIn, ERC20ABI, provider)
    await contractIn.connect(connectedWallet).approve(
      UNISWAP_SWAPROUTER_02,
      approvalAmount
    )
    const tradeTransaction = await connectedWallet.sendTransaction(transaction)
    return tradeTransaction
  }
      /* BEFORE MODS */
  exeExactInputTransaction = async(
    _walletAddress,
    _walletPvtKey,
    _tokenInAddr,
    _tokenOutAddr,
    _approvalAmount,
    _inputAmount,
    _slippagePercent,
    _gasLimit) => {
      let tradeType = TradeType.EXACT_INPUT;
      let route = await this.getRoute( tradeType, _walletAddress, _tokenInAddr, _tokenOutAddr, _inputAmount, _slippagePercent);
  
      console.log(`Quote Exact In: ${route.quote.toFixed(10)}`)
  
      const transaction = this.getTransaction(route, _walletAddress, _gasLimit)
      const wallet = new ethers.Wallet(_walletPvtKey)
      const connectedWallet = wallet.connect(provider)
      const contract0 = new ethers.Contract(_tokenInAddr, ERC20ABI, provider)
      await contract0.connect(connectedWallet).approve(
        UNISWAP_SWAPROUTER_02,
        _approvalAmount
      )
  
      const tradeTransaction = await connectedWallet.sendTransaction(transaction)
      console.log("Pending Transaction")
      tradeTransaction.wait();
      console.log("Transaction Complete")
  }
}

module.exports = {
  AlphaRouterService
}
