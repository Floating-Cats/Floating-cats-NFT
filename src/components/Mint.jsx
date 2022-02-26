// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Mint() {
  return (
    <>
      <div className='container' id='mint'>
        <a href='/mint'>
          <img
            id='mintBtn'
            src='public/mint-btn.png'
            className='img-fluid logo d-none d-md-block '
            alt=''
            width='450'
            height='350'
          />
        </a>

        {/* {collxectionVisible ? (
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
          )} */}
      </div>
    </>
  );
}

// TODO: Add a gallery feature
// function NFTImage({ contract, tokenId, getCount, signer, mintAmount }) {
//   const imageURI = `https://gateway.pinata.cloud/ipfs/${process.env.FC_TEST_CID}/${tokenId}.png`;
//   const imageURI = '../../public/t-icon.jpg';

//   const [isMinted, setIsMinted] = useState(false);
//   useEffect(() => {
//     getMintedStatus();
//   }, [isMinted]);

//   const getMintedStatus = async () => {
//     const result = await contract.count();
//     console.log(`result > 1 = ${result > 1}, result = ${result}`);
//     setIsMinted(result > 1);
//   };

//   const mintToken = async () => {
//     console.log('MintToken01');
//     // const connection = contract.connect(signer); // connect signer to our contract
//     console.log('MintToken02');
//     // const addr = connection.address; // this returns our contract address
//     // console.log('addr is - ', addr);
//     console.log('MintToken03', mintAmount);
//     const result = await contract
//       .mint(mintAmount)
//       .then(() => {
//         console.debug(`Successfully Minted ${mintAmount} Tokens! - 01`);
//         toast('🐱 Just Minted!');
//       })
//       .catch((err) => {
//         console.error('❌ Failed To Mint - 01: ', err.message);
//         toast.error('❌ Failed To Mint');
//       });

//     console.log('MintToken04');

//     await result
//       .wait()
//       .then(() => {
//         console.debug(`Successfully Minted ${mintAmount} Tokens! - 01`);
//         toast('🐱 Just Minted!');
//       })
//       .catch((err) => {
//         console.error('❌ Failed To Mint - 01: ', err.message);
//         toast.error('❌ Failed To Mint');
//       });
//     console.log('MintToken05');
//     getMintedStatus();
//     console.log('MintToken06');
//     getCount(); // here
//     console.log('MintToken07');
//   };

//   async function getURI() {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri);
//   }
//   return (
//     <div className='card' style={{ width: '18rem' }}>
//       //{' '}
//       <img
//         className='card-img-top'
//         src={isMinted ? imageURI : 'public/hidden.jpg'}
//       ></img>
//       <div className='card-body'>
//         <h5 className='card-title'>ID #{tokenId}</h5>
//         {!isMinted ? (
//           <button className='btn btn-primary' onClick={mintToken}>
//             Mint
//           </button>
//         ) : (
//           <button className='btn btn-secondary' onClick={getURI}>
//             Taken! Show URI
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

export default Mint;
