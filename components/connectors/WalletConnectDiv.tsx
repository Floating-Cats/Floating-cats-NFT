import { hooks, walletConnect } from '../../connectors/walletConnect';
import { Accounts } from '../Accounts';
import { Card } from '../Card';
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

export default function WalletConnectCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive() || false;

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  if (isActive) {
    console.log('WalletConnectCard');
    console.log(`chainId: ${chainId}, ${typeof chainId}`);
    console.log(`accounts: ${accounts}, ${typeof accounts}`);
    console.log(`error: ${error}, ${typeof error}`);
    console.log(`isActivating: ${isActivating}, ${typeof isActivating}`);
    console.log(`isActive: ${isActive}, ${typeof isActive}`);
    console.log(`provider: ${provider}, ${typeof provider}`);
    console.log(`ENSNames: ${ENSNames}, ${typeof ENSNames}`);
  }
  return (
    <>
      <ListGroup.Item action onClick={() => {}}>
        <Row>
          <Col d-flex>
            <h1>
              <img src={'../../WalletConnect-icon.svg'} alt='' width='60' />
            </h1>
            <h3>Wallet Connect</h3>
            <h6>Scan with WalletConnect to Connect</h6>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
