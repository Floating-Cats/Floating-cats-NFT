const hre = require('hardhat');

async function main() {
  const FCat = await hre.ethers.getContractFactory('FCat');
  const fcat = await FCat.deploy(true, 'Hello, Hello!');

  await fcat.deployed();

  console.log('My NFT deployed to:', fcat.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
