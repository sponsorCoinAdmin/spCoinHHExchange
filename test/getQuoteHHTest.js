const { abi: QuoterAbi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json')
const { abi: QuoterV2Abi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json')

//----- Uniswap Addresses -----
const WETH_ADDRESS = process.env.GOERLI_WETH
const USDC_ADDRESS = process.env.GOERLI_USDC
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN
const QUOTER_ADDRESS = process.env.UNISWAP_QUOTER
const QUOTERV2_ADDRESS = process.env.UNISWAP_QUOTERV2
const provider = hre.ethers.provider
const tokenIn  = WETH_ADDRESS;
const tokenOut = USDC_ADDRESS;
const fee = '3000';
const amountIn = hre.ethers.utils.parseEther('.001');
const sqrtPriceLimitX96 = '0';

const { getSpCoinExchange } = require("./deployHHConnection");

describe("GetQuoteTest: Calls Uniswap Quoter Contract to get pool price quote"
, function () {
    console.log("====================================")
    let spCoinExchange;

    // Before Initialization
    before(async () => {
      let debugMode = true;
      spCoinExchange = await getSpCoinExchange(debugMode);
      setConsoleDebugLoggingOff();
     })

    // Test - swapExactInputSingleTest
    it("Get Quoter Price for WETH -> USDC pool", async function () {

        console.log("const quoter = {");
        console.log("   QUOTER_ADDRESS:", QUOTER_ADDRESS);
        // console.log("   QuoterAbi:     ", QuoterAbi);
        console.log("   provider:      ", JSON.stringify(provider, null, 2));
        console.log(")");

        const quoter = {
            QUOTER_ADDRESS,
            QuoterAbi,
            provider
        }

        console.log("const amountOut = await quoter.callStatic.quoteExactInputSingle(");
        console.log("   tokenIn:          ", tokenIn);
        console.log("   tokenOut:         ", tokenOut);
        console.log("   fee:              ", fee);
        console.log("   amountIn:         ", amountIn);
        console.log("   sqrtPriceLimitX96:", sqrtPriceLimitX96);
        console.log(")");

        const amountOut = await quoter.callStatic.quoteExactInputSingle(
            tokenIn,
            tokenOut,
            fee,
            amountIn,
            sqrtPriceLimitX96
        )

        console.log(
            "amountOut",
            hre.ethers.util.formatUnits(amountOut,toString(), 6)
        )

        console,log("==============================================================")
    })

    it("Get QuoterV2 Price for WETH -> USDC pool", async function () {

        console.log("const quoter = {");
        console.log("   QUOTER_ADDRESS:", QUOTER_ADDRESS);
        // console.log("   QuoterV2Abi:   ", QuoterV2Abi,null,2);
        console.log("   provider:      ", JSON.stringify(provider, null, 2));
        console.log(")");

        const quoterV2 = {
            QUOTERV2_ADDRESS,
            QuoterV2Abi,
            provider            
        }

        const params = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            amountIn: amountIn,
            sqrtPriceLimitX96: sqrtPriceLimitX96
        }

        const output = await quoterV2.callStatic.quoteExactInputSingle(
            params
        )

        console.log(
            "amountOut",
            hre.ethers.util.formatUnits(output.amountOut, toString(), 6)
        )

        console.log( "sqrtPriceLimitX96", output.sqrtPriceLimitX96.toString());
        console.log( "initializedTicksCrossed", output.initializedTicksCrossed.toString);
        console.log( "gasEstimated", output.gasEstimated.toString());


        console,log("==============================================================")

    })
})