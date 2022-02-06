import React, { useEffect, useState } from 'react';

function PreLoad() {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log('hello');
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className='spinner'>
            <span>Loading...</span>
            <div className='half-spinner'></div>
          </div>
        </>
      ) : (
        <>
          <h1>Data</h1>
        </>
      )}
    </>
  );
}

export default PreLoad;
