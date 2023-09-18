require("dotenv").config();

console.log("swapExactInputMultihop:");

const WETH_ABI = require('../contracts/interfaces/WETH_ABI.json')
const ERC20 = require('../contracts/interfaces/ERC20_ABI.json')

const DAI = process.env.GOERLI_DAI;
const WETH = process.env.GOERLI_WETH;
const USDC = process.env.GOERLI_USDC;

describe("SwapExactInputMultihop: swapInputMultiplePools swaps a fixed amount of WETH for a maximum possible amount of DAI"
, function () {

  let swapExamples
  let accounts
  let weth
  let dai
  let usdc
  const indent  = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  let testNum = 0;


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

  // Test - swapExactInputMultiHop
  it("swapExactInputMultihop", async () => {
    
    /* ALTERNATE METHOD for weth contract assignment
      weth = await ethers.getContractAt("IWETH", WETH9);
      dai = await ethers.getContractAt("IERC20", DAI);
      usdc = await ethers.getContractAt("IERC20", USDC);
    */
    weth = await ethers.getContractAt(WETH_ABI, WETH);
    dai = await ethers.getContractAt(ERC20, DAI);
    usdc = await ethers.getContractAt(ERC20, USDC);
  
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