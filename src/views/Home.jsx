// components

import Mint from '../components/Mint';
import NFTImage from '../components/NFTImage';

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
                signer={props.signer}
                getCount={props.getCount}
              />
            </div>
          ))}
      </>
    );
  };

  // get background cloud
  const getBgCloud = () => {
    return (
      <>
        <div id='background-wrap'>
          <div className='x1'>
            <div className='cloud'></div>
          </div>

          <div className='x2'>
            <div className='cloud'></div>
          </div>

          <div className='x3'>
            <div className='cloud'></div>
          </div>

          <div className='x4'>
            <div className='cloud'></div>
          </div>

          <div className='x5'>
            <div className='cloud'></div>
          </div>
        </div>
      </>
    );
  };

  // TODO: get banner
  const getBanner = () => {};

  // get roadmap
  const getRoadmap = () => {
    return (
      <>
        <div className='container' id='roadmap'>
          <h1>ROADMAP</h1>
          <div className='row'>
            <div className='col'>
              <img src='pics/cafe.PNG' alt='' width='300' height='200' />
              <p>Opening a Cat Cafe Partner with Shelters</p>
            </div>
            <div className='col'>
              <img src='pics/merch.png' alt='' width='300' height='200' />
              <p>Exclusive Merchandise</p>
              <p>(Weelky giveaways)</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <img src='pics/vault.PNG' alt='' width='300' height='200' />
              <p>Community Vault</p>
            </div>
            <div className='col'>
              <img src='pics/Fcoin.PNG' alt='' width='300' height='200' />
              <p>$FLOAT coin utilities</p>
            </div>
            <div className='col'>
              <img src='pics/shelter.PNG' alt='' width='300' height='200' />
              <p>Shelter Donations</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // TODO: get our vision
  const getVision = () => {};

  // get team
  const getTeam = () => {
    return (
      <>
        <div className='container' id='team'>
          <div className='row'>
            <div className='col'>
              <img src='pics/t-icon.jpg' alt='' />
              <h2>Founder</h2>
              <p></p>
            </div>
            <div className='col'>
              <img src='pics/a-icon.JPEG' alt='' />
              <h2>Dev</h2>
            </div>
            <div className='col'>
              <img src='pics/m-icon.JPEG' alt='' />
              <h2>Artist</h2>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* {getCollection()} */}
      {getBgCloud()}
      <Mint provider={props.provider} userAddr={props.userAddr} />
      {getRoadmap()}
      {getTeam()}
    </div>
  );
}

export default Home;
