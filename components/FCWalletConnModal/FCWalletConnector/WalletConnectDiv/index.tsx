import { useWeb3React } from '@web3-react/core';

export default function WalletConnectDiv() {
  const { active, library } = useWeb3React();
  const provider = library && library.connection ? library.connection.url : '';

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
      {
        // if an account is connected
        active ? (
          provider === 'eip-1193:' ? (
            <>
              {getHeader()}
              <h6>Open your phone to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : null
        ) : (
          // else no wallet connected at the moment
          <>
            {getHeader()}
            <h6>Scan with WalletConnect to Connect</h6>
          </>
        )
      }
    </>
  );
}
