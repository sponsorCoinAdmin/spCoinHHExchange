require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");

describe("SwapExactInputMultiHop: swapInputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("swapExactInputMultiHop:");


  let spCoinExchange;

  // Before Initialization
  before(async () => {
    spCoinExchange = new SpCoinExchange();
    await spCoinExchange.deploy();
    setConsoleLoggingOn();
  })

  // Test - SwapExactInputMultiHop
  it("swapExactInputMultiHop: WETH --> USDC --> DAI", async () => {
    console.log(indent + "swapExactInputSingleTest => WETH --> USDC --> DAI");

    const TOKEN_IN_NAME           = "WETH";
    const TOKEN_INTERMEDIARY_NAME = "USDC";
    const TOKEN_OUT_NAME          = "DAI";
  
    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_INTERMEDIARY_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')

    const AMOUNT_IN = 10n ** 18n
    const AMOUNT_OUT_MINIMUM = 0;

    const TOKEN_IN           = process.env.GOERLI_WETH;
    const TOKEN_INTERMEDIARY = process.env.GOERLI_USDC;
    const TOKEN_OUT          = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;

    let tokenInContract           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    let tokenIntermediaryContract = await ethers.getContractAt(TOKEN_INTERMEDIARY_ABI, TOKEN_INTERMEDIARY);
    let tokenOutContract          = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT);
    
    logHeader("swapExactInputSingleTest: WETH -> DAI")

    // Deposit TOKEN_IN

    await spCoinExchange.depositEthToWeth(tokenInContract, AMOUNT_IN);
    await spCoinExchange.approve(tokenInContract, AMOUNT_IN);

    // Swap
    let beforeTokenInBalanceOf           = await tokenInContract.balanceOf(accounts[0].address);
    let beforeTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let beforeTokenOutBalanceOf          = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "BEFORE TOKEN_IN           ~", TOKEN_IN_NAME, "balance:", beforeTokenInBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_INTERMEDIARY ~", TOKEN_INTERMEDIARY_NAME, "balance:", beforeTokenIntermediaryBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_OUT          ~", TOKEN_OUT_NAME, " balance:", beforeTokenOutBalanceOf);
    await spCoinExchange.swapExactInputMultiHop(
      TOKEN_IN,
      TOKEN_INTERMEDIARY,
      TOKEN_OUT,
      TOKEN_IN_ABI,
      TOKEN_INTERMEDIARY_ABI,
      TOKEN_OUT_ABI,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM
    )
    
    let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
    let afterTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "AFTER TOKEN_IN            ~", TOKEN_IN_NAME, "balance:", afterTokenInBalanceOf);
    console.log(indent1 + "AFTER TOKEN_INTERMEDIARY  ~", TOKEN_INTERMEDIARY_NAME, "balance:", afterTokenIntermediaryBalanceOf);
    console.log(indent1 + "AFTER TOKEN_OUT           ~", TOKEN_OUT_NAME, " balance:", afterTokenOutBalanceOf);
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_IN_NAME, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_INTERMEDIARY_NAME, BigInt(afterTokenIntermediaryBalanceOf)  - BigInt(beforeTokenIntermediaryBalanceOf));
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_OUT_NAME, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));

  }).timeout(1000000);

});
