import { onClickUrl } from '../helpers/TabOpener';

export default function FCBanner() {
  return (
    <>
      <div className='container' id='banner'>
        <div className='row'>
          <div className='col-md-7' id='bannerText'>
            <h2>Welcome to the floating cats</h2>
            <p>
              Floating cat is a 8,888 piece genesis collections Floating on the
              Ethereum Blockchain. Our goal is to build a strong community to
              help as many cats as possible.
            </p>
            <button
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
