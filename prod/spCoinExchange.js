const { SwapExactInputSingle } = require("./swapExactInputSingle");
const { SwapExactOutputSingle } = require("./swapExactOutputSingle");

const { SwapExactInputMultiHop } = require("./swapExactInputMultiHop");
const { SwapExactOutputMultiHop } = require("./swapExactOutputMultiHop");

const { spCoinLogger } = require("./lib/logger/spCoinLogger");
const { SpCoinExchangeMin } = require("./spCoinExchangeMin");

class SpCoinExchange {
  constructor() {
    this.swapEIS = new SwapExactInputSingle();
    this.swapEOS = new SwapExactOutputSingle();
    this.swapEIMH = new SwapExactInputMultiHop();
    this.swapEOMH = new SwapExactOutputMultiHop();
    this.spCoinExchangeMin = new SpCoinExchangeMin();
    this.contractName = "SpCoinExchange";
    this.accounts;
    this.signerAccount;
    this.spCoinExchangeContract;
    this.indent = "    ";
  }

  async deploy() {
    let contractName = this.contractName;
    this.accounts = await ethers.getSigners();
    this.signerAccount = this.accounts[0]
    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinExchangeContract = await contractFactory.deploy();
    await this.spCoinExchangeContract.deployed();

    this.swapEIS.init(this.spCoinExchangeContract, this.signerAccount);
    this.swapEOS.init(this.spCoinExchangeContract, this.signerAccount);
    this.swapEIMH.init(this.spCoinExchangeContract, this.signerAccount);
    this.swapEOMH.init(this.spCoinExchangeContract, this.signerAccount);
    
    this.spCoinExchangeMin.init(this.spCoinExchangeContract);
    return this.spCoinExchangeContract;
  }

  // Deposit a specified account of ETH to WETH
  async depositEthToWeth(tokenInContract, _ethAmount) {
    await this.spCoinExchangeMin.depositEthToWeth(this.signerAccount, tokenInContract, _ethAmount);
  }

  // Approve a specified account to spend a specified token of a specific amount token. As follows:
  // Approve msg.sender (account[0]) to allow spCoinExchangeContract to spend _amount in _token(s).
  async approve(_tokenContract, _amount) {
    await this.spCoinExchangeMin.approve(this.signerAccount, _tokenContract, _amount);
  }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactInputSingle (
    _tokenInContract,
    _tokenOutContract,  
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96) {
      await this.swapEIS.swapExactInputSingle (
        _tokenInContract,
        _tokenOutContract,    
        _tokenInAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
        _sqrtPriceLimitX96);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputSingle (
      _tokenInContract,
      _tokenOutContract,  
      _tokenInAddress,
      _tokenOutAddress,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96) {
        await this.swapEOS.swapExactOutputSingle(
          _tokenInContract,
          _tokenOutContract,  
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountInMax,
          _amountOutMin,
          _sqrtPriceLimitX96);
        }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactInputMultiHop(
      _tokenInContract,
      _tokenIntermediaryContract,  
      _tokenOutContract,  
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountIn,
      _amountOutMin,
    ) {
      await this.swapEIMH.swapExactInputMultiHop(
        _tokenInContract,
        _tokenIntermediaryContract,  
        _tokenOutContract,  
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountIn,
        _amountOutMin,
      );
    }
  
/////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputMultiHop(
      _tokenInContract,
      _tokenIntermediaryContract,
      _tokenOutContract,
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountOut,
      _amountInMaximum,
    ) {
      await this.swapEOMH.swapExactOutputMultiHop(
        _tokenInContract,
        _tokenIntermediaryContract,
        _tokenOutContract,
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountOut,
        _amountInMaximum,
        );
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////

  }

module.exports = {
  SpCoinExchange
};
