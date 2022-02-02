import { ethers } from 'ethers';

// FIXME: test this again, should return a Promise
/**
 * Connect user to their wallet and return the account
 *
 * @returns the account info e.g. a Promise object
 */
async function connectUser() {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  console.log(account);

  return account;

  // return account;
}

// FIXME: test this again, should return a Promise
/**
 * Connect user to their wallet and return the account address
 *
 * @returns the account address, e.g. 0x....
 */
async function getAddress(provider, account) {
  // if user hasn't connected to their wallet
  if (account === undefined) account = connectUser();
  if (provider === undefined)
    provider = new ethers.providers.Web3Provider(window.ethereum);

  const address = await provider._getAddress(account);
  console.log(address);
  return address;
}

/**
 * Connect user to their wallet if they haven't, and get the account
 * balance in ETH
 *
 * @returns user's account balance of String type.
 */
async function getBalance(provider, account) {
  // if user hasn't connected to their wallet
  if (account === undefined) account = connectUser();
  if (provider === undefined)
    provider = new ethers.providers.Web3Provider(window.ethereum);

  const balanceInWei = await provider.getBalance(account);
  let balanceInEth = parseFloat(ethers.utils.formatEther(balanceInWei))
    .toFixed(4)
    .toString();
  console.log(balanceInEth);
  return balanceInEth;
}

const ConnEthers = {
  // connectUser: connectUser,
  getBalance: getBalance,
  getAddress: getAddress,
};

export default ConnEthers;
