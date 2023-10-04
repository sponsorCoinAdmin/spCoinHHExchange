require("dotenv").config();
const { getSpCoinExchange } = require("./deployHHConnection");

describe("GetPriceTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {
    console.log("GetPriceTest:");

    let spCoinExchange;

    // Before Initialization
    before(async () => {
      let debugMode = true;
      spCoinExchange = await getSpCoinExchange(debugMode);
      setConsoleDebugLoggingOff();
     })

    // Test - swapExactInputSingleTest
    it("GetPriceTest: DAI", async function () {
      const AMOUNT_IN                 = 10n ** 18n;
      const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      const percentSlippage = new Percent(slippageAmount, 100)
    }).timeout(100000);

  const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(slippageAmount, 100)
    const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
    const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))
  
    const route = await router.route(
      currencyAmount,
      SPCOIN,
      TradeType.EXACT_INPUT,
      {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline,
      }
    )
  
    const transaction = {
      data: route.methodParameters.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
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

});
