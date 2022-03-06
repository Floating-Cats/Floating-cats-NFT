import { useEffect, useState } from 'react';
import Head from 'next/head';

// components
import { FCNavbar } from './FCNavbar';
import { FCFooter } from './FCFooter';
import FCSpinner from '../FCSpinner';

// types
import type { Web3ReactHooks } from '@web3-react/core';

interface NavBarInterface {
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}

// type OnClickConnectType = (
//   chainId: ReturnType<Web3ReactHooks['useChainId']> | any,
//   accounts: ReturnType<Web3ReactHooks['useAccount']> | any,
//   error: ReturnType<Web3ReactHooks['useError']> | any,
//   isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any,
//   isActive: ReturnType<Web3ReactHooks['useIsActive']> | any,
//   provider: ReturnType<Web3ReactHooks['useProvider']> | any,
//   ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
// ) => void;

export default function FCLayout({
  // component
  children,
  navBarParams,
  // web3 react
  setChainId,
  setAccount,
  setError,
  setIsActivating,
  setIsActive,
  setProvider,
  setENSNames,
}: {
  // component
  children: JSX.Element | JSX.Element[];
  navBarParams: NavBarInterface;
  // web3 react
  setChainId: (chainId: ReturnType<Web3ReactHooks['useChainId']> | any) => void;
  setAccount: (
    accounts: ReturnType<Web3ReactHooks['useAccount']> | any
  ) => void;
  setError: (error: ReturnType<Web3ReactHooks['useError']> | any) => void;
  setIsActivating: (
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any
  ) => void;
  setIsActive: (
    isActive: ReturnType<Web3ReactHooks['useIsActive']> | any
  ) => void;
  setProvider: (
    provider: ReturnType<Web3ReactHooks['useProvider']> | any
  ) => void;
  setENSNames: (
    ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
  ) => void;
}) {
  const [loading, setLoading] = useState<boolean | any>(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(loadHomePage, 1000);
  }, []);

  const loadHomePage = () => {
    setLoading(false);
  };

  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/icon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Floating Cats</title>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />

        <link
          href='https://fonts.googleapis.com/css2?family=Short+Stack&display=swap'
          rel='stylesheet'
        ></link>

        <link
          href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <div className='body'>
        {loading ? (
          <FCSpinner />
        ) : (
          <>
            <FCNavbar
              navBarParams={navBarParams}
              setChainId={setChainId}
              setAccount={setAccount}
              setError={setError}
              setIsActivating={setIsActivating}
              setIsActive={setIsActive}
              setProvider={setProvider}
              setENSNames={setENSNames}
            />
            <main>{children}</main>
            <FCFooter />
          </>
        )}
      </div>
    </>
  );
}
