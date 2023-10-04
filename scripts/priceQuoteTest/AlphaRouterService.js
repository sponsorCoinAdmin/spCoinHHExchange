require("dotenv").config();

const { AlphaRouter } = require('@uniswap/smart-order-router')
const { TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')

const UNISWAP_SWAPROUTER_02 = process.env.UNISWAP_SWAPROUTER_02
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const chainId = parseInt(process.env.GORELI_CHAIN_ID)
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider})

getRoute = async(_recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent) => {
  let route = await router.route(
    _inputAmount,
    _tokenOut,
    TradeType.EXACT_INPUT,
    {
      recipient: _recipientAddr,
      slippageTolerance: new Percent(_slippagePercent, 100),
      deadline: Math.floor(Date.now()/1000 + 1800)
    }
  )
  return route;
}

getPriceQuote = async(_recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent, _decimals) => {
  const route = await getRoute(_recipientAddr, _tokenIn, _tokenOut, _inputAmount, _slippagePercent);
  let quote = route.quote
  console.log("quote", JSON.stringify(quote, null, 2));
  let strQuote = route.quote.toFixed(_decimals);
  console.log("strQuote", JSON.stringify(strQuote, null, 2));
  return(strQuote)
}

getTransaction = ( _route, _gasLimit) => {
  const transaction = {
    data: route.methodParameters.calldata,
    to: UNISWAP_SWAPROUTER_02,
    value: BigNumber.from(route.methodParameters.value),
    from: WALLET_ADDRESS,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(_gasLimit)
  }
  return transaction;
}

exeTradeTransaction = async(_tokenIn, _tokenOut, _inputAmount, _gasLimit) => {

  const route = await getRoute(_tokenIn, _tokenOut, _inputAmount);

  const transaction = getTransaction( route, gasLimit )

  const wallet = new ethers.Wallet(WALLET_SECRET)
  const connectedWallet = wallet.connect(web3Provider)

  const approvalAmount = ethers.utils.parseUnits('1', 18).toString()
  const ERC20ABI = require('./abi.json')
  const contract0 = new ethers.Contract(_tokenIn.address, ERC20ABI, web3Provider)
  await contract0.connect(connectedWallet).approve(
    UNISWAP_SWAPROUTER_02,
    approvalAmount
  )

  const tradeTransaction = await connectedWallet.sendTransaction(transaction)
}
