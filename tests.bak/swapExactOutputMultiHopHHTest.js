require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");
const { DeployHHConnection } = require("./deployHHConnection");
const { SwapExactOutputMultiHop } = require("../prod/swapExactOutputMultiHopDebug");

describe("SwapExactOutputMultiHopHHTest: swapOutputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("swapExactOutputMultiHopHHTest:");

  let spCoinExchange;
  let SIGNER;

  // Before Initialization
  before(async () => {
    const connection = new DeployHHConnection();
    let spCoinExchangeContract = await connection.deploySpCoinExchange();
    SIGNER = await connection.getSigner(0);
    const swapExactOutputMultiHop = new SwapExactOutputMultiHop();
    spCoinExchange = new SpCoinExchange();

    await spCoinExchange.init(spCoinExchangeContract, SIGNER, swapExactOutputMultiHop);
    setConsoleDebugLoggingOn();
   })

  // Test - SwapExactOutputMultiHop
  it("swapExactOutputMultiHopHHTest: WETH --> USDC --> DAI", async () => {
    console.log("swapExactOutputMultiHopTest => WETH --> USDC --> DAI");

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_INTERMEDIARY_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const TOKEN_IN_ADDRESS           = process.env.GOERLI_WETH;
    const TOKEN_INTERMEDIARY_ADDRESS = process.env.GOERLI_USDC;
    const TOKEN_OUT_ADDRESS          = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;

    const AMOUNT_IN_MAX = 10n ** 18n
    const AMOUNT_OUT = 100n * 10n ** 18n;

    let TOKEN_IN_CONTRACT           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_INTERMEDIARY_CONTRACT = await ethers.getContractAt(TOKEN_INTERMEDIARY_ABI, TOKEN_INTERMEDIARY_ADDRESS);
    let TOKEN_OUT_CONTRACT          = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    logHeader("swapExactOutputMultiHopTestHHTest: WETH -> USDC -> DAI")

    // Deposit WETH by wrapping existing eth
    await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);
    await spCoinExchange.approve(SIGNER, TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);

    // consoleLog("ZZZZZZZZZZZZZZZZZZZZ test/SwapExactOutputMultiHop Parameters ZZZZZZZZZZZZZZZZZZZ");
    // consoleLog("TOKEN_IN_ADDRESS           :", TOKEN_IN_ADDRESS);
    // consoleLog("TOKEN_INTERMEDIARY_ADDRESS :", TOKEN_INTERMEDIARY_ADDRESS);
    // consoleLog("TOKEN_OUT_ADDRESS          :", TOKEN_OUT_ADDRESS);
    // consoleLog("POOL_FEE                   :", POOL_FEE);
    // consoleLog("AMOUNT_OUT                 :", AMOUNT_OUT);
    // consoleLog("AMOUNT_IN_MAX              :", AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputMultiHop(
      TOKEN_IN_ADDRESS,
      TOKEN_INTERMEDIARY_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_OUT, 
      AMOUNT_IN_MAX,
      TOKEN_IN_CONTRACT,
      TOKEN_INTERMEDIARY_CONTRACT,
      TOKEN_OUT_CONTRACT,
);
  }).timeout(1000000);

});
