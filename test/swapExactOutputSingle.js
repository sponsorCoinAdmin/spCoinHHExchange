require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");
const { SpCoinExchangeMin } = require("../prod/spCoinExchangeMin");

describe("SwapExactOutputSingle: Approve the router to spend the specified `amountInMaximum` of WETH.\n"+
"    In production, you should choose the maximum amount to spend based on oracles or other data sources to achieve a better swap."
, function () {
  console.log("SwapExactOutputSingle:");

  let spCoinExchange;
  let spCoinExchangeContract;
  let accounts;
  let tokenInContract;
  let tokenOutContract;
  let spCoinExchangeMin;
  let signer;
  const indent = "  ";

  // Before Initialization for each test
  before(async () => {
    spCoinExchange = new SpCoinExchange();
    spCoinExchangeContract = await spCoinExchange.deploy();
    setConsoleLoggingOn();
    spCoinExchangeMin = new SpCoinExchangeMin();
    spCoinExchangeMin.init(spCoinExchangeContract);
    
    accounts = await ethers.getSigners();
    signer = accounts[0];
   })

  async function swapExactOutputSingle(
    _tokenIn,
    _tokenOut,
    _poolFee,
    _amountInMax,
    _amountOutMin,
    _sqrtPriceLimitX96) {
      await spCoinExchangeContract.swapExactOutputSingle(
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

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(signer.address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(signer.address);

      console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Ouput Single
      // await swapExactOutputSingle(_tokenIn, _tokenOut, _poolFee, _amountInMax, _amountOutMin, _sqrtPriceLimitX96);
      // await swapExactOutputSingle(
      //   _tokenIn,
      //   _tokenOut,
      //   _poolFee,
      //   _amountInMax,
      //   _amountOutMin,
      //   _sqrtPriceLimitX96);

      // Swap
      await spCoinExchangeMin.swapExactOutputSingle(
      _tokenIn,
      _tokenOut,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96);

      let afterTokenInBalanceOf = await tokenInContract.balanceOf(signer.address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(signer.address);

      console.log(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      console.log(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      console.log(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      console.log(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle  WETH -> DAI", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
   
    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
    // Deposit WETH
    // await tokenInContract.connect(signer).deposit({ value: AMOUNT_IN_MAX });
    // await tokenInContract.connect(signer).approve(spCoinExchangeContract.address, AMOUNT_IN_MAX);
    await spCoinExchangeMin.depositEthToWeth(signer, tokenInContract, AMOUNT_IN_MAX);
    await spCoinExchangeMin.approve(signer, tokenInContract, AMOUNT_IN_MAX);


      
    // Swap
    await logSwapExactOutputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);

  }).timeout(100000);

    // Test - swapExactOutputSingle
  it("swapExactOutputSingle WETH -> SPCOIN", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "SPCOIN";
    const AMOUNT_IN_MAX = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_SPCOIN;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
    
    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
    // Deposit WETH
    await tokenInContract.connect(signer).deposit({ value: AMOUNT_IN_MAX });
    await tokenInContract.connect(signer).approve(spCoinExchangeContract.address, AMOUNT_IN_MAX);

    // Swap
    await logSwapExactOutputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

  it("swapExactOutputSingle SPCOIN -> WETH", async function () {

    /* ALTERNATE METHOD for tokenInContract contract assignment
      tokenInContract = await ethers.getContractAt("IWETH", WETH9);
      tokenOutContract = await ethers.getContractAt("IERC20", TOKEN_OUT);
    */

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
      
    const TOKEN_IN_NAME = "SPCOIN";
    const TOKEN_OUT_NAME = "WETH";
    const AMOUNT_IN_MAX = 10n * 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_SPCOIN;
    const TOKEN_OUT = process.env.GOERLI_WETH;
    const POOL_FEE = 3000;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    // const TOKEN_AMOUNT_OUT = 100n * 10n ** 18n;
    const TOKEN_AMOUNT_OUT = 1n * 10n ** 12n;
    
    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);
    tokenOutContract = await ethers.getContractAt(TOKEN_OUT_ABI, TOKEN_OUT); 
  
    // Deposit WETH
    // await tokenInContract.connect(signer).deposit({ value: AMOUNT_IN_MAX });
    await tokenInContract.connect(signer).approve(spCoinExchangeContract.address, AMOUNT_IN_MAX);

    // Swap
    await logSwapExactOutputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      POOL_FEE,
      TOKEN_AMOUNT_OUT, 
      AMOUNT_IN_MAX, 
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

});
