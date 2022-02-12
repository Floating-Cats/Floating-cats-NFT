/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    infuraKey: process.env.FC_TEST_ETHERSCAN_API_KEY,
    alchemyKey: process.env.FC_TEST_ALCHEMY_API_KEY,
    magicKey: process.env.MAGIC_KEY,
  },
};

module.exports = nextConfig;
