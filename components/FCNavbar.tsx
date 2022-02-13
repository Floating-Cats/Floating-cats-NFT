import { useState } from 'react';

// imports for bootstrap
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// other imports
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';

// const PriorityExample = dynamic(
//   () => import('../components/connectors/PriorityExample'),
//   { ssr: false }
// );

const MetaMaskCard = dynamic(() => import('./connectors/MetaMaskCard'), {
  ssr: false,
});
const WalletConnectCard = dynamic(
  () => import('./connectors/WalletConnectCard'),
  { ssr: false }
);

function WalletConnectModal(props: { show: boolean; onHide: any }) {
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
          <MetaMaskCard />
          <WalletConnectCard />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function FCNavbar() {
  const [showModal, setShowModal] = useState<boolean | any>(false);

  const getNavBrand = () => {
    return (
      <h1>
        <img
          src={'/icon.png'}
          alt=''
          width='30'
          height='30'
          className='d-inline-block align-text-top'
        />{' '}
        <img
          src={'/logo.png'}
          alt=''
          width='200'
          height='25'
          className='d-inline-block align-text-top'
        />
      </h1>
    );
  };

  const onClickConnectWallet = () => {
    setShowModal(true);
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' id='Nav'>
      <Container>
        <Navbar.Brand href='/'>{getNavBrand()}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse className='' id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/Mint'>MINT</Nav.Link>
            <Nav.Link href='#about'>ABOUT</Nav.Link>
            <Nav.Link href='#roadmap'>ROADMAP</Nav.Link>
            <Nav.Link href='#team'>TEAM</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Button onClick={() => onClickConnectWallet()}>Connect</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <WalletConnectModal show={showModal} onHide={() => setShowModal(false)} />
    </Navbar>
  );
}
