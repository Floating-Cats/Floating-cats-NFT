// components
import Mint from '../components/Mint';

// other imports
import Collapsible from 'react-collapsible';

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
            <img src='pics/takoyaki.png' height='600' width='600' />
          </div>
        </div>
      </div>
    );
  };

  // get about

  const getAbout = () => {
    return (
      <div className='about-bg'>
        <div className='row' id='about'>
          <div className='col-md-6'>
            <img src='pics/flag.png' id='flag' height='200' width='500' />
          </div>
          <div className='col'>
            <img src='pics/card-1.png' height='300' width='300' />
            <img src='pics/card-2.jpeg' height='300' width='300' />
          </div>
          <div className='w-100'></div>
          <div className='col'>
            <p>
              We are a team located in Nagoya, Japan 🇯🇵 with team members all
              across the globe. We love cats and believe that it is the
              existence of cats that give us power to move forward.
            </p>
            <p>
              Our road map is progressed by proactively holding volunteering
              events to help cats and bringing the community together.
            </p>
          </div>
          <div className='col'>
            <img src='pics/card-3.png' height='300' width='300' />
            <img src='pics/card-4.png' height='300' width='300' />
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
              <div className='flip'>
                <div className='front'>
                  <img src='pics/shelter.PNG' alt='' width='300' height='200' />
                  <p>Shelter Donations</p>
                </div>
                <div className='back'>
                  <h2>Q1 - 2022</h2>

                  <h4>
                    We will donate <strong>30%</strong> of our earnings to
                    organizations or groups relevant to animal care. In addition
                    to that, we plan to partner with these organizations or
                    groups as we hope to provide their needs and share their
                    burden, so that more cats can be taken care of. 🏩
                  </h4>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='flip'>
                <div className='front'>
                  <img src='pics/sandbox.PNG' alt='' width='300' height='200' />
                  <p>Sandbox Coummuity Hub</p>
                </div>
                <div className='back'>
                  <h2>Q3 - 2022</h2>
                  <h4>
                    We will build a community hub in the Sandbox for our
                    community members to socialize and play mini-games! 👾
                    <br />
                    <br /> <strong>Sandbox Avatar Development Commences</strong>
                    <br /> We will make a series of Sandbox avatars. This will
                    be a free drop for holders. 📦
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='flipTwo'>
                <div className='front'>
                  <img src='pics/vault.PNG' alt='' width='300' height='200' />
                  <p>community vault</p>
                </div>
                <div className='back'>
                  <h2>Q1 - 2022</h2>
                  <h4>
                    <br />
                    <strong>30%</strong> of the initial sales &
                    <strong> 30%</strong> of the OS sales will go to the
                    community wallet for giveawys and event funds. 💰
                  </h4>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='flipTwo'>
                <div className='front'>
                  <img src='pics/merch.PNG' alt='' width='300' height='200' />
                  <p>Exclusive Merchandises</p>
                </div>
                <div className='back'>
                  <h2>Q2 - 2022</h2>
                  <h4>
                    We will release the first colletion of our floating brand.
                    anything from clothing to lifestyle items will be avalible
                    for our holders.
                    <br />
                    <br />
                    <strong>‼️ Weekly holders only giveaways 🎁</strong>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='flipTwo'>
                <div className='front'>
                  <img src='pics/Fcoin.PNG' alt='' width='300' height='200' />
                  <p>
                    $FLOAT Token & <br /> P2E development
                  </p>
                </div>
                <div className='back'>
                  <h2>Q4 - 2022</h2>
                  <h4>
                    <strong>$FLOAT stacking</strong> <br />
                    The amount depends on the number of NFTs you hold +
                    contributions you make in the server. $FLOAT can be used to
                    purchase our merch and in-store items. 🪙
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='flip'>
                <div className='front'>
                  <img src='pics/cafe.PNG' alt='' width='300' height='200' />
                  <p>Floating Cat Cafe</p>
                </div>
                <div className='back'>
                  <h2>Q1 - 2023</h2>
                  <h4>
                    ☕ Opening Floating Cats Café has always been our dream. The
                    cafe will partner and assist with local shelters, and
                    provide space for those kitties with care and love.🧡
                    Meanwhile, the space is to be served as an interactive way
                    to encourage adoption.
                    <br />
                    <strong>
                      Hoders will have free items/discounts for every visits. 🎉
                    </strong>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='flip'>
                <div className='front'>
                  <img src='pics/shelter.PNG' alt='' width='300' height='200' />
                  <p>More and Beyound</p>
                </div>
                <div className='back'>
                  <h2>🚀 🔜</h2>
                  <h4>3D NFT avatar</h4>
                </div>
              </div>
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
              <img src='pics/t-icon.png' alt='' />
              <h4>C.L.</h4>
              <p>PROJECT LEAD / FOUNDER</p>
              <p></p>
            </div>
            <div className='col'>
              <img src='pics/a-icon.JPEG' alt='' />
              <h4>BLUE-DREAM</h4>
              <p>LEAD DEV & CYBER SECURITY</p>
            </div>
            <div className='col'>
              <img src='pics/m-icon.JPEG' alt='' />
              <h4>PIMO</h4>
              <p>CREATIVE ART DIRECTOR</p>
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
        <>
          <>
            <Collapsible trigger='What Are Floating Cats?' id='faq_Q'>
              <p id='answers'>
                We are a team located in Nagoya, Japan. 🗾 We love cats. Our
                goal is to build a strong community to help as many cats as
                possible. We plan to team up with local shelters and provide
                them with their needs . 🏡 And of course, We are also planning
                to have weekly/monthly events to help shelters voluntarily. And
                it doesn’t stop there, we’re committed and wish to expand this
                moment worldwide. 🌍
              </p>
            </Collapsible>
            <Collapsible
              trigger='How many Floting Cats NFT’s will there be?'
              id='faq_Q'
            >
              <p id='answers'>
                There will be 8,888 unique NFT’s including 15 1️⃣OF1️⃣.
              </p>
            </Collapsible>
            <Collapsible trigger=' What is the mint price?' id='faq_Q'>
              <p id='answers'>TBD. Join our discord see the lastest updates.</p>
            </Collapsible>
          </>
          <Collapsible trigger='Will there be a Whitelist?' id='faq_Q'>
            <p id='answers'>
              ✅ Yes, We will have giveaways for WL. Also, active community
              members who are helpful to each other and bring a positive vibe to
              the group will be rewarded. 🎉 Join our Discord for more details.
            </p>
          </Collapsible>
          <Collapsible trigger='What other benefits do I get?' id='faq_Q'>
            <p id='answers'>
              Besides being part of this great community, our holders will have
              a chance to win exclusive merchandise giveaways 👕 (weekly), and
              WL of other projects.🚀 Most of all, Opening Floating Cats Café in
              Nagoya has always been our dream. The cafe will partner and assist
              with local shelters, and provide even more space for those kitties
              with care and love. Meanwhile, the space is to be served as an
              interactive way to encourage adoption. 🏡 (Will consistently
              update some videos & pictures for the opening of the store)
            </p>
          </Collapsible>
        </>
      </div>
    );
  };

  return (
    <div>
      {getBgCloud()}
      {getBanner()}
      {/* <Mint
        contract={props.contract}
        provider={props.provider}
        userAddr={props.userAddr}
        signer={props.signer}
        totalMinted={props.totalMinted}
        getCount={props.getCount}
      /> */}
      {getAbout()}
      {getRoadmap()}
      {getTeam()}
      {getFaq()}
    </div>
  );
}

export default Home;
