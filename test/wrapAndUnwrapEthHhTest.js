require("dotenv").config();
const { getSpCoinExchange } = require("./deployHHConnection");

describe("wrapAndUnwrapEthHHTest: Wrap 10 ETH and then unwrap 5 ETH"
, function () {
    console.log("WrapAndUnwrapEthHHTest:");

    let spCoinExchange;

    // Before Initialization
    before(async () => {
      let debugMode = true;
      spCoinExchange = await getSpCoinExchange(debugMode);
      setConsoleDebugLoggingOn();
     })

    // Test - depositEthToWeth
    it("depositEthToWethHHTest: WETH -> DAI", async function () {
      logHeader("wrapEthHHTest: ETH -> WETH");

      const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;

      let TOKEN_IN_CONTRACT = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);

      // Deposit WETH by wrapping existing eth
      await spCoinExchange.depositEthToWeth( TOKEN_IN_CONTRACT, AMOUNT_IN);
      await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN);
    }).timeout(100000);

        // Test - unwrapEthFromWethHHTest
    it("withdrawEthFromWethHHTest: WETH -> DAI", async function () {
      logHeader("withdrawEthFromWeth: ETH -> WETH");

      const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
      const AMOUNT_IN = 10n ** 18n;
      const TOKEN_IN_ADDRESS = process.env.GOERLI_WETH;

      let TOKEN_IN_CONTRACT = await ethers.getContractAt(WETH_ABI, TOKEN_IN_ADDRESS);

      // Deposit WETH by wrapping existing eth
      await spCoinExchange.withdrawEthFromWeth( TOKEN_IN_CONTRACT, AMOUNT_IN);
      await spCoinExchange.approve( TOKEN_IN_CONTRACT, AMOUNT_IN);
    }).timeout(100000);
    
    

});
