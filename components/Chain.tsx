import { useWeb3React } from '@web3-react/core';
import { CHAINS } from '../chains';

export function Chain() {
  const { chainId } = useWeb3React();
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div id='chain'>
        Chain:{' '}
        <span role='img' aria-label='chain'>
          ⛓{' '}
        </span>
        <b>
          {name === 'Mainnet' ? (
            <>{`${name}(${chainId})`}</>
          ) : (
            <>{`${name}(${chainId}) - You are not on the main network, please switch to Mainnet through your device`}</>
          )}
        </b>
      </div>
    );
  }

  return null;
}
