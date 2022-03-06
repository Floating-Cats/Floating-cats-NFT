import { useEffect, useState } from 'react';

// web3 react
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';

// helpers
import { Web3ReactType } from './helpers/Web3ReactType';

function useBalances(
  provider?: ReturnType<Web3ReactType['provider']>,
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
}: {
  accounts: ReturnType<Web3ReactType['accounts']>;
  provider: ReturnType<Web3ReactType['provider']>;
  ENSNames: ReturnType<Web3ReactType['ENSNames']>;
}) {
  const balances = useBalances(provider, accounts);
  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{' '}
      <b>
        {accounts.length === 0
          ? 'None'
          : accounts?.map((acc: string, i: number) => (
              <ul
                key={acc}
                style={{
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <li>
                  {ENSNames?.[i] ??
                    `${acc.substring(0, 6)}...${acc.substring(
                      acc.length - 4,
                      acc.length
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
