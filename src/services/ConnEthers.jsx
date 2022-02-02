import { ethers } from 'ethers';

async function connectUser() {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return account;
}

async function getBalance() {
  const account = connectUser();
  // provider provides methods interacting with blockchain
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balanceInWei = await provider.getBalance(account);
  let balanceInEth = parseFloat(ethers.utils.formatEther(balanceInWei))
    .toFixed(4)
    .toString();
  console.log(balanceInEth);
  return balanceInEth;
}

const ConnEthers = {
  connectUser: connectUser,
  getBalance: getBalance,
};

export default ConnEthers;
