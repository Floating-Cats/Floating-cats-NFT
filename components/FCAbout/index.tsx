export default function FCAbout() {
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
}
