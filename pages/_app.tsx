import { useEffect, useState, useCallback } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

//
import { ToastContainer } from 'react-toastify';
// import toast from '../components/Toast';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css';

import FCLayout from '../components/FCLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const [chainId, setChainId] = useState<number | any>();
  const [account, setAccount] = useState<string | any>();
  const [error, setError] = useState<string | any>();
  const [isActivating, setIsActivating] = useState<boolean | any>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | any>();
  const [ENSNames, setENSNames] = useState<string | any>();

  // useEffect(
  //   () => {
  //     localStorage.getItem('account')
  //       ? setAccount(localStorage.getItem('account'))
  //       : setConnection(
  //           chainId,
  //           account,
  //           error,
  //           isActivating,
  //           isActive,
  //           provider,
  //           ENSNames
  //         );
  //     localStorage.setItem('account', account);
  //   },

  //   // rerun the effect if these states change
  //   [chainId, account, error, isActivating, isActive, provider, ENSNames]
  // );

  // fetch account information
  const setConnection = useCallback(
    async (
      chainId: number | any,
      account: string | any,
      error: string | any,
      isActivating: boolean | any,
      isActive: boolean,
      provider: object | any,
      ENSNames: object | any
    ) => {
      setChainId(chainId);
      setAccount(account);
      setError(error);
      setIsActivating(isActivating);
      setIsActive(isActive);
      setProvider(provider);
      setENSNames(ENSNames);
    },
    [chainId, account, error, isActivating, isActive, provider, ENSNames]
  );
  // for Navbar
  const navBarParams = { chainId, account };

  console.log('=========\n_app.tsx');
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
          chainId: number | any,
          account: string | any,
          error: string | any,
          isActivating: boolean | any,
          isActive: boolean,
          provider: object | any,
          ENSNames: object | any
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
