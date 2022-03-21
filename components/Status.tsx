import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

export function Status({ errMsg }: { errMsg: string }) {
  const { error, active } = useWeb3React();
  let errDisplayed: boolean = errMsg.length > 0;
  let errMsg_: string = '';

  console.log(errMsg);

  if (
    errDisplayed &&
    errMsg.toString().includes('No Ethereum provider was found')
  )
    errMsg_ = 'No MetaMask Detected';
  if (
    errDisplayed &&
    errMsg.toString().includes('The user rejected the request')
  )
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
