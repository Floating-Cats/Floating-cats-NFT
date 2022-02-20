// components/layout.js

import { useEffect, useState } from 'react';
import Head from 'next/head';

import { FCNavbar } from './FCNavbar';
import { FCFooter } from './FCFooter';
import FCSpinner from '../FCSpinner';

export default function FCLayout({
  setConnection,
  children,
}: {
  setConnection: (
    chainId: number | any,
    account: string | any,
    error: string | any,
    isActivating: boolean | any,
    isActive: boolean,
    provider: object | any,
    ENSNames: object | any
  ) => void;
  children: JSX.Element | JSX.Element[];
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
          href='https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Rowdies&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className='body'>
        {loading ? (
          <FCSpinner />
        ) : (
          <>
            <FCNavbar
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
            />
            <main>{children}</main>
            <FCFooter />
          </>
        )}
      </div>
    </>
  );
}
