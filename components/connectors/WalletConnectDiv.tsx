import { useState, useEffect } from 'react';

import { hooks, walletConnect } from '../../connectors/walletConnect';
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

export default function WalletConnectDiv({
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

  const isActive = useIsActive() || false;

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log(
    'WalletConnect.tsx ================================================'
  );
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
  }, []);

  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <h1>
              <img src={'../../WalletConnect-icon.svg'} alt='' width='60' />
            </h1>
            <h3>Wallet Connect</h3>
            <h6>Scan with WalletConnect to Connect</h6>
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
              connector={walletConnect}
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
