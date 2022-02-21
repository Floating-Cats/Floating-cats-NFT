import { openInNewTab, onClickUrl } from '../../helpers/TabOpener';

export function FCFooter() {
  return (
    <>
      <footer className='bg-dark text-center text-white'>
        <div className='container p-4 pb-0'>
          <section className='mb-4'>
            {/* <!-- Twitter --> */}
            <button
              className='btn btn-floating m-1'
              onClick={() => {
                onClickUrl('https://twitter.com/FloatingCatsNFT');
              }}
              role='button'
            >
              <img src='/twitter.png' alt='' width='30' height='30' />
            </button>

            {/* <!-- Discord --> */}
            <button
              className='btn btn-floating m-1'
              onClick={() => {
                onClickUrl('https://discord.gg/floatingcats');
              }}
              role='button'
            >
              <img src='/discord.png' alt='' width='30' height='30' />
            </button>

            {/* <!-- Opensea --> */}
            <button
              className='btn btn-floating m-1'
              onClick={() => {
                // TODO: chage url
                onClickUrl('https://google.com');
              }}
              role='button'
            >
              <img src='/os-icon.png' alt='' width='33' height='33' />
            </button>

            {/* TODO: add a contract */}
            {/* <!-- Contract --> */}
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
}
