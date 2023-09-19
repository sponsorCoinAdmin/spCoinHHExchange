require("dotenv").config();


describe("SwapExactInputMultihop: swapInputMultiplePools swaps a fixed amount of tokenIn for a maximum possible amount of tokenOut"
, function () {
  console.log("swapExactInputMultihop:");

  let spCoinExchange
  let accounts
  let tokenInContract
  let tokenOutContract
  let tokenIntermediaryContract
  const indent  = "  ";
  const indent1 = indent + indent;

  // Before Initialization
  before(async () => {
    accounts = await ethers.getSigners(1);
    await deployContract("SpCoinExchange");
  })

  async function deployContract(contract) {
    const SpCoinExchange = await ethers.getContractFactory(contract);
    spCoinExchange = await SpCoinExchange.deploy();
    await spCoinExchange.deployed();
  }

  /*
  // Test - swapExactInputMultiHop
  it("swapExactInputMultihop: WETH --> USDC --> DAI", async () => {
    console.log(indent + "swapExactInputSingleTest => WETH --> USDC --> DAI");

    const TOKEN_IN_NAME           = "WETH";
    const TOKEN_INTERMEDIARY_NAME = "USDC";
    const TOKEN_OUT_NAME          = "DAI";
  
    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')
    const AMOUNT_IN = 10n ** 18n
    const AMOUNT_OUT_MINIMUM = 0;

    const TOKEN_IN           = process.env.GOERLI_WETH;
    const TOKEN_INTERMEDIARY = process.env.GOERLI_USDC;
    const TOKEN_OUT          = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;

    tokenInContract           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenIntermediaryContract = await ethers.getContractAt(ERC20, TOKEN_INTERMEDIARY);
    tokenOutContract          = await ethers.getContractAt(ERC20, TOKEN_OUT);
  
    // Deposit WETH
    await tokenInContract.deposit({ value: AMOUNT_IN })
    await tokenInContract.approve(spCoinExchange.address, AMOUNT_IN)

    // Swap
    let beforeTokenInBalanceOf           = await tokenInContract.balanceOf(accounts[0].address);
    let beforeTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let beforeTokenOutBalanceOf          = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "BEFORE TOKEN_IN           ~", TOKEN_IN_NAME, "balance:", beforeTokenInBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_INTERMEDIARY ~", TOKEN_INTERMEDIARY_NAME, "balance:", beforeTokenIntermediaryBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_OUT          ~", TOKEN_OUT_NAME, " balance:", beforeTokenOutBalanceOf);
    await spCoinExchange.swapExactInputMultihop(
      TOKEN_IN,
      TOKEN_INTERMEDIARY,
      TOKEN_OUT,
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
*/
  
  // Test - swapExactInputMultiHop
  it("swapExactInputMultihop: SpCoin --> WETH --> DAI", async () => {
    console.log(indent + "swapExactInputSingleTest => SpCoin --> WETH --> DAI");

    const TOKEN_IN_NAME           = "SpCoin";
    const TOKEN_INTERMEDIARY_NAME = "WETH";
    const TOKEN_OUT_NAME          = "DAI";
  
    const TOKEN_IN_ABI = require('../contracts/interfaces/SPCOIN_ABI.json')
    // const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')

    const WETH = require('../contracts/interfaces/WETH_ABI.json')

    const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')
    const AMOUNT_IN = 10n
    const AMOUNT_OUT_MINIMUM = 0;

    const TOKEN_IN           = process.env.GOERLI_SPCOIN;
    const TOKEN_INTERMEDIARY = process.env.GOERLI_WETH;
    const TOKEN_OUT          = process.env.GOERLI_DAI;
    const POOL_FEE           = 3000;

    tokenInContract           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenIntermediaryContract = await ethers.getContractAt(WETH, TOKEN_INTERMEDIARY);
    tokenOutContract          = await ethers.getContractAt(ERC20, TOKEN_OUT);
  
    // Deposit WETH
    // await tokenInContract.deposit({ value: AMOUNT_IN })
    await tokenInContract.approve(spCoinExchange.address, AMOUNT_IN)

    // Swap
    let beforeTokenInBalanceOf           = await tokenInContract.balanceOf(accounts[0].address);
    let beforeTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let beforeTokenOutBalanceOf          = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "BEFORE TOKEN_IN           ~", TOKEN_IN_NAME, "balance:", beforeTokenInBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_INTERMEDIARY ~", TOKEN_INTERMEDIARY_NAME, "balance:", beforeTokenIntermediaryBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_OUT          ~", TOKEN_OUT_NAME, " balance:", beforeTokenOutBalanceOf);
    await spCoinExchange.swapExactInputMultihop(
      TOKEN_IN,
      TOKEN_INTERMEDIARY,
      TOKEN_OUT,
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