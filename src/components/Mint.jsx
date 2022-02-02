import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function Mint(props) {
  const [balance, setBalance] = useState('-');
  const getBalance = async () => {
    console.log('Connected Address: ', props.userAddr);
    // get the connected account on the window etheureum object
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // provider provides methods interacting with blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    console.log();
    setBalance(
      parseFloat(ethers.utils.formatEther(balance)).toFixed(4).toString()
    );
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
