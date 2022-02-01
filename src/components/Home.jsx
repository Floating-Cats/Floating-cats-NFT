import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// components
import Navbar from './Navbar';

// views
import WalletBalance from './WalletBalance';

// contracts
import FCat from '../artifacts/contracts/MyNFT.sol/FloatingCats.json';

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contrat
const contract = new ethers.Contract(contractAddress, FCat.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    console.log('here');
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <Navbar />
      <WalletBalance />

      <h1>FLoating Cats NFT Collection</h1>
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i} />
          </div>
        ))}
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmSZyYG4JQDd5M5H3e4ZtFh1GGqptR2Yyqo7SLrnYri3Tm';
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    // make connection between contracts and signer
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img
        className='card-img-top'
        src={isMinted ? imageURI : 'pics/placeholder.png'}
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

export default Home;
