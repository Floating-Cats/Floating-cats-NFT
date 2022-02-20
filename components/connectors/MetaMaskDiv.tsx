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
  setConnection,
}: {
  setConnection: (
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

  // test
  // const [accs, setAccs] = useState<string[]>([]);
  // const [prov, setProv] = useState<object | any>(null);
  // const [ens, setEns] = useState<object | any>(null);

  useEffect(() => {
    setConnection(
      chainId,
      accounts,
      error,
      isActivating,
      isActive,
      provider,
      ENSNames
    );
  }, []);

  // console.log('MetaMaskDiv.tsx');
  // console.log('chainId: ', chainId);
  // console.log('account: ', accounts);
  // console.log('error: ', error);
  // console.log('isActivating: ', isActivating);
  // console.log('isActive: ', isActive);
  // console.log('provider: ', provider);
  // console.log('ENSNames: ', ENSNames);
  // fetch accounts, provider, ENSNames
  // const setUpAccInfo = async (
  //   setupAccs: string[] | any,
  //   setupProv: object | any,
  //   setupEns: object | any
  // ) => {
  //   console.log('setUpAccInfo @ MetaMaskDiv');
  //   setAccs(setupAccs);
  //   setProv(setupProv);
  //   setEns(setupEns);
  // };

  // fetch chainId, error, isActivating, isActive, connector
  // const setUpConnect = async () => {};

  // TODO: modify this so it looks better on small device too

  return (
    <>
      <ListGroup.Item action onClick={() => {}}>
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
              chainId={chainId}
              error={error}
              isActivating={isActivating}
              isActive={isActive}
              connector={metaMask}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
