import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function NFTImage(props /*{ tokenId, getCount }*/) {
  // cid from pinata
  const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
  const metadataURI = `${contentId}/${props.tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${props.tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await props.contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    // make connection between contracts and signer
    const connection = props.contract.connect(signer);
    const addr = connection.address;
    const result = await props.contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    props.getCount();
  };

  async function getURI() {
    const uri = await props.contract.tokenURI(props.tokenId);
    alert(uri);
  }
  return (
    <div className='card' style={{ width: '18rem' }}>
      //{' '}
      <img
        className='card-img-top'
        src={isMinted ? imageURI : 'pics/placeholder.png'}
      ></img>
      <div className='card-body'>
        <h5 className='card-title'>ID #{props.tokenId}</h5>
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
