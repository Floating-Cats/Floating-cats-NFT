// react
import { useCallback, useEffect, useState } from 'react';

// imports for styling
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

// imports for components
import Select from 'components/connectors/Select';

// web3 react
import { Accounts } from '../Accounts';
import { Chain } from '../Chain';
import { Status } from '../Status';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import type { Web3ReactHooks } from '@web3-react/core';
import { CHAINS, getAddChainParameters, URLS } from 'chains';
import { hooks, metaMask } from 'connectors/metaMask';
import { network } from 'connectors/network';

// helper function
import { handleOnClick } from 'components/connectors/HandleOnClick';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';

export default function MetaMaskDiv({
  // components
  navBarParams,
  switchChain,
  // web3 react
  chainId,
  accounts,
  error,
  isActivating,
  isActive,
  provider,
  ENSNames,
}: {
  // components
  navBarParams: NavBarInterface;
  switchChain: (desiredChainId: number) => void;
  // web3 react
  chainId: Web3ReactType['chainId'];
  accounts: Web3ReactType['accounts'];
  error: Web3ReactType['error'];
  isActivating: Web3ReactType['isActivating'];
  isActive: Web3ReactType['isActive'];
  provider: Web3ReactType['provider'];
  ENSNames: Web3ReactType['ENSNames'];
}) {
  const getHeader = () => {
    return (
      <>
        <h1>
          <img src={'../../MetaMask-icon.svg'} alt='' width='60' />
        </h1>
        <h3>MetaMask</h3>
      </>
    );
  };

  return (
    <>
      {
        // if an account is connected
        navBarParams.accounts ? (
          // if the provider exists and user connects via 'metamask'
          navBarParams.provider &&
          navBarParams.provider.connection.url === 'metamask' ? (
            <>
              {getHeader()}
              <h6>Open your Metamask extension to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : (
            <>{/* <img src={'../../About.GIF'} alt='' width='60' /> */}</>
          )
        ) : (
          // else no wallet connected at the moment
          <>
            <>
              {getHeader()}
              <h6>Connect to your MetaMask Wallet</h6>
            </>
          </>
        )
      }
    </>
  );
}
