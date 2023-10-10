require("dotenv").config();
const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')

const UNISWAP_SWAPROUTER_02 = process.env.UNISWAP_SWAPROUTER_02

// Goerli Test Net
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID);

const INFURA_URL=process.env.GOERLI_INFURA_TEST_URL;
provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const WETH_ADDRESS = process.env.GOERLI_WETH;

const WETH = new Token(CHAIN_ID, WETH_ADDRESS, 18, 'WETH', 'Wrapped Ether');
const router = new AlphaRouter({ chainId: CHAIN_ID, provider: provider })

const decimals = 18

const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN;

getPrice = async (inputAmount, slippagePercent, deadline, walletAddress) => {
  console.log("getPrice = async (")
  const slippageTolerance = new Percent(slippagePercent, 100)
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals)
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

  const route = await router.route(
    currencyAmount,
    WETH,
    TradeType.EXACT_INPUT,
    {
      recipient: walletAddress,
      slippageTolerance: slippageTolerance,
      deadline: deadline,
    }
  )

  const transaction = {
    data: route.methodParameters.calldata,
    to: UNISWAP_SWAPROUTER_02,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000)
  }

  const quoteAmountOut = route.quote.toFixed(6)
  const ratio = (inputAmount / quoteAmountOut).toFixed(10)

  return [
    transaction,
    quoteAmountOut,
    ratio
  ]
}
