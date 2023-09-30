const { spCoinLogger } = require("../lib/logger/spCoinLogger");

const { SpCoinExchangeDebug, SpCoinExchange } = require("../lib/debug/spCoinExchangeDebug");

async function getSpCoinExchange(debugMode) {
  const connection = new DeployHHConnection();
  let spCoinExchangeContract = await connection.deploySpCoinExchange();
  let signer = await connection.getSigner(0);

  spCoinExchange = new SpCoinExchange(signer, spCoinExchangeContract);
  if (debugMode) {
    console.log("*** LOGGING MODE ON ***")
    spCoinExchange = new SpCoinExchangeDebug(spCoinExchange);
  }
  return spCoinExchange;
}

class DeployHHConnection {
  constructor() {
    this.contract;
    this.accounts;
    this.contractName;
  }

  async getSigner( idx ) {
    this.accounts = await this.getSigners();
    return this.accounts[idx];
  }

  async getSigners() {
    this.accounts = await ethers.getSigners();
    // console.log("this.accounts =", this.accounts)
    return this.accounts;
  }

  async deploySpCoinExchange() {
    const spCoinExchangeContract = await this.deploy("SpCoinExchange");
    return spCoinExchangeContract;
  }

  async deploy(contractName) {
    this.contractName = contractName;
    consoleLog("DEPLOYING", contractName);
    const contractFactory = await ethers.getContractFactory(contractName);
    const spCoinExchangeContract = await contractFactory.deploy();
    await spCoinExchangeContract.deployed();
    return spCoinExchangeContract;
    }
}

module.exports = {
  DeployHHConnection,
  getSpCoinExchange
};