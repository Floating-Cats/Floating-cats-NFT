const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const FCat = await ethers.getContractFactory('FloatingCats');
    const fcat = await FCat.deploy();
    await fcat.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await fcat.balanceOf(recipient);
    expect(balance).to.equal(0);

    // uncomment this test and expect to see error msg: 'Need to pay up!'
    // const newlyMintedToken = await fcat.payToMint(recipient, metadataURI, {
    //   value: ethers.utils.parseEther('0.01'),
    // });

    const newlyMintedToken = await fcat.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await fcat.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await fcat.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await fcat.payToMint(recipient, 'foo', {
      value: ethers.utils.parseEther('0.05'),
    });

    // TODO: add more tests
  });
});
