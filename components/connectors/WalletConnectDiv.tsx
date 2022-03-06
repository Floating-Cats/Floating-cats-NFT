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
import { hooks, walletConnect } from 'connectors/walletConnect';
import { network } from 'connectors/network';

// helper function
import { handleOnClick } from 'components/helpers/HandleOnClick';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function WalletConnectDiv({
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
  // component state
  const [connector, setConnector] = useState<WalletConnect | any>(
    walletConnect
  );
  const [isNetwork, setIsNetwork] = useState<boolean>(
    connector instanceof Network
  );
  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  );
  const [displayDefault, setDisplayDefault] = useState<boolean>(!isNetwork);
  const [chainIds, setChainIds] = useState<number[]>(
    (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) =>
      Number(chainId)
    )
  );

  const getHeader = () => {
    return (
      <>
        <h1>
          <img src={'/WalletConnect-icon.svg'} alt='' width='60' />
        </h1>
        <h3>Wallet Connect</h3>
      </>
    );
  };

  return (
    <>
      {
        // if an account is connected
        navBarParams.accounts ? (
          // if the provider exists and user connects via 'wallet connect'
          navBarParams.provider &&
          navBarParams.provider.connection.url === 'eip-1193:' ? (
            <>
              {getHeader()}
              <h6>Open your phone to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : (
            <>{/* <img src={'../../About.GIF'} alt='' width='60' /> */}</>
          )
        ) : (
          // else no wallet connected at the moment
          <>
            {getHeader()}
            <h6>Scan with WalletConnect to Connect</h6>
          </>
        )
      }
    </>
  );
}
