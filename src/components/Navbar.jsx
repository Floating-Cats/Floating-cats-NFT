import { useEffect, useState } from 'react';

// imports for bootstrap
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// to create Web3Provider object and format balance
import { ethers } from 'ethers';

import { toast } from 'react-toastify';

// css imports
import './style.css';

function Navigation() {
  const [btnHidden, setBtnHidden] = useState(false);
  const [addr, setAddr] = useState('');

  const handleOnClick = async () => {
    // get the connected account on the window etheureum object
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log('Connected Account: ', account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider
      ._getAddress(account)
      .then((address) => {
        setAddr(address.toString());
        setBtnHidden(true);
        toast('Successfully Connected to Wallet!');
        console.debug('🦄 Wallet Connected!');
      })
      .catch((err) => {
        toast.error(response.message);
        console.error('❌ Connect to Wallet Request Failed: ', err.message);
      });
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const address = await provider._getAddress(account);

    // setAddr(address.toString());
    // setBtnHidden(true);
    // toast('Successfully Connected to Wallet!');
    // console.debug('Successfully Connected to Wallet!');
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container fluid>
        <Navbar.Brand>
          <h1>
            <img
              src='pics/icon.png'
              alt=''
              width='60'
              height='60'
              className='d-inline-block align-text-top'
            />{' '}
            <img
              src='pics/logo.png'
              alt=''
              width='200'
              height='75'
              className='d-inline-block align-text-top'
            />
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto ms-auto'>
            <button
              className='navbar-toggler button'
              // type=''
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <Nav.Link href='#mint'>MINT</Nav.Link>
            <Nav.Link href='#about'>ABOUT</Nav.Link>
            <Nav.Link href='#roadmap'>ROADMAP</Nav.Link>
            <Nav.Link href='#team'>TEAM</Nav.Link>
            <button
              id='show_button'
              className='enableEthereumButton'
              onClick={() => handleOnClick()}
              hidden={btnHidden}
            >
              Connect your wallet
            </button>
            <h6>
              <span className='showAccount' hidden={!btnHidden}>
                {`${addr.substring(0, 4)}...${addr.substring(
                  addr.length - 4,
                  addr.length
                )}`}
              </span>
            </h6>
            <div className='rightside-nav navbar-nav'>
              <a target='_blank' href='#' className='nav-link'>
                <img
                  loading='lazy'
                  className='socialLogos'
                  src='pics/discord.png'
                  width='30'
                  height='30'
                />
              </a>
              <a
                target='_blank'
                href='https://twitter.com/FloatingCatsNFT'
                className='nav-link'
              >
                <img
                  loading='lazy'
                  className='socialLogos'
                  src='pics/twitter.png'
                  width='30'
                  height='30'
                />
              </a>
              <a target='_blank' href='#' className='nav-link'>
                <img
                  loading='lazy'
                  className='socialLogos'
                  src='pics/os-icon.png'
                  width='33'
                  height='33'
                  style={{ marginBottom: '5px' }}
                />
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
