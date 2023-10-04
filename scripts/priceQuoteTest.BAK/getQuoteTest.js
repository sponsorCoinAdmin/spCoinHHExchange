require("dotenv").config();
const { } = require('./AlphaRouterService')
const { ethers } = require('ethers')

// ----- Addresses -----
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;
const SPCOIN_ADDRESS = process.env.GOERLI_SPCOIN;
const CHAIN_ID = parseInt(process.env.GORELI_CHAIN_ID);
console.log("CHAIN_ID =", CHAIN_ID);

const wei = ethers.utils.parseUnits('0.01', 18)

console.log("WEI", wei);

const slippagePercent = 25;
const deadline = Math.floor(Date.now()/1000 + 1800);

const AMOUNT_IN = '0.01';
const fee = '3000';
const amountIn = ethers.utils.parseEther('1');
const sqrtPriceLimitX96 = '0';

const main = async() => {
    console.log("===================================================================");
    price = await getPrice(AMOUNT_IN, slippagePercent, deadline, WALLET_ADDRESS)
}

main()
