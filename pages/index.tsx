import React from 'react';
import { useEffect, useState } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';

// styling
import { ToastContainer } from 'react-toastify';

// components
import Home from './Home';
import FCLayout from '../components/FCLayout';

import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const getLibrary: (
  provider?: any,
  connector?: any // AbstractConnectorInterface
) => any = (provider, connector) => {
  return new Web3Provider(provider);
};

function App(): JSX.Element {
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
      <FCLayout>
        <Home />
      </FCLayout>
      <ToastContainer
        position='top-center'
        theme='dark'
        autoClose={2000} // 1000 ms = 1sec
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

export default function ({ pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
        {
          // prevent Next.js from trying to render anything on the server
          // unless the window object is defined.
          typeof window === 'undefined' ? null : <App {...pageProps} />
        }
      </div>
    </Web3ReactProvider>
  );
}
