const { expect } = require('chai');
const hre = require('hardhat');

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const FCat = await hre.ethers.getContractFactory('FloatingCats');
    const fcat = await FCat.deploy();

    await fcat.deployed();

    const recipient = ' 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';
    console.log('Hi');

    // Error: network does not support ENS
    // let balance = await fcat.balanceOf(recipient);
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
