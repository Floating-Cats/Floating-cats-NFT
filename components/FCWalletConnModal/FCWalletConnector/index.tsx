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

// helper function
import { OnClickConnectWallet } from 'components/helpers/OnClickConnectWallet';
import { NavBarInterface } from 'components/helpers/ParamsInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';
import { StorageInterface } from 'components/helpers/StorageInterface';

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
  // component state
  // const [wallet, setWallet] = useState<string>(
  //   navBarParams.provider && navBarParams.provider.connection.url === 'metamask'
  //     ? 'mm'
  //     : 'wc'
  // );

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

  // let connector: WalletConnect | MetaMask | any =
  //   wallet === 'mm' ? metaMask : walletConnect;

  // let isNetwork = connector instanceof Network;
  // const [desiredChainId, setDesiredChainId] = useState<number>(
  //   isNetwork ? 1 : -1
  // );

  // web3 react
  // const {
  //   useChainId,
  //   useAccounts,
  //   useError,
  //   useIsActivating,
  //   useIsActive,
  //   useProvider,
  //   useENSNames,
  // } = wallet === 'mm' ? mm_hooks : wc_hooks;
  // const chainId = useChainId();
  // const accounts = useAccounts();
  // const error = useError();
  // const isActivating = useIsActivating();
  // const isActive = useIsActive();
  // const provider = useProvider();
  // const ENSNames = useENSNames(provider);

  // stringify helper to avoid 'circular structure type error'
  // https://stackoverflow.com/a/57615112/13007073
  // const getCircularReplacer = () => {
  //   const seen = new WeakSet();
  //   return (key: any, value: any) => {
  //     if (typeof value === 'object' && value !== null) {
  //       if (seen.has(value)) {
  //         return;
  //       }
  //       seen.add(value);
  //     }
  //     return value;
  //   };
  // };

  // lift states up to parent + set data to local storage
  // useEffect(() => {
  // setChainId(chainId);
  // setAccount(accounts);
  // setError(error);
  // setIsActivating(isActivating);
  // setIsActive(isActive);
  // setProvider(provider);
  // setENSNames(ENSNames);

  // const userInfo: StorageInterface = {
  //   chainId: chainId,
  //   accounts: accounts,
  //   error: error,
  //   isActivating: isActivating,
  //   isActive: isActive,
  //   provider: provider,
  //   ENSNames: ENSNames,
  // };
  // FIXME: MetaMask: 'ethereum._metamask' exposes
  //        non-standard, experimental methods.
  //        They may be removed or changed without warning.
  // see here: https://stackoverflow.com/questions/4816099
  //   const userInfoJson: string = JSON.stringify(
  //     { ...userInfo },
  //     getCircularReplacer()
  //   );
  //   localStorage.setItem('wc', userInfoJson);
  // }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  // react hook, useCallback, when user switches chain
  // const switchChain = useCallback(
  //   (desiredChainId: number) => {
  //     setDesiredChainId(desiredChainId);
  //     // if we're already connected to the desired chain, return
  //     if (desiredChainId === chainId) return;
  //     // if they want to connect to the default chain and we're already connected, return
  //     if (desiredChainId === -1 && chainId !== undefined) return;

  //     if (connector instanceof WalletConnect || connector instanceof Network) {
  //       connector.activate(
  //         desiredChainId === -1 ? 1 : desiredChainId
  //         // desiredChainId === -1 ? undefined : desiredChainId
  //       );
  //     } else {
  //       connector.activate(
  //         desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
  //       );
  //     }
  //   },
  //   [connector, chainId]
  // );

  // console.log('FC WALLET CONNECTOR');
  // console.log(`provider = `, typeof provider);
  // console.log(provider);
  // console.log(provider?.getSigner());

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

        return (
          <ListGroup.Item action onClick={() => {}} className='borderless'>
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating
                  ? 'orange'
                  : connected
                  ? 'green'
                  : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative',
              }}
              disabled={disabled}
              key={name}
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
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem',
                }}
              >
                {activating && (
                  <FCWalletSpinner
                    color={'black'}
                    style={{ height: '25%', marginLeft: '-1rem' }}
                  />
                )}
                {connected && (
                  <span role='img' aria-label='check'>
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          </ListGroup.Item>
        );
      })}

      {/* <ListGroup.Item
        action
        onClick={() => {
          setWallet('mm');
          OnClickConnectWallet(
            chainId,
            error,
            isActivating,
            isActive,
            metaMask,
            desiredChainId
          );
        }}
      >
        <MetaMaskDiv navBarParams={navBarParams} />
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => {
          setWallet('wc');
          OnClickConnectWallet(
            chainId,
            error,
            isActivating,
            isActive,
            walletConnect,
            desiredChainId
          );
        }}
      >
        <WalletConnectDiv navBarParams={navBarParams} />
      </ListGroup.Item> */}
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
