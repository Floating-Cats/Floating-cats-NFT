import { useEffect, useState } from 'react';
import Head from 'next/head';

// components
import { FCNavbar } from './FCNavbar';
import { FCFooter } from './FCFooter';
import FCSpinner from '../FCSpinner';

// types
import { Web3ReactType } from 'components/helpers/Web3ReactType';

interface NavBarInterface {
  accounts: ReturnType<Web3ReactType['chainId']> | any;
  provider: ReturnType<Web3ReactType['provider']> | any;
}

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
  setChainId: (chainId: Web3ReactType['chainId']) => void;
  setAccount: (accounts: Web3ReactType['accounts']) => void;
  setError: (error: Web3ReactType['error']) => void;
  setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  setIsActive: (isActive: Web3ReactType['isActive']) => void;
  setProvider: (provider: Web3ReactType['provider']) => void;
  setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
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
