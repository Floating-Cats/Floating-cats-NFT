require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          process.env.INFURA_ENDPOINT_RINKEBY
        ),
      network_id: 4,
      gas: 2500000,
      gasPrice: 25000000000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
};
