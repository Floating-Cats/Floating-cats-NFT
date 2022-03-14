import { useEffect, useState } from 'react';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// other imports
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// contracts
import FCat from 'pages/artifacts/contracts/MyNFT.sol/FloatingCats.json';

// components
import FCSupplyMaxSupply from 'components/FCSupplyMaxSupply';
import FCWhiteListForm from 'components/FCWhiteListForm';
import FCMintAmountForm from 'components/FCMintAmountForm';

// helpers
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { MintInterface } from 'components/helpers/ParamsInterface';
import Web3 from 'web3';
var Tx = require('ethereumjs-tx').Transaction;
import { Contract } from 'web3-eth-contract'; // for typechecking
import { Account } from 'web3/eth/accounts';

// ################### imports for env vars
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;

// interface SignedTxParams {
//   to: string;
//   value: string;
//   data: Buffer;
// }

export default function Mint({
  mintParams,
}: {
  mintParams: MintInterface;
}): JSX.Element {
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

  const { chainId, accounts, provider } = mintParams; // params

  // ################### setup for provider and contract
  let RinkebyProvider = new Web3.providers.HttpProvider(
    NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY || ''
  );
  // let web3 = new Web3((window as any).web3.currentProvider);
  let web3 = new Web3(RinkebyProvider);

  web3.eth.defaultAccount = accounts ? accounts[0] : ''; // set default account
  const signer: string = web3.eth.defaultAccount || '';
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '0.02'); // TODO: change this to real mint price
  const [mintAmount, setMintAmount] = useState<number>(1);

  // FIXME: generate privkey to sign the contract
  const web3Account: Account | any = web3.eth.accounts.create();
  const privKey: string = web3Account ? web3Account.privateKey : '';
  // const privKey1: Buffer = Buffer.from(privKey, 'hex');
  // console.log(`pkey=${privKey} pkey=${privKey1.toString()}`);

  const FCatContract: Contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify([...FCat.abi])),
    contractAddress,
    {
      from: signer,
      // gasPrice: web3.utils.toWei('0.00000001', 'ether'),
      // gas: 4700000,
    }
  );

  /**
   * Alert user before mint action
   *
   * @returns void
   */
  const greetingMsg: () => void = () => {
    alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱 Hit OK/Close to continue 🐱`);
  };

  /**
   *
   * @returns
   */
  const mintToken: () => void = async () => {
    try {
      if (!signer) {
        toast.error('Oops! No wallet connected');
        return;
      }

      if (signer === '') {
        toast.error('Oops! No wallet connected');
        return;
      }

      // if (chainId !== 1) {
      //   toast.error(
      //     "You're not on the main network, please switch your network"
      //   );
      //   return;
      // }

      // check if provider is set
      if (isObjEmpty(RinkebyProvider)) {
        toast.error(
          '⚠️: Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
        );
        return;
      }

      // check if mint price is set
      if (!mintPrice) {
        toast.error(
          '⚠️: Oops! Cannot read mint cost.\nNo action has taken place.'
        );
        return;
      }

      greetingMsg();

      const cost: string = (mintPrice * mintAmount).toString();
      // TODO: request permission from the user to get their accounts

      // Modern dapp browsers...
      if (/* window.ethereum */ provider.connection.url === 'metamask') {
        // metamask
        console.log('here1');
        web3 = new Web3(web3.eth.currentProvider);
        // Request account access if needed
        // await (window as any).ethereum.enable();
      }

      // Legacy dapp browsers...
      else if (provider.connection.url === 'eip-1193:') {
        console.log('here2');
        web3 = new Web3(web3.eth.currentProvider);
        // define raw transaction
        const tx = {
          from: signer,
          to: contractAddress,
          gas: web3.utils.toHex('4700000'),
          chainId: chainId,
          value: web3.utils.toWei(cost, 'ether'),
          // value: '0x00',
          // nonce: nonce,
          // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
          // gasLimit: web3.utils.toHex('21204'),
          // maxPriorityFeePerGas: 2999999987,
          data: FCatContract.methods.mint(mintAmount).encodeABI(),
        };
        // const signedTx = await web3.eth.signTransaction(tx, signer);
        const receipt = await web3.eth.sendTransaction(tx);
        console.log('receipt = ', receipt);
        // console.log('signedTx = ', signedTx);
      }
      // Non-dapp browsers...
      else {
        toast.error('none');
        return;
      }
      // await web3.eth.getAccounts().then(console.log);
      // await web3.eth.requestAccounts().then(console.log); // wont work on HttpProvidder

      // await toast.promise(
      //   web3.eth
      //     .sendSignedTransaction(signedTx.rawTransaction || '')
      //     .then((transactionReceipt) => {
      //       console.log('receipt = ', transactionReceipt);
      //     }),
      //   {
      //     pending: 'Transaction is pending',
      //     success: 'Transaction is approved 👌',
      //     error: 'Transaction is rejected 🤯',
      //   }
      // );
    } catch (err) {
      toast.error(`⚠️: Oops! Something went wrong.\n${err}`);
      console.error('Error~~~', err);
      return;
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col xs={2}>
            <FCMintAmountForm
              mintAmount={mintAmount}
              setMintAmount={setMintAmount}
            />
          </Col>
          <Col xs={5}>
            <FCSupplyMaxSupply FCatContract={FCatContract} />
          </Col>
          <Col xs={5}>
            <FCWhiteListForm FCatContract={FCatContract} />
          </Col>
        </Row>
      </div>
      <div className='mintPageBg'>
        <img src='/mint-bg-top.png' alt='' id='mint-bg' />
        <div className='container' id='mintPage'>
          <div className='row'>
            <div className='col'>
              <img
                id='mintBtn-blue'
                src='/mint-btn-blue.png'
                alt=''
                onClick={mintToken}
              />
            </div>
            <div className='col'>
              <img
                id='mintBtn-red'
                src='/mint-btn-red.png'
                alt=''
                onClick={mintToken}
              />
            </div>
            <div className='col'>
              <img
                id='mintBtn-yellow'
                src='/mint-btn-yellow.png'
                alt=''
                onClick={mintToken}
              />
            </div>
          </div>
        </div>
        {/* <img src='/mint-bg-bt.png' alt='' id='mint-bg' /> */}
      </div>
    </>
  );
}
