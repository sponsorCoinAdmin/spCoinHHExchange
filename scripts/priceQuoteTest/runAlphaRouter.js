require("dotenv").config();
let DEBUG_MODE = false;
const ERC20ABI = require('./abi.json')

const { ethers, BigNumber } = require('ethers')
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { UniTokenServices } = require('./uniTokenServices')

const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const WETH_ADDRESS = process.env.GOERLI_WETH
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN
const UNI_ADDRESS = process.env.GOERLI_UNI

let ARS = DEBUG_MODE ? new AlphaRouterServiceDebug(ethers, CHAIN_ID, provider) : new AlphaRouterService();
let UTS = new UniTokenServices(ethers, CHAIN_ID, provider)

//////////////////////////////////////////////////////////////////////////////////////////////

const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const JSBI  = require('jsbi') // jsbi@3.2.5

// const UNISWAP_SWAPROUTER_02 = process.env.UNISWAP_SWAPROUTER_02
const UNISWAP_SWAPROUTER_02 = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const router = new AlphaRouter({ chainId: CHAIN_ID, provider: web3Provider})

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = process.env.GOERLI_WETH

const name1 = 'Uniswap Token'
const symbol1 = 'UNI'
const decimals1 = 18
const address1 = process.env.GOERLI_UNI

const WETH = new Token(CHAIN_ID, address0, decimals0, symbol0, name0)
const UNI = new Token(CHAIN_ID, address1, decimals1, symbol1, name1)

// const wei = ethers.utils.parseUnits('0.01', 18)
// const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))
const inputAmount = '0.01'
let slippagePercent = 25;
let gasLimit        = 1000000
const approvalAmount = ethers.utils.parseUnits('1', 18).toString()


async function main( ) {

  await ARS.exeTransactionORIG(
    WALLET_ADDRESS,
    WALLET_SECRET,
    WETH_ADDRESS,
    UNI_ADDRESS,
    approvalAmount,
    inputAmount,
    slippagePercent,
    gasLimit
  );

}




getRoute = async(_recipientAddr, _uniTokenOut, _inputAmount, _slippagePercent) => {
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

main()
