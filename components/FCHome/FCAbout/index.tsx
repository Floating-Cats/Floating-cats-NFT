export default function FCAbout() {
  return (
    <div className='about-bg' id='about'>
      <h1>About</h1>
      <div className='row'>
        <div className='col-6 col-sm-6'>
          <div className='row-6 text-center'>
            <img src='/flag.png' id='flag' />
          </div>
          <div className='row-6'>
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
        </div>
        <div className='col-6' id='cards'>
          <div className='row-6 '>
            <img src='/card-1.png' height='300' width='300' />
            <img src='/card-2.png' height='300' width='300' />
          </div>
          <div className='row-6'>
            <img src='/card-3.png' height='300' width='300' />
            <img src='/card-4.png' height='300' width='300' />
          </div>
        </div>
      </div>
    </div>
  );
}
