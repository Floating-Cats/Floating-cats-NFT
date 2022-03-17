// react
import { useEffect, useState } from 'react';

// imports for styling
import { toast } from 'react-toastify';
import ListGroup from 'react-bootstrap/ListGroup';

// components
import { Chain } from '../../Chain';
import { Status } from '../../Status';
import { Accounts } from '../../Accounts';
import FCWalletSpinner from 'components/FCWalletSpinner';
import MetaMaskDiv from 'components/FCWalletConnModal/FCWalletConnector/MetaMaskDiv';
import WalletConnectDiv from 'components/FCWalletConnModal/FCWalletConnector/WalletConnectDiv';

// web3 react
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
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
        toast.error('⚠️ An error occurred during connection! ', error);
      }
    });
  };

  const onClickDisconnectWallet: () => void = () => {
    deactivate();
    toast('🦄 Wallet Signed Out!');
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
                {activating && (
                  <FCWalletSpinner
                    color={'black'}
                    style={{ height: '25%', marginLeft: '-1rem' }}
                  />
                )}
              </ListGroup.Item>
            );
          })
        ) : active || error ? (
          /* if a wallet is connected */

          <ListGroup.Item action onClick={onClickDisconnectWallet}>
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
        <h5>Account Status</h5>
        <Status />
        <Chain />
        <Accounts />
      </ListGroup.Item>
    </>
  );
}
