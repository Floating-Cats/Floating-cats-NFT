import { hooks, walletConnect } from '../../connectors/walletConnect';
import { Accounts } from '../Accounts';
import { Card } from '../Card';
import { Chain } from '../Chain';
import { ConnectWithSelect } from '../ConnectWithSelect';
import { Status } from '../Status';
import { Web3ReactHooks } from '@web3-react/core';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

interface NavBarInterface {
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}

export default function WalletConnectGroup({
  navBarParams,
}: {
  navBarParams: NavBarInterface;
}) {
  // states of this component
  const [connector, setConnector] = useState<
    MetaMask | WalletConnect | Network | any
  >();
  const [isNetwork, setIsNetwork] = useState<boolean>(false);
  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  );
  const [displayDefault, setDisplayDefault] = useState<boolean>(!isNetwork);
  const [chainIds, setChainIds] = useState<number[]>([]);

  // web3-react hooks
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.debug('accounts is ', accounts);
  useEffect(() => {
    setChainId(chainId);
    setAccount(accounts);
    setError(error);
    setIsActivating(isActivating);
    setIsActive(isActive);
    setProvider(provider);
    setENSNames(ENSNames);
  }, [chainId, accounts, error, isActivating, isActive, provider, ENSNames]);

  return (
    <Card>
      <div>
        <b>WalletConnect</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={walletConnect}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </Card>
  );
}
