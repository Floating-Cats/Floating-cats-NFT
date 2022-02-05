const hre = require('hardhat');
require('dotenv').config();

async function main() {
  // get the acocunt to deploy the contract
  // const [deployer] = await hre.ethers.getSigners();
  // console.log('Deploying contracts with the account:', deployer.address);

  // We get the contract to deploy
  const FCat = await hre.ethers.getContractFactory(
    process.env.VITE_CONTRACT_NAME
  );
  const fcat = await FCat.deploy(
    process.env.VITE_CONTRACT_NAME, // name
    process.env.VITE_CONTRACT_SYMBOL, // symbol
    // 'ipfs://QmSZyYG4JQDd5M5H3e4ZtFh1GGqptR2Yyqo7SLrnYri3Tm/' // cid, remember the '/' at the end
    `ipfs://${process.env.FC_TEST_CID}/` // cid, remember the '/' at the end
  );

  await fcat.deployed();

  console.log('FCat NFT deployed to:', fcat.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error~~! \n', err.message);
    console.error(err);
    process.exit(1);
  });

// local deployment: 0x0165878A594ca255338adfa4d48449f69242Eb8F
