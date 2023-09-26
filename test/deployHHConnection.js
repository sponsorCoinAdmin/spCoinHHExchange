
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
        return this.accounts;
      }

      async deploySpCoinExchange() {
        const spCoinExchangeContract = await this.deploy("SpCoinExchange");
        return spCoinExchangeContract;
      }

      async deploy(contractName) {
        this.contractName = contractName;
        console.log("DEPLOYING", contractName);
        const contractFactory = await ethers.getContractFactory(contractName);
        const spCoinExchangeContract = await contractFactory.deploy();
        await spCoinExchangeContract.deployed();
        return spCoinExchangeContract;
        }
    }

    module.exports = {
      DeployHHConnection
    };