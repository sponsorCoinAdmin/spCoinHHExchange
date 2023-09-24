require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");

describe("SwapExactInputSingleTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {
    console.log("SwapExactInputSingleTest:");

    let spCoinExchange;

    // Before Initialization
    before(async () => {
      spCoinExchange = new SpCoinExchange();
      await spCoinExchange.deploy();
      setConsoleLoggingOn();
    })

      // Test - swapExactInputSingleTest
    it("swapExactInputSingleTest: WETH -> DAI", async function () {
      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
      const TOKEN_IN_NAME = "WETH";
      const TOKEN_OUT_NAME = "DAI";
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN = process.env.GOERLI_WETH;
      const TOKEN_OUT = process.env.GOERLI_DAI;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

      logHeader("swapExactInputSingleTest: WETH -> DAI")

      // Deposit TOKEN_IN
      let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);

      await spCoinExchange.depositEthToWeth(tokenInContract, AMOUNT_IN);
      await spCoinExchange.approve(tokenInContract, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
        TOKEN_IN_NAME,
        TOKEN_OUT_NAME,
        TOKEN_IN,
        TOKEN_OUT,
        TOKEN_IN_ABI,
        TOKEN_OUT_ABI,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96);
    }).timeout(100000);

      // Test - swapExactInputSingleTest
    it("swapExactInputSingleTest: WETH -> SPCOIN", async function () {

      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

      const TOKEN_IN_NAME = "WETH";
      const TOKEN_OUT_NAME = "SPCOIN";
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN = process.env.GOERLI_WETH;
      const TOKEN_OUT = process.env.GOERLI_SPCOIN;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;
      
      logHeader("swapExactInputSingleTest: WETH -> SPCOIN")

      // Deposit TOKEN_IN
      let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
      await spCoinExchange.depositEthToWeth(tokenInContract, AMOUNT_IN);
      await spCoinExchange.approve(tokenInContract, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
        TOKEN_IN_NAME,
        TOKEN_OUT_NAME,
        TOKEN_IN,
        TOKEN_OUT,
        TOKEN_IN_ABI,
        TOKEN_OUT_ABI,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96);
    }).timeout(100000);

    // Test - swapExactInputSingleTest
    it("swapExactInputSingleTest: SPCOIN -> WETH", async function () {
      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
      const TOKEN_IN_NAME = "SPCOIN";
      const TOKEN_OUT_NAME = "WETH";
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN = process.env.GOERLI_SPCOIN;
      const TOKEN_OUT = process.env.GOERLI_WETH;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

      logHeader("swapExactInputSingleTest: SPCOIN -> WETH")

      // Deposit TOKEN_IN
      let tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
      await spCoinExchange.approve(tokenInContract, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
        TOKEN_IN_NAME,
        TOKEN_OUT_NAME,
        TOKEN_IN,
        TOKEN_OUT,
        TOKEN_IN_ABI,
        TOKEN_OUT_ABI,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96
      );
    }).timeout(100000);  

});
