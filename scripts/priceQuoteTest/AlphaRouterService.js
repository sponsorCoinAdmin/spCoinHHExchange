require("dotenv").config();

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

    getRoute = async(_recipientAddr, _uniTokenIn, _uniTokenOut, _inputAmount, _slippagePercent) => {
      let route = await router.route(
        _inputAmount,
        _uniTokenOut,
        TradeType.EXACT_INPUT,
        {
          recipient: _recipientAddr,
          slippageTolerance: new Percent(_slippagePercent, 100),
          deadline: Math.floor(Date.now()/1000 + 1800)
        }
      )
      return route;
    }

    getStrPriceQuote = async(_tokenInAddr, _tokenOutAddr, _inputAmount, _slippagePercent, _decimals) => {
      let decimals = (_decimals === undefined) ? await uniContractFrom.decimals() : _decimals;
      let quote = await this.getPriceQuote(_tokenInAddr, _tokenOutAddr, _inputAmount, _slippagePercent);
      let strPriceQuote = quote.toFixed(decimals);
      return strPriceQuote;
    }
    
    getPriceQuote = async( _tokenInAddr, _tokenOutAddr, _inputAmount, _slippagePercent) => {
      let uniContractFrom = UTS.getERC20Contract(_tokenInAddr)
      let uniContractTo   = UTS.getERC20Contract(_tokenOutAddr)
      let uniTokenIn  = await UTS.getUniTokenByContract(uniContractFrom, _tokenInAddr)
      let uniTokenOut = await UTS.getUniTokenByContract(uniContractTo, _tokenOutAddr)
      let inputAmount = UTS.tokenToCurrencyInWei(_inputAmount, uniTokenIn)
      const route = await this.getRoute(BURN_ADDRESS, uniTokenIn, uniTokenOut, inputAmount, _slippagePercent);
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
    
    exeRouteTransaction = async( _walletAddress, _walletPvtKey, _uniTokenInAddr, _route, _gasLimit) => {
      const route = await this.getRoute(_recipientAddr, _route);
      const transaction = this.getTransaction(route, _walletAddress, _gasLimit )
      const wallet = new ethers.Wallet(_walletPvtKey)
      const connectedWallet = wallet.connect(provider)
      const approvalAmount = ethers.utils.parseUnits('1', 18).toString()
      const ERC20ABI = require('./abi.json')
      const contract0 = new ethers.Contract(_uniTokenInAddr, ERC20ABI, provider)
      await contract0.connect(connectedWallet).approve(
        UNISWAP_SWAPROUTER_02,
        approvalAmount
      )
      const tradeTransaction = await connectedWallet.sendTransaction(transaction)
      return tradeTransaction
    }
    
    exeTransaction = async(
      _walletAddress,
      _walletPvtKey,
      _uniTokenIn,
      _uniTokenOut,
      _inputAmount,
      _slippagePercent,
      _gasLimit) => {
        const route = await this.getRoute(_walletAddress, _walletPvtKey, _uniTokenIn, _uniTokenOut, _inputAmount, _slippagePercent);
        const transaction = await this.exeRouteTransaction( _walletAddress, _uniTokenInAddr, _route, _gasLimit)
       return transaction;
    }
    
}


/* BEFORE MODS
exeTransactionORIG = async(
  _walletAddress,
  _walletPvtKey,
  _uniTokenIn,
  _uniTokenOut,
  _inputAmount,
  _slippagePercent,
  _gasLimit) => {
const route = await getRoute(_walletAddress, _uniTokenIn, _uniTokenOut, _inputAmount, _slippagePercent);
const transaction = getTransaction(route, _walletAddress,  _gasLimit )
const wallet = new ethers.Wallet(_walletPvtKey)
const connectedWallet = wallet.connect(provider)
const approvalAmount = ethers.utils.parseUnits('1', 18).toString()
const ERC20ABI = require('./abi.json')
const contract0 = new ethers.Contract(_uniTokenIn.address, ERC20ABI, provider)
await contract0.connect(connectedWallet).approve(
  UNISWAP_SWAPROUTER_02,
  approvalAmount
)
const tradeTransaction = await connectedWallet.sendTransaction(transaction)
}
*/

module.exports = {
  AlphaRouterService
}
