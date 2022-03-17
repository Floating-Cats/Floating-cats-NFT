// imports for styling
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// connector
import FCWalletConnector from './FCWalletConnector';

export default function FCWalletConnModal({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
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
          <ListGroup variant='flush'>
            <FCWalletConnector />
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
