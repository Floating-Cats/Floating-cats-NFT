import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

export function Status({ errMsg }: { errMsg: string }) {
  const { error, active } = useWeb3React();
  let errDisplayed: boolean = errMsg.length > 0;
  let errMsg_: string = '';

  if (errDisplayed && errMsg.startsWith('NoEthereumProviderError'))
    errMsg_ = 'No MetaMask Detected';
  if (errDisplayed && errMsg.toString().startsWith('UserRejectedRequestError'))
    errMsg_ = 'Connection Cancelled';

  return (
    <div id='connect-status'>
      {errDisplayed ? (
        <>🔴 {`Error: ${errMsg_}`}</>
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
