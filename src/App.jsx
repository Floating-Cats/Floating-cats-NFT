import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

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
import { ethers } from 'ethers';

// contracts
import FCat from './artifacts/contracts/MyNFT.sol/FloatingCats.json';

// other imports
const env = import.meta.env;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// global vars
const contractAddress = env.VITE_CONTRACT_ADDR; // contract address
console.log(contractAddress);
const provider = new ethers.providers.Web3Provider(window.ethereum); // provider provides methods interacting with blockchain
const signer = provider.getSigner(); // get the end user (us, for example)
const contract = new ethers.Contract(contractAddress, FCat.abi, signer); // get the smart contract

function App() {
  const [loading, setLoading] = useState(true);
  const [userAddr, setUserAddr] = useState('');
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    setLoading(true);

    getCount()
      .then(() => {
        console.debug('App/useEffect Request Successful!');
      })
      .catch((error) => {
        console.error('App/useEffect Request Failed: ', error.message);
      })
      .finally(() => {
        setTimeout(a, 1500);
      });
  }, []);

  // 100/888
  const getCount = async () => {
    const count = await contract.count();
    console.log('getCount(), count = ', parseInt(count));
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
        {loading ? (
          <>
            <MySpinner />
          </>
        ) : (
          <Switch id='body'>
            <Route exact path='/'>
              <Home
                provider={provider}
                userAddr={userAddr}
                contract={contract}
                signer={signer}
                totalMinted={totalMinted}
                getCount={getCount}
              />
            </Route>
            <Route path='/mint'>
              <MintView />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;
