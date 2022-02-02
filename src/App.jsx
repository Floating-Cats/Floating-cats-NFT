import { useEffect, useState } from 'react';

// views
import Install from './views/Install';
import Home from './views/Home';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// to create Web3Provider object and format balance
import { ethers } from 'ethers';

// contracts
import FCat from './artifacts/contracts/MyNFT.sol/FloatingCats.json';

// toastify, ref: https://fkhadra.github.io/react-toastify/introduction
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// global vars
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // contract address
const provider = new ethers.providers.Web3Provider(window.ethereum); // provider provides methods interacting with blockchain
const signer = provider.getSigner(); // get the end user
const contract = new ethers.Contract(contractAddress, FCat.abi, signer); // get the smart contract

function App() {
  const [userAddr, setUserAddr] = useState('');
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

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='dark'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar
        provider={provider}
        userAddr={userAddr}
        setUserAddr={setUserAddr}
      />
      <div>
        {window.ethereum ? (
          <Home
            provider={provider}
            userAddr={userAddr}
            contract={contract}
            signer={signer}
            totalMinted={totalMinted}
            getCount={getCount}
          />
        ) : (
          <Install />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
