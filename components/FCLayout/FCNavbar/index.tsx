import { useState } from 'react';

// imports for stylings
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// components
import FCWalletConnModal from 'components/FCWalletConnModal';

// web3 react
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export function FCNavbar() {
  const [showModal, setShowModal] = useState<boolean | any>(false);

  // web3 react
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  console.log(context);

  const getNavBrand = () => {
    return (
      <h1>
        <img
          src={'/icon.png'}
          alt=''
          width='38'
          height='30'
          className='d-inline-block align-text-top'
        />{' '}
        <img
          src={'/logo.png'}
          alt=''
          width='200'
          height='28'
          className='d-inline-block align-text-top'
        />
      </h1>
    );
  };

  const setShowModelTo = (
    e: React.MouseEvent<Element, MouseEvent>,
    show: boolean
  ): void => {
    e.preventDefault();
    setShowModal(show);
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' id='Nav'>
      <Container>
        <Navbar.Brand href='/'>{getNavBrand()}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mx-auto'>
            <Nav.Link href='/mint' id='navmint'>
              MINT
            </Nav.Link>
            <Nav.Link href='/#about'>ABOUT</Nav.Link>
            <Nav.Link href='/#roadmap'>ROADMAP</Nav.Link>
            <Nav.Link href='/#DNA'>DNA</Nav.Link>
            <Nav.Link href='/#team'>TEAM</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {account ? (
              <Button
                variant='outline-light'
                onClick={(e) => setShowModelTo(e, true)}
              >
                My Wallet Info
              </Button>
            ) : (
              <Button
                variant='outline-light'
                onClick={(e) => setShowModelTo(e, true)}
              >
                Connect
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <FCWalletConnModal show={showModal} onHide={() => setShowModal(false)} />
    </Navbar>
  );
}
