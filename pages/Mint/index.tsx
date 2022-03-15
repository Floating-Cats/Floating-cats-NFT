import { useEffect, useState } from 'react';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// other imports
import Web3 from 'web3';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
var Tx = require('ethereumjs-tx').Transaction;

// contracts
import FCat from 'pages/artifacts/contracts/MyNFT.sol/FloatingCats.json';

// components
import FCSupplyMaxSupply from 'components/FCSupplyMaxSupply';
import FCWhiteListForm from 'components/FCWhiteListForm';
import FCMintAmountForm from 'components/FCMintAmountForm';

// helpers
import { Account } from 'web3/eth/accounts'; // for typechecking
import { Contract } from 'web3-eth-contract'; // for typechecking
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { MintInterface } from 'components/helpers/ParamsInterface';

// imports for env vars
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;

export default function Mint({
  mintParams,
}: {
  mintParams: MintInterface;
}): JSX.Element {
  const { chainId, accounts, provider } = mintParams; // params
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '');
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const [mintAmount, setMintAmount] = useState<number>(1);

  let cost: string = (mintPrice * mintAmount).toString();
  // let signer: string = accounts ? accounts[0] : '';
  // console.log(signer);

  // init provider
  // provider
  //   ? provider
  //   :
  // let FCatProvider = new Web3.providers.HttpProvider(
  //   NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY || ''
  // );
  // console.log(FCatProvider);

  let FCatProvider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  );

  let signer: ethers.providers.JsonRpcSigner | any;

  let FCatContract: Contract | any;

  if (accounts && accounts.length > 0) {
    // get the end user
    signer = FCatProvider.getSigner();
    // get the smart contract
    FCatContract = new ethers.Contract(contractAddress, FCat.abi, signer);
    console.log('signer = ', signer);
    console.log('hereeee');
  }

  // init web3 object
  // let web3: Web3 = new Web3(FCatProvider); // FCatProvider || (window as any).web3.currentProvider

  // init contract
  // let FCatContract: Contract = new web3.eth.Contract(
  //   JSON.parse(JSON.stringify([...FCat.abi])),
  //   contractAddress,
  //   {
  //     from: signer,
  //     // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  //     // gas: 4700000,
  //   }
  // );

  /**
   * Alert user before executing mint action
   *
   * @returns void
   */
  const greetingMsg: () => void = () => {
    alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱 Hit OK/Close to continue 🐱`);
  };

  /**
   * Get the current number of supply
   *
   * @returns integer, number of total supply
   */
  const getCount = async () => {
    try {
      let count = await FCatContract.count();
      await count.wait();
      return count;
    } catch (err) {
      console.error(err);
      return '-';
    }
  };

  console.log(getCount());

  /**
   * Execute mint action
   *
   * @returns void
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
      // if (isObjEmpty(RinkebyProvider)) {
      //   toast.error(
      //     '⚠️: Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
      //   );
      //   return;
      // }

      // check if mint price is set
      if (!mintPrice) {
        toast.error(
          '⚠️: Oops! Cannot read mint cost.\nNo action has taken place.'
        );
        return;
      }

      greetingMsg();

      const connection = FCatContract.connect(signer);
      const result = await FCatContract.mint(mintAmount, {
        value: ethers.utils.parseEther('0.02'),
      });

      await result.wait();

      console.log(result);

      // if (FCatProvider && FCatProvider.connection) {
      //   // TODO: do something
      //   if (FCatProvider.connection.url === 'metamask') {
      //     // mint action?
      //     console.log('metamask');
      //   }
      //   if (FCatProvider.connection.url === 'eip-1993:') {
      //     // mint action
      //     console.log('wallet connect');
      //   }
      // } else {
      //   // provider is infura endpoint of HttpProvider type
      //   console.log('infura endpoint');
      // }

      // const tx = {
      //   from: signer,
      //   to: contractAddress,
      //   gas: web3.utils.toHex('4700000'),
      //   chainId: chainId,
      //   value: web3.utils.toWei(cost, 'ether'),
      //   // value: '0x00',
      //   // nonce: nonce,
      //   // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      //   // gasLimit: web3.utils.toHex('21204'),
      //   // maxPriorityFeePerGas: 2999999987,
      //   data: FCatContract.methods.mint(mintAmount).encodeABI(),
      // };
      // // const signedTx = await web3.eth.signTransaction(tx, signer);

      // const receipt = await web3.eth.sendTransaction(tx);
      // console.log('receipt = ', receipt);

      // TODO: request permission from the user to get their accounts

      // Modern dapp browsers...

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
          <Col xs={5}>
            <FCSupplyMaxSupply FCatContract={FCatContract} />
          </Col>
          {/* <Col xs={2}>
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
          </Col> */}
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
