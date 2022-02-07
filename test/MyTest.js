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
  let tokenId1 = 1;

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
    // FIXME: getApproved function always returns 0x000...000
    // FIXME: isApprovedForAll function?
    // FIXME: supportsInterface function?

    it("01. Should increment owner's addressMintedBalance", async function () {
      // ownerBalance at contract init deployment should equal totalSupply n initial contract deployment
      const balance = await hardhatToken.addressMintedBalance(owner.address);
      expect(process.env.VITE_RESERVED_AMOUNT).to.equal(balance);
    });

    it('02. Should assign pre-reserved tokens to the owner', async function () {
      // ownerBalance at contract init deployment should equal totalSupply n initial contract deployment
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it('03. Should have a .json base extension', async function () {
      const baseExt = await hardhatToken.baseExtension();
      expect(baseExt).to.equal('.json');
    });

    it('04. Should set the right base URI', async function () {
      const baseURI = await hardhatToken.baseURI();
      expect(baseURI).to.equal(`ipfs://${process.env.FC_TEST_CID}/`);
    });

    it('05. Should set the right cost', async function () {
      const c = await hardhatToken.cost();
      expect(c / 1e18).to.equal(parseFloat(process.env.VITE_COST));
    });

    it('06. Should count the right number of minted tokens', async function () {
      const count = await hardhatToken.count();
      expect(await hardhatToken.totalSupply()).to.equal(count);
    });

    it('07. getApproved (TODO)', async function () {
      // const count = await hardhatToken.count();
      // expect(await hardhatToken.totalSupply()).to.equal(count);
    });

    it('08. isApprovedForAll (TODO)', async function () {
      // const count = await hardhatToken.count();
      // expect(await hardhatToken.totalSupply()).to.equal(count);
    });

    it('09. Should be able to tell a whitelisted user  (TODO)', async function () {
      const isW1 = await hardhatToken.isWhitelisted(owner.address);
      const isW2 = await hardhatToken.isWhitelisted(addr1.address);
      const isW3 = await hardhatToken.isWhitelisted(addr2.address);
      expect(isW1 || isW2 || isW3).to.equal(false);
    });

    it('10. Should set the right maxMintAmount', async function () {
      const mma = await hardhatToken.maxMintAmount();
      expect(mma).to.equal(process.env.VITE_MAX_MINT_AMOUNT);
    });

    it('11. Should set the right maxSupply', async function () {
      const ms = await hardhatToken.maxSupply();
      expect(ms).to.equal(process.env.VITE_MAX_SUPPLY);
    });

    it('12. Should set the right contract name', async function () {
      const name = await hardhatToken.name();
      expect(name).to.equal(process.env.VITE_CONTRACT_NAME);
    });

    it('13. Should set the right nftPerAddressLimit', async function () {
      const pal = await hardhatToken.nftPerAddressLimit();
      expect(pal).to.equal(process.env.VITE_NFT_PER_ADDR_LIMIT);
    });

    it('14. Should set the hidden nft URI', async function () {
      const uri = await hardhatToken.notRevealedUri();
      expect(uri).to.equal(process.env.FC_TEST_NOT_REVEAL_URL);
    });

    it('15. Should return false on onlyWhitelisted for now  (TODO)', async function () {
      const owl = await hardhatToken.onlyWhitelisted();
      expect(owl).to.equal(false);
    });

    it('16. Should set the right owner', async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it('17. Should return the owner address of the token ID#1', async function () {
      const addrOwner = await hardhatToken.ownerOf(tokenId1);
      expect(addrOwner).to.equal(owner.address);
    });

    it('18. Paused function should return false for now  (TODO)', async function () {
      const p = await hardhatToken.paused();
      expect(p).to.equal(false);
    });

    it('19. Revealed function should return true for now  (TODO)', async function () {
      const r = await hardhatToken.revealed();
      expect(r).to.equal(true);
    });

    it('20. supportsInterface (TODO)', async function () {
      // const addrOwner = await hardhatToken.owner();
      // expect(addrOwner).to.equal(owner.address);
    });

    it('21 Should set symbol to FCAT. ', async function () {
      const symbol = await hardhatToken.symbol();
      expect(symbol).to.equal(process.env.VITE_CONTRACT_SYMBOL);
    });

    it('22. Should return token by its index position', async function () {
      let tokenIdx = tokenId1 - 1;
      const tokenId = await hardhatToken.tokenByIndex(tokenIdx);
      expect(tokenId).to.equal(tokenIdx + 1);
    });

    it('23. Should return token by its index position given owner address', async function () {
      let tokenIdx = tokenId1 - 1;
      const tokenId = await hardhatToken.tokenOfOwnerByIndex(
        owner.address,
        tokenIdx
      );
      expect(tokenId).to.equal(tokenIdx + 1);
    });

    it('24. Should return the right token URI', async function () {
      const uri = await hardhatToken.tokenURI(tokenId1);
      expect(uri).to.equal(
        `ipfs://${process.env.FC_TEST_CID}/${tokenId1}.json`
      );
    });

    it('25. Should return the right total supply amount', async function () {
      const ts = await hardhatToken.totalSupply();
      expect(ts).to.equal(process.env.VITE_RESERVED_AMOUNT);
    });

    it('26. Should return a list of tokenId that this address owns', async function () {
      const tokenIds = await hardhatToken.walletOfOwner(owner.address);
      expect(tokenIds.length).to.equal(
        parseInt(process.env.VITE_RESERVED_AMOUNT)
      );
    });

    it('27 whitelistedAddresses  (TODO)', async function () {
      // const addrs = await hardhatToken.whitelistedAddresses();
      // expect(addrs).to.equal([]);
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
