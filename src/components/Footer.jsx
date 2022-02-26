function Footer() {
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
                <img src='public/twitter.png' alt='' width='30' height='30' />
              </a>

              {/* <!-- Discord --> */}
              <a
                className='btn btn-floating m-1'
                href='https://discord.gg/floatingcats'
                role='button'
              >
                <img src='public/discord.png' alt='' width='30' height='30' />
              </a>

              {/* <!-- Opensea --> */}
              <a
                className='btn btn-floating m-1'
                href='public/os-icon.png'
                role='button'
              >
                <img src='public/os-icon.png' alt='' width='33' height='33' />
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

  return <>{getFooter()}</>;
}

export default Footer;
