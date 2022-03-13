import type { Web3ReactHooks } from '@web3-react/core';

export interface NavBarInterface {
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}

export interface MintInterface {
  chainId: ReturnType<Web3ReactHooks['useChainId']> | any;
  accounts: ReturnType<Web3ReactHooks['useAccount']> | any;
  provider: ReturnType<Web3ReactHooks['useProvider']> | any;
}
