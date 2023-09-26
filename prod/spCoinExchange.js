const { SpCoinExchangeMin } = require("./spCoinExchangeMin");
const { SwapExactInputSingle } = require("./swapExactInputSingleDebug");
const { SwapExactOutputSingle } = require("./swapExactOutputSingleDebug");
const { SwapExactInputMultiHop } = require("./swapExactInputMultiHopDebug");
const { SwapExactOutputMultiHop } = require("./swapExactOutputMultiHopDebug");

const { spCoinLogger } = require("./lib/logger/spCoinLogger");

class SpCoinExchange {
  constructor() {
    this.sCoinExchangeMin = new SpCoinExchangeMin();
    // this.swapEIS = new SwapExactInputSingle();
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

  async init(spCoinExchangeContract, signerAccount, swapExactInputSingle) {
    let contractName = this.contractName;

    const contractFactory = await ethers.getContractFactory(contractName);
    this.spCoinExchangeContract = await contractFactory.deploy();
    await this.spCoinExchangeContract.deployed();

    // this.spCoinExchangeContract = spCoinExchangeContract;
    this.signerAccount = signerAccount;
    this.swapEIS = swapExactInputSingle;

    this.swapEIS.init(this.spCoinExchangeContract, this.signerAccount);
    this.spCoinExchangeMin.init(this.spCoinExchangeContract);
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
    _tokenInAddress,
    _tokenOutAddress,
    _poolFee,
    _amountIn,
    _amountOutMin,
    _sqrtPriceLimitX96,
    _tokenInContract,
    _tokenOutContract) {

      console.log("arguments.length", arguments.length);
      if ( arguments.length === 8 )
      {
        await this.swapEIS.swapExactInputSingle (
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _sqrtPriceLimitX96,
          _tokenInContract,
          _tokenOutContract
        )
      }
      else{
        this.sCoinExchangeMin.swapExactInputSingle (
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _sqrtPriceLimitX96
        )
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputSingle (
      _tokenInAddress,
      _tokenOutAddress,
      _poolFee,
      _amountInMax,
      _amountOutMin,
      _sqrtPriceLimitX96,
      _tokenInContract,
      _tokenOutContract  
    ) {
      if ( arguments.length === 8 )
      {
        await this.swapEOS.swapExactOutputSingle(
          _tokenInAddress,
          _tokenOutAddress,
          _poolFee,
          _amountInMax,
          _amountOutMin,
          _sqrtPriceLimitX96,
          _tokenInContract,
          _tokenOutContract
        );
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactInputMultiHop(
      _tokenInAddress,
      _tokenIntermediaryAddress,
      _tokenOutAddress,
      _poolFee,
      _amountIn,
      _amountOutMin,
      _tokenInContract,
      _tokenIntermediaryContract,  
      _tokenOutContract
    ) {
      if ( arguments.length === 9 )
      {
        await this.swapEIMH.swapExactInputMultiHop(
          _tokenInAddress,
          _tokenIntermediaryAddress,
          _tokenOutAddress,
          _poolFee,
          _amountIn,
          _amountOutMin,
          _tokenInContract,
          _tokenIntermediaryContract,  
          _tokenOutContract
        );
      }
    }
  
/////////////////////////////////////////////////////////////////////////////////////////////////
    async swapExactOutputMultiHop(
        _tokenInAddress,
        _tokenIntermediaryAddress,
        _tokenOutAddress,
        _poolFee,
        _amountOut,
        _amountInMaximum,
        _tokenInContract,
        _tokenIntermediaryContract,
        _tokenOutContract
    ) {
      if ( arguments.length === 9 )
      {
        await this.swapEOMH.swapExactOutputMultiHop(
          _tokenInAddress,
          _tokenIntermediaryAddress,
          _tokenOutAddress,
          _poolFee,
          _amountOut,
          _amountInMaximum,
          _tokenInContract,
          _tokenIntermediaryContract,
          _tokenOutContract
        );
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
  }

module.exports = {
  SpCoinExchange
};
