import { useState } from 'react';

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

  const printAddr = () => {
    console.log(account);
  };

  return (
    <>
      <button
        id='connect_btn'
        className='enableEthereumButton'
        onClick={() => connect()}
      >
        Connect your wallet
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      {/* <button
        id='disconnect_btn'
        className='enableEhereumButton'
        onClick={() => disconnect()}
      >
        Disconnect
      </button> */}
      <button
        id='disconnect_btn'
        className='enableEhereumButton'
        onClick={() => printAddr()}
      >
        addr
      </button>
    </>
  );
};

export default ConnectWalletButton;
