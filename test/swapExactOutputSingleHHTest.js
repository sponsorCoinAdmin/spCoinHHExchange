require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");
const { DeployHHConnection } = require("./deployHHConnection");
const { SwapExactOutputSingle } = require("../prod/swapExactOutputSingleDebug");

describe("SwapExactOutputSingle: Approve the router to spend the specified `amountInMaximum` of WETH.\n"+
"    In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap."
, function () {
  console.log("SwapExactOutputSingle:");

  let spCoinExchange

  // Before Initialization for each test
  before(async () => {
    const connection = new DeployHHConnection();
    let spCoinExchangeContract = await connection.deploySpCoinExchange();
    const signerAccount = await connection.getSigner(0);
    const swapExactOutputSingle = new SwapExactOutputSingle();
    spCoinExchange = new SpCoinExchange();

    await spCoinExchange.init(spCoinExchangeContract, signerAccount, swapExactOutputSingle);
    setConsoleDebugLoggingOn();
})

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle  WETH -> DAI", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;
    const TOKEN_OUT_ADDRESS = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    logHeader("swapExactOutputSingle: WETH -> DAI")
    let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);

    // Deposit WETH
    await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);
    await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputSingle(
      TOKEN_IN_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_OUT_MIN,
      AMOUNT_IN_MAX,
      SQRT_ROOT_PRICE_LIMIT_X96,
      TOKEN_IN_CONTRACT,
      TOKEN_OUT_CONTRACT,
);
  }).timeout(100000);

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle WETH -> SPCOIN", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;
    const TOKEN_OUT_ADDRESS = process.env.GOERLI_SPCOIN;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
    
    let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    // Deposit WETH by wrapping existing eth
    await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);
    await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputSingle(
      TOKEN_IN_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_OUT_MIN, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96,
      TOKEN_IN_CONTRACT,
      TOKEN_OUT_CONTRACT,
);
  }).timeout(100000);

  it("swapExactOutputSingle SPCOIN -> WETH", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const AMOUNT_IN_MAX = 10n * 10n ** 18n;
    const TOKEN_IN_ADDRESS = process.env.GOERLI_SPCOIN;
    const TOKEN_OUT_ADDRESS = process.env.GOERLI_WETH;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    // const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
    const AMOUNT_OUT_MIN = 1n * 10n ** 12n;
    
    let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    // Deposit WETH
    await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputSingle(
      TOKEN_IN_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_OUT_MIN, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96,
      TOKEN_IN_CONTRACT,
      TOKEN_OUT_CONTRACT
    );
  }).timeout(100000);
  
});
