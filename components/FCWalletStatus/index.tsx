import { useEffect } from 'react';

import { Accounts } from '../Accounts';
import { Chain } from '../Chain';
import { Status } from '../Status';
import type { Web3ReactHooks } from '@web3-react/core';

import Row from 'react-bootstrap/Row';

export default function FCWalletStatus({
  isActivating,
  error,
  isActive,
  chainId,
  accounts,
  provider,
  ENSNames,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
}) {
  useEffect(() => {});

  return (
    <>
      <Row>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </Row>
    </>
  );
}
