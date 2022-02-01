import React, { Component } from 'react';

// imports for bootstrap
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './style.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getNavbar() {}

  render() {
    return (
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container fluid>
          <Navbar.Brand>
            <h3>
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
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {/* <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id="navbarScroll"> */}
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
                // onclick='hideButton(this)'
                className='enableEthereumButton'
                id='show_button'
              >
                Connect your wallet
              </button>
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
                    // style='margin-bottom: 5px'
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
}

export default Navigation;
