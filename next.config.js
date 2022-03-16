/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  env: {
    infuraKey: process.env.FC_TEST_INFURA_PROJECT_ID,
    // alchemyKey: process.env.ALCHEMY_KEY,
    // magicKey: process.env.MAGIC_KEY,
  },
  images: {
    disableStaticImages: true,
  },
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/mint': { page: '/mint' },
    };
  },
};
