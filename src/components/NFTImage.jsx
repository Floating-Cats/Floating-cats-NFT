import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// import { toast } from 'react-toastify';

function NFTImage({ contract, signer, tokenId, getCount }) {
  // cid from pinata
  const contentId = 'QmSZyYG4JQDd5M5H3e4ZtFh1GGqptR2Yyqo7SLrnYri3Tm';
  const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${
  //   tokenId
  // }.png`;
  const imageURI = '../../pics/t-icon.jpg';

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    await contract
      .isContentOwned(metadataURI)
      .then((resp) => {
        setIsMinted(resp);
        // toast.success('🚀 Successfully logged in!');
        console.debug('getMintedStatus Request Successful!');
      })
      .catch((error) => {
        // toast.error(response.message);
        console.error('getMintedStatus Request Failed: ', error.message);
      });
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract
      .payToMint(addr, metadataURI, {
        value: ethers.utils.parseEther('0.05'),
      })
      .then(() => {
        result.wait();
        getMintedStatus();
        getCount();
        console.debug('mintToken Request Successful!');
      })
      .catch((error) => {
        console.error('mintToken Request Failed: ', error.message);
      });

    // await result.wait();
    // getMintedStatus();
    // getCount();
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

export default NFTImage;
