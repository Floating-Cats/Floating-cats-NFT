import React, { useEffect, useState } from 'react';

function PreLoad() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:3000/')
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <div className='spinner'>
              <span>Loading...</span>
              <div className='half-spinner'></div>
            </div>
          ) : (
            <div className='completed'>&#x2713;</div>
          )}
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
