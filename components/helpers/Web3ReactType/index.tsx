import type { Web3ReactHooks } from '@web3-react/core';

export type Web3ReactType = {
  chainId: ReturnType<Web3ReactHooks['useChainId']> | any;
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  error: ReturnType<Web3ReactHooks['useError']> | any;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any;
  isActive: ReturnType<Web3ReactHooks['useIsActive']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any;
};
