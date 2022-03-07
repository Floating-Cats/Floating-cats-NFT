export default function FCNDA() {
  return (
    <div className='DNA-bg'>
      <div className='container' id='DNA'>
        <h1>DNA</h1>
        <p id='DNA-info'>
          WHAT is DNA?
          <br />
          With a collection size total of 5,888, Floating Cats are split up into
          5 types of DNA. There are more than 240 traits, each DNA comes with
          different attributes or traits with varying rarities.
        </p>

        <div className='row'>
          <div className='col'>
            <img src='/1of1.png' alt='' />
          </div>
          <div className='col' id='DNAinfo'>
            <h3 id='oneofone'>1 of 1</h3>
            <p> - QTY: 15 - </p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src='/super-rare.png' alt='' />
          </div>
          <div className='col' id='DNAinfo'>
            <h3 id='SR'>Super Rare</h3>
            <p>- QTY: 280 -</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src='/rare.png' alt='' />
          </div>
          <div className='col' id='DNAinfo'>
            <h3 id='rare'>Rare</h3>
            <p>- QTY: 883 -</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src='/semi-rare.png' alt='' />
          </div>
          <div className='col' id='DNAinfo'>
            <h3 id='Semi'>Semi-Rare</h3>
            <p>- QTY: 1766 -</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src='/common.png' alt='' />
          </div>
          <div className='col' id='DNAinfo'>
            <h3 id='Cm'>Common</h3>
            <p>- QTY: 2944 -</p>
          </div>
        </div>
      </div>
    </div>
  );
}
