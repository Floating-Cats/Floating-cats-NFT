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

export default function WalletConnectCard({
  setConnection,
}: {
  setConnection: (
    chainId: number | any,
    account: string | any,
    error: string | any,
    isActivating: boolean | any,
    isActive: boolean,
    provider: object | any,
    ENSNames: object | any,
    testMsg: string
  ) => void;
}) {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive() || false;

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  setConnection(
    chainId,
    accounts,
    error,
    isActivating,
    isActive,
    provider,
    ENSNames,
    'WalletConnect YOOO'
  );

  return (
    <>
      <ListGroup.Item action onClick={() => {}}>
        <Row>
          <Col>
            <h1>
              <img src={'../../WalletConnect-icon.svg'} alt='' width='60' />
            </h1>
            <h3>Wallet Connect</h3>
            <h6>Scan with WalletConnect to Connect</h6>
          </Col>
          <Col>
            <Status
              isActivating={isActivating}
              error={error}
              isActive={isActive}
            />
            <div style={{ marginBottom: '1rem' }} />
            {isActive ? (
              <>
                <Chain chainId={chainId} />
                <Accounts
                  accounts={accounts}
                  provider={provider}
                  ENSNames={ENSNames}
                />
              </>
            ) : (
              <ConnectWithSelect
                connector={walletConnect}
                chainId={chainId}
                isActivating={isActivating}
                error={error}
                isActive={isActive}
              />
            )}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
