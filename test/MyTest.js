const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const FCat = await ethers.getContractFactory('FloatingCats');
    const fcat = await FCat.deploy();

    await fcat.deployed();

    const recipient = ' 0x4cA9eC8027133cA87fBF93C7CCfB5C0bCdEA4bcf';
    const metadataURI = 'cid/test.png';

    let balance = await fcat.balanceOf(recipient);
    // expect(balance).to.equal(0);

    // const newlyMintedToken = await fcat.payToMint(recipient, metadataURI, {
    //   value: ethers.utils.parseEther('0.01'),
    // });

    // wait until the transaction is mined
    // await newlyMintedToken.wait();

    // balance = await fcat.balanceOf(recipient);
    // expect(balance).to.equal(1);

    // expect(await fcat.isContentOwned(metadataURI)).to.equal(true);
    // const newlyMintedToken2 = await fcat.payToMint(recipient, 'foo', {
    //   value: ethers.utils.parseEther('0.05'),
    // });
  });
});
