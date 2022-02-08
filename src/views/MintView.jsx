import Mint from '../components/Mint';
import { useEffect, useState } from 'react';

// other imports
const env = import.meta.env;
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const MintView = ({ contract }) => {
  const [mintAmount, setMintAmount] = useState(1);

  // TODO: get mint amount from user
  const getMintAmount = () => {
    setMintAmount(1);
  };

  const mintToken = async () => {
    // setCollectionVisible(true);
    toast.info(`🐱 Let's Mint ${mintAmount} Token!`);

    contract.ownerOf(1).then((result) => {
      console.log('1:  ', result);
    });

    console.log('3:  ', env.VITE_COST);

    const result = await contract
      .mint(mintAmount, {
        value: ethers.utils.parseEther(env.VITE_COST),
      })
      // TODO: Changed this to a pending toaster
      .then(() => {
        console.debug(`Successfully Minted ${mintAmount} Tokens!`);
        toast('🐱 Just Minted!');
      })
      // TODO: Added a catch to  handle rejected transaction by users
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
