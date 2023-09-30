require("dotenv").config();
const { getSpCoinExchange } = require("./deployHHConnection");
const { } = require("../prod/lib/logger/spCoinLogger");


describe("SwapExactInputMultiHopHHTest: swapInputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("SwapExactInputMultiHopHHTest:");

  let spCoinExchange;

  // Before Initialization
  before(async () => {
    let debugMode = true;
    spCoinExchange = await getSpCoinExchange(debugMode);
    setConsoleDebugLoggingOn();
   })

    // Test - swapExactInputSingleTest
    it("swapExactInputSingleHHTest: WETH -> SPCOIN", async function () {

    const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const AMOUNT_IN                 = 10n ** 18n;
    const TOKEN_IN_ADDRESS          = process.env.GOERLI_WETH;
    const TOKEN_OUT_ADDRESS         = process.env.GOERLI_SPCOIN;
    const POOL_FEE                  = 3000;
    const AMOUNT_OUT_MINIMUM        = 0;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;
    
    logHeader("swapExactInputSingleHHTest: WETH -> SPCOIN")

    // Deposit TOKEN_IN_ADDRESS
    let TOKEN_IN_CONTRACT = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_OUT_CONTRACT = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    await spCoinExchange.depositEthToWeth( TOKEN_IN_CONTRACT, AMOUNT_IN);
    await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN);

    await spCoinExchange.swapExactInputSingle(
      
      TOKEN_IN_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      SQRT_ROOT_PRICE_LIMIT_X96,
      TOKEN_IN_CONTRACT,
      TOKEN_OUT_CONTRACT
    );
  }).timeout(100000);


  // Test - SwapExactInputMultiHop
  it("swapExactInputMultiHopHHTest: SPCOIN --> WETH --> DAI", async () => {
    logHeader("swapExactInputMultiHopHHTest: SPCOIN --> WETH --> DAI")

    const WETH_ABI = require('../contracts/interfaces/SPCOIN_ABI.json')
    const TOKEN_BASE_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const AMOUNT_IN = 10n ** 18n
    const AMOUNT_OUT_MINIMUM = 0;

    const TOKEN_IN_ADDRESS   = process.env.GOERLI_SPCOIN;
    const TOKEN_BASE_ADDRESS = process.env.GOERLI_WETH;
    const TOKEN_OUT_ADDRESS  = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;

    let TOKEN_IN_CONTRACT   = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);
    let TOKEN_BASE_CONTRACT = await ethers.getContractAt(TOKEN_BASE_ABI, TOKEN_BASE_ADDRESS);
    let TOKEN_OUT_CONTRACT  = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
    
    // await spCoinExchange.depositEthToWeth( TOKEN_IN_CONTRACT, AMOUNT_IN);
    await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN);

    // Swap
    await spCoinExchange.swapExactInputMultiHop(
      TOKEN_IN_ADDRESS,
      TOKEN_BASE_ADDRESS,
      TOKEN_OUT_ADDRESS,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      TOKEN_IN_CONTRACT,
      TOKEN_BASE_CONTRACT,
      TOKEN_OUT_CONTRACT
    )
    
  }).timeout(1000000);

  /*
  
    // Test - SwapExactInputMultiHop
    it("swapExactInputMultiHopHHTest: WETH --> USDC --> SPCOIN", async () => {
      console.log("swapExactInputSingleHHTest => WETH --> USDC --> SPCOIN");
  
      const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const TOKEN_BASE_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
  
      const AMOUNT_IN = 10n ** 18n
      const AMOUNT_OUT_MINIMUM = 0;
  
      const TOKEN_IN_ADDRESS           = process.env.GOERLI_WETH;
      const TOKEN_BASE_ADDRESS = process.env.GOERLI_USDC;
      const TOKEN_OUT_ADDRESS          = process.env.GOERLI_SPCOIN;
      const POOL_FEE = 3000;
  
      let TOKEN_IN_CONTRACT           = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);
      let TOKEN_BASE_CONTRACT = await ethers.getContractAt(TOKEN_BASE_ABI, TOKEN_BASE_ADDRESS);
      let TOKEN_OUT_CONTRACT          = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT_ADDRESS);
      
      logHeader("swapExactInputSingleTest: WETH -> SPCOIN")
  
      // Deposit WETH by wrapping existing eth
      await spCoinExchange.depositEthToWeth( TOKEN_IN_CONTRACT, AMOUNT_IN);
      await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN);
  
      // Swap
      await spCoinExchange.swapExactInputMultiHop(
        TOKEN_IN_ADDRESS,
        TOKEN_BASE_ADDRESS,
        TOKEN_OUT_ADDRESS,
        POOL_FEE,
        AMOUNT_IN,
        AMOUNT_OUT_MINIMUM,
        TOKEN_IN_CONTRACT,
        TOKEN_BASE_CONTRACT,
        TOKEN_OUT_CONTRACT
      )
      
    }).timeout(1000000);

    */

});
