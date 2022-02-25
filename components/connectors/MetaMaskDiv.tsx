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

interface NavBarInterface {
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function MetaMaskDiv({
  // components
  navBarParams,
  // web3 react
  setChainId,
  setAccount,
  setError,
  setIsActivating,
  setIsActive,
  setProvider,
  setENSNames,
}: {
  // components
  navBarParams: NavBarInterface;
  // web3 react
  setChainId: (chainId: ReturnType<Web3ReactHooks['useChainId']> | any) => void;
  setAccount: (
    accounts: ReturnType<Web3ReactHooks['useAccount']> | any
  ) => void;
  setError: (error: ReturnType<Web3ReactHooks['useError']> | any) => void;
  setIsActivating: (
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any
  ) => void;
  setIsActive: (
    isActive: ReturnType<Web3ReactHooks['useIsActive']> | any
  ) => void;
  setProvider: (
    provider: ReturnType<Web3ReactHooks['useProvider']> | any
  ) => void;
  setENSNames: (
    ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
  ) => void;
}) {
  // component state
  const [connector, setConnector] = useState<MetaMask | any>(metaMask);
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

  // web3-react hooks
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    setChainId(chainId);
    setAccount(accounts);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);
  }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  // react hook, useCallback, when user switches chain
  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(
          desiredChainId === -1 ? 1 : desiredChainId
          // desiredChainId === -1 ? undefined : desiredChainId
        );
      } else {
        await connector.activate(
          desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
        );
      }
    },
    [connector, chainId]
  );

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
              <ListGroup.Item
                action
                onClick={() => {
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
                <>
                  {getHeader()}
                  <h6>Click to disconnect</h6>
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <Select
                  chainId={desiredChainId}
                  switchChain={switchChain}
                  displayDefault={displayDefault}
                  chainIds={[1, 4]}
                />
                <Status
                  isActivating={isActivating}
                  error={error}
                  isActive={isActive}
                />
                <div style={{ marginBottom: '1rem' }} />
                <Chain chainId={chainId} />
                <Accounts
                  accounts={accounts}
                  provider={provider}
                  ENSNames={ENSNames}
                />
              </ListGroup.Item>
            </>
          ) : (
            // else display none in the modal
            <></>
          )
        ) : (
          // else no wallet connected at the moment
          <>
            <ListGroup.Item
              action
              onClick={() => {
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
              <>
                {getHeader()}
                <h6>Connect to your MetaMask Wallet</h6>
              </>
            </ListGroup.Item>

            {/* debug */}
            <ListGroup.Item>
              <p>DEBUG</p>
              <Select
                chainId={desiredChainId}
                switchChain={switchChain}
                displayDefault={displayDefault}
                chainIds={[1, 4]}
              />
              <Status
                isActivating={isActivating}
                error={error}
                isActive={isActive}
              />
              <div style={{ marginBottom: '1rem' }} />
              <Chain chainId={chainId} />
              <Accounts
                accounts={accounts}
                provider={provider}
                ENSNames={ENSNames}
              />
            </ListGroup.Item>
          </>
        )
      }
    </>
  );
}
