import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { useCallback, useState } from 'react';
import { CHAINS, getAddChainParameters, URLS } from '../../chains';

// FIXME: comment out if we don't want to switch between networks
export default function FCSelector({
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
