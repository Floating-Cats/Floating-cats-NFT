import { useState } from 'react';
import dynamic from 'next/dynamic';

// imports for stylings
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

// types
import type { Web3ReactHooks } from '@web3-react/core';

const FCWalletConnModal = dynamic(() => import('../../FCWalletConnModal'), {
  ssr: false,
});

type OnClickConnectType = (
  chainId: ReturnType<Web3ReactHooks['useChainId']> | any,
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any,
  error: ReturnType<Web3ReactHooks['useError']> | any,
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any,
  isActive: ReturnType<Web3ReactHooks['useIsActive']> | any,
  provider: ReturnType<Web3ReactHooks['useProvider']> | any,
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any
) => void;

export function FCNavbar({
  onClickConnect,
}: {
  onClickConnect: OnClickConnectType;
}) {
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

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' id='Nav'>
      <Container>
        <Navbar.Brand href='/'>{getNavBrand()}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/Mint'>MINT</Nav.Link>
            <Nav.Link href='/#about'>ABOUT</Nav.Link>
            <Nav.Link href='/#roadmap'>ROADMAP</Nav.Link>
            <Nav.Link href='/#team'>TEAM</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {
              // change the button to a badge or disbled button after users connects to their wallet
            }
            <Button onClick={() => setShowModal(true)}>Connect</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <FCWalletConnModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onClickConnect={onClickConnect}
      />
    </Navbar>
  );
}
