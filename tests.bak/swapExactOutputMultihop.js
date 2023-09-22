require("dotenv").config();

describe("SwapExactOutputMultihop:", function () {
  console.log("SwapExactOutputMultihop:");

  let swapExamples
  let accounts
  const indent = "  ";
  const indent1 = indent + indent;

  // Before Initialization
  before(async () => {
    accounts = await ethers.getSigners();
    await deployContract("SwapExamples");
  })

  async function deployContract(contract) {
    const SwapExamples = await ethers.getContractFactory(contract);
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  }

  it("swapExactOutputMultihop2", async () => {
    
    /* ALTERNATE METHOD for weth contract assignment
      tokenInContract = await ethers.getContractAt("IWETH", WETH9);
      tokenIntermediaryContract = await ethers.getContractAt("IERC20", USDC);
      tokenOutContract = await ethers.getContractAt("IERC20", DAI);
    */
    console.log(indent + "swapExactInputSingleTest => WETH --> USDC --> DAI");

    const TOKEN_IN_NAME           = "WETH";
    const TOKEN_INTERMEDIARY_NAME = "USDC";
    const TOKEN_OUT_NAME          = "DAI";
    
    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')
    const POOL_FEE = 3000;
    const AMOUNT_IN_MAX = 10n ** 18n
    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;

    const TOKEN_IN           = process.env.GOERLI_WETH;
    const TOKEN_INTERMEDIARY = process.env.GOERLI_USDC;
    const TOKEN_OUT          = process.env.GOERLI_DAI;
        
    const tokenInContract           = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    const tokenIntermediaryContract = await ethers.getContractAt(ERC20, TOKEN_INTERMEDIARY);
    const tokenOutContract          = await ethers.getContractAt(ERC20, TOKEN_OUT);
  
    // Deposit WETH
    await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN_MAX });
    await tokenInContract.connect(accounts[0]).approve(swapExamples.address, AMOUNT_IN_MAX);

    // Swap
    let beforeTokenInBalanceOf           = await tokenInContract.balanceOf(accounts[0].address);
    let beforeTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let beforeTokenOutBalanceOf          = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "BEFORE TOKEN_IN           ~", TOKEN_IN_NAME, "balance:", beforeTokenInBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_INTERMEDIARY ~", TOKEN_INTERMEDIARY_NAME, "balance:", beforeTokenIntermediaryBalanceOf);
    console.log(indent1 + "BEFORE TOKEN_OUT          ~", TOKEN_OUT_NAME, " balance:", beforeTokenOutBalanceOf);
    await swapExamples.swapExactOutputMultihop(
      TOKEN_IN,
      TOKEN_INTERMEDIARY,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX);
    let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
    let afterTokenIntermediaryBalanceOf = await tokenIntermediaryContract.balanceOf(accounts[0].address);
    let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);
    console.log(indent1 + "AFTER TOKEN_IN            ~", TOKEN_IN_NAME, "balance:", afterTokenInBalanceOf);
    console.log(indent1 + "AFTER TOKEN_INTERMEDIARY  ~", TOKEN_INTERMEDIARY_NAME, "balance:", afterTokenIntermediaryBalanceOf);
    console.log(indent1 + "AFTER TOKEN_OUT           ~", TOKEN_OUT_NAME, " balance:", afterTokenOutBalanceOf);
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_IN_NAME, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_INTERMEDIARY_NAME, BigInt(afterTokenIntermediaryBalanceOf)  - BigInt(beforeTokenIntermediaryBalanceOf));
    console.log(indent1 + "DIFFERENCE                ~", TOKEN_OUT_NAME, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }).timeout(100000);

});