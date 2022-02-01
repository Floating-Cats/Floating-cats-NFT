import { useState } from 'react';

// to create Web3Provider object and format balance
import { ethers } from 'ethers';

function WalletBalance() {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    // get the connected account on the window etheureum object
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // provider provides methods interacting with blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Your Balance: {balance}</h5>
        <button className='btn btn-success' onClick={() => getBalance()}>
          Show My Balance
        </button>
      </div>
    </div>
  );
}

export default WalletBalance;
