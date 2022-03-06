import { onClickUrl } from '../../helpers/TabOpener';

export default function FCBanner() {
  return (
    <>
      <div className='container' id='banner'>
        <div className='row'>
          <div className='col-md-7' id='bannerText'>
            <h2>Floating Cats</h2>
            <p>
              5,888 piece genesis collections floating on the Ethereum
              Blockchain. Our project is aimed at developing a brand that
              represents the values of our community and bridges the gap between
              the web3 and physical worlds.
            </p>
            <button
              className='dc-button'
              onClick={() => {
                onClickUrl('https://discord.gg/floatingcats');
              }}
            >
              Join Our Discord
            </button>
          </div>
          <div className='col'>
            <img src='/takoyaki.png' height='600' width='600' />
          </div>
        </div>
      </div>
    </>
  );
}
