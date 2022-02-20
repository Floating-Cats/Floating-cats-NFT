import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
// import type { WalletLink } from '@web3-react/walletlink';
import { useCallback, useState } from 'react';
import { CHAINS, getAddChainParameters, URLS } from '../chains';

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
      onChange={(e) => {
        switchChain?.(Number(e.target.value));
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

export function ConnectWithSelect({
  chainId,
  error,
  isActivating,
  isActive,
  connector,
}: {
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  connector: MetaMask | WalletConnect | Network /*| WalletLink*/;
}) {
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  // console.log('URLS ~~~ ', URLS);
  // console.log('CHAINS ~~~ ', CHAINS);
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  );

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  );

  // TODO: comment this out and connect straight to mainnet before deployment
  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId
        );
      } else {
        await connector.activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        );
      }
    },
    [connector, chainId]
  );

  console.log('switchChain ~~ ', switchChain);

  if (error) {
    // if an error is caught during connection
    // TODO: add more catches
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId}
          switchChain={switchChain}
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
          switchChain={switchChain}
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
          switchChain={isActivating ? undefined : switchChain}
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
