// components/layout.js

import { useEffect, useState } from 'react';
import Head from 'next/head';

import { FCNavbar } from '../FCNavbar';
import { FCFooter } from '../FCFooter';
import MySpinner from '../MySpinner';

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [loading, setLoading] = useState<boolean | any>(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(loadHomePage, 1500);
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
          <MySpinner />
        ) : (
          <>
            <FCNavbar />
            <main>{children}</main>
            <FCFooter />
          </>
        )}
      </div>
    </>
  );
}
