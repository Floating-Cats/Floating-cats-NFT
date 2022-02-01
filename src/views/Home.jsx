// components
import Navbar from '../components/Navbar';
import NFTImage from '../components/NFTImage';
import WalletBalance from '../components/WalletBalance';

// the entry point of our home page
function Home(props) {
  const getCollection = () => {
    return (
      <>
        <h1>FLoating Cats NFT Collection</h1>
        {Array(props.totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage
                tokenId={i}
                contract={props.contract}
                getCount={props.getCount}
              />
            </div>
          ))}
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <WalletBalance />
      {getCollection()}
    </div>
  );
}

export default Home;
