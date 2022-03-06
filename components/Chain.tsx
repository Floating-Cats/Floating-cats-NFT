import { CHAINS } from '../chains';
import { Web3ReactType } from './helpers/Web3ReactType';

export function Chain({
  chainId,
}: {
  chainId: ReturnType<Web3ReactType['chainId']>;
}) {
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div>
        Chain:{' '}
        <b>
          {name === 'Mainnet' ? (
            <>{`${name}(${chainId})`}</>
          ) : (
            <>{`${name}(${chainId}) - You are not on the main network, please switch it through your device`}</>
          )}
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
}
