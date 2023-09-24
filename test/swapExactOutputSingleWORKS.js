require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");
const { SpCoinExchangeMin } = require("../prod/spCoinExchangeMin");

describe("SwapExactOutputSingle: Approve the router to spend the specified `amountInMaximum` of WETH.\n"+
"    In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap."
, function () {
  console.log("SwapExactOutputSingle:");

  let spCoinExchange;
  let spCoinExchangeContract;
  let accounts;
  let spCoinExchangeMin;

  // Before Initialization for each test
  before(async () => {
    spCoinExchange = new SpCoinExchange();
    spCoinExchangeContract = await spCoinExchange.deploy();
    setConsoleLoggingOn();
    spCoinExchangeMin = new SpCoinExchangeMin();
    spCoinExchangeMin.init(spCoinExchangeContract);
    
    accounts = await ethers.getSigners();
    signer = accounts[0];
   })

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle  WETH -> DAI", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
   
    let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    let tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
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
      TOKEN_AMOUNT_OUT, 
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

    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
    
    let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    let tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
 
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
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

  it("swapExactOutputSingle SPCOIN -> WETH", async function () {

    /* ALTERNATE METHOD for tokenInContract contract assignment
      tokenInContract = await ethers.getContractAt("IWETH", WETH9);
      tokenOutContract = await ethers.getContractAt("IERC20", TOKEN_OUT);
    */

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "SPCOIN";
    const TOKEN_OUT_NAME = "WETH";
    const AMOUNT_IN_MAX = 10n * 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_SPCOIN;
    const TOKEN_OUT = process.env.GOERLI_WETH;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    // const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
    const TOKEN_AMOUNT_OUT = 1n * 10n ** 12n;
    
    let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    let tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
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
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

});
