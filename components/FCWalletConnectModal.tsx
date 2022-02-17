import dynamic from 'next/dynamic';
// imports for bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MetaMaskDiv = dynamic(() => import('./connectors/MetaMaskDiv'), {
  ssr: false,
});
const WalletConnectDiv = dynamic(
  () => import('./connectors/WalletConnectDiv'),
  { ssr: false }
);

export default function FCWalletConnectModal(props: {
  show: boolean;
  onHide: any;
}) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row className='justify-content-center'>
          <ListGroup defaultActiveKey='#link1'>
            <MetaMaskDiv />
            <WalletConnectDiv />
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
