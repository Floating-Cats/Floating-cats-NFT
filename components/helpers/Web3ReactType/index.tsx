import type { Web3Provider } from '@ethersproject/providers';

export type Web3ReactType = {
  chainId: ReturnType<number | any>;
  accounts: ReturnType<string[] | any>;
  error: ReturnType<Error | any>;
  isActivating: ReturnType<boolean | any>;
  isActive: ReturnType<boolean | any>;
  provider: ReturnType<Web3Provider | any>;
  ENSNames: ReturnType<(string | string[]) | any>;
};

// export type Web3ReactType = {
//   chainId: ReturnType<Web3ReactHooks['useChainId']> | any;
//   accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
//   error: ReturnType<Web3ReactHooks['useError']> | any;
//   isActivating: ReturnType<Web3ReactHooks['useIsActivating']> | any;
//   isActive: ReturnType<Web3ReactHooks['useIsActive']> | any;
//   provider: ReturnType<Web3ReactHooks['useProvider']> | any;
//   ENSNames: ReturnType<Web3ReactHooks['useENSNames']> | any;
// };
