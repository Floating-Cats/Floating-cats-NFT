import Spinner from 'react-bootstrap/Spinner';

export default function MySpinner() {
  return (
    <div
      style={{
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner animation='grow' />
      <br />
      Loading ...
    </div>
  );
}
