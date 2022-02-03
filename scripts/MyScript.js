// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

require('dotenv').config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const FCat = await hre.ethers.getContractFactory('FloatingCats');
  const fcat = await FCat.deploy(
    'FloatingCats', // name
    'FCAT', // symbol
    // 'ipfs://QmSZyYG4JQDd5M5H3e4ZtFh1GGqptR2Yyqo7SLrnYri3Tm/' // cid, remember the '/' at the end
    `ipfs://${process.env.FC_TEST_CID}/` // cid, remember the '/' at the end
  );

  await fcat.deployed();

  console.log('FCat NFT deployed to:', fcat.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error~~! \n', error.message);
    process.exit(1);
  });
