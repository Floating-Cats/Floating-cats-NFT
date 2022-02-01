// views
import Install from './views/Install';
import Home from './views/Home';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// components

// contracts
import FCat from './artifacts/contracts/MyNFT.sol/FloatingCats.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FCat.abi, signer);

function App() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  if (window.ethereum) {
    // return (
    //   <Home totalMinted={() => setTotalMinted()} getCount={() => getCount()} />
    // );
    return (
      <Home contract={contract} totalMinted={totalMinted} getCount={getCount} />
    );
  } else {
    return <Install />;
  }
}

export default App;
