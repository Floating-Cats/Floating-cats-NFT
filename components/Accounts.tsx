import { useEffect, useState } from 'react';

// web3 react
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

export function Accounts() {
  const { active, account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState<string>();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance('');
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  const accountFront: string = account ? account.substring(0, 6) : '';
  const accountBack: string = account
    ? account.substring(account.length - 4, account.length)
    : '';

  return active ? (
    <>
      <div id='acc-info'>
        <span>Accounts: </span>
        <span role='img' aria-label='robot'>
          🤖
        </span>
        <b>{`${accountFront}...${accountBack}`}</b>
      </div>
      <div id='acc-info'>
        <span>Balance: </span>
        <span role='img' aria-label='gold'>
          💰
        </span>
        <span>
          {balance === null
            ? 'Error'
            : balance
            ? `Ξ${formatEther(balance)}`
            : ''}
        </span>
      </div>
    </>
  ) : null;
}
