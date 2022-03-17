import { AppProps } from 'next/app';
import Head from 'next/head';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

// web3react provider
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import FCLayout from 'components/FCLayout';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/icon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Floating Cats</title>
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
      <Web3ReactProvider getLibrary={getLibrary}>
        <FCLayout>
          <div>
            {
              // prevent Next.js from trying to render anything on the server
              // unless the window object is defined.
              typeof window === 'undefined' ? null : (
                <Component {...pageProps} />
              )
            }
          </div>
        </FCLayout>
      </Web3ReactProvider>
    </>
  );
}
