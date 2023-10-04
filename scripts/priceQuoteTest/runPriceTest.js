require("dotenv").config();
 

const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI  = require('jsbi') // jsbi@3.2.5
const { } = require('./AlphaRouter')

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const INFURA_TEST_URL = process.env.GOERLI_INFURA_TEST_URL

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_URL) // Ropsten

const chainId = 5
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider})

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

const wei = ethers.utils.parseUnits('0.01', 18)
const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

getPriceQuote()
