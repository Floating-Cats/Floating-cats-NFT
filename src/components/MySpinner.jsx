import Spinner from 'react-bootstrap/Spinner';

const MySpinner = (props) => {
  const style = {
    textAlign: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <div style={style}>
      <Spinner animation='grow' />
      <br />
      Loading ...
    </div>
  );
};

export default MySpinner;
