require("dotenv").config();
let DEBUG_MODE = false;

const { ethers } = require('ethers')
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { UniTokenServices } = require('./uniTokenServices')
const { TradeType } = require('@uniswap/sdk-core')

const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const WETH_ADDRESS = process.env.GOERLI_WETH
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN
const UNI_ADDRESS = process.env.GOERLI_UNI

let ARS = DEBUG_MODE ? new AlphaRouterServiceDebug(ethers, CHAIN_ID, provider) : new AlphaRouterService();
let UTS = new UniTokenServices(ethers, CHAIN_ID, provider)

getStrPriceQuote = async( _tradeType, _tokenInAddr, _tokenAddrOut, _tokenAmount, _slippagePercent, decimals) => {
    let strPriceQuote = await ARS.getStrPriceQuote( _tradeType, _tokenInAddr, _tokenAddrOut, _tokenAmount, _slippagePercent, decimals)

    // console.log("getStrPriceQuote.TradeType = ", _tradeType)
    let uniContractFrom = UTS.getERC20Contract(_tokenInAddr)
    let uniContractTo   =  UTS.getERC20Contract(_tokenAddrOut)
    // let uniTokenIn      = await UTS.getUniTokenByContract(uniContractFrom, _tokenInAddr)
    // let uniTokenOut     = await UTS.getUniTokenByContract(uniContractTo, _tokenAddrOut)

    let uniTokenIn  = await UTS.wrapAddrToUniToken(_tokenInAddr)
    // let uniTokenOut = await UTS.wrapAddrToUniToken(_tokenAddrOut)

    console.log("uniTokenIn:", await uniContractFrom.name(), "(", uniTokenIn.address, ")");
    console.log("strPriceQuote:", await uniContractTo.name(), "(", strPriceQuote, ")");
    // console.log("uniContractFrom.balanceOf", (await uniContractFrom.balanceOf(WALLET_ADDRESS)).toString());
    // console.log("uniContractTo.balanceOf", (await uniContractTo.balanceOf(WALLET_ADDRESS)).toString());
    return strPriceQuote;
}

getExactInputStrQuoteTest = async( ) => {
    console.log("*** EXECUTING getExactInputStrQuoteTest() ******************************");
    let tradeType = TradeType.EXACT_INPUT 
    let tokenInAddr = SPCOIN_ADDRESS;
    let tokenOutAddr = UNI_ADDRESS;
    let slippagePercent = 25;
    let tokenAmountInWei = 100;
    let printDecimals = 12
    strPriceQuote = await getStrPriceQuote(tradeType, tokenInAddr, tokenOutAddr, tokenAmountInWei, slippagePercent, printDecimals);
}

getExactOutputStrQuoteTest = async( ) => {
    console.log("*** EXECUTING getExactOutputStrQuoteTest() ******************************");
    let tradeType = TradeType.EXACT_OUTPUT 
    let tokenInAddr = SPCOIN_ADDRESS;
    let tokenOutAddr = UNI_ADDRESS;
    let slippagePercent = 25;
    let tokenAmountInWei = 100;
    let printDecimals = 12
    strPriceQuote = await getStrPriceQuote(tradeType, tokenInAddr, tokenOutAddr, tokenAmountInWei, slippagePercent, printDecimals);
}

getExactInputRouteQuoteTest = async( ) => {
    let tradeType = TradeType.EXACT_INPUT;
    let tokenInAddr = SPCOIN_ADDRESS;
    let tokenOutAddr = UNI_ADDRESS;
    let tokenAmountInWei = 100;
    let slippagePercent = 25;
    let route = await ARS.getRoute( tradeType, WALLET_ADDRESS, tokenInAddr, tokenOutAddr, tokenAmountInWei, slippagePercent)
    let quote = route.quote
    console.log("getExactInputRouteQuoteTest SPCOIN to WETH:", quote.toFixed(10))
}

getExactOutputRouteQuoteTest = async( ) => {
    let tradeType = TradeType.EXACT_OUTPUT;
    let tokenInAddr = SPCOIN_ADDRESS;
    let tokenOutAddr = UNI_ADDRESS;
    let tokenAmountInWei = 100;
    let slippagePercent = 25;
    let route = await ARS.getRoute( tradeType, WALLET_ADDRESS, tokenInAddr, tokenOutAddr, tokenAmountInWei, slippagePercent)
    let quote = route.quote
    console.log("getExactOutputRouteQuoteTest SPCOIN to WETH:", quote.toFixed(10))
}

exeExactInputTransactionTest = async( ) => {
    // const wei = ethers.utils.parseUnits(inputTokenAmount, 18)
    // const inputTokenAmountInWei = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

    let tokenInAddr      = WETH_ADDRESS
    let tokenOutAddr     = SPCOIN_ADDRESS
    let approvalAmount = ethers.utils.parseUnits('1', 18).toString()
    let inputTokenAmount = '0.01'
    let slippagePercent = 25;
    let gasLimit        = 1000000
    
    tradeTransaction = await ARS.exeExactInputTransaction(
      WALLET_ADDRESS,
      WALLET_SECRET,
      tokenInAddr,
      tokenOutAddr,
      approvalAmount,
      inputTokenAmount,
      slippagePercent,
      gasLimit
    );
    return tradeTransaction;
}

exeExactOutputTransactionTest = async( ) => {
    // const wei = ethers.utils.parseUnits(inputTokenAmount, 18)
    // const inputTokenAmountInWei = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

    let tokenInAddr      = WETH_ADDRESS
    let tokenOutAddr     = SPCOIN_ADDRESS
    let approvalAmount = ethers.utils.parseUnits('1', 18).toString()
    let inputTokenAmount = '0.01'
    let slippagePercent = 25;
    let gasLimit        = 1000000
    
    tradeTransaction = await ARS.exeExactOutputTransaction(
      WALLET_ADDRESS,
      WALLET_SECRET,
      tokenInAddr,
      tokenOutAddr,
      approvalAmount,
      inputTokenAmount,
      slippagePercent,
      gasLimit
    );
    return tradeTransaction;
}

main = async( ) => {
    // console.log("*** EXECUTING getExactInputStrQuoteTest() ******************************");
    // await getExactInputStrQuoteTest();
    // console.log("*** EXECUTING getExactOutputStrQuoteTest() ******************************");
    // await getExactOutputStrQuoteTest();
    // console.log("*** EXECUTING getExactInputRouteQuoteTest() *****************************");
    // await getExactInputRouteQuoteTest();
    // console.log("*** EXECUTING getExactOutputRouteQuoteTest() *****************************");
    // await getExactOutputRouteQuoteTest();
    console.log("*** EXECUTING exeTransactionTest() ********************************");
    await exeExactInputTransactionTest();
}

main()
