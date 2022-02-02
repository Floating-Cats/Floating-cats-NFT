import { useEffect, useState } from 'react';

// imports for bootstrap
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// service imports
import { ethers } from 'ethers';
import ConnEthers from '../services/ConnEthers';

// other imports
import { toast } from 'react-toastify';
import './style.css';

function Navigation({ provider, userAddr, setUserAddr }) {
  const [btnHidden, setBtnHidden] = useState(false);

  const handleOnClick = async () => {
    // get the connected account on the window etheureum object
    const account = ConnEthers.getAddress(provider)
      .then((address) => {
        setUserAddr(address.toString());
        setBtnHidden(true);
        console.debug('Successfully Connected to Wallet!');
        toast('🐱 Wallet Connected!');
      })
      .catch((err) => {
        console.error('❌ Connect to Wallet Request Failed: ', err.message);
        toast.error(response.message);
      });

    // console.log('Connected account: ', account);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider
    //   ._getAddress(account)
    //   .then((address) => {
    //     setUserAddr(address.toString());
    //     setBtnHidden(true);
    //     console.debug('Successfully Connected to Wallet!');
    //     toast('🐱 Wallet Connected!');
    //   })
    //   .catch((err) => {
    //     console.error('❌ Connect to Wallet Request Failed: ', err.message);
    //     toast.error(response.message);
    //   });
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
            {!btnHidden ? (
              <button
                id='show_button'
                className='enableEthereumButton'
                onClick={() => handleOnClick()}
              >
                Connect your wallet
              </button>
            ) : (
              <h6>
                <span className='showAccount'>
                  {`${userAddr.substring(0, 4)}...${userAddr.substring(
                    userAddr.length - 4,
                    userAddr.length
                  )}`}
                </span>
              </h6>
            )}
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
