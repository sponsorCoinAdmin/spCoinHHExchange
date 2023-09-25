require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchangeDebug");

describe("SwapExactInputMultiHopHHTest: swapInputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("SwapExactInputMultiHopHHTest:");

  let spCoinExchange;

  // Before Initialization
  before(async () => {
    spCoinExchange = new SpCoinExchange();
    await spCoinExchange.deploy();
    setConsoleDebugLoggingOn();
  })

  // Test - SwapExactInputMultiHop
  it("swapExactInputMultiHopHHTest: WETH --> USDC --> DAI", async () => {
    console.log("swapExactInputSingleHHTest => WETH --> USDC --> DAI");

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_INTERMEDIARY_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const AMOUNT_IN = 10n ** 18n
    const AMOUNT_OUT_MINIMUM = 0;

    const TOKEN_IN_ADDRESS           = process.env.GOERLI_WETH;
    const TOKEN_INTERMEDIARY_ADDRESS = process.env.GOERLI_USDC;
    const TOKEN_OUT_ADDRESS          = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;

    let TOKEN_IN_CONTRACT           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_INTERMEDIARY_CONTRACT = await ethers.getContractAt(TOKEN_INTERMEDIARY_ABI, TOKEN_INTERMEDIARY_ADDRESS);
    let TOKEN_OUT_CONTRACT          = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    logHeader("swapExactInputSingleTest: WETH -> DAI")

    // Deposit WETH by wrapping existing eth
    await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN);
    await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN);

    // Swap
    await spCoinExchange.swapExactInputMultiHop(
      TOKEN_IN_CONTRACT,
      TOKEN_INTERMEDIARY_CONTRACT,
      TOKEN_OUT_CONTRACT,
      TOKEN_IN_ADDRESS,
      TOKEN_INTERMEDIARY_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM
    )
    
  }).timeout(1000000);

});
