require("dotenv").config();
const { abi: QuoterAbi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json')
const { abi: Quoter2Abi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter2.sol/Quoter2.json')
const { ethers } = require('ethers')

// ----- Addresses -----
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
const QUOTER2_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'

INFURA_URL="https://goerli.infura.io/v3/a379b9641c8640d2ac8206b8adcfa060"
provider = ethers.providers.jsonRpcProvider(INFURA_URL);

const tokenIn  = WETH_ADDRESS;
const tokenOut = USDC_ADDRESS;
const fee = '3000';
const amountIn = hre.ethers.utils.parseEther('1');
const sqrtPriceLimitX96 = '0';

const { getSpCoinExchange } = require("./deployHHConnection");

const quoter = {
    QUOTER_ADDRESS,
    QuoterAbi,
    provider
}

const quoter2 = {
    QUOTER2_ADDRESS,
    Quoter2Abi,
    provider            
}

const main = async() => {
    const amountOut = await quoter.callStatic.quoteExactInputSingle(
        tokenIn,
        tokenOut,
        fee,
        amountIn,
        sqrtPriceLimitX96
    )

    console.log(
        "amountOut",
        ethers.util.formatUnits(amountOut,toString(), 6)
    )

    console.log("==============================================================")

    const params = {
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        fee: fee,
        amountIn: amountIn,
        sqrtPriceLimitX96: sqrtPriceLimitX96
    }

    const output = await quoter2.callStatic.quoteExactInputSingle(
        params
    )

    console.log(
        "amountOut",
        ethers.util.formatUnits(output.amountOut, toString(), 6)
    )

    console.log( "sqrtPriceLimitX96", output.sqrtPriceLimitX96.toString());
    console.log( "initializedTicksCrossed", output.initializedTicksCrossed.toString);
    console.log( "gasEstimated", output.gasEstimated.toString());

    console,log("==============================================================");
}

main()
