require("dotenv").config();
const { getSpCoinExchange } = require("./deployHHConnection");

describe("SwapExactInputSingleHHTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {
    console.log("SwapExactInputSingleHHTest:");

    let spCoinExchange;

    // Before Initialization
    before(async () => {
      let debugMode = false;
      spCoinExchange = await getSpCoinExchange(debugMode);
      setConsoleDebugLoggingOff();
     })

    /*
    // Test - getQuoterPrice returns the best quote price for the pool tokenIn/tokenOut
    it("Get Quoter Price for 1 WETH -> USDC pool", async function () {

      const WETH_ADDRESS = process.env.GOERLI_WETH
      const USDC_ADDRESS = process.env.GOERLI_USDC
      const TOKEN_IN_ADDRESS  = WETH_ADDRESS;
      const TOKEN_OUT_ADDRESS = USDC_ADDRESS;
      const POOL_FEE = '3000';
      const AMOUNT_IN = hre.ethers.utils.parseEther('1');
      const SQRT_ROOT_PRICE_LIMIT_X96 = '0';
      
      logHeader("getQuoterPrice: WETH -> USDC")

      // Call spCoinExchange.getQuoterPrice to get quotePrice
      let quotePrice = await spCoinExchange.getQuoterPrice(
        TOKEN_IN_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        SQRT_ROOT_PRICE_LIMIT_X96
      );
      
      // console.log("quotePrice =", quotePrice);
    }).timeout(100000);
*/
    it("testUInt return function", async function () {
      const WETH_ADDRESS = process.env.GOERLI_WETH
      const USDC_ADDRESS = process.env.GOERLI_USDC
      const TOKEN_IN_ADDRESS  = WETH_ADDRESS;
      const TOKEN_OUT_ADDRESS = USDC_ADDRESS;
      const POOL_FEE = '3000';
      const AMOUNT_IN = hre.ethers.utils.parseEther('1');
      const SQRT_ROOT_PRICE_LIMIT_X96 = '0';
      
      logHeader("testUInt return function")

      // Call spCoinExchange.getQuoterPrice to get quotePrice
      let uint = await spCoinExchange.testUInt(
        TOKEN_IN_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        SQRT_ROOT_PRICE_LIMIT_X96);
      
      // console.log("quotePrice =", quotePrice);
    }).timeout(100000);

});
