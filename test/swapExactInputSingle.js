require("dotenv").config();
const { SpCoinExchange } = require("../prod/spCoinExchange");

describe("SwapExactInputSingleTest: Swaps exact amount of _tokenIn for a maximum possible amount of _tokenOut"
, function () {
  console.log("SwapExactInputSingleTest:");

  let spCoinContract
  let spCoinExchange
  let accounts
  let tokenInContract
  const indent = "    ";

  // Before Initialization
  before(async () => {
    accounts = await ethers.getSigners(1);
    await deployContract("SpCoinExchange");
  })

  async function deployContract(contract) {
    const contractFactory = await ethers.getContractFactory(contract);
    spCoinContract = await contractFactory.deploy();
    await spCoinContract.deployed();
    spCoinExchange = new SpCoinExchange(ethers,spCoinContract, accounts);
  }

  async function logSwapExactInputSingle(
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _tokenInABI,
    _tokenOutABI,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {

      let tokenOutContract = await ethers.getContractAt(_tokenOutABI, _tokenOut);

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await spCoinExchange.swapExactInputSingle(
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
  it("swapExactInputSingleTest: WETH -> DAI", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "DAI";
    const AMOUNT_IN = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_DAI;
    const POOL_FEE = 3000;
    const AMOUNT_OUT_MINIMUM = 0;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);

    // Deposit TOKEN_IN
    await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN });
    await tokenInContract.connect(accounts[0]).approve(spCoinContract.address, AMOUNT_IN);

    await logSwapExactInputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      TOKEN_IN_ABI,
      TOKEN_OUT_ABI,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

    // Test - swapExactInputSingleTest
  it("swapExactInputSingleTest: WETH -> SPCOIN", async function () {

    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    
    const TOKEN_IN_NAME = "WETH";
    const TOKEN_OUT_NAME = "SPCOIN";
    const AMOUNT_IN = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_WETH;
    const TOKEN_OUT = process.env.GOERLI_SPCOIN;
    const POOL_FEE = 3000;
    const AMOUNT_OUT_MINIMUM = 0;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);

    // Deposit TOKEN_IN
    await tokenInContract.connect(accounts[0]).deposit({ value: AMOUNT_IN });
    await tokenInContract.connect(accounts[0]).approve(spCoinContract.address, AMOUNT_IN);

    await logSwapExactInputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      TOKEN_IN_ABI,
      TOKEN_OUT_ABI,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);

  // Test - swapExactInputSingleTest
  it("swapExactInputSingleTest: SPCOIN -> WETH", async function () {
    const TOKEN_IN_ABI = require('../contracts/interfaces/WETH_ABI.json')
    const TOKEN_OUT_ABI = require('../contracts/interfaces/ERC20_ABI.json')
    
    const TOKEN_IN_NAME = "SPCOIN";
    const TOKEN_OUT_NAME = "WETH";
    const AMOUNT_IN = 10n ** 18n;
    const TOKEN_IN = process.env.GOERLI_SPCOIN;
    const TOKEN_OUT = process.env.GOERLI_WETH;
    const POOL_FEE = 3000;
    const AMOUNT_OUT_MINIMUM = 0;
    const SQRT_ROOT_PRICE_LIMIT_X96 = 0;

    tokenInContract = await ethers.getContractAt(TOKEN_IN_ABI, TOKEN_IN);

    await tokenInContract.connect(accounts[0]).approve(spCoinContract.address, AMOUNT_IN);

    await logSwapExactInputSingle(
      TOKEN_IN_NAME,
      TOKEN_OUT_NAME,
      TOKEN_IN,
      TOKEN_OUT,
      TOKEN_IN_ABI,
      TOKEN_OUT_ABI,
      POOL_FEE,
      AMOUNT_IN,
      AMOUNT_OUT_MINIMUM,
      SQRT_ROOT_PRICE_LIMIT_X96);
  }).timeout(100000);  
});
