// We import Chai to use its asserting functions here.
const { expect } = require('chai');
const { ethers } = require('hardhat');
require('dotenv').config();

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe('FCAT NFT CONTRACT', function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.
  let Token;
  let hardhatToken; // our contract object
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  before(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory(process.env.VITE_CONTRACT_NAME);
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy(
      process.env.VITE_CONTRACT_NAME,
      process.env.VITE_CONTRACT_SYMBOL,
      `ipfs://${process.env.FC_TEST_CID}/`
    );
  });

  describe('Deployment', function () {
    // FIXME: getApproved function always returns 0
    // FIXME: isApprovedForAll function?

    it('01. Should set the right owner', async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it('02. Should set the right base URI', async function () {
      const baseURI = await hardhatToken.baseURI();
      expect(baseURI).to.equal(`ipfs://${process.env.FC_TEST_CID}/`);
    });

    it('03. Should assign pre-reserved tokens to the owner', async function () {
      // ownerBalance at contract init deployment should equal totalSupply n initial contract deployment
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("04. Should increment owner's addressMintedBalance", async function () {
      // ownerBalance at contract init deployment should equal totalSupply n initial contract deployment
      const addrMintedBalance = await hardhatToken.addressMintedBalance(
        owner.address
      );
      expect(1).to.equal(addrMintedBalance);
    });

    it('05. Should mint the token ID #1 to the owner', async function () {
      const addr = await hardhatToken.ownerOf(1);
      expect(addr).to.equal(owner.address);
    });

    it('06. Should have a .json base extension', async function () {
      const baseExt = await hardhatToken.baseExtension();
      expect(baseExt).to.equal('.json');
    });

    it('07. Should set the right cost', async function () {
      const c = await hardhatToken.cost();
      expect(c / 1e18).to.equal(process.env.VITE_COST);
    });

    it('08. Should have a count = totalSupply', async function () {
      const count = await hardhatToken.count();
      expect(await hardhatToken.totalSupply()).to.equal(count);
    });

    it('09. Should be able to tell a whitelisted user', async function () {
      const isW1 = await hardhatToken.isWhitelisted(owner.address);
      const isW2 = await hardhatToken.isWhitelisted(addr1.address);
      const isW3 = await hardhatToken.isWhitelisted(addr2.address);
      expect(isW1 || isW2 || isW3).to.equal(false);
    });
  });
});

// describe('Transactions', function () {});

// it('Mint and transfer an NFT to buyer', async function () {
//   // buyer at contract init deplyment should have 0 token
//   let balance = await hardhatTokenInstance.balanceOf(buyer);
//   expect(balance).to.equal(0);
//   printTrace(2, 1);
//   // mint a token with insufficient amount
//   const mintToken01 = await hardhatTokenInstance.mint(1, {
//     value: ethers.utils.parseEther('0.01'),
//   });
//   // wait until the transaction is mined
//   await mintToken01.wait();
//   balance = await hardhatTokenInstance.balanceOf(buyer);
//   expect(balance).to.equal(0);
//   printTrace(2, 2);
//   // mint a token with sufficient amount
//   const mintToken02 = await hardhatTokenInstance.mint(1, {
//     value: ethers.utils.parseEther('0.02'),
//   });
//   // wait until the transaction is mined
//   await mintToken02.wait();
//   let addr = await hardhatTokenInstance.ownerOf(2);
//   expect(addr).to.equal(buyer);
//   printTrace(2, 3);
// });
// /**
//  * # Test 03
//  */
// it('initializes the contract with the correct values', function () {});
