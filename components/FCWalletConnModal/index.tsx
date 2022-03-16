import dynamic from 'next/dynamic';

// imports for styling
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

// components
// const FCWalletConnector = dynamic(
//   () => import('components/FCWalletConnModal/FCWalletConnector'),
//   {
//     ssr: false,
//   }
// );

// helper function
import FCWalletConnector from 'components/FCWalletConnModal/FCWalletConnector';
import { NavBarInterface } from 'components/helpers/ParamsInterface';
import { Web3ReactType } from 'components/helpers/Web3ReactType';

export default function FCWalletConnModal({
  // component
  show,
  onHide,
}: // navBarParams,
// // web3 react
// setChainId,
// setAccount,
// setError,
// setIsActivating,
// setIsActive,
// setProvider,
// setENSNames,
{
  // component
  show: boolean;
  onHide: () => void;
  // navBarParams: NavBarInterface;
  // // web3 react
  // setChainId: (chainId: Web3ReactType['chainId']) => void;
  // setAccount: (accounts: Web3ReactType['accounts']) => void;
  // setError: (error: Web3ReactType['error']) => void;
  // setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  // setIsActive: (isActive: Web3ReactType['isActive']) => void;
  // setProvider: (provider: Web3ReactType['provider']) => void;
  // setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
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
            // navBarParams={navBarParams}
            // setChainId={setChainId}
            // setAccount={setAccount}
            // setError={setError}
            // setIsActivating={setIsActivating}
            // setIsActive={setIsActive}
            // setProvider={setProvider}
            // setENSNames={setENSNames}
            />
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
