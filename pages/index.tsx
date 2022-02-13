// import dynamic from 'next/dynamic';

// const PriorityExample = dynamic(
//   () => import('../components/connectors/PriorityExample'),
//   { ssr: false }
// );

// const MetaMaskCard = dynamic(
//   () => import('../components/connectors/MetaMaskCard'),
//   { ssr: false }
// );
// const WalletConnectCard = dynamic(
//   () => import('../components/connectors/WalletConnectCard'),
//   { ssr: false }
// );

// imports for react
import React, { useState } from 'react';
// import {
//   Route,
//   Switch,
//   RouteComponentProps,
//   withRouter,
// } from 'react-router-dom';

// imports for next
import Head from 'next/head';

// page imports
import Home from './Home';
import Mint from './Mint';
import PageNotFound from './404';

// component imports
import Layout from '../components/Layout';
import MySpinner from '../components/MySpinner';

const App: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
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
      <Layout>
        <main className='body'>
          <Home />
        </main>
      </Layout>
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
