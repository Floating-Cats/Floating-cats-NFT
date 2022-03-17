import { useWeb3React } from '@web3-react/core';
import { Web3ReactType } from './helpers/Web3ReactType';

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
