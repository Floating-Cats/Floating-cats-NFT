import { NavBarInterface } from 'components/helpers/ParamsInterface';

export default function MetaMaskDiv({
  navBarParams,
}: {
  navBarParams: NavBarInterface;
}) {
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
        navBarParams.accounts ? (
          // if the provider exists and user connects via 'metamask'
          navBarParams.provider &&
          navBarParams.provider.connection.url === 'metamask' ? (
            <>
              {getHeader()}
              <h6>Open your Metamask extension to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : (
            <></>
          )
        ) : (
          // else no wallet connected at the moment
          <>
            <>
              {getHeader()}
              <h6>Connect to your MetaMask Wallet</h6>
            </>
          </>
        )
      }
    </>
  );
}
