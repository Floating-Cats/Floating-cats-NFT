export default function WalletConnectDiv() {
  const getHeader = () => {
    return (
      <>
        <h1>
          <img src={'/WalletConnect-icon.svg'} alt='' width='60' />
        </h1>
        <h3>Wallet Connect</h3>
      </>
    );
  };

  return (
    <>
      {getHeader()}
      <h6>Open your phone to switch wallet or network</h6>
      <h6>Or click to disconnect</h6>
      {
        // else no wallet connected at the moment
        // <>
        //   {getHeader()}
        //   <h6>Scan with WalletConnect to Connect</h6>
        // </>
      }
    </>
  );
}
