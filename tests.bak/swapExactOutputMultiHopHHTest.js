require("dotenv").config();
const { getSpCoinExchange } = require("./deployHHConnection");

describe("SwapExactOutputMultiHopHHTest: swapOutputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("swapExactOutputMultiHopHHTest:");

  let spCoinExchange;

  // Before Initialization
  before(async () => {
    let debugMode = true;
    spCoinExchange = await getSpCoinExchange(debugMode);
    setConsoleDebugLoggingOn();
   })

  // Test - SwapExactOutputMultiHop
  it("swapExactOutputMultiHopHHTest: WETH --> USDC --> DAI", async () => {
    console.log("swapExactOutputMultiHopTest => WETH --> USDC --> DAI");

    const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_BASE_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const TOKEN_IN_ADDRESS   = process.env.GOERLI_WETH;
    const TOKEN_BASE_ADDRESS = process.env.GOERLI_USDC;
    const TOKEN_OUT_ADDRESS  = process.env.GOERLI_DAI;
    const POOL_FEE           = 3000;

    const AMOUNT_IN_MAX = 10n ** 18n
    const AMOUNT_OUT    = 100n * 10n ** 18n;

    let TOKEN_IN_CONTRACT   = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_BASE_CONTRACT = await ethers.getContractAt(TOKEN_BASE_ABI, TOKEN_BASE_ADDRESS);
    let TOKEN_OUT_CONTRACT  = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    logHeader("swapExactOutputMultiHopTestHHTest: WETH -> USDC -> DAI")

    // Deposit WETH by wrapping existing eth
    await spCoinExchange.depositEthToWeth( TOKEN_IN_CONTRACT, AMOUNT_IN_MAX );
    await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN_MAX );

    // consoleLog(" test/SwapExactOutputMultiHop Parameters ");
    // consoleLog("TOKEN_IN_ADDRESS           :", TOKEN_IN_ADDRESS);
    // consoleLog("TOKEN_BASE_ADDRESS :", TOKEN_BASE_ADDRESS);
    // consoleLog("TOKEN_OUT_ADDRESS          :", TOKEN_OUT_ADDRESS);
    // consoleLog("POOL_FEE                   :", POOL_FEE);
    // consoleLog("AMOUNT_OUT                 :", AMOUNT_OUT);
    // consoleLog("AMOUNT_IN_MAX              :", AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputMultiHop(
      TOKEN_IN_ADDRESS,
      TOKEN_BASE_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_OUT, 
      AMOUNT_IN_MAX,
      TOKEN_IN_CONTRACT,
      TOKEN_BASE_CONTRACT,
      TOKEN_OUT_CONTRACT,
);
  }).timeout(1000000);

});
