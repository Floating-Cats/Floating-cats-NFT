import React, { useEffect, useState } from 'react';

// imports for next
import Head from 'next/head';

// page imports
import Home from './Home';

// component imports
import Layout from '../components/Layout';

// other imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FunctionComponent = () => {
  return (
    <div>
      {/* head */}
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

      {/* body */}
      <>
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
        <Layout>
          <main className='body'>
            <Home />
          </main>
        </Layout>
      </>
    </div>
  );
  // return (
  //   <>
  //     <PriorityExample />
  //     <div
  //       style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}
  //     >
  //       <MetaMaskCard />
  //       <WalletConnectCard />
  //     </div>
  //   </>
  // );
};

export default App;
