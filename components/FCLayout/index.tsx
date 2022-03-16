import { useEffect, useState } from 'react';

// components
import { FCNavbar } from './FCNavbar';
import { FCFooter } from './FCFooter';
import FCSpinner from '../FCSpinner';

// types
import { Web3ReactType } from 'components/helpers/Web3ReactType';

export default function FCLayout({
  // component
  children,
}: // navBarParams,
// web3 react
// setChainId,
// setAccount,
// setError,
// setIsActivating,
// setIsActive,
// setProvider,
// setENSNames,
{
  // component
  children: JSX.Element | JSX.Element[];
  // navBarParams: NavBarInterface;
  // web3 react
  // setChainId: (chainId: Web3ReactType['chainId']) => void;
  // setAccount: (accounts: Web3ReactType['accounts']) => void;
  // setError: (error: Web3ReactType['error']) => void;
  // setIsActivating: (isActivating: Web3ReactType['isActivating']) => void;
  // setIsActive: (isActive: Web3ReactType['isActive']) => void;
  // setProvider: (provider: Web3ReactType['provider']) => void;
  // setENSNames: (ENSNames: Web3ReactType['ENSNames']) => void;
}) {
  const [loading, setLoading] = useState<boolean | any>(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(loadHomePage, 1000);
  }, []);

  const loadHomePage = () => {
    setLoading(false);
  };

  return (
    <>
      <div className='body'>
        {loading ? (
          <FCSpinner />
        ) : (
          <>
            <FCNavbar
            // navBarParams={navBarParams}
            // setChainId={setChainId}
            // setAccount={setAccount}
            // setError={setError}
            // setIsActivating={setIsActivating}
            // setIsActive={setIsActive}
            // setProvider={setProvider}
            // setENSNames={setENSNames}
            />
            <main>{children}</main>
            <FCFooter />
          </>
        )}
      </div>
    </>
  );
}
