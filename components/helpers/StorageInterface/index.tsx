import type { Web3ReactType } from '../Web3ReactType';

export interface StorageInterface {
  chainId: Web3ReactType['chainId'];
  accounts: Web3ReactType['accounts'];
  error: Web3ReactType['error'];
  isActivating: Web3ReactType['isActivating'];
  isActive: Web3ReactType['isActive'];
  provider: Web3ReactType['provider'];
  ENSNames: Web3ReactType['ENSNames'];
}
