import { WalletConnect } from '@web3-react/walletconnect';
import { Network } from '@web3-react/network';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export function resetWalletConnector(connector: WalletConnect | Network) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}
