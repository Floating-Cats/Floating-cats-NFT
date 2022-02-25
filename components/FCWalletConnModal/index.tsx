import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// imports for styling
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

// components
import MetaMaskDiv from '../connectors/MetaMaskDiv';
import WalletConnectDiv from '../connectors/WalletConnectDiv';
import FCWalletStatus from '../FCWalletStatus';
import { Accounts } from '../Accounts';
import { Chain } from '../Chain';
import { Status } from '../Status';

// ConnectWithSelect.tsx
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, getAddChainParameters, URLS } from '../../chains';
import { resetWalletConnector } from 'components/connectors/ResetWalletConnector'; // TODO: filepath?

// web3-react hooks imports
import { hooks, metaMask } from '../../connectors/metaMask';
import { walletConnect } from '../../connectors/walletConnect';
import { network } from '../../connectors/network';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

// type OnClickConnectType = (
//   chainId: ReturnType<Web3ReactHooks['useChainId']> | any,
//   accounts: ReturnType<Web3ReactHooks['useAccount']> | any,
//   error: ReturnType<Web3ReactHooks['useError']> | any,
//   isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any,
//   isActive: ReturnType<Web3ReactHooks['useIsActive']> | any,
//   provider: ReturnType<Web3ReactHooks['useProvider']> | any,
//   ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
// ) => void;

export default function FCWalletConnModal({
  show,
  onHide,
  setChainId,
  setAccount,
  setError,
  setIsActivating,
  setIsActive,
  setProvider,
  setENSNames,
}: {
  show: boolean;
  onHide: () => void;
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
  // states of this component
  const [connector, setConnector] = useState<
    MetaMask | WalletConnect | Network
  >(network);
  const [isNetwork, setIsNetwork] = useState<boolean>(false);
  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  );
  const [displayDefault, setDisplayDefault] = useState<boolean>(!isNetwork);
  const [chainIds, setChainIds] = useState<number[]>([]);

  // web3-react hooks
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.debug('accounts is ', accounts);
  useEffect(() => {
    setChainId(chainId);
    setAccount(accounts);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);
  }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  // react hook, useCallback
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
          // desiredChainId === -1
          //   ? undefined
          //   : getAddChainParameters(desiredChainId)
        );
      }
    },
    [connector, chainId]
  );

  // handleOnClick connects to a user's wallet
  const handleOnClick = async (
    chainId: ReturnType<Web3ReactHooks['useChainId']>,
    error: ReturnType<Web3ReactHooks['useError']>,
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>,
    isActive: ReturnType<Web3ReactHooks['useIsActive']>,
    connector: MetaMask | WalletConnect | Network /*| WalletLink*/
  ) => {
    setConnector(connector);
    setIsNetwork(connector instanceof Network);
    setDisplayDefault(!isNetwork);
    setChainIds(
      (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) =>
        Number(chainId)
      )
    );

    if (error) {
      // TODO: Add toast for feed back
      // Try again?
      console.log(`if error, ${error}, desiredChainId = ${desiredChainId}`);
      connector instanceof WalletConnect || connector instanceof Network
        ? await connector
            .activate(desiredChainId === -1 ? undefined : desiredChainId)
            .catch((err) => {
              // We need to reset walletconnect if users have closed the modal
              resetWalletConnector(connector);
            })
        : await connector.activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          );
    } else if (isActive) {
      // Disconnect
      console.log(
        `else if isActive, ${isActive}, desiredChainId = ${desiredChainId}`
      );
      await connector.deactivate();
    } else {
      // Connect
      console.log(
        `else isActivating, ${isActivating}, desiredChainId = ${desiredChainId}, connector = ${connector}`
      );
      console.debug('connector is ', connector);
      connector instanceof WalletConnect || connector instanceof Network
        ? await /*toast.promise(*/
          connector
            .activate(desiredChainId === -1 ? 1 : desiredChainId)
            .then((res) => {
              console.log('HAHAHA1');
              console.debug('res is ', res);
              toast.success('☑️ Wallet connected1');
            })
            .catch((err) => {
              console.error('ERROR1~~~', err);
              // We need to reset walletconnect if users have closed the modal
              resetWalletConnector(connector);
            })
        : //   ,
          //   {
          //     pending: '🔗 Connecting to your wallet',
          //     success: '☑️ Wallet connected',
          //     error: '⚠️ An error occurred while we connect to your wallet',
          //   }
          // )
          await /*toast.promise(*/
          connector
            .activate(
              desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
            )
            // .activate(
            //   desiredChainId === -1
            //     ? undefined
            //     : getAddChainParameters(desiredChainId)
            // )
            .then((res) => {
              console.log('HAHAHA2');
              console.debug('res is ', res);
              toast.success('☑️ Wallet connected2');
            })
            .catch((err) => {
              console.error('ERROR2~~~', err);
              toast.error(
                '⚠️ An error occurred while we connect to your wallet2'
              );
            });
      //     ,
      //   {
      //     pending: '🔗 Connecting to your wallet',
      //     success: '☑️ Wallet connected',
      //     error: '⚠️ An error occurred while we connect to your wallet',
      //   }
      // );
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <ListGroup>
            <ListGroup.Item
              action
              onClick={() => {
                handleOnClick(chainId, error, isActivating, isActive, metaMask);
              }}
            >
              <MetaMaskDiv />
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => {
                handleOnClick(
                  chainId,
                  error,
                  isActivating,
                  isActive,
                  walletConnect
                );
              }}
            >
              <WalletConnectDiv />
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
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Select({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number | any;
  switchChain: ((chainId: number) => Promise<void>) | any;
  displayDefault: boolean;
  chainIds: number[];
}) {
  return (
    <select
      value={chainId}
      onChange={(e) => {
        e.preventDefault();
        switchChain?.(Number(e.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}
