import { useState } from 'react';
// import dynamic from 'next/dynamic';

// imports for stylings
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

// components
import FCWalletConnModal from 'components/FCWalletConnModal';

// types
import type { Web3ReactHooks } from '@web3-react/core';

// const FCWalletConnModal = dynamic(() => import('../../FCWalletConnModal'), {
//   ssr: false,
// });

interface NavBarInterface {
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}

type Web3ReactType = {
  chainId: ReturnType<Web3ReactHooks['useChainId']> | any;
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  error: ReturnType<Web3ReactHooks['useError']> | any;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any;
  isActive: ReturnType<Web3ReactHooks['useIsActive']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any;
};

export function FCNavbar({
  // component
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
  navBarParams: NavBarInterface;
  // web3 react
  // web3 react
  setChainId: (chainId: Web3ReactType['chainId']) => void;
  setAccount: (accounts: Web3ReactType['accounts']) => void;
  setError: (error: Web3ReactType['error']) => void;
  setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  setIsActive: (isActive: Web3ReactType['isActive']) => void;
  setProvider: (provider: Web3ReactType['provider']) => void;
  setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
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

  console.log('navbar printing navBarParams.accounts ', navBarParams.accounts);
  console.log('navbar printing {...navbarParams} ', { ...navBarParams });

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
            {/* <Button onClick={() => setShowModal(true)}>Connect</Button> */}
            {navBarParams.accounts ? (
              <Button onClick={() => setShowModal(true)}>My Wallet Info</Button>
            ) : (
              <Button onClick={() => setShowModal(true)}>Connect</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <FCWalletConnModal
        show={showModal}
        onHide={() => setShowModal(false)}
        navBarParams={navBarParams}
        setChainId={setChainId}
        setAccount={setAccount}
        setError={setError}
        setIsActivating={setIsActivating}
        setIsActive={setIsActive}
        setProvider={setProvider}
        setENSNames={setENSNames}
      />
    </Navbar>
  );
}
