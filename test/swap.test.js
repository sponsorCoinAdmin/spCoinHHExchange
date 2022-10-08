const { expect } = require("chai")
const { ethers } = require("hardhat")

const DAI = "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60";
const WETH9 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const USDC = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C";

describe("SwapExamples:", function () {

  let swapExamples
  let accounts
  let weth
  let dai
  let usdc
  const indent = "  ";
  const indent2 = indent+indent;
  const indent3 = indent2+indent;

  console.log("SwapExamples:");

  // Before Initialization
  before(async () => {
    console.log("    before Initializing");

    accounts = await ethers.getSigners(1);

    const SwapExamples = await ethers.getContractFactory("SwapExamples");
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai  = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
  })

  // // Test # 1 - swapExactInputSingleHop
  // it("swapExactInputSingle", async function () {
  //   console.log(indent2+"Test 1 ~ swapExactInputSingle...");

  //   const amountIn = 10n ** 18n;

  //   // Deposit WETH
  //   await weth.connect(accounts[0]).deposit({ value: amountIn });
  //   await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

  //   // Swap
  //   await swapExamples.swapExactInputSingle(amountIn);

  //   console.log(indent3+"Resp  1 ~ DAI balance", await dai.balanceOf(accounts[0].address));
  // });

  // // Test # 2 - swapExactOutputSingleHop
  // it("swapExactOutputSingle", async function () {
  //   console.log(indent2+"Test 2 ~ swapExactOutputMulti...");

  //   const wethAmountInMax = 10n ** 18n;
  //   const diaAmountOut = 100n * 10n ** 18n;
  //   let diaBeforeBalance = await dai.balanceOf(accounts[0].address);

  //   // Deposit WETH
  //   await weth.connect(accounts[0]).deposit({ value: wethAmountInMax });
  //   await weth.connect(accounts[0]).approve(swapExamples.address, wethAmountInMax);

  //   // Swap
  //   await swapExamples.swapExactOutputSingle(diaAmountOut, wethAmountInMax);

  //   const diaAfterBalance = await dai.balanceOf(accounts[0].address);

  //   console.log(indent3+"Resp  2 ~ DAI Before  balance", diaBeforeBalance);
  //   console.log(indent3+"Resp  2 ~ DAI After   balance", diaAfterBalance);
  //   console.log(indent3+"Resp  2 ~ DAI Current balance", diaAfterBalance - diaBeforeBalance);
  // });

  // // Test # 3 - swapExactInputMultiHop
  // it("swapExactInputMultihop", async function () {
  //   console.log(indent2+"Test 3 ~ swapExactInputMultiHop...");

  //   const amountIn = 10n ** 18n;

  //   // Deposit WETH
  //   await weth.connect(accounts[0]).deposit({ value: amountIn });
  //   await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

  //   // Swap
  //   await swapExamples.swapExactInputMultihop(amountIn);

  //   console.log(indent3+"Resp  3 ~ DAI balance", await dai.balanceOf(accounts[0].address));
  // });

  // // Test # 4 - swapExactInputMultiHop
  // it("swapExactInputMultihop4", async function () {
  //   console.log(indent2+"Test 4 ~ swapExactInputMultiHop...");

  //   const amountIn = 10n ** 18n;

  //   // Deposit WETH
  //   await weth.connect(accounts[0]).deposit({ value: amountIn });
  //   await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

  //   // Swap
  //   await swapExamples.swapExactInputMultihop(amountIn);

  //   console.log(indent3+"Resp  4 ~ DAI balance", await dai.balanceOf(accounts[0].address));
  // });

  // // Test # 5 - swapExactInputMultiHop
  // it("swapExactInputMultihop5", async function () {
  //   console.log(indent2+"Test 5 ~ swapExactInputMultiHop...");

  //   const amountIn = 10n ** 18n;

  //   // Deposit WETH
  //   await weth.connect(accounts[0]).deposit({ value: amountIn });
  //   await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

  //   // Swap
  //   await swapExamples.swapExactInputMultihop(amountIn);

  //   console.log(indent3+"Resp  5 ~ DAI balance", await dai.balanceOf(accounts[0].address));
  // });

  // Test # 6 - swapExactInputMultiHop
  it("swapExactInputMultihop6", async function () {
    console.log(indent2+"Test 6 ~ swapExactInputMultiHop...");

    const amountIn = 10n ** 18n;

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn });
    await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

    // Swap
    await swapExamples.swapExactInputMultihop(amountIn);

    console.log(indent3+"Resp  6 ~ DAI balance", await dai.balanceOf(accounts[0].address));
  });

  // Test # 7 - swapExactInputMultiHop
  it("swapExactInputMultihop7", async () => {
    console.log(indent2+"Test 7 ~ swapExactInputMultiHop...");
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(swapExamples.address, amountIn)

    // Swap
    await swapExamples.swapExactInputMultihop(amountIn)

    console.log(indent3+"Resp  7 ~ DAI balance", await dai.balanceOf(accounts[0].address))
  })

  // Test # 8 - swapExactInputMultiHop
  it("swapExactOutputMultihop", async () => {
    console.log(indent2+"Test 8 ~ swapExactOutputMultihop...");
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: wethAmountInMax })
    await weth.approve(swapExamples.address, wethAmountInMax)

    // Swap
    await swapExamples.swapExactOutputMultihop(daiAmountOut, wethAmountInMax)

    console.log(indent3+"Resp  8 ~ DAI balance", await dai.balanceOf(accounts[0].address))
  })

});
