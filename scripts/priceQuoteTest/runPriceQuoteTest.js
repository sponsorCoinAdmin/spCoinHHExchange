require("dotenv").config();
 
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers } = require('ethers')
const JSBI  = require('jsbi') // jsbi@3.2.5
const { } = require('./AlphaRouterService')


require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID)

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const chainId = parseInt(CHAIN_ID)

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = process.env.GOERLI_WETH

const name1 = 'Uniswap Token'
const symbol1 = 'UNI'
const decimals1 = 18
const address1 = process.env.GOERLI_UNI

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const UNI = new Token(chainId, address1, decimals1, symbol1, name1)

let wei = ethers.utils.parseUnits('0.01', 18)
let inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))




main = async() => {
    let tokenIn = WETH;
    let tokenOut = UNI;
    let recipient = WALLET_ADDRESS
    let slippagePercent = 25;
    let decimals = 16;

    let priceQuote = await getPriceQuote(recipient, tokenIn, tokenOut, inputAmount, slippagePercent, decimals)
    console.log("priceQuote:", priceQuote);

    decimals = 10
    priceQuote = await getPriceQuote(recipient, tokenIn, tokenOut, inputAmount, slippagePercent, decimals)
    console.log("priceQuote:", priceQuote);

    decimals = 7
    priceQuote = await getPriceQuote(recipient, tokenIn, tokenOut, inputAmount, slippagePercent, decimals)
    console.log("priceQuote:", priceQuote);

}

main()