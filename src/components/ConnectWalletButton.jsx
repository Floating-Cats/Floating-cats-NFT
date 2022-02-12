import { useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';

import './style.css';

const ConnectWalletButton = (props) => {
  return (
    <>
      <Col>
        <Row>
          <Button
            id='connect_btn'
            // className='enableEthereumButton'
            // onClick={() => connect()}
            variant='light'
          >
            Connect your wallet
          </Button>
          {false ? (
            <span>
              Connected with <b>{account}</b>
            </span>
          ) : (
            <span>Not connected</span>
          )}
        </Row>
      </Col>
      <Col>
        <Row>
          {/* <Button
        id='disconnect_btn'
        className='enableEhereumButton'
        onClick={() => disconnect()}
      >
        Disconnect
      </Button> */}
          <Button
            id='disconnect_btn'
            // className='enableEhereumButton'
            onClick={() => {
              console.log('hi');
            }}
            variant='light'
            disabled
          >
            addr
          </Button>
          {false ? (
            <span>
              Connected with <b>{account | 'NULL'}</b>
            </span>
          ) : (
            <span>Not connected</span>
          )}
        </Row>
      </Col>
    </>
  );
};

export default ConnectWalletButton;
