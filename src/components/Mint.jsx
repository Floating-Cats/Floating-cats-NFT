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

// import NFTImage from './NFTImage';

function Mint({ contract, provider, userAddr, signer, totalMinted, getCount }) {
  const [balance, setBalance] = useState('-');
  const [collectionVisible, setCollectionVisible] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);

  const getBalance = () => {
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

  const mintToken = () => {
    setCollectionVisible(true);
    toast.info("🐱 Let's Mint Token!");
  };

  // TODO: add a component to get mint amount
  // still in test, get a number input
  const getMintAmount = () => {
    return setMintAmount(1);
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

          {collectionVisible ? (
            <Row>
              <h1>FLoating Cats NFT Collection</h1>
              {Array(totalMinted + 1)
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <NFTImage
                      tokenId={i}
                      contract={contract}
                      signer={signer}
                      getCount={getCount}
                      mintAmount={mintAmount}
                    />
                  </div>
                ))}
              <button
                // className='btn btn-dark'
                className='enableEthereumButton'
                onClick={() => setCollectionVisible(false)}
              >
                Hide me
              </button>
            </Row>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  return <>{getMint()}</>;
}

function NFTImage({ contract, tokenId, getCount, signer, mintAmount }) {
  const contentId = 'QmSZyYG4JQDd5M5H3e4ZtFh1GGqptR2Yyqo7SLrnYri3Tm';
  const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = '../../pics/t-icon.jpg';

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.count();
    console.log(`result > 1 = ${result > 1}, result = ${result}`);
    setIsMinted(result > 1);
  };

  const mintToken = async () => {
    console.log('MintToken01');
    // const connection = contract.connect(signer); // connect signer to our contract
    console.log('MintToken02');
    // const addr = connection.address; // this returns our contract address
    // console.log('addr is - ', addr);
    console.log('MintToken03', mintAmount);
    const result = await contract.mint(mintAmount);

    console.log('MintToken04');

    await result
      .wait()
      .then(() => {
        console.debug(`Successfully Minted ${mintAmount} Tokens!`);
        toast('🐱 Just Minted!');
      })
      .catch((err) => {
        console.error('❌ Failed To Mint: ', err.message);
        toast.error('❌ Failed To Mint');
      });
    console.log('MintToken05');
    getMintedStatus();
    console.log('MintToken06');
    getCount(); // here
    console.log('MintToken07');
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className='card' style={{ width: '18rem' }}>
      //{' '}
      <img
        className='card-img-top'
        src={isMinted ? imageURI : 'pics/hidden.jpg'}
      ></img>
      <div className='card-body'>
        <h5 className='card-title'>ID #{tokenId}</h5>
        {!isMinted ? (
          <button className='btn btn-primary' onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className='btn btn-secondary' onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Mint;
