import { hooks, metaMask } from '../../connectors/metaMask';
import { Accounts } from '../Accounts';
import { Card } from '../Card';
import { Chain } from '../Chain';
import { ConnectWithSelect } from '../ConnectWithSelect';
import { Status } from '../Status';

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
    <Card>
      {/* <div>
        <b>MetaMask</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      /> */}
    </Card>
  );
}
