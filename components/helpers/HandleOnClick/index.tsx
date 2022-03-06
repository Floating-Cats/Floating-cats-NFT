// web3 react
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, getAddChainParameters, URLS } from 'chains';

// helper function
import { toast } from 'react-toastify';
import { resetWalletConnector } from '../ResetWalletConnector';
import { Web3ReactType } from 'components/helpers/Web3ReactType';

export async function handleOnClick(
  // web3 react
  chainId: Web3ReactType['chainId'],
  error: Web3ReactType['error'],
  isActivating: Web3ReactType['isActivating'],
  isActive: Web3ReactType['isActive'],
  connector: MetaMask | WalletConnect | Network /*| WalletLink*/,
  desiredChainId: number | any
) {
  // empty object check
  // src: https://stackoverflow.com/a/32108184/13007073
  const isEmpty: (obj: object | any) => boolean = (obj) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };

  if (error && !isEmpty(error)) {
    connector instanceof WalletConnect || connector instanceof Network
      ? await connector
          .activate(desiredChainId === -1 ? 1 : desiredChainId)
          .catch((err) => {
            resetWalletConnector(connector);
          })
      : await connector.activate(
          desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
        );

    // toast('No action has taken place!');
  } else if (isActive) {
    await connector.deactivate();
    toast('Wallet Disconnected!');
  } else {
    connector instanceof WalletConnect || connector instanceof Network
      ? await connector
          .activate(desiredChainId === -1 ? 1 : desiredChainId)
          .catch((err) => {
            console.error('ERROR1~~~', err);
            // We need to reset walletconnect if users have closed the modal
            resetWalletConnector(connector);
          })
      : await connector.activate(
          desiredChainId === -1 ? 1 : getAddChainParameters(desiredChainId)
        );
    // toast('Wallet Connected!');
  }
}
