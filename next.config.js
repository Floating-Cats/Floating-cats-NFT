/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
    magicKey: process.env.MAGIC_KEY,
  },
  images: {
    disableStaticImages: true,
  },
};
