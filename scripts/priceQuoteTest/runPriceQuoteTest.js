require("dotenv").config();

let DEBUG_MODE = false;
 
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers } = require('ethers')
const JSBI  = require('jsbi') // jsbi@3.2.5
const { AlphaRouterServiceDebug } = require('./AlphaRouterServiceDebug')
const { AlphaRouterService } = require('./AlphaRouterService');
const { lstat } = require("fs");

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)
const WALLET_SECRET = process.env.WALLET_SECRET
const ERC20ABI = require('./abi.json')


const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const chainId = parseInt(CHAIN_ID)

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const WETH_ADDRESS = process.env.GOERLI_WETH

const name1 = 'Uniswap Token'
const symbol1 = 'UNI'
const decimals1 = 18
const UNI_ADDRESS = process.env.GOERLI_UNI

const WETH = new Token(chainId, WETH_ADDRESS, decimals0, symbol0, name0)
const UNI = new Token(chainId, UNI_ADDRESS, decimals1, symbol1, name1)

let wei = ethers.utils.parseUnits('0.01', 18)
let inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

let ars = DEBUG_MODE ? new AlphaRouterServiceDebug() : new AlphaRouterService();

main = async() => {
    let tokenIn = WETH;
    let tokenOut = UNI;
    let recipient = WALLET_ADDRESS
    let slippagePercent = 25;
    let decimals = 16;

    let priceQuote = await ars.getStrPriceQuote(recipient, tokenIn, tokenOut, inputAmount, slippagePercent, decimals)
    console.log("priceQuote:", priceQuote);

    console.log("WETH_ADDRESS:", WETH_ADDRESS);
    console.log("ERC20ABI:", ERC20ABI);
    console.log("provider:", provider);

    const WETH_CONTRACT = new ethers.Contract(WETH_ADDRESS, ERC20ABI, provider)
    console.log("WETH_CONTRACT.balanceOf", (await WETH_CONTRACT.balanceOf(WALLET_ADDRESS)).toString());

    const UNI_CONTRACT = new ethers.Contract(UNI_ADDRESS, ERC20ABI, provider)
    console.log("UNI_CONTRACT.balanceOf", (await UNI_CONTRACT.balanceOf(WALLET_ADDRESS)).toString());

}

main()