require("dotenv").config();
let DEBUG_MODE = true;

const { ethers } = require('ethers')
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { UniTokenServices } = require('./uniTokenServices')

const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const WALLET_SECRET = process.env.WALLET_SECRET

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const WETH_ADDRESS = process.env.GOERLI_WETH
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN
const UNI_ADDRESS = process.env.GOERLI_UNI

let ARS = DEBUG_MODE ? new AlphaRouterServiceDebug() : new AlphaRouterService();
let UTS = new UniTokenServices(ethers, CHAIN_ID, provider)

getStrPriceQuote = async(_fromTokenAddr, _toTokenAddr, _tokenAmount, _slippagePercent, decimals) => {
    let strPriceQuote = await ARS.getStrPriceQuote(_fromTokenAddr, _toTokenAddr, _tokenAmount, _slippagePercent, decimals)
    await UTS.dumpTokenDetailsByAddress(_fromTokenAddr);
    await UTS.dumpTokenDetailsByAddress(_toTokenAddr);

    let uniContractFrom = ( typeof _fromTokenAddr === "string" ) ? UTS.getERC20Contract(_fromTokenAddr) : _fromTokenAddr
    let uniContractTo   = ( typeof _toTokenAddr === "string" ) ? UTS.getERC20Contract(_toTokenAddr) : _toTokenAddr
    let uniTokenIn      = await UTS.getUniTokenByContract(uniContractFrom, _fromTokenAddr)
    let uniTokenOut     = await UTS.getUniTokenByContract(uniContractTo, _toTokenAddr)

    console.log("uniTokenIn:", await uniContractFrom.name(), "(", uniTokenIn.address, ")");
    console.log("strPriceQuote:", await uniContractTo.name(), "(", strPriceQuote, ")");
    console.log("uniContractFrom.balanceOf", (await uniContractFrom.balanceOf(WALLET_ADDRESS)).toString());
    console.log("uniContractTo.balanceOf", (await uniContractTo.balanceOf(WALLET_ADDRESS)).toString());
    return strPriceQuote;
}

main = async() => {
    let slippagePercent = 25;
    let tokenAmountInWei = 1000000;
    strPriceQuote = ARS.getStrPriceQuote(SPCOIN_ADDRESS, WETH_ADDRESS, tokenAmountInWei, slippagePercent,12);
}

main()
