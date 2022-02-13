import { useState } from 'react';

// imports for bootstrap
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// img imports
import icon from '../public/icon.png';
import logo from '../public/logo.png';

// other imports
import { toast } from 'react-toastify';

export function FCNavbar() {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' id='Nav'>
      <Container>
        <Navbar.Brand href='/'>
          <h1>
            <img
              src={icon}
              alt=''
              width='30'
              height='30'
              className='d-inline-block align-text-top'
            />{' '}
            <img
              src={logo}
              alt=''
              width='200'
              height='25'
              className='d-inline-block align-text-top'
            />
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse className='' id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/mint'>MINT</Nav.Link>
            <Nav.Link href='#about'>ABOUT</Nav.Link>
            <Nav.Link href='#roadmap'>ROADMAP</Nav.Link>
            <Nav.Link href='#team'>TEAM</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Button>Connect</Button>

            {/* {!btnHidden ? (
              <div>
                <Col>
                  <Row>
                    <button
                      id='show_button'
                      className='enableEthereumButton'
                      onClick={() => handleOnClick()}
                    >
                      Connect your wallet
                    </button>
                  </Row>
                  <Row>
                    <span>Not Connected</span>
                  </Row>
                </Col>
              </div>
            ) : (
              <h6>
                <button className='showAccount'>
                  {`${userAddr.substring(0, 6)}...${userAddr.substring(
                    userAddr.length - 6,
                    userAddr.length
                  )}`}
                </button>
              </h6>
            )} */}

            {/* <div className='rightside-nav navbar-nav'>
              <a
                target='_blank'
                href='https://discord.com/invite/6u9ezDyYzV'
                className='nav-link'
              >
                <img
                  loading='lazy'
                  className='socialLogos mx-auto'
                  src='public/discord.png'
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
                  src='public/twitter.png'
                  width='30'
                  height='30'
                />
              </a>
              <a target='_blank' href='#' className='nav-link'>
                <img
                  loading='lazy'
                  className='socialLogos mx-auto'
                  src='public/os-icon.png'
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
