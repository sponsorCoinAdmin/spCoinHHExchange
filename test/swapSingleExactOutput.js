require("dotenv").config();

console.log("SwapExactOutputSingle:");

describe("SwapExactOutputSingle:", function () {

  let swapExamples
  let accounts
  let tokenInContract
  let tokenOutContract
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;

  // Before Initialization
  // Before Initialization
  before(async () => {
    accounts = await ethers.getSigners(1);
    await deployContract("SwapExamples");
   })

  async function deployContract(contract) {
    const SwapExamples = await ethers.getContractFactory(contract);
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  }

  async function swapExactOutputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96) {
      await swapExamples.swapExactOutputSingle(
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountInMax,
        _amountOutMin,
        _sqrtPriceLimitX96);
  }

  async function logSwapExactOutputSingle(
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      // await swapExactOutputSingle(_tokenIn, _tokenOut, _poolFee, _amountInMax, _amountOutMin, _sqrtPriceLimitX96);
      await swapExactOutputSingle(
        _tokenIn,
        _tokenOut,
        _poolFee,
        _amountInMax,
        _amountOutMin,
        _sqrtPriceLimitX96);
  
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      console.log(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      console.log(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      console.log(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle", async function () {

    /* ALTERNATE METHOD for tokenInContract contract assignment
      tokenInContract = await ethers.getContractAt("IWETH", WETH9);
      tokenOutContract = await ethers.getContractAt("IERC20", TOKEN_OUT);
    */

    const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')
      
    const DAI = process.env.GOERLI_DAI;
    const WETH = process.env.GOERLI_WETH;
      
    tokenInContract = await ethers.getContractAt(WETH_ABI, WETH);
    tokenOutContract = await ethers.getContractAt(ERC20, DAI); 
  
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_IN = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
    let diaBeforeBalance = await tokenOutContract.balanceOf(accounts[0].address);

    // Deposit WETH
    await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN_MAX });
    await tokenInContract.connect(accounts[0]).approve(swapExamples.address, AMOUNT_IN_MAX);

    // Swap
    /*
    await swapExamples.swapExactOutputSingle(
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT,
      AMOUNT_IN_MAX,
      SQRT_ROOT_PRICE_LIMIT_X96);
    */

    await logSwapExactOutputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);

    const diaAfterBalance = await tokenOutContract.balanceOf(accounts[0].address);
  }).timeout(100000);

});