// react
import { useCallback, useEffect, useState } from 'react';

// imports for styling
import ListGroup from 'react-bootstrap/ListGroup';

// web3 react
import { Chain } from '../../Chain';
import { Status } from '../../Status';
import { Accounts } from '../../Accounts';
import { Network } from '@web3-react/network';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { hooks as mm_hooks, metaMask } from 'connectors/metaMask';
import { hooks as wc_hooks, walletConnect } from 'connectors/walletConnect';
import { CHAINS, getAddChainParameters, URLS } from 'chains';

// components
import MetaMaskDiv from 'components/FCWalletConnModal/FCWalletConnector/MetaMaskDiv';
import WalletConnectDiv from 'components/FCWalletConnModal/FCWalletConnector/WalletConnectDiv';

// helper function
import { handleOnClick } from 'components/helpers/HandleOnClick';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';
import { StorageInterface } from 'components/helpers/StorageInterface';

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
  const [wallet, setWallet] = useState<string>(
    navBarParams.provider && navBarParams.provider.connection.url === 'metamask'
      ? 'mm'
      : 'wc'
  );

  let connector: WalletConnect | MetaMask | any =
    wallet === 'mm' ? metaMask : walletConnect;

  let isNetwork = connector instanceof Network;
  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
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

  // stringify helper to avoid 'circular structure type error'
  // https://stackoverflow.com/a/57615112/13007073
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: any, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  // lift states up to parent + set data to local storage
  useEffect(() => {
    setChainId(chainId);
    setAccount(accounts);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);

    const userInfo: StorageInterface = {
      chainId: chainId,
      accounts: accounts,
      error: error,
      isActivating: isActivating,
      isActive: isActive,
      provider: provider,
      ENSNames: ENSNames,
    };
    // FIXME: MetaMask: 'ethereum._metamask' exposes
    //        non-standard, experimental methods.
    //        They may be removed or changed without warning.
    // see here: https://stackoverflow.com/questions/4816099
    const userInfoJson: string = JSON.stringify(
      { ...userInfo },
      getCircularReplacer()
    );
    localStorage.setItem('wc', userInfoJson);
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
        <MetaMaskDiv navBarParams={navBarParams} />
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
        <WalletConnectDiv navBarParams={navBarParams} />
      </ListGroup.Item>
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
