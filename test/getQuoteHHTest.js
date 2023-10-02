const { abi: QuoterAbi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json')
const { abi: Quoter2Abi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json')
const { ethers } = require('ethers')

//----- Uniswap Addresses -----
const WETH_ADDRESS = process.env.GOERLI_WETH
const USDC_ADDRESS = process.env.GOERLI_USDC
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
const QUOTER2_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'

const INFURA_URL = process.env.GOERLI_INFURA_TEST_URL

const provider = new hre.ethers.providers.JsonRpcProvider(INFURA_URL)

const tokenIn  = WETH_ADDRESS
const tokenOut = USDC_ADDRESS
const fee = '3000'
const amountIn = hre.ethers.utils.parseEther("1");
