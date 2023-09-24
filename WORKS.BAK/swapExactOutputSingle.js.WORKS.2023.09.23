require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");

describe("SwapExactOutputSingle: Approve the router to spend the specified `amountInMaximum` of WETH.\n"+
"    In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap."
, function () {
  console.log("SwapExactOutputSingle:");

  let spCoinExchange

  // Before Initialization for each test
  before(async () => {
    spCoinExchange = new SpCoinExchange();
    await spCoinExchange.deploy();
    setConsoleLoggingOn();
  })

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle  WETH -> DAI", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    logHeader("swapExactOutputSingle: WETH -> DAI")
    let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
  
    // Deposit WETH
    await spCoinExchange.depositEthToWeth(tokenInContract, AMOUNT_IN_MAX);
    await spCoinExchange.approve(tokenInContract, AMOUNT_IN_MAX);

    // Swap
    await spCoinExchange.swapExactOutputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      TOKEN_IN_ABI,
      TOKEN_OUT_ABI,
      POOL_FEE,
      AMOUNT_OUT_MIN,
      AMOUNT_IN_MAX,
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

  
    // Test - swapExactOutputSingle
    it("swapExactOutputSingle WETH -> SPCOIN", async function () {

      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
        
      const TOKEN_IN_NAME = "WETH";
      const TOKEN_OUT_NAME = "SPCOIN";
      const AMOUNT_IN_MAX = 10n ** 18n;
      const TOKEN_IN = process.env.GOERLI_WETH;
      const TOKEN_OUT = process.env.GOERLI_SPCOIN;
      const POOL_FEE = 3000;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;
  
      const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
      
      let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
   
      // Deposit WETH
      await spCoinExchange.depositEthToWeth(tokenInContract, AMOUNT_IN_MAX);
      await spCoinExchange.approve(tokenInContract, AMOUNT_IN_MAX);
  
      // Swap
      await spCoinExchange.swapExactOutputSingle(
        TOKEN_IN_NAME,
        TOKEN_OUT_NAME,
        TOKEN_IN,
        TOKEN_OUT,
        TOKEN_IN_ABI,
        TOKEN_OUT_ABI,
        POOL_FEE,
        AMOUNT_OUT_MIN, 
        AMOUNT_IN_MAX, 
        SQRT_ROOT_PRICE_LIMIT_X96);
    }).timeout(100000);
  
    it("swapExactOutputSingle SPCOIN -> WETH", async function () {
  
      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
        
      const TOKEN_IN_NAME = "SPCOIN";
      const TOKEN_OUT_NAME = "WETH";
      const AMOUNT_IN_MAX = 10n * 10n ** 18n;
      const TOKEN_IN = process.env.GOERLI_SPCOIN;
      const TOKEN_OUT = process.env.GOERLI_WETH;
      const POOL_FEE = 3000;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;
  
      // const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
      const AMOUNT_OUT_MIN = 1n * 10n ** 12n;
      
      let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    
      // Deposit WETH
      await spCoinExchange.approve(tokenInContract, AMOUNT_IN_MAX);
  
      // Swap
      await spCoinExchange.swapExactOutputSingle(
        TOKEN_IN_NAME,
        TOKEN_OUT_NAME,
        TOKEN_IN,
        TOKEN_OUT,
        TOKEN_IN_ABI,
        TOKEN_OUT_ABI,
        POOL_FEE,
        AMOUNT_OUT_MIN, 
        AMOUNT_IN_MAX, 
        SQRT_ROOT_PRICE_LIMIT_X96);
    }).timeout(100000);
  
});
