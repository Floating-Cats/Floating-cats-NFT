// other imports
import Collapsible from 'react-collapsible';

export default function Home() {
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

  // get banner
  const getBanner = () => {
    return (
      <div className='container' id='banner'>
        <div className='row'>
          <div className='col-md-7' id='bannerText'>
            <h2>Welcome to the floating cats</h2>
            <p>
              Floating cat is a 8,888 piece genesis collections Floating on the
              Ethereum Blockchain. Our goal is to build a strong community to
              help as many cats as possible.
            </p>
            <a href='https://discord.gg/cumFWvqMR8' className='button'>
              Join Our Discord
            </a>
          </div>
          <div className='col'>
            <img src='/takoyaki.png' height='600' width='600' />
          </div>
        </div>
      </div>
    );
  };

  // get about

  const getAbout = () => {
    return (
      <div className='about-bg' id='about'>
        <div className='row'>
          <div className='col-md-6'>
            <img src='/flag.png' id='flag' height='200' width='500' />
          </div>
          <div className='col'>
            <img src='/card-1.png' height='300' width='300' />
            <img src='/card-2.jpeg' height='300' width='300' />
          </div>
          <div className='w-100'></div>
          <div className='col'>
            <p>
              Floating Cats is a team located in Nagoya, Japan 🇯🇵 with team
              members all across the globe. We love cats and believe that it is
              the existence of cats that give us power to move forward.
            </p>
            <p>
              Our road map is progressed by proactively holding volunteering
              events to help cats and bringing the community together.
            </p>
          </div>
          <div className='col'>
            <img src='/card-3.png' height='300' width='300' />
            <img src='/card-4.png' height='300' width='300' />
          </div>
        </div>
      </div>
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
              <img src='/cafe.PNG' alt='' width='300' height='200' />
              <p>Opening a Cat Cafe</p>
              <p>(Partner with Shelters)</p>
              <p>(Holders will get free items/discount)</p>
            </div>
            <div className='col'>
              <img src='/shelter.PNG' alt='' width='300' height='200' />
              <p>Shelter Donations</p>
              <p>(We will donate 10 eth to selected shelters)</p>
              <p>(30% of OS loyalties gose to shelters)</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <img src='/vault.PNG' alt='' width='300' height='200' />
              <p>Community Vault</p>
              <p>(30% of initial sales)</p>
              <p>(30% OS sales)</p>
            </div>
            <div className='col'>
              <img src='/Fcoin.PNG' alt='' width='300' height='200' />
              <p>$FLOAT coin utilities</p>
              <p>(Stack coins for future P2E, and in-store purchases)</p>
            </div>
            <div className='col'>
              <img src='/merch.png' alt='' width='300' height='200' />
              <p>Exclusive Merchandise </p>
              <p>(Weekly giveaways)</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // get team
  const getTeam = () => {
    return (
      <div className='team-bg'>
        <div className='container' id='team'>
          <h1>TEAM</h1>

          <div className='row'>
            <div className='col'>
              <img src='/t-icon.jpg' alt='' />
              <h4>Founder</h4>
              <p></p>
            </div>
            <div className='col'>
              <img src='/a-icon.JPEG' alt='' />
              <h4>Dev</h4>
            </div>
            <div className='col'>
              <img src='/m-icon.JPEG' alt='' />
              <h4>Artist</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // faq

  const getFaq = () => {
    return (
      <div className='container' id='faq'>
        <h1>FAQ's</h1>
        <Collapsible trigger='What Are Floating Cats?' id='faq_Q-01'>
          <p id='answers-01'>
            We are a team located in Nagoya, Japan. 🗾 We love cats. Our goal is
            to build a strong community to help as many cats as possible. We
            plan to team up with local shelters and provide them with their
            needs . 🏡 And of course, We are also planning to have
            weekly/monthly events to help shelters voluntarily. And it doesn’t
            stop there, we’re committed and wish to expand this moment
            worldwide. 🌍
          </p>
        </Collapsible>
        <Collapsible
          trigger='How many Floting Cats NFT’s will there be?'
          id='faq_Q-02'
        >
          <p id='answers-02'>
            There will be 8,888 unique NFT’s including 15 1️⃣OF1️⃣.
          </p>
        </Collapsible>
        <Collapsible trigger=' What is the mint price?' id='faq_Q-03'>
          <p id='answers-03'>TBD. Join our discord see the lastest updates.</p>
        </Collapsible>
        <Collapsible trigger='Will there be a Whitelist?' id='faq_Q-04'>
          <p id='answers-04'>
            ✅ Yes, We will have giveaways for WL. Also, active community
            members who are helpful to each other and bring a positive vibe to
            the group will be rewarded. 🎉 Join our Discord for more details.
          </p>
        </Collapsible>
        <Collapsible trigger='What other benefits do I get?' id='faq_Q-05'>
          <p id='answers-05'>
            Besides being part of this great community, our holders will have a
            chance to win exclusive merchandise giveaways 👕 (weekly), and WL of
            other projects.🚀 Most of all, opening a cat café is always our
            dream.☕ We will team up with local shelters and provide a space for
            cats to stay in the store with good care. Meanwhile, we help those
            kitties to find a new home. 🏡 (Will consistently update some videos
            & pictures for the opening of the store)
          </p>
        </Collapsible>
      </div>
    );
  };

  return (
    <div>
      {/* {getBgCloud()} */}
      {getBanner()}
      {getAbout()}
      {getRoadmap()}
      {getTeam()}
      {getFaq()}
    </div>
  );
}