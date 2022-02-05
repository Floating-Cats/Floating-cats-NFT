// const {
//   infuraProjectId,
//   mnemonic,
//   etherscanApiKey,
// } = require('./secrets.json');

// require('@nomiclabs/hardhat-ethers');
// require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
// require('@nomiclabs/hardhat-web3');
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('balance', "Prints an account's balance")
//   .addParam('account', "The account's address")
//   .setAction(async (taskArgs) => {
//     const account = web3.utils.toChecksumAddress(taskArgs.account);
//     const balance = await web3.eth.getBalance(account);

//     console.log(web3.utils.fromWei(balance, 'ether'), 'ETH');
//   });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    // defaultNetwork: 'localhost',
    hardhat: {},

    rinkeby: {
      url: `${process.env.FC_TEST_INFURA_ENDPOINT_RINKEBY}`,
      accounts: [
        `0x${process.env.FC_TEST_PRIVATE_KEY_ANDY_RINKEBY_ACC1}`,
        `0x${process.env.FC_TEST_PRIVATE_KEY_ANDY_RINKEBY_ACC2}`,
      ],
    },

    mainnet: {
      url: `${process.env.FC_TEST_INFURA_ENDPOINT_MAINNET}`,
      accounts: [
        `0x${process.env.FC_TEST_PRIVATE_KEY_ANDY_RINKEBY_ACC1}`,
        `0x${process.env.FC_TEST_PRIVATE_KEY_ANDY_RINKEBY_ACC2}`,
      ],
    },
  },

  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

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
};
