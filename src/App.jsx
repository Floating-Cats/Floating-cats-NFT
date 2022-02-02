import { useEffect, useState } from 'react';

// views
import Install from './views/Install';
import Home from './views/Home';

// to create Web3Provider object and format balance
import { ethers } from 'ethers';

// contracts
import FCat from './artifacts/contracts/MyNFT.sol/FloatingCats.json';

// global vars
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
// console.log('window.ethereum is: ', window.ethereum);
// console.log('provider is: ', provider);
const signer = provider.getSigner(); // get the end user
// console.log('signer is: ', signer);
const contract = new ethers.Contract(contractAddress, FCat.abi, signer); // get the smart contract

function App() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount()
      .then(() => {
        console.debug('App/useEffect Request Successful!');
      })
      .catch((error) => {
        console.error('AppuseEffect Request Failed: ', error.message);
      });
  }, []);

  // 100/888
  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  if (window.ethereum) {
    return (
      <Home
        contract={contract}
        signer={signer}
        totalMinted={totalMinted}
        getCount={getCount}
      />
    );
  } else {
    return <Install />;
  }
}

export default App;
