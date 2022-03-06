import { useEffect, useState } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

// styling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

// components
import FCLayout from '../components/FCLayout';

// helper function
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';
import { StorageInterface } from 'components/helpers/StorageInterface';

function MyApp({ Component, pageProps }: AppProps) {
  const [chainId, setChainId] = useState<Web3ReactType['chainId']>();
  const [accounts, setAccount] = useState<Web3ReactType['accounts']>();
  const [error, setError] = useState<Web3ReactType['error']>();
  const [isActivating, setIsActivating] =
    useState<Web3ReactType['isActivating']>();
  const [isActive, setIsActive] = useState<Web3ReactType['isActive']>();
  const [provider, setProvider] = useState<Web3ReactType['provider']>();
  const [ENSNames, setENSNames] = useState<Web3ReactType['ENSNames']>();

  // console.log('=========\n_app.tsx');
  const navBarParams = { accounts, provider };
  // console.log({ ...navBarParams });
  const initState: StorageInterface = {
    chainId: null,
    accounts: null,
    error: null,
    isActivating: null,
    isActive: null,
    provider: null,
    ENSNames: null,
  };
  const initStateJSON: string = JSON.stringify(initState);

  useEffect(() => {
    const initWallet: string =
      JSON.parse(JSON.stringify(localStorage.getItem('wc')) || '{}') ||
      initStateJSON;

    const fetchedWallet: StorageInterface = JSON.parse(initWallet);
    console.log('...initializing your wallet');
    console.debug(fetchedWallet);

    // if wallet info is fetched
    if (fetchedWallet && fetchedWallet['isActive']) {
      setChainId(fetchedWallet['chainId']);
      setAccount(fetchedWallet['accounts']);
      setError(fetchedWallet['error']);
      setIsActivating(fetchedWallet['isActivating']);
      setIsActive(fetchedWallet['isActive']);
      setProvider(fetchedWallet['provider']);
      setENSNames(fetchedWallet['ENSNames']);

      // styles
      // toast('🐱 Wallet Info Fetched!');
    } else {
      // no wallet info
      localStorage.setItem('wc', initStateJSON);
    }
    console.log('...done');

    const contractAddress: string = process.env.VITE_CONTRACT_ADDR;
    console.log('contractAddress = ', contractAddress);
  }, []);

  return (
    <>
      <FCLayout
        setChainId={setChainId}
        setAccount={setAccount}
        setError={setError}
        setIsActivating={setIsActivating}
        setIsActive={setIsActive}
        setProvider={setProvider}
        setENSNames={setENSNames}
        navBarParams={navBarParams}
      >
        <div>
          {
            // prevent Next.js from trying to render anything on the server
            // unless the window object is defined.
            typeof window === 'undefined' ? null : <Component {...pageProps} />
          }
        </div>
      </FCLayout>
      <ToastContainer
        position='top-center'
        theme='dark'
        autoClose={750} // 1000 ms = 1sec
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
