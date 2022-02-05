const { expect } = require('chai');
const { ethers } = require('hardhat');
require('dotenv').config();

// var tokenInstance;
// var tokenSaleInstance;
// var admin = accounts[0];
// var buyer = accounts[1];
// var tokenPrice = 1000000000000000; // in wei
// var tokensAvailable = 750000;
// var numberOfTokens;
// const recipient = '0x6A8fb854C5CDA974626f5091d38Eb66213600FfB';
// const metadataURI = 'cid/test.png';

let tokenInstance;
let hardhatTokenInstance;
let owner;
let buyer;
let tokenPrice = process.env.VITE_ETHER_COST * 1e18; // in wei
let tokenMaxSupply = process.env.VITE_ETHER_MAX_SUPPLY;
let numberOfTokens;

describe('MyNFT', function () {
  /**
   * # Test 01
   * On initial contract deployment, total supply amount should
   * be the same as owner's balance. This means balanceOf() should
   * return the entire supply amount.
   *
   */
  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const [account0, account1] = await ethers.getSigners();
    const FCat = await ethers.getContractFactory(
      process.env.VITE_CONTRACT_NAME
    ); // token
    const fcat = await FCat.deploy(
      process.env.VITE_CONTRACT_NAME,
      process.env.VITE_CONTRACT_SYMBOL,
      `ipfs://${process.env.FC_TEST_CID}/`
    ); // hardhat token

    console.log('account0: ', account0.address);
    console.log('account1: ', account1.address);

    // initialize test variables
    tokenInstance = FCat;
    hardhatTokenInstance = fcat;
    owner = account0.address;
    buyer = account1.address;

    // deplyment greeting message
    console.log('Your address: ', buyer);
    console.log('Running Test 1, Deployment:');

    // ownerBalance at contract init deployment should equal totalSupply
    const ownerBalance = await fcat.balanceOf(owner);
    expect(await fcat.totalSupply()).to.equal(ownerBalance);
  });

  /**
   *
   */
  it('Mint and transfer an NFT to buyer', async function () {
    // buyer at contract init deplyment should have 0 token
    let balance = await hardhatTokenInstance.balanceOf(buyer);
    expect(balance).to.equal(0);

    const newlyMintedToken = await hardhatTokenInstance.mint(1, {
      value: ethers.utils.parseEther('0.01'),
    });
  });
  // TODO: add more tests
  // var tokenInstance;
  // var tokenSaleInstance;
  // var admin = accounts[0];
  // var buyer = accounts[1];
  // var tokenPrice = 1000000000000000; // in wei
  // var tokensAvailable = 750000;
  // var numberOfTokens;

  // it('initializes the contract with the correct values', function () {
  //   const FCat = await ethers.getContractFactory('FloatingCats');
  //   const fcat = await FCat.deploy();
  //   return fcat
  //     .deployed()
  //     .then(function (instance) {
  //       tokenSaleInstance = instance;
  //       return tokenSaleInstance.address;
  //     })
  //     .then(function (address) {
  //       assert.notEqual(address, 0x0, 'has contract address');
  //       return tokenSaleInstance.tokenContract();
  //     })
  //     .then(function (address) {
  //       assert.notEqual(address, 0x0, 'has token contract address');
  //       return tokenSaleInstance.tokenPrice();
  //     })
  //     .then(function (price) {
  //       assert.equal(price, tokenPrice, 'token price is correct');
  //     });
  // });

  // it('facilitates token buying', function () {
  //   return DappToken.deployed()
  //     .then(function (instance) {
  //       // Grab token instance first
  //       tokenInstance = instance;
  //       return DappTokenSale.deployed();
  //     })
  //     .then(function (instance) {
  //       // Then grab token sale instance
  //       tokenSaleInstance = instance;
  //       // Provision 75% of all tokens to the token sale
  //       return tokenInstance.transfer(
  //         tokenSaleInstance.address,
  //         tokensAvailable,
  //         { from: admin }
  //       );
  //     })
  //     .then(function (receipt) {
  //       numberOfTokens = 10;
  //       return tokenSaleInstance.buyTokens(numberOfTokens, {
  //         from: buyer,
  //         value: numberOfTokens * tokenPrice,
  //       });
  //     })
  //     .then(function (receipt) {
  //       assert.equal(receipt.logs.length, 1, 'triggers one event');
  //       assert.equal(
  //         receipt.logs[0].event,
  //         'Sell',
  //         'should be the "Sell" event'
  //       );
  //       assert.equal(
  //         receipt.logs[0].args._buyer,
  //         buyer,
  //         'logs the account that purchased the tokens'
  //       );
  //       assert.equal(
  //         receipt.logs[0].args._amount,
  //         numberOfTokens,
  //         'logs the number of tokens purchased'
  //       );
  //       return tokenSaleInstance.tokensSold();
  //     })
  //     .then(function (amount) {
  //       assert.equal(
  //         amount.toNumber(),
  //         numberOfTokens,
  //         'increments the number of tokens sold'
  //       );
  //       return tokenInstance.balanceOf(buyer);
  //     })
  //     .then(function (balance) {
  //       assert.equal(balance.toNumber(), numberOfTokens);
  //       return tokenInstance.balanceOf(tokenSaleInstance.address);
  //     })
  //     .then(function (balance) {
  //       assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
  //       // Try to buy tokens different from the ether value
  //       return tokenSaleInstance.buyTokens(numberOfTokens, {
  //         from: buyer,
  //         value: 1,
  //       });
  //     })
  //     .then(assert.fail)
  //     .catch(function (error) {
  //       assert(
  //         error.message.indexOf('revert') >= 0,
  //         'msg.value must equal number of tokens in wei'
  //       );
  //       return tokenSaleInstance.buyTokens(800000, {
  //         from: buyer,
  //         value: numberOfTokens * tokenPrice,
  //       });
  //     })
  //     .then(assert.fail)
  //     .catch(function (error) {
  //       assert(
  //         error.message.indexOf('revert') >= 0,
  //         'cannot purchase more tokens than available'
  //       );
  //     });
  // });

  // it('ends token sale', function () {
  //   return DappToken.deployed()
  //     .then(function (instance) {
  //       // Grab token instance first
  //       tokenInstance = instance;
  //       return DappTokenSale.deployed();
  //     })
  //     .then(function (instance) {
  //       // Then grab token sale instance
  //       tokenSaleInstance = instance;
  //       // Try to end sale from account other than the admin
  //       return tokenSaleInstance.endSale({ from: buyer });
  //     })
  //     .then(assert.fail)
  //     .catch(function (error) {
  //       assert(
  //         error.message.indexOf('revert' >= 0, 'must be admin to end sale')
  //       );
  //       // End sale as admin
  //       return tokenSaleInstance.endSale({ from: admin });
  //     })
  //     .then(function (receipt) {
  //       return tokenInstance.balanceOf(admin);
  //     })
  //     .then(function (balance) {
  //       assert.equal(
  //         balance.toNumber(),
  //         999990,
  //         'returns all unsold dapp tokens to admin'
  //       );
  //       // Check that token price was reset when selfDestruct was called
  //       //   return tokenSaleInstance.tokenPrice();
  //       // }).then(function(price) {
  //       //   assert.equal(price.toNumber(), 0, 'token price was reset');
  //     });
  // });
});
