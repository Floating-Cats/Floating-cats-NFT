// ~/hardhat.config.js
// const {
//   infuraProjectId,
//   mnemonic,
//   etherscanApiKey,
// } = require('./secrets.json');

// const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // networks: {
  //   rinkeby: {
  //     url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
  //     accounts: { mnemonic: mnemonic },
  //   },
  //   ropsten: {
  //     url: `https://ropsten.infura.io/v3/${infuraProjectId}`,
  //     accounts: { mnemonic: mnemonic },
  //   },
  //   kovan: {
  //     url: `https://kovan.infura.io/v3/${infuraProjectId}`,
  //     accounts: { mnemonic: mnemonic },
  //   },
  //   goerli: {
  //     url: `https://goerli.infura.io/v3/${infuraProjectId}`,
  //     accounts: { mnemonic: mnemonic },
  //   },
  //   mainnet: {
  //     url: `https://mainnet.infura.io/v3/${infuraProjectId}`,
  //     accounts: { mnemonic: mnemonic },
  //   },
  // },

  // etherscan: {
  //   // Your API key for Etherscan
  //   // Obtain one at https://etherscan.io/
  //   apiKey: etherscanApiKey,
  // },
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  localhost: {
    url: 'http://127.0.0.1:8545',
  },
};
