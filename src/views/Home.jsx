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

  // get mint
  const getMint = () => {
    return (
      <>
        <div className='container' id='min'>
          <img
            src='pics/mint-button.png'
            className='rounded mx-auto d-block'
            alt=''
            width='400'
            height='300'
          />
        </div>
      </>
    );
  };

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

  // TODO: update icons from https://react-icons.github.io/react-icons/search?q=fab
  // get footer
  const getFooter = () => {
    return (
      <>
        <footer className='bg-dark text-center text-white'>
          <div className='container p-4 pb-0'>
            <section className='mb-4'>
              {/* <!-- Twitter --> */}
              <a
                className='btn btn-floating m-1'
                href='https://twitter.com/FloatingCatsNFT'
                role='button'
              >
                <img src='pics/twitter.png' alt='' width='30' height='30' />
              </a>

              {/* <!-- Discord --> */}
              <a
                class='btn btn-floating m-1'
                href='pics/discord.png'
                role='button'
              >
                <img src='pics/discord.png' alt='' width='30' height='30' />
              </a>

              {/* <!-- Opensea --> */}
              <a
                class='btn btn-floating m-1'
                href='pics/os-icon.png'
                role='button'
              >
                <img src='pics/os-icon.png' alt='' width='33' height='33' />
              </a>

              {/* TODO: add a contract */}
              {/* <!-- Contract --> */}
              {/* <a
                className='btn btn-outline-light btn-floating m-1'
                href='#!'
                role='button'
              >
                <i className='fab fa-contract'></i>
              </a> */}
            </section>
          </div>
          {/* <!-- Copyright --> */}
          <div
            className='text-center p-3'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            © 2022 Floating Cats NFT. All rights reserved
          </div>
          {/* <!-- Copyright --> */}
        </footer>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      {/* <WalletBalance /> */}
      {/* {getCollection()} */}
      {getBgCloud()}
      {getMint()}
      {getRoadmap()}
      {getTeam()}
      {getFooter()}
    </div>
  );
}

export default Home;
