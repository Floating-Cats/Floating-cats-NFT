import { useState, useCallback } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

// styling
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

// components
import FCLayout from '../components/FCLayout';

// types
import type { Web3ReactHooks } from '@web3-react/core';

function MyApp({ Component, pageProps }: AppProps) {
  const [chainId, setChainId] = useState<
    ReturnType<Web3ReactHooks['useChainId']> | any
  >();
  const [accounts, setAccount] = useState<
    ReturnType<Web3ReactHooks['useAccount']> | any
  >();
  const [error, setError] = useState<
    ReturnType<Web3ReactHooks['useError']> | any
  >();
  const [isActivating, setIsActivating] = useState<
    ReturnType<Web3ReactHooks['useIsActivating']> | any
  >();
  const [isActive, setIsActive] = useState<
    ReturnType<Web3ReactHooks['useIsActive']> | any
  >();
  const [provider, setProvider] = useState<
    ReturnType<Web3ReactHooks['useProvider']> | any
  >();
  const [ENSNames, setENSNames] = useState<
    ReturnType<Web3ReactHooks['useENSNames']> | any
  >();

  // useEffect(
  //   () => {
  //     localStorage.getItem('accounts')
  //       ? setAccount(localStorage.getItem('accounts'))
  //       : onClickConnect(
  //           chainId,
  //           accounts,
  //           error,
  //           isActivating,
  //           isActive,
  //           provider,
  //           ENSNames
  //         );
  //     localStorage.setItem('accounts', accounts);
  //   },

  //   // rerun the effect if these states change
  //   [chainId, accounts, error, isActivating, isActive, provider, ENSNames]
  // );

  // fetch account information
  const onClickConnect = useCallback(
    async (
      chainId: ReturnType<Web3ReactHooks['useChainId']> | any,
      accounts: ReturnType<Web3ReactHooks['useAccount']> | any,
      error: ReturnType<Web3ReactHooks['useError']> | any,
      isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any,
      isActive: ReturnType<Web3ReactHooks['useIsActive']> | any,
      provider: ReturnType<Web3ReactHooks['useProvider']> | any,
      ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
    ) => {
      setChainId(chainId);
      setAccount(accounts);
      setError(error);
      setIsActivating(isActivating);
      setIsActive(isActive);
      setProvider(provider);
      setENSNames(ENSNames);
    },
    [chainId, accounts, error, isActivating, isActive, provider, ENSNames]
  );
  // for Navbar
  const navBarParams = { accounts, provider };

  console.log('=========\n_app.tsx');
  // console.log('chainId: ', chainId);
  console.log('accounts: ', accounts);
  // console.log('error: ', error);
  // console.log('isActivating: ', isActivating);
  // console.log('isActive: ', isActive);
  // console.log('provider: ', provider);
  // console.log('ENSNames: ', ENSNames);
  return (
    <>
      <FCLayout
        onClickConnect={() => {
          onClickConnect(
            chainId,
            accounts,
            error,
            isActivating,
            isActive,
            provider,
            ENSNames
          );
        }}
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
