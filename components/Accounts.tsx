import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';
import { useEffect, useState } from 'react';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({
  accounts,
  provider,
  ENSNames,
  setUpAccInfo,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  setUpAccountInfo: () => void;
}) {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  setUpAccInfo(accounts, provider, ENSNames);

  return (
    <div>
      Accounts:{' '}
      <b>
        {accounts.length === 0
          ? 'None'
          : accounts?.map((account, i) => (
              <ul
                key={account}
                style={{
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <li>
                  {ENSNames?.[i] ??
                    `${account.substring(0, 6)}...${account.substring(
                      account.length - 4,
                      account.length
                    )}`}
                </li>
                <li>
                  {balances?.[i]
                    ? ` (Ξ ${parseFloat(formatEther(balances[i])).toFixed(4)})`
                    : null}
                </li>
              </ul>
            ))}
      </b>
    </div>
  );
}
