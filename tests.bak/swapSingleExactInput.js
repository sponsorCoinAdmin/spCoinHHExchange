require("dotenv").config();

console.log("SwapExactInputSingleTest:");

describe("SwapExactInputSingleTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {


  let swapExamples
  let accounts
  let tokenInContract
  let tokenOutContract
  const indent = "    ";

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

  async function swapExactInputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {
      await swapExamples.swapExactInputSingle(
        _tokenIn, 
        _tokenOut, 
        _poolFee, 
        _amountIn, 
        _amountOutMin, 
        _sqrtPriceLimitX96
      );
  }

  async function logSwapExactInputSingle(
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await swapExactInputSingle(
        _tokenIn, 
        _tokenOut,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96
      );
      
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      console.log(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      console.log(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      console.log(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

  // Test - swapExactInputSingleTest
  it("swapExactInputSingleTest", async function () {
  
    /* ALTERNATE METHOD for tokenInContract contract assignment
      tokenInContract = await ethers.getContractAt("IWETH", WETH9);
      tokenOutContract = await ethers.getContractAt("IERC20", TOKEN_OUT);
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

    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenOutContract = await ethers.getContractAt(ERC20, TOKEN_OUT);

    // Deposit TOKEN_IN
    await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN });
    await tokenInContract.connect(accounts[0]).approve(swapExamples.address, AMOUNT_IN);

    await logSwapExactInputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      SQRT_ROOT_PRICE_LIMIT_X96);

  }).timeout(100000);
});
