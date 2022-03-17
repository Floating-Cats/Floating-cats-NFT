// react
import { useCallback, useEffect, useState } from 'react';

// imports for styling
import ListGroup from 'react-bootstrap/ListGroup';

// web3 react
import { Chain } from '../../Chain';
import { Status } from '../../Status';
import { Accounts } from '../../Accounts';
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
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
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

  const onClickConnectWallet: (currentConnector, name) => void = (
    currentConnector,
    name
  ) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name], (error) => {
      if (error) {
        setActivatingConnector(undefined);
        console.log('ERROR~~~', error);
      }
    });
  };

  return (
    <>
      {
        /* if no wallet is connected */
        !active ? (
          Object.keys(connectorsByName).map((name: string) => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;
            return (
              <ListGroup.Item
                action
                key={name}
                onClick={() => {
                  onClickConnectWallet(currentConnector, name);
                }}
              >
                {
                  // metamask
                  name === ConnectorNames.Injected ? (
                    <MetaMaskDiv />
                  ) : // wallet connect
                  name === ConnectorNames.WalletConnect ? (
                    <WalletConnectDiv />
                  ) : null
                }
              </ListGroup.Item>
            );
          })
        ) : active || error ? (
          /* if a wallet is connected */

          <ListGroup.Item action onClick={() => deactivate()}>
            {
              // metamask
              library &&
              library.connection &&
              library.connection.url === 'metamask' ? (
                <MetaMaskDiv />
              ) : // wallet connect
              library &&
                library.connection &&
                library.connection.url === 'eip-1193:' ? (
                <WalletConnectDiv />
              ) : null
            }
          </ListGroup.Item>
        ) : null
      }

      <ListGroup.Item>
        {/* <h5>DEBUG SECTION</h5> */}
        {/* <Select
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={[1, 4]}
        /> */}
        <h5>Account Status</h5>
        <Status />
        <Chain />
        <Accounts />
      </ListGroup.Item>
    </>
  );
}
