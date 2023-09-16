const { expect } = require("chai")
const { ethers } = require("hardhat")
const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')

const DAI = process.env.GOERLI_DAI;
const WETH = process.env.GOERLI_WETH;
const USDC = process.env.GOERLI_USDC;

describe("SwapExamples:", function () {

  let swapExamples
  let accounts
  let weth
  let dai
  let usdc
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  let testNum = 0;

  console.log("SwapExamples:");

  // Before Initialization
  before(async () => {
    console.log(indent + "before Initializing");
    accounts = await ethers.getSigners(1);
    await deployContract("SwapExamples");

    weth = await ethers.getContractAt(WETH_ABI, WETH);
    /* ALTERNATE METHOD for weth contract assignment
    weth = await ethers.getContractAt("IWETH", WETH);
    */
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
    let balanceOf = await dai.balanceOf(accounts[0].address);
    console.log(indent2 + "BEFORE ~ DAI balance", balanceOf);
  })

  async function deployContract(contract) {
    const SwapExamples = await ethers.getContractFactory(contract);
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  }

  // Test - swapExactInputMultiHop
  it("swapExactInputMultihop", async () => {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactInputMultiHop...");
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(swapExamples.address, amountIn)

    // Swap
    await swapExamples.swapExactInputMultihop(amountIn)

    console.log(indent3 + "2 Resp " + testNum + " ~ DAI balance", await dai.balanceOf(accounts[0].address));
  }).timeout(1000000);

  // Test - swapExactInputSingle
  it("swapExactInputSingle", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactInputSingle...");

    const amountIn = 10n ** 18n;

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn });
    await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

    // Swap
    await swapExamples.swapExactInputSingle(amountIn);

    console.log(indent3 + "Resp " + testNum + " ~ DAI balance", await dai.balanceOf(accounts[0].address));
  }).timeout(100000);

  // Test - swapExactOutputSingle
  it("swapExactOutputSingle", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactOutputSingle...");

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