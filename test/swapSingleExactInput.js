require("dotenv").config();

describe("SwapExactInputSingleTest:", function () {

  let swapExamples
  let accounts
  let weth
  let dai
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  let testNum = 0;

  console.log("SwapExactInputSingleTest:");

  // Before Initialization
  before(async () => {
    console.log(indent + "before Initializing");
    accounts = await ethers.getSigners(1);
    await deployContract("SwapExamples");

  })

  async function deployContract(contract) {
    const SwapExamples = await ethers.getContractFactory(contract);
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  }

  async function swapExactInputSingle(
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _amountIn,
    _poolFee,
    _amountOutMinimum,
    _sqrtPriceLimitX96) {

      let beforeTokenInBalanceOf = await weth.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await dia.balanceOf(accounts[0].address);

      console.log(indent3 + "Resp " + testNum + " ~ BEFORE TOKEN_IN ", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent3 + "Resp " + testNum + " ~ BEFORE TOKEN_OUT", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        // Swap Exact Input Single
      await swapExamples.swapExactInputSingle(_tokenIn, _tokenOut, _amountIn, _poolFee, _amountOutMinimum, _sqrtPriceLimitX96);
      
      let afterTokenInBalanceOf = await weth.balanceOf(accounts[0].address);
      let afterTokenOutBalanceOf = await dia.balanceOf(accounts[0].address);

      console.log(indent3 + "Resp " + testNum + " ~ AFTER TOKEN_IN  ", _tokenInName, "balance:", afterTokenInBalanceOf);
      console.log(indent3 + "Resp " + testNum + " ~ AFTER TOKEN_OUT ", _tokenOutName, " balance:", afterTokenOutBalanceOf);
  }

  // Test - swapExactInputSingleTest
  it("swapExactInputSingleTest", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactInputSingleTest...");

    /* ALTERNATE METHOD for weth contract assignment
      weth = await ethers.getContractAt("IWETH", WETH9);
      dai = await ethers.getContractAt("IERC20", TOKEN_OUT);
    */

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')
    
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_IN = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const AMOUNT_OUT_MINIMUM = 0;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    weth = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    dai = await ethers.getContractAt(ERC20, TOKEN_OUT);

    // Deposit TOKEN_IN
    await weth.connect(accounts[0]).deposit({ value: AMOUNT_IN });
    await weth.connect(accounts[0]).approve(swapExamples.address, AMOUNT_IN);

    await swapExactInputSingle(TOKEN_IN_NAME, TOKEN_OUT_NAME, TOKEN_IN, TOKEN_OUT, AMOUNT_IN, POOL_FEE, AMOUNT_OUT_MINIMUM, SQRT_ROOT_PRICE_LIMIT_X96);

  }).timeout(100000);
});
