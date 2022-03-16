import { Web3ReactType } from '../Web3ReactType';

export interface NavBarInterface {
  accounts: ReturnType<Web3ReactType['accounts']>;
  provider: ReturnType<Web3ReactType['provider']>;
}

export interface MintInterface {
  chainId: Web3ReactType['chainId'];
  accounts: Web3ReactType['accounts'];
  provider: Web3ReactType['provider'];
}
