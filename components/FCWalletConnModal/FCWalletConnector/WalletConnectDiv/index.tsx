import { NavBarInterface } from 'components/helpers/ParamsInterface';

export default function WalletConnectDiv({
  navBarParams,
}: {
  navBarParams: NavBarInterface;
}) {
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
        navBarParams.accounts ? (
          // if the provider exists and user connects via 'wallet connect'
          navBarParams.provider &&
          navBarParams.provider.connection.url === 'eip-1193:' ? (
            <>
              {getHeader()}
              <h6>Open your phone to switch wallet or network</h6>
              <h6>Or click to disconnect</h6>
            </>
          ) : (
            <></>
          )
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
