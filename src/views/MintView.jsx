// TODO: need test
const MintView = () => {
  return (
    <div className='mintPageBg'>
      <img src='pics/mint-bg-top.png' alt='' id='mint-bg' />
      <div className='container' id='mintPage'>
        <div className='row'>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-blue.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-red.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
          <div className='col'>
            <img
              id='mintBtn'
              src='pics/mint-btn-yellow.png'
              alt=''
              onClick={() => mintToken()}
            />
          </div>
        </div>
      </div>
      <img src='pics/mint-bg-bt.png' alt='' id='mint-bg' />
    </div>
  );
};

export default MintView;
