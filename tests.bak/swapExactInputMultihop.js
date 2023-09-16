//const { expect } = require("chai")
//const { ethers } = require("hardhat")

const DAI = "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60";
const WETH9 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const USDC = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C";

describe("SwapExactInputMultihop:", function () {

  let swapExamples
  let accounts
  let weth
  let dai
  let usdc
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  let testNum = 0;

  console.log("swapExactInputMultihop:");

  // Before Initialization
  before(async () => {
    console.log(indent + "before Initializing");

    accounts = await ethers.getSigners(1);

    await deployContract("SwapExamples");

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
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
});