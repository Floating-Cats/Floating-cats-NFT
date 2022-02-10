import { useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';

import { injected } from '../services/connector';
import { useWeb3React } from '@web3-react/core';

import './style.css';

const ConnectWalletButton = (props) => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    await activate(injected)
      .then(() => {
        console.debug('wallet connected');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const disconnect = async () => {
    await deactivate()
      .then(() => {
        console.debug('wallet disconnected');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Col>
        <Row>
          <Button
            id='connect_btn'
            // className='enableEthereumButton'
            onClick={() => connect()}
            variant='light'
          >
            Connect your wallet
          </Button>
          {active ? (
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
          {active ? (
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
