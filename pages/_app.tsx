import { useEffect, useState } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

//
import { ToastContainer } from 'react-toastify';
// import toast from '../components/Toast';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css';

import FCLayout from '../components/FCLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const [chainId, setChainId] = useState<number | any>(null);
  const [account, setAccount] = useState<string | any>(null);
  const [error, setError] = useState<string | any>(null);
  const [isActivating, setIsActivating] = useState<boolean | any>(null);
  const [isActive, setIsActive] = useState<boolean | any>(false);
  const [provider, setProvider] = useState<string | any>(null);
  const [ENSNames, setENSNames] = useState<string | any>(null);

  useEffect(
    () => {
      console.log('localstorage, account: ', localStorage.getItem('account'));
      if (localStorage.getItem('account') === null) {
        setConnection(
          chainId,
          account,
          error,
          isActivating,
          isActive,
          provider,
          ENSNames
        );
        localStorage.setItem('account', account);
      } else {
        setAccount(localStorage.getItem('account'));
        console.log('YOYOYO', account);
      }
    },

    // rerun the effect if these states change
    [chainId, account, error, isActivating, isActive, provider, ENSNames]
  );

  // fetch account information
  const setConnection = async (
    chainId: number | any = null,
    account: string | any = null,
    error: string | any = null,
    isActivating: boolean | any = null,
    isActive: boolean = false,
    provider: object | any = null,
    ENSNames: object | any = null
  ) => {
    // console.log('setConnection()');
    setChainId(chainId);
    setAccount(account);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);
  };

  // for Navbar
  const navBarParams = { chainId, account };

  console.log('================================================\n_app.tsx');
  // console.log('chainId: ', chainId);
  console.log('account: ', account);
  // console.log('error: ', error);
  // console.log('isActivating: ', isActivating);
  // console.log('isActive: ', isActive);
  // console.log('provider: ', provider);
  // console.log('ENSNames: ', ENSNames);
  return (
    <>
      <FCLayout
        setConnection={(
          chainId: number | any = null,
          account: string | any = null,
          error: string | any = null,
          isActivating: boolean | any = null,
          isActive: boolean = false,
          provider: object | any = null,
          ENSNames: object | any = null
        ) => {
          setConnection(
            chainId,
            account,
            error,
            isActivating,
            isActive,
            provider,
            ENSNames
          );
        }}
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
        autoClose={1000} // 1000 ms = 1sec
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
