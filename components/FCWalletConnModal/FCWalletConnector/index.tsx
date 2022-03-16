// react
import { useCallback, useEffect, useState } from 'react';

// imports for styling
import ListGroup from 'react-bootstrap/ListGroup';

// web3 react
// import { Chain } from '../../Chain';
// import { Status } from '../../Status';
// import { Accounts } from '../../Accounts';
// import { Network } from '@web3-react/network';
// import { MetaMask } from '@web3-react/metamask';
// import { WalletConnect } from '@web3-react/walletconnect';
// import { hooks as mm_hooks, metaMask } from 'connectors/metaMask';
// import { hooks as wc_hooks, walletConnect } from 'connectors/walletConnect';
// import { CHAINS, getAddChainParameters, URLS } from 'chains';

// components
import MetaMaskDiv from 'components/FCWalletConnModal/FCWalletConnector/MetaMaskDiv';
import WalletConnectDiv from 'components/FCWalletConnModal/FCWalletConnector/WalletConnectDiv';
import FCWalletSpinner from 'components/FCWalletSpinner';

// web3 react

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';

import { useEagerConnect, useInactiveListener } from '../../../hooks';
import {
  injected,
  // network,
  walletconnect,
  // walletlink,
  // ledger,
  // trezor,
  // lattice,
  // frame,
  // authereum,
  // fortmatic,
  // magic,
  // portis,
  // torus,
} from '../../../connectors';

enum ConnectorNames {
  Injected = 'Injected',
  // Network = 'Network',
  WalletConnect = 'WalletConnect',
  // WalletLink = 'WalletLink',
  // Ledger = 'Ledger',
  // Trezor = 'Trezor',
  // Lattice = 'Lattice',
  // Frame = 'Frame',
  // Authereum = 'Authereum',
  // Fortmatic = 'Fortmatic',
  // Magic = 'Magic',
  // Portis = 'Portis',
  // Torus = 'Torus',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Lattice]: lattice,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Magic]: magic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Torus]: torus,
};

export default function FCWalletConnector() {
  console.log('1');
  // web3 react
  const context = useWeb3React<Web3Provider>();
  console.log('2');
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

  console.log(context);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      {/* <ListGroup.Item action onClick={() => {}} className='borderless'>
        <MetaMaskDiv />
      </ListGroup.Item> */}
      {Object.keys(connectorsByName).map((name) => {
        const currentConnector = connectorsByName[name];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled =
          !triedEager || !!activatingConnector || connected || !!error;

        console.log('here');
        console.log('connectorsByName[name] = ', connectorsByName[name]);
        return (
          <ListGroup.Item
            action
            className='borderless'
            onClick={() => {
              setActivatingConnector(currentConnector);
              activate(connectorsByName[name], (error) => {
                if (error) {
                  setActivatingConnector(undefined);
                  console.log('ERROR~~~', error);
                }
              });
            }}
          >
            {name === ConnectorNames.Injected ? (
              <MetaMaskDiv />
            ) : name === ConnectorNames.WalletConnect ? (
              <WalletConnectDiv />
            ) : (
              <></>
            )}
          </ListGroup.Item>
        );
      })}

      <ListGroup.Item>
        {/* <h5>DEBUG SECTION</h5> */}
        {/* <Select
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={[1, 4]}
        /> */}
        <h5>Account Status</h5>
        {/* <Status isActivating={isActivating} error={error} isActive={isActive} /> */}
        <div style={{ marginBottom: '1rem' }} />
        {/* <Chain chainId={chainId} /> */}
        {/* <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} /> */}
      </ListGroup.Item>
    </>
  );
}
