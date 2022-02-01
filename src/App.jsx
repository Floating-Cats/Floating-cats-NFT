import { useState } from 'react';

// components
// import Navbar from './components/Navbar';

// views
import Install from './components/Install';
import Home from './components/Home';

function App() {
  // // const [count, setCount] = useState(0);

  // return <div className='App'>Hello World</div>;
  if (window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
