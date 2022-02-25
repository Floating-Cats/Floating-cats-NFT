import { CHAINS } from 'chains';

export default function Select({
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
  return (
    <select
      value={chainId}
      onChange={(e) => {
        e.preventDefault();
        switchChain?.(Number(e.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}
