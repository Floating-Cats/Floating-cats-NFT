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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// global vars
const contractAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'; // contract address
const provider = new ethers.providers.Web3Provider(window.ethereum); // provider provides methods interacting with blockchain
const signer = provider.getSigner(); // get the end user (us, for example)
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
        console.error('App/useEffect Request Failed: ', error.message);
      });
  }, []);

  // 100/888
  const getCount = async () => {
    const count = await contract.count();
    console.log('getCount(), count = ', parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='dark'
        autoClose={1000} // 1000 ms = 1sec
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
