import { useState } from 'react';

// imports for bootstrap
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// service imports
import ConnEthers from '../services/ConnEthers';

// other imports
import { toast } from 'react-toastify';
import './style.css';

function Navigation({ provider, userAddr, setUserAddr }) {
  const [btnHidden, setBtnHidden] = useState(false);
  const [balance, setBalance] = useState('-');

  const getBalance = async () => {
    ConnEthers.getBalance(provider, userAddr)
      .then((balance) => {
        setBalance(balance);
        toast.success('🐱 Balance Fetched!');
      })
      .catch((err) => {
        console.error(err.message);
        toast.error('❌ Balance Failed to Connect', err.message);
      });
  };

  const handleOnClick = async () => {
    // get the connected account on the window etheureum object
    ConnEthers.getAddress(provider)
      .then((address) => {
        setUserAddr(address.toString());
        setBtnHidden(true);
        ConnEthers.getBalance()
          .then((bal) => {
            setBalance(bal);
            console.log(bal);
            toast.success('🐱 Balance Fetched!');
          })
          .catch((err) => {
            console.error(err.message);
            toast.error('❌ Balance Failed to Fetch', err.message);
          });
        console.debug('Successfully Connected to Wallet!');
        toast('🐱 Wallet Connected!');
      })
      .catch((err) => {
        console.error('❌ Connect to Wallet Request Failed: ', err.message);
        toast.error('❌ Connect to Wallet Request Failed');
      });
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
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
        <Navbar.Collapse className='' id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/mint'>MINT</Nav.Link>
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
                <Col>
                  <Row>
                    <button className='showAccount'>
                      {`${userAddr.substring(0, 6)}...${userAddr.substring(
                        userAddr.length - 6,
                        userAddr.length
                      )}`}
                    </button>
                  </Row>
                  <Row>{`Your balance: ${balance}`}</Row>
                </Col>
              </h6>
            )}

            {/* <div className='rightside-nav navbar-nav'>
              <a
                target='_blank'
                href='https://discord.com/invite/6u9ezDyYzV'
                className='nav-link'
              >
                <img
                  loading='lazy'
                  className='socialLogos mx-auto'
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
                  className='socialLogos mx-auto'
                  src='pics/twitter.png'
                  width='30'
                  height='30'
                />
              </a>
              <a target='_blank' href='#' className='nav-link'>
                <img
                  loading='lazy'
                  className='socialLogos mx-auto'
                  src='pics/os-icon.png'
                  width='33'
                  height='33'
                  style={{ marginBottom: '5px' }}
                />
              </a>
            </div> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
