require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");
// const { SpCoinExchangeMin } = require("../prod/spCoinExchangeMin");

describe("SwapExactOutputSingle: Approve the router to spend the specified `amountInMaximum` of WETH.\n"+
"    In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap."
, function () {
  console.log("SwapExactOutputSingle:");

  let spCoinExchange

  let tokenInContract
  let tokenOutContract
  const indent = "  ";

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
    const AMOUNT_IN_MAX = 10n ** 18n;
    const AMOUNT_OUT_MIN = 100n * 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    logHeader("swapExactOutputSingle: WETH -> DAI")

    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
    // Deposit WETH
    // await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN_MAX });
    // await tokenInContract.connect(accounts[0]).approve(spCoinExchangeOLD.address, AMOUNT_IN_MAX);
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
      AMOUNT_IN_MAX, 
      AMOUNT_OUT_MIN, 
      SQRT_ROOT_PRICE_LIMIT_X96);

  }).timeout(100000);

});
