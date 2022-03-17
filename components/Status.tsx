import { useWeb3React } from '@web3-react/core';

export function Status() {
  const { error, active } = useWeb3React();
  return (
    <div id='connect-status'>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : active ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Not Connected</>
      )}
    </div>
  );
}

// : isActivating ? (
//         <>🟡 Connecting</>
//       )
