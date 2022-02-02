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
          <hr />
          <div className='row'>
            <div className='col'>
              <img src='pics/cafe.PNG' alt='' width='300' height='200' />
              <p>Opening a Cat Cafe</p>
              <p>(Partner with Shelters)</p>
              <p>(Holders will get free items/discount)</p>
            </div>
            <div className='col'>
              <img src='pics/shelter.PNG' alt='' width='300' height='200' />
              <p>Shelter Donations</p>
              <p>(We will donate 10 eth to selected shelters)</p>
              <p>(30% of OS loyaties gose to shelters)</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <img src='pics/vault.PNG' alt='' width='300' height='200' />     
              <p>Community Vault</p>
              <p>(30% of initial sales)</p>
              <p>(30% OS sales)</p>
            </div>
            <div className='col'>
              <img src='pics/Fcoin.PNG' alt='' width='300' height='200' />
              <p>$FLOAT coin utilities</p>
              <p>(Stack coins for future P2E, and in-store purchases)</p>
            </div>
            <div className='col'>
              <img src='pics/merch.png' alt='' width='300' height='200' />
              <p>Exclusive Merchandise </p>
              <p>(Weekly giveaways)</p>
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
          <h1>TEAM</h1>
            <hr />
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

    // faq

   const getFaq = () => {
     return (
      <div className="contanier" id="faq">
      <h1>FAQ's</h1>
      <p>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#answer1" aria-expanded="false" aria-controls="answer1">
          How many Floting Cats NFT’s will there be?
        </button>
      </p>
      <div className="collapse" id="answer1">
        <div className="card card-body">
          8,888 unique pieces (including 15 1/1).
        </div>
      </div>
      <p>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#answer2" aria-expanded="false" aria-controls="answer2">
          What's the mint price?
        </button>
      </p>
      <div className="collapse" id="answer2">
        <div className="card card-body">
          TBD. Join our discord for more infomation. 
        </div>
      </div>
      <p>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#answer3" aria-expanded="false" aria-controls="answer3">
        Will there be a Whitelist? 
        </button>
      </p>
      <div className="collapse" id="answer3">
        <div className="card card-body">
        Yes, We will have giveaways for WL. Also, active community members who are helpful to each other and bring a positive vibe to the group will be rewarded.
        </div>
      </div>
    </div>
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
      <WalletBalance />
      {/* {getCollection()} */}
      {getBgCloud()}
      {getMint()}
      {getRoadmap()}
      {getTeam()}
      {getFaq()}
      {getFooter()}
    </div>
  );
}

export default Home;
