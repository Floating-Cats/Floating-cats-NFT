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

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  return (
    <>
      <ListGroup.Item action onClick={() => {}}>
        <Row>
          <Col d-flex>
            <h1>
              <img src={'../../MetaMask-icon.svg'} alt='' width='60' />
            </h1>
            <h3>MetaMask</h3>
            <h6>Connect to your MetaMask Wallet</h6>
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
                connector={metaMask}
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
