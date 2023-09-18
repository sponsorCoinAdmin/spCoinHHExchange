require("dotenv").config();
const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')

const DAI = process.env.GOERLI_DAI;
const WETH = process.env.GOERLI_WETH;
const USDC = process.env.GOERLI_USDC;

describe("SwapExactOutputSingle:", function () {

  let swapExamples
  let accounts
  let weth
  let dai
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;

  console.log("SwapExactOutputSingle:");

  // Before Initialization
  // Before Initialization
  before(async () => {
    console.log(indent + "before Initializing");
    accounts = await ethers.getSigners(1);
    await deployContract("SwapExamples");

    /* ALTERNATE METHOD for weth contract assignment
      weth = await ethers.getContractAt("IWETH", WETH9);
      dai = await ethers.getContractAt("IERC20", DAI);
    */
    weth = await ethers.getContractAt(WETH_ABI, WETH);
    dai = await ethers.getContractAt(ERC20, DAI);
  })

  async function deployContract(contract) {
    const SwapExamples = await ethers.getContractFactory(contract);
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  }

  async function swapExactOutputSingle(
    _tokenIn,
    _tokenOut,
    _amountIn,
    _poolFee,
    _amountOutMinimum,
    _sqrtPriceLimitX96) {
      await swapExamples.swapExactOutputSingle(_tokenIn, _tokenOut, _amountIn, _poolFee, _amountOutMinimum, _sqrtPriceLimitX96);
    }
      
    async function logSwapExactOutputSingle(
    _tokenInName,
    _tokenOutName,
    _tokenIn,
    _tokenOut,
    _amountIn,
    _poolFee,
    _amountOutMinimum,
    _sqrtPriceLimitX96) {

      let beforeTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let beforeTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "BEFORE TOKEN_IN  ~", _tokenInName, "balance:", beforeTokenInBalanceOf);
      console.log(indent + "BEFORE TOKEN_OUT ~", _tokenOutName, " balance:", beforeTokenOutBalanceOf);
        
      // Swap Exact Input Single
      await swapExactOutputSingle(_tokenIn, _tokenOut, _amountIn, _poolFee, _amountOutMinimum, _sqrtPriceLimitX96);
      
      let afterTokenInBalanceOf = await tokenInContract.balanceOf(accounts[0].address);
      let afterTokenOutBalanceOf = await tokenOutContract.balanceOf(accounts[0].address);

      console.log(indent + "AFTER TOKEN_IN   ~", _tokenInName, "balance:", afterTokenInBalanceOf);
      console.log(indent + "AFTER TOKEN_OUT  ~", _tokenOutName, " balance:", afterTokenOutBalanceOf);

      console.log(indent + "DIFFERENCE       ~", _tokenInName, BigInt(afterTokenInBalanceOf) - BigInt(beforeTokenInBalanceOf));
      console.log(indent + "DIFFERENCE       ~", _tokenOutName, BigInt(afterTokenOutBalanceOf)  - BigInt(beforeTokenOutBalanceOf));
  }

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle", async function () {

    const wethAmountInMax = 10n ** 18n;
    const diaAmountOut = 100n * 10n ** 18n;
    let diaBeforeBalance = await dai.balanceOf(accounts[0].address);

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax });
    await weth.connect(accounts[0]).approve(swapExamples.address, wethAmountInMax);

    // Swap
    await swapExamples.swapExactOutputSingle(diaAmountOut, wethAmountInMax);

    const diaAfterBalance = await dai.balanceOf(accounts[0].address);

    console.log(indent3 + "Resp 2 ~ DAI Before  balance", diaBeforeBalance);
    console.log(indent3 + "Resp 2 ~ DAI After   balance", diaAfterBalance);
    console.log(indent3 + "Resp 2 ~ DAI Current balance", diaAfterBalance - diaBeforeBalance);
  }).timeout(100000);

});