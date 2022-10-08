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
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  let testNum = 0;

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

  // Test # 1 - swapExactInputSingle
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
  });

  // Test # 2 - swapExactOutputSingle
  it("swapExactOutputSingle", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactOutputMulti...");

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
  });

  // Test # 3 - swapExactInputMultiHop
  it("swapExactInputMultihop", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactInputMultiHop...");

    const amountIn = 10n ** 18n;

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn });
    await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

    // Swap
    await swapExamples.swapExactInputMultihop(amountIn);

    console.log(indent3 + "Resp " + testNum + " ~ DAI balance", await dai.balanceOf(accounts[0].address));
  });

  // Test # 4 - swapExactOutputMultihop
  it("swapExactOutputMultihop", async function () {
    let testId = ++testNum;
    console.log(indent2 + "Test " + testId + " ~ swapExactOutputMultihop...");

    const wethAmountInMax = 10n ** 18n;
    const diaAmountOut = 100n * 10n ** 18n;
    let diaBeforeBalance = await dai.balanceOf(accounts[0].address);

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax });
    await weth.connect(accounts[0]).approve(swapExamples.address, wethAmountInMax);

    // Swap
    await swapExamples.swapExactOutputMultihop(diaAmountOut, wethAmountInMax);

    const diaAfterBalance = await dai.balanceOf(accounts[0].address);

    console.log(indent3 + "Resp " + testNum + " ~ DAI Before  balance", diaBeforeBalance);
    console.log(indent3 + "Resp " + testNum + " ~ DAI After   balance", diaAfterBalance);
    console.log(indent3 + "Resp " + testNum + " ~ DAI Current balance", diaAfterBalance - diaBeforeBalance);
  });

  //  // Test # 5 - delayMins

  it("delayMins", async function () {
    console.log(indent3 + "Enter delayMins (Waits for completion of other async tests)");

    let delayCount = 1000;
    const milisecond = 1;
    const second = milisecond * 1000;
    const minute = second * 60;
    let delay = second * 10;

    // minuteDelay loop i seconds increments

    for (let i = 1; i <= delayCount; i++) {
      console.log("delay = " + i * delay/second + " Seconds");
      let msg = indent2 + "Test 7 ~ delayMins " + i;
      await sleep(delay);
    }

    console.log(indent3 + "delayMins " + delayCount + " Complete");
  });

  function sleep(milliseconds) {
    return new Promise(resolvePromise => setTimeout(resolvePromise, milliseconds));
  }
});
