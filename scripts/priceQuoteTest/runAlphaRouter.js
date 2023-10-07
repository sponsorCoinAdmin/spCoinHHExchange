const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI  = require('jsbi') // jsbi@3.2.5

// const UNISWAP_SWAPROUTER_02 = process.env.UNISWAP_SWAPROUTER_02
const UNISWAP_SWAPROUTER_02 = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
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

const wei = ethers.utils.parseUnits('0.01', 18)
const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))
const slippagePercent = 25;

async function main() {

  const route = await this.getRoute(WALLET_ADDRESS, UNI, inputAmount, slippagePercent);

  console.log(`Quote Exact In: ${route.quote.toFixed(10)}`)

  const transaction = getTransaction(route, WALLET_ADDRESS, 1000000)
  const wallet = new ethers.Wallet(WALLET_SECRET)
  const connectedWallet = wallet.connect(web3Provider)
  const approvalAmount = ethers.utils.parseUnits('1', 18).toString()
  const ERC20ABI = require('./abi.json')
  const contract0 = new ethers.Contract(address0, ERC20ABI, web3Provider)
  await contract0.connect(connectedWallet).approve(
    UNISWAP_SWAPROUTER_02,
    approvalAmount
  )

  const tradeTransaction = await connectedWallet.sendTransaction(transaction)
  tradeTransaction.wait();
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

exeTransactionORIG = async(
  _walletAddress,
  _walletPvtKey,
  _uniTokenIn,
  _uniTokenOut,
  _inputAmount,
  _slippagePercent,
  _gasLimit) => {
    const route = await this.getRoute(_walletAddress, _uniTokenIn, _uniTokenOut, _inputAmount, _slippagePercent);
    const transaction = this.getTransaction(route, _walletAddress,  _gasLimit )
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
