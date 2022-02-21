import { useState, useEffect } from 'react';

import { hooks, metaMask } from '../../connectors/metaMask';
import { Accounts } from '../Accounts';
import { Chain } from '../Chain';
import { ConnectWithSelect } from '../ConnectWithSelect';
import { Status } from '../Status';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function MetaMaskDiv({
  setUpConnection,
}: {
  setUpConnection: (
    chainId: number | any,
    account: string | any,
    error: string | any,
    isActivating: boolean | any,
    isActive: boolean,
    provider: object | any,
    ENSNames: object | any
  ) => void;
}) {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log('MetaMask.tsx ================================================');
  console.log('chainId: ', chainId);
  console.log('accounts: ', accounts);
  console.log('error: ', error);
  console.log('isActivating: ', isActivating);
  console.log('isActive: ', isActive);
  console.log('provider: ', provider);

  useEffect(() => {
    setUpConnection(
      chainId,
      accounts,
      error,
      isActivating,
      isActive,
      provider,
      ENSNames
    );
  }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  // TODO: modify this so it looks better on small device too
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <h1>
              <img src={'../../MetaMask-icon.svg'} alt='' width='60' />
            </h1>
            <h3>MetaMask</h3>
            <h6>Connect to your MetaMask Wallet</h6>
          </Col>
          <Col xs={4}>
            <Status
              isActivating={isActivating}
              error={error}
              isActive={isActive}
            />
            <div style={{ marginBottom: '1rem' }} />
            <Chain chainId={chainId} />
            <Accounts
              accounts={accounts}
              provider={provider}
              ENSNames={ENSNames}
              // setUpAccInfo={() => {
              //   setUpAccInfo(accs, prov, ens);
              // }}
            />
          </Col>
          <Col xs={3}>
            <ConnectWithSelect
              connector={metaMask}
              chainId={chainId}
              error={error}
              isActivating={isActivating}
              isActive={isActive}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
