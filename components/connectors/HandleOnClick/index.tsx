// web3 react
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, getAddChainParameters, URLS } from 'chains';

// helper function
import { resetWalletConnector } from '../ResetWalletConnector';

export async function handleOnClick(
  chainId: ReturnType<Web3ReactHooks['useChainId']>,
  error: ReturnType<Web3ReactHooks['useError']>,
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>,
  isActive: ReturnType<Web3ReactHooks['useIsActive']>,
  connector: MetaMask | WalletConnect | Network /*| WalletLink*/,
  desiredChainId: number | any
) {
  if (error) {
    // TODO: Add toast for feed back
    // Try again?
    console.log(`if error, ${error}, desiredChainId = ${desiredChainId}`);
    connector instanceof WalletConnect || connector instanceof Network
      ? await connector
          // .activate(desiredChainId === -1 ? undefined : desiredChainId)
          .activate(desiredChainId === -1 ? 1 : desiredChainId)
          .catch((err) => {
            // We need to reset walletconnect if users have closed the modal
            resetWalletConnector(connector);
          })
      : await connector.activate(
          desiredChainId === -1
            ? 1
            : // ? undefined
              getAddChainParameters(desiredChainId)
        );
  } else if (isActive) {
    // Disconnect
    console.log(
      `else if isActive, ${isActive}, desiredChainId = ${desiredChainId}`
    );
    await connector.deactivate();
  } else {
    // Connect
    console.log(
      `else isActivating, ${isActivating}, desiredChainId = ${desiredChainId}, connector = ${connector}`
    );
    console.debug('connector is ', connector);
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
  }
  // };
}
