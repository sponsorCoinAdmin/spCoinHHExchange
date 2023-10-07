require("dotenv").config();
let DEBUG_MODE = false;

const { ethers } = require('ethers')
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { UniTokenServices } = require('./uniTokenServices')

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

getStrPriceQuote = async(_tokenAddrIn, _tokenAddrOut, _tokenAmount, _slippagePercent, decimals) => {
    let strPriceQuote = await ARS.getStrPriceQuote(_tokenAddrIn, _tokenAddrOut, _tokenAmount, _slippagePercent, decimals)

    let uniContractFrom = UTS.getERC20Contract(_tokenAddrIn)
    let uniContractTo   =  UTS.getERC20Contract(_tokenAddrOut)
    let uniTokenIn      = await UTS.getUniTokenByContract(uniContractFrom, _tokenAddrIn)
    let uniTokenOut     = await UTS.getUniTokenByContract(uniContractTo, _tokenAddrOut)

    console.log("uniTokenIn:", await uniContractFrom.name(), "(", uniTokenIn.address, ")");
    console.log("strPriceQuote:", await uniContractTo.name(), "(", strPriceQuote, ")");
    console.log("uniContractFrom.balanceOf", (await uniContractFrom.balanceOf(WALLET_ADDRESS)).toString());
    console.log("uniContractTo.balanceOf", (await uniContractTo.balanceOf(WALLET_ADDRESS)).toString());
    return strPriceQuote;
}

getStrPriceQuoteTest1 = async( ) => {
    let slippagePercent = 25;
    let tokenAmountInWei = 100;
    strPriceQuote = await getStrPriceQuote(SPCOIN_ADDRESS, WETH_ADDRESS, tokenAmountInWei, slippagePercent,12);
}

getRouteTest = async( ) => {
    let slippagePercent = 25;
    let tokenAmountInWei = 100000000000;
    let route = await ARS.getUnwrappedTokenRoute(WALLET_ADDRESS, SPCOIN_ADDRESS, WETH_ADDRESS, tokenAmountInWei, slippagePercent)
    return route
}

getRoutePriceQuoteTest = async( ) => {
    let route = await getRouteTest()
    let quote = route.quote
    console.log("getRoutePriceQuoteTest SPCOIN to WETH:", quote.toFixed(10))
}

exeTransactionTest = async( ) => {
    let tokenAddrIn  = WETH_ADDRESS 
    let tokenAddrOut = SPCOIN_ADDRESS

    let _slippagePercent = 25;
    let _tokenAmountInWei = 100000000000;

    /////////// END PARAMS HARDCODING

    let uniContractFrom = UTS.getERC20Contract(tokenAddrIn)
    let uniContractTo   =  UTS.getERC20Contract(tokenAddrOut)

    let walletAddress   = WALLET_ADDRESS;
    let walletPvtKey    = WALLET_SECRET;
    let uniTokenIn      = await UTS.getUniTokenByContract(uniContractFrom, tokenAddrIn)
    let uniTokenOut     = await UTS.getUniTokenByContract(uniContractTo, tokenAddrOut)
    let inputAmount     = UTS.tokenToCurrencyInWei(_tokenAmountInWei, uniTokenIn)
    let slippagePercent = _slippagePercent
    let gasLimit        = 100000000


    const tradeTransaction = await ARS.exeTransactionORIG(
        walletAddress,
        walletPvtKey,
        uniTokenIn,
        uniTokenOut,
        inputAmount,
        slippagePercent,
        gasLimit)
    return tradeTransaction;
}

main = async( ) => {
    // console.log("*** EXECUTING getStrPriceQuoteTest1() ******************************");
    // await getStrPriceQuoteTest1();
    // console.log("*** EXECUTING getRouteTest() ***************************************");
    // await getRouteTest();
    // console.log("*** EXECUTING getRoutePriceQuoteTest() *****************************");
    // await getRoutePriceQuoteTest();
    console.log("*** EXECUTING exeTransactionTest() ********************************");
    await exeTransactionTest();
}

main()
