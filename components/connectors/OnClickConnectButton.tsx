import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { useCallback, useState } from 'react';
import { CHAINS, getAddChainParameters, URLS } from '../../chains';

// FIXME: comment out if we don't want to switch between networks
function Select({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number | any;
  switchChain: ((chainId: number) => Promise<void>) | any;
  displayDefault: boolean;
  chainIds: number[];
}) {
  console.log('chainIds ~~ ', chainIds);
  return (
    <select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {/* {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))} */}
      {[1, 4].map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export default function OnClickConnectButton({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask | WalletConnect | Network /*| WalletLink*/;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  // check if there is a network
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  );

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  );

  if (error) {
    // if an error is caught during connection
    // TODO: add more catches
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId}
          // switchChain={switchChain}
          switchChain={null}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() =>
            connector instanceof WalletConnect || connector instanceof Network
              ? connector.activate(
                  desiredChainId === -1 ? undefined : desiredChainId
                )
              : connector.activate(
                  desiredChainId === -1
                    ? undefined
                    : getAddChainParameters(desiredChainId)
                )
          }
        >
          Try Again?
        </button>
      </div>
    );
  } else if (isActive) {
    // while a wallet is connected
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId === -1 ? -1 : chainId}
          // switchChain={switchChain}
          switchChain={null}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={() => connector.deactivate()}>Disconnect</button>
      </div>
    );
  } else {
    // while no wallet is not connected
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId}
          // switchChain={isActivating ? undefined : switchChain}
          switchChain={null}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector instanceof WalletConnect ||
                  connector instanceof Network
                    ? connector.activate(
                        desiredChainId === -1 ? undefined : desiredChainId
                      )
                    : connector.activate(
                        desiredChainId === -1
                          ? undefined
                          : getAddChainParameters(desiredChainId)
                      )
          }
          disabled={isActivating}
        >
          Connect
        </button>
      </div>
    );
  }
}
