require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");

describe("SwapExactInputSingleHHTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {
    console.log("SwapExactInputSingleHHTest:");

    let spCoinExchange;

    // Before Initialization
    before(async () => {
      spCoinExchange = new SpCoinExchange();
      await spCoinExchange.deploy();
      setConsoleDebugLoggingOn();
    })

      // Test - swapExactInputSingleTest
    it("swapExactInputSingleHHTest: WETH -> DAI", async function () {
      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;
      const TOKEN_OUT_ADDRESS = process.env.GOERLI_DAI;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

      logHeader("swapExactInputSingleHHTest: WETH -> DAI")

      let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
      let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);

      // Deposit WETH by wrapping existing eth
      await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN);
      await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
        TOKEN_IN_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96,
        // TOKEN_IN_CONTRACT,
        // TOKEN_OUT_CONTRACT,
      );
    }).timeout(100000);

      // Test - swapExactInputSingleTest
    it("swapExactInputSingleHHTest: WETH -> SPCOIN", async function () {

      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;
      const TOKEN_OUT_ADDRESS = process.env.GOERLI_SPCOIN;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;
      
      logHeader("swapExactInputSingleHHTest: WETH -> SPCOIN")

      // Deposit TOKEN_IN_ADDRESS
      let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
      let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
      await spCoinExchange.depositEthToWeth(TOKEN_IN_CONTRACT, AMOUNT_IN);
      await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
       
        TOKEN_IN_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96,
        // TOKEN_IN_CONTRACT,
        // TOKEN_OUT_CONTRACT
      );
    }).timeout(100000);

    // Test - swapExactInputSingleTest
    it("swapExactInputSingleHHTest: SPCOIN -> WETH", async function () {
      const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN_ADDRESS = process.env.GOERLI_SPCOIN;
      const TOKEN_OUT_ADDRESS = process.env.GOERLI_WETH;
      const POOL_FEE = 3000;
      const AMOUNT_OUT_MINIMUM = 0;
      const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

      logHeader("swapExactInputSingleHHTest: SPCOIN -> WETH")

      // Deposit TOKEN_IN_ADDRESS
      let TOKEN_IN_CONTRACT = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN_ADDRESS);
      let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
      await spCoinExchange.approve(TOKEN_IN_CONTRACT, AMOUNT_IN);

      await spCoinExchange.swapExactInputSingle(
        TOKEN_IN_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        SQRT_ROOT_PRICE_LIMIT_X96,
        // TOKEN_IN_CONTRACT,
        // TOKEN_OUT_CONTRACT
      );
    }).timeout(100000);  

});
