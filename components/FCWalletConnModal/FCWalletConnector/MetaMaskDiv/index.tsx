import { useWeb3React } from '@web3-react/core';

export default function MetaMaskDiv() {
  const { active, library } = useWeb3React();
  const provider = library && library.connection ? library.connection.url : '';

  const getHeader = () => {
    return (
      <>
        <h1>
          <img src={'/MetaMask-icon.svg'} alt='' width='60' />
        </h1>
        <h3>MetaMask</h3>
      </>
    );
  };

  return (
    <>
      {
        // if an account is connected
        active ? (
          provider === 'metamask' ? (
            <>
              {getHeader()}
              <h6>Open your Metamask extension to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : null
        ) : (
          // else no wallet connected at the moment
          <>
            {getHeader()}
            <h6>Connect to your MetaMask Wallet</h6>
          </>
        )
      }
    </>
  );
}
