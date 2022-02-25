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
// import MetaMaskDiv from '../connectors/MetaMaskDiv';
// import WalletConnectDiv from '../connectors/WalletConnectDiv';
import { Accounts } from '../Accounts';
import { Chain } from '../Chain';
import { Status } from '../Status';
const FCWalletConnector = dynamic(
  () => import('components/FCWalletConnector'),
  {
    ssr: false,
  }
);

// ConnectWithSelect.tsx
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, getAddChainParameters, URLS } from '../../chains';
import { resetWalletConnector } from 'components/connectors/ResetWalletConnector'; // TODO: filepath?

// web3-react hooks imports
import { metaMask } from '../../connectors/metaMask';
import { hooks, walletConnect } from '../../connectors/walletConnect';

// helper function
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';

export default function FCWalletConnModal({
  // component
  show,
  onHide,
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
  // component
  show: boolean;
  onHide: () => void;
  navBarParams: NavBarInterface;
  // web3 react
  setChainId: (chainId: Web3ReactType['chainId']) => void;
  setAccount: (accounts: Web3ReactType['accounts']) => void;
  setError: (error: Web3ReactType['error']) => void;
  setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  setIsActive: (isActive: Web3ReactType['isActive']) => void;
  setProvider: (provider: Web3ReactType['provider']) => void;
  setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
}) {
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
            <FCWalletConnector
              navBarParams={navBarParams}
              setChainId={setChainId}
              setAccount={setAccount}
              setError={setError}
              setIsActivating={setIsActivating}
              setIsActive={setIsActive}
              setProvider={setProvider}
              setENSNames={setENSNames}
            />
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
