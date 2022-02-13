import type { Web3ReactHooks } from '@web3-react/core';
import { CHAINS } from '../chains';

export function FCFooter() {
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
              <img src='/twitter.png' alt='' width='30' height='30' />
            </a>

            {/* <!-- Discord --> */}
            <a
              className='btn btn-floating m-1'
              href='https://discord.com/invite/6u9ezDyYzV'
              role='button'
            >
              <img src='/discord.png' alt='' width='30' height='30' />
            </a>

            {/* <!-- Opensea --> */}
            <a
              className='btn btn-floating m-1'
              href='public/os-icon.png' // TODO: chage url
              role='button'
            >
              <img src='/os-icon.png' alt='' width='33' height='33' />
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
}
