require("dotenv").config();
let DEBUG_MODE = false;

const { ethers } = require('ethers')
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { UniTokenServices } = require('./uniTokenServices')

const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const WALLET_SECRET = process.env.WALLET_SECRET
const ERC20ABI = require('./abi.json')

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const WETH_ADDRESS = process.env.GOERLI_WETH
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN
const UNI_ADDRESS = process.env.GOERLI_UNI

let ARS = DEBUG_MODE ? new AlphaRouterServiceDebug() : new AlphaRouterService();
let UTS = new UniTokenServices(ethers, CHAIN_ID, provider)

getPriceQuoteTest = async(_fromToken, _toToken, _tokenAmount, _slippagePercent) => {
    let uniContractIn  = UTS.getERC20Contract(_fromToken);
    let uniContractOut = UTS.getERC20Contract(_toToken);
    let uniTokenIn     = await UTS.getUniTokenByContract(uniContractIn, _fromToken)
    let uniTokenOut    = await UTS.getUniTokenByContract(uniContractOut, _toToken)
    let inputAmount    = UTS.tokenToCurrencyInWei(_tokenAmount, uniTokenIn)

    let recipient = WALLET_ADDRESS
    let decimals = await uniContractIn.decimals();

    let priceQuote = await ARS.getStrPriceQuote(uniTokenIn, uniTokenOut, inputAmount, _slippagePercent, decimals)
    console.log("uniTokenIn:", await uniContractIn.name(), "(", uniTokenIn.address, ")");
    console.log("priceQuote:", await uniContractOut.name(), "(", priceQuote, ")");

    // console.log("_toToken:", _toToken);
    // console.log("ERC20ABI:", ERC20ABI);
    // console.log("provider:", provider);
    console.log("FOR WALLET:", WALLET_ADDRESS);

    const WETH_CONTRACT = new ethers.Contract(_toToken, ERC20ABI, provider)
    console.log("WETH_CONTRACT.balanceOf", (await WETH_CONTRACT.balanceOf(WALLET_ADDRESS)).toString());

    const SPCOIN_CONTRACT = new ethers.Contract(_fromToken, ERC20ABI, provider)
    console.log("SPCOIN_CONTRACT.balanceOf", (await SPCOIN_CONTRACT.balanceOf(WALLET_ADDRESS)).toString());
}

main = async() => {
    let slippagePercent = 25;
    let tokenAmountInWei = 1000000;
    getPriceQuoteTest(SPCOIN_ADDRESS, WETH_ADDRESS, tokenAmountInWei, slippagePercent);
}

main()
