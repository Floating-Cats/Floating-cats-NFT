// components

import Mint from '../components/Mint';
import NFTImage from '../components/NFTImage';

// the entry point of our home page
function Home(props) {
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
      <div className='contanier' id='faq'>
        <h1>FAQ's</h1>
        <p>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#answer1'
            aria-expanded='false'
            aria-controls='answer1'
          >
            How many Floting Cats NFT’s will there be?
          </button>
        </p>
        <div className='collapse' id='answer1'>
          <div className='card card-body'>
            8,888 unique pieces (including 15 1/1).
          </div>
        </div>
        <p>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#answer2'
            aria-expanded='false'
            aria-controls='answer2'
          >
            What's the mint price?
          </button>
        </p>
        <div className='collapse' id='answer2'>
          <div className='card card-body'>
            TBD. Join our discord for more infomation.
          </div>
        </div>
        <p>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#answer3'
            aria-expanded='false'
            aria-controls='answer3'
          >
            Will there be a Whitelist?
          </button>
        </p>
        <div className='collapse' id='answer3'>
          <div className='card card-body'>
            Yes, We will have giveaways for WL. Also, active community members
            who are helpful to each other and bring a positive vibe to the group
            will be rewarded.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {getBgCloud()}
      <Mint
        contract={props.contract}
        provider={props.provider}
        userAddr={props.userAddr}
        signer={props.signer}
        totalMinted={props.totalMinted}
        getCount={props.getCount}
      />
      {getRoadmap()}
      {getTeam()}
      {getFaq()}
    </div>
  );
}

export default Home;
