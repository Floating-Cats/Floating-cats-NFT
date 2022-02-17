import { hooks, metaMask } from '../../connectors/metaMask';
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

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  if (isActive) {
    console.log('MetaMaskCard');
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
              <img src={'../../MetaMask-icon.svg'} alt='' width='60' />
            </h1>
            <h3>MetaMask</h3>
            <h6>Connect to your MetaMask Wallet</h6>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
