import Web3 from 'web3';

// helpers
import { Contract } from 'web3-eth-contract'; // for typechecking
import { isObjEmpty } from 'components/helpers/isObjEmpty';

/*
  Unlocking an account on a remote node is unsafe for two reasons:
  - you expose your password
  - anyone that has access to the node can transfer funds from the unlocked account.

  So, we do
  - sign transaction locally -> signTransaction, works
    > 
    {
      messageHash: "0x30c39c246af9cea6b62c1d084afb36808ab70dd51e0379f7ed768fb4712ba238"
      r: "0xc969db1c873d495c2657da4dea4d540ccc5792a062152123ce019c21318ec069"
      rawTransaction: "0xf88701843d517ce38252d4942c854a380af77cbd0273e6ff1ebedb9b57ae92eb80a4a0712d6800000000000000000000000000000000000000000000000000000000000000012ca0c969db1c873d495c2657da4dea4d540ccc5792a062152123ce019c21318ec069a04417b50811721f6392f1775403595be9ad50662109392c9594356c7ead87bb8e"
      s: "0x4417b50811721f6392f1775403595be9ad50662109392c9594356c7ead87bb8e"
      transactionHash: "0x1f3dc8217888b00bfc93a905387b859f73f4f4270f763598a216aae95b9e8eca"
      v: "0x2c"
    }
    >
  - send it as a raw transaction to the remote node (Infura), sendSignedTransaction, doesn't work, insufficient funds for gas
*/
export default function OnClickMintNFT() {}
