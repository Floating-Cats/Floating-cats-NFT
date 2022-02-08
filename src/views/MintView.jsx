import Mint from '../components/Mint';
import { useEffect, useState } from 'react';

// other imports
const env = import.meta.env;
import { toast } from 'react-toastify';

const MintView = () => {
  const mintToken = async () => {
    // setCollectionVisible(true);
    toast.info(`🐱 Let's Mint ${mintAmount} Token!`);

    contract.ownerOf(1).then((result) => {
      console.log('1:  ', result);
    });

    console.log('3:  ', import.meta.env.VITE_ETHER_COST);

    const result = await contract
      .mint(mintAmount, {
        value: ethers.utils.parseEther(import.meta.env.VITE_ETHER_COST),
      })
      .then(() => {
        console.debug(`Successfully Minted ${mintAmount} Tokens!`);
        toast('🐱 Just Minted!');
      })
      .catch((err) => {
        console.error('❌ Failed To Mint: ', err.message);
        console.error(err);
        toast.error('❌ Failed To Mint');
      });

    // await result.wait(); // FIXME: Cannot read properties of undefined (reading 'wait')
  };

  return (
    <div className='mintPageBg'>
      <img src='pics/mint-bg-top.png' alt='' id='mint-bg' />
      <div className='container' id='mintPage'>
        <div className='row'>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-blue.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-red.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-yellow.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
        </div>
      </div>
      <img src='pics/mint-bg-bt.png' alt='' id='mint-bg' />
    </div>
  );
};

export default MintView;
