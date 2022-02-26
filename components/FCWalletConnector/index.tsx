// react
import { useCallback, useEffect, useState } from 'react';

// imports for styling
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

// web3 react
import { Chain } from '../Chain';
import { Status } from '../Status';
import { Accounts } from '../Accounts';
import { Web3ReactHooks } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { hooks as mm_hooks, metaMask } from 'connectors/metaMask';
import { hooks as wc_hooks, walletConnect } from 'connectors/walletConnect';
import { network } from 'connectors/network';
import { CHAINS, getAddChainParameters, URLS } from 'chains';

// components
import MetaMaskDiv from 'components/connectors/MetaMaskDiv';
import WalletConnectDiv from 'components/connectors/WalletConnectDiv';

// helper function
import { handleOnClick } from 'components/helpers/HandleOnClick';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';
import Select from 'components/connectors/Select';
var stringify = require('json-stringify-safe');

export default function FCWalletConnector({
  navBarParams,
  setChainId,
  setAccount,
  setError,
  setIsActivating,
  setIsActive,
  setProvider,
  setENSNames,
}: {
  navBarParams: NavBarInterface;
  setChainId: (chainId: Web3ReactType['chainId']) => void;
  setAccount: (accounts: Web3ReactType['accounts']) => void;
  setError: (error: Web3ReactType['error']) => void;
  setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  setIsActive: (isActive: Web3ReactType['isActive']) => void;
  setProvider: (provider: Web3ReactType['provider']) => void;
  setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
}) {
  // component state
  const [wallet, setWallet] = useState<string | any>('');
  const [connector, setConnector] = useState<WalletConnect | any>(
    wallet === 'mm' ? metaMask : walletConnect
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

  // web3 react
  const {
    useChainId,
    useAccounts,
    useError,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = wallet === 'mm' ? mm_hooks : wc_hooks;
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // lift states up to parent + set data to local storage
  useEffect(() => {
    setChainId(chainId);
    setAccount(accounts);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);

    window.localStorage.setItem(
      'wc',
      stringify([
        {
          chainId: chainId,
          accounts: accounts,
          error: error,
          isActivating: isActivating,
          isActive: isActive,
          provider: provider,
          ENSNames: ENSNames,
        },
      ])
    );

    // let wallet = window.localStorage.setItem({
    //   chainId: chainId,
    //   accounts: accounts,
    // });
    return wallet;
  }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  // react hook, useCallback, when user switches chain
  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        connector.activate(
          desiredChainId === -1 ? 1 : desiredChainId
          // desiredChainId === -1 ? undefined : desiredChainId
        );
      } else {
        connector.activate(
          desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
        );
      }
    },
    [connector, chainId]
  );

  return (
    <>
      <ListGroup.Item
        action
        onClick={() => {
          setWallet('mm');
          handleOnClick(
            chainId,
            error,
            isActivating,
            isActive,
            metaMask,
            desiredChainId
          );
        }}
      >
        <MetaMaskDiv
          navBarParams={navBarParams}
          switchChain={switchChain}
          chainId={chainId}
          accounts={accounts}
          error={error}
          isActivating={isActivating}
          isActive={isActive}
          provider={provider}
          ENSNames={ENSNames}
        />
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => {
          setWallet('wc');
          handleOnClick(
            chainId,
            error,
            isActivating,
            isActive,
            walletConnect,
            desiredChainId
          );
        }}
      >
        <WalletConnectDiv
          navBarParams={navBarParams}
          switchChain={switchChain}
          chainId={chainId}
          accounts={accounts}
          error={error}
          isActivating={isActivating}
          isActive={isActive}
          provider={provider}
          ENSNames={ENSNames}
        />
      </ListGroup.Item>
      {/* debug */}
      <ListGroup.Item>
        {/* <h5>DEBUG SECTION</h5> */}
        {/* <Select
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={[1, 4]}
        /> */}
        <h5>Account Status</h5>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </ListGroup.Item>
    </>
  );
}
