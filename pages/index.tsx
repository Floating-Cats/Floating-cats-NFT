import React from 'react';

// components
import Home from './Home';

// styling
import { ToastContainer } from 'react-toastify';

export default function FCatApp(): JSX.Element {
  return (
    <>
      <Home />
      <ToastContainer
        position='top-center'
        theme='dark'
        autoClose={2000} // 1000 ms = 1sec
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
