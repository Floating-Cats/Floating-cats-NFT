import { Web3ReactType } from './helpers/Web3ReactType';

export function Status({
  isActivating,
  error,
  isActive,
}: {
  error: ReturnType<Web3ReactType['error']>;
  isActivating: ReturnType<Web3ReactType['isActivating']>;
  isActive: ReturnType<Web3ReactType['isActive']>;
}) {
  return (
    <div id='connect-status'>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Not Connected</>
      )}
    </div>
  );
}
