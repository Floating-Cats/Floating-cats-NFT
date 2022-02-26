export default function FCRoadmap() {
  return (
    <>
      <div className='container' id='roadmap'>
        <h1>ROADMAP</h1>
        <hr />
        <div className='row'>
          <div className='col'>
            <img src='/cafe.PNG' alt='' width='300' height='200' />
            <p>Opening a Cat Cafe</p>
            <p>(Partner with Shelters)</p>
            <p>(Holders will get free items/discount)</p>
          </div>
          <div className='col'>
            <img src='/shelter.PNG' alt='' width='300' height='200' />
            <p>Shelter Donations</p>
            <p>(We will donate 10 eth to selected shelters)</p>
            <p>(30% of OS loyalties gose to shelters)</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src='/vault.PNG' alt='' width='300' height='200' />
            <p>Community Vault</p>
            <p>(30% of initial sales)</p>
            <p>(30% OS sales)</p>
          </div>
          <div className='col'>
            <img src='/Fcoin.PNG' alt='' width='300' height='200' />
            <p>$FLOAT coin utilities</p>
            <p>(Stack coins for future P2E, and in-store purchases)</p>
          </div>
          <div className='col'>
            <img src='/merch.png' alt='' width='300' height='200' />
            <p>Exclusive Merchandise </p>
            <p>(Weekly giveaways)</p>
          </div>
        </div>
      </div>
    </>
  );
}
