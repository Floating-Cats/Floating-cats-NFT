import { useEffect, useState } from 'react';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';

// other imports
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// contracts
import FCat from 'pages/artifacts/contracts/MyNFT.sol/FloatingCats.json';

// helpers
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { MintInterface } from 'components/helpers/ParamsInterface';
import Web3 from 'web3';
var Tx = require('ethereumjs-tx').Transaction;
import { Contract } from 'web3-eth-contract'; // for typechecking
import { Account } from 'web3/eth/accounts';

// ################### imports for env vars
const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;

// interface SignedTxParams {
//   to: string;
//   value: string;
//   data: Buffer;
// }

export default function Mint({ mintParams }: { mintParams: MintInterface }) {
  const { chainId, accounts, provider } = mintParams; // params

  // ################### setup for provider and contract
  let RinkebyProvider = new Web3.providers.HttpProvider(
    NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY || ''
  );
  let web3 = new Web3((window as any).web3.currentProvider);
  // let web3 = new Web3(RinkebyProvider);
  window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  });

  web3.eth.defaultAccount = accounts ? accounts[0] : ''; // set default account
  const signer: string = web3.eth.defaultAccount || '';
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '0.02'); // TODO: change this to real mint price
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [supply, setSupply] = useState<string>('-');
  const [maxSupply, setMaxSupply] = useState('-');
  const [AddrForWL, setAddrForWL] = useState<string>('');
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

  // console.debug('FCatContract count = ');
  FCatContract.methods
    .count()
    .call()
    .then((supply: string) => setSupply(supply));

  FCatContract.methods
    .maxSupply()
    .call()
    .then((maxSup: string) => setMaxSupply(maxSup));

  /**
   * clear form is called when you want the text field of the form to be refreshed
   * @returns void
   */
  const clearForm: () => void = () => setAddrForWL('');

  /**
   * Set the wallet address state for later check WL function
   *
   * @param addr - wallet address to chech if it is whitelisted
   * @returns void
   */
  const onChangeSetAddr: (addr: string) => void = (addr) => setAddrForWL(addr);

  /**
   * Set the mint amount state for mint function
   * @param mint_amount - amount of NFT to mint, an integer of string type
   * @returns void
   */
  const onChangeSetMintAmount: (mint_amount: string) => void = (mint_amount) =>
    setMintAmount(parseInt(mint_amount));

  /**
   * Check if the address set by the hook is on the WL.
   * @returns void
   */
  const onSubmitCheckWL: () => void = () => {
    try {
      FCatContract.methods
        .isWhitelisted(AddrForWL)
        .call()
        .then(function (result: boolean) {
          if (!result) {
            toast(`⚠️: Oops! The Address Is NOT on Our Whitelist!`);
            clearForm();
            return;
          } else {
            toast(`🐱 Hi Good Neko! The Address Is on Our Whitelist!`);
            clearForm();
            return;
          }
        });
    } catch (err: any) {
      if (err) {
        if (err.code == 'INVALID_ARGUMENT')
          toast.error(
            `⚠️: "${
              err.value.length > 10
                ? err.value.substring(0, 10) + '...'
                : err.value
            }" is not a valid wallet address.`
          );
        else
          toast.error(
            `⚠️: Oops! Something went wrong, error code = ${err.code}`
          );
      }
      clearForm();
      console.error('Error~~~ ', err);
    }
  };

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
      await (window as any).ethereum.enable();
      // await web3.eth.getAccounts().then(console.log);
      await web3.eth.requestAccounts().then(console.log); // wont work on HttpProvidder

      // define raw transaction
      const tx = {
        from: signer,
        to: contractAddress,
        contractAddress: contractAddress,
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
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        '3720286db559b9a30f7c7b96370544717c0bc21c9ae5daf0520087caec393a14'
      );
      console.log('signedTx = ', signedTx);

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
            <Form>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  id='mint-quantity'
                  type='number'
                  min='1'
                  max={NEXT_PUBLIC_MAX_MINT_AMOUNT}
                  // placeholder='a number'
                  value={mintAmount}
                  onChange={(e) => onChangeSetMintAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={5}>
            <Row>
              <h1>{`${supply} / ${maxSupply}` /* change 5888 to env var */}</h1>
            </Row>
          </Col>
          <Col xs={5}>
            <Row>
              <h3>Check Whitelist</h3>
            </Row>
            <Row>
              <InputGroup className='mb-3'>
                <FormControl
                  required
                  id='check-wl-form'
                  type='text'
                  placeholder='0xabcde...12345 (your wallet address)'
                  value={AddrForWL}
                  onChange={(e) => onChangeSetAddr(e.target.value)}
                />
                <Button
                  variant='secondary'
                  id='check-wl-btn'
                  onClick={onSubmitCheckWL}
                >
                  GO
                </Button>
              </InputGroup>
            </Row>
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
