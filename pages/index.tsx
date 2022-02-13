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

import Home from './Home';

import Layout from '../components/Layout';

export default function Main() {
  return (
    <Layout>
      <Home />
    </Layout>
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
}
