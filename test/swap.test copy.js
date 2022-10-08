const { expect } = require("chai")
const { ethers } = require("hardhat")

const DAI = "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60";
const WETH9 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
//const USDC = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9CAA";

describe("SwapExamples", function () {
  console.log("SwapExamples Test");
  it("swapExactInputSingle", async function() {
    const accounts = await ethers.getSigners(1);

 //   console.log(accounts[0]);

    const weth = await ethers.getContractAt("IWETH", WETH9);
    const dai = await ethers.getContractAt("IERC20", DAI);

    const SwapExamples = await ethers.getContractFactory("SwapExamples");
    const swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();

    const amountIn = 10n ** 18n;

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn });
    await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);
  
    // Swap
    await swapExamples.swapExactInputSingle(amountIn);
  
    console.log("DAI balance", await dai.balanceOf(accounts[0].address));
  });
});
