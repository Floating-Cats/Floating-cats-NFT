import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

// service imports
import ConnEthers from '../services/ConnEthers';

// other imports
import { toast } from 'react-toastify';

function Mint(props) {
  const [balance, setBalance] = useState('-');

  const getBalance = () => {
    ConnEthers.getBalance(props.provider, props.userAddr)
      .then((balance) => {
        setBalance(balance);
        toast.success('🐱 Balance Fetched!');
      })
      .catch((err) => {
        console.error(err.message);
        toast.error('❌ Balance Failed to Connect', err.message);
      });
  };

  const mintToken = () => {
    console.log('Mint Token!');
  };

  // get mint
  const getMint = () => {
    return (
      <>
        <div className='container' id='mint'>
          <Row>
            <Col>
              <img
                src='pics/mint-button.png'
                className='rounded mx-auto d-block'
                alt=''
                width='400'
                height='300'
                onClick={() => mintToken()}
              />
            </Col>
            <Col>
              <div className='container'>
                <div className='card-body'>
                  <h5 className='card-title'>{`Your Balance: ${balance} (in ETH)`}</h5>
                  <button
                    className='enableEthereumButton'
                    onClick={() => getBalance()}
                  >
                    Show My Balance
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return <>{getMint()}</>;
}

export default Mint;
