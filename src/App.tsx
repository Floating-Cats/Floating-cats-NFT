import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// views
import Install from './views/Install';
import Home from './views/Home';
import MintView from './views/MintView';
import PageNotFound from './views/PageNotFound';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MySpinner from './components/MySpinner';

// to create Web3Provider object and format balance
import Web3 from 'web3';
import { ethers } from 'ethers';

// contracts
import FCat from './artifacts/contracts/MyNFT.sol/FloatingCats.json';

// other imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// global vars
const contractAddress = process.env.VITE_CONTRACT_ADDR; // contract address
const provider = new ethers.providers.Web3Provider(window.ethereum); // provider provides methods interacting with blockchain
const signer = provider.getSigner(); // get the end user (us, for example)
const contract = new ethers.Contract(contractAddress, FCat.abi, signer); // get the smart contract

function App() {
  const [loading, setLoading] = useState(true);
  const [userAddr, setUserAddr] = useState('');
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    setLoading(true);
    setTimeout(a, 1500);
  }, []);

  const getProvider = (provider) => {
    return new Web3(provider);
  };

  // 100/888
  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  const a = () => {
    setLoading(false);
  };

  return (
    <>
      <Router>
        <ToastContainer
          position='top-center'
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
        <Routes>
          {loading ? (
            <MySpinner />
          ) : (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/mint' element={<MintView contract={contract} />} />
              <Route path='*' element={<PageNotFound />} />
            </>
          )}
          <Footer />
        </Routes>
      </Router>
    </>
  );
}

export default App;
