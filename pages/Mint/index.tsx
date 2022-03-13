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
var Tx = require('ethereumjs-tx');
import { Contract } from 'web3-eth-contract'; // for typechecking
import { Account } from 'web3/eth/accounts';

// ################### imports for env vars
const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;

// ################### setup for provider and contract
const provider = new Web3.providers.HttpProvider(
  NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY || ''
);
const web3 = new Web3(provider);

export default function Mint({ mintParams }: { mintParams: MintInterface }) {
  const { chainId, accounts /*provider*/ } = mintParams; // params
  web3.eth.defaultAccount = accounts ? accounts[0] : ''; // set default account
  const signer: string = web3.eth.defaultAccount || '';
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '0.04'); // TODO: change this to real mint price
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [supply, setSupply] = useState<string>('-');
  const [AddrForWL, setAddrForWL] = useState<string>('');
  const web3Account: Account | any = web3.eth.accounts.create();
  const privKey: string = web3Account.privateKey;
  // TODO: check whitelist

  // const privKey1: Buffer = Buffer.from(privKey, 'hex');

  // console.log(`pkey=${privKey} pkey=${privKey1.toString()}`);

  const FCatContract: Contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify([...FCat.abi])),
    contractAddress,
    {
      from: signer,
      // gasPrice: web3.utils.toHex(20),
      // gasPrice: '20000000000',
      gasPrice: '8000000000',
      gas: 4700000,
    }
  );

  console.debug('FCatContract count = ');
  FCatContract.methods
    .count()
    .call()
    .then(function (result: string) {
      setSupply(result);
    });

  const onChangeSetMintAmount: (mint_amount: string) => void = (
    mint_amount
  ) => {
    const amount = parseInt(mint_amount);
    setMintAmount(amount);
  };

  const onChangeSetAddr: (addr: string) => void = (addr) => {
    setAddrForWL(addr);
  };

  // TODO: need check
  const onSubmitCheckWL: () => void = () => {
    try {
      FCatContract.methods
        .isWhitelisted(AddrForWL)
        .call()
        .then(function (result: boolean) {
          if (!result) {
            toast(`The address is NOT on our whitelist!`);
            return;
          } else {
            toast(`The address is on the whitelist!`);
            return;
          }
        });
    } catch (err: any) {
      toast.error(`Something went wrong!\n ${err}`);
      console.error('Error~~~ ', err);
    }
  };

  const greetingMsg: () => void = () => {
    mintAmount < 10
      ? alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱 Hit OK/Close to continue 🐱`)
      : alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱 Hit OK/Close to continue 🐱`);

    // toast(`🐱 Let's getti!🐱`);
  };

  console.log(FCatContract);

  const mintToken: () => void = async () => {
    // console.log('cost = ');
    // console.log(cost);
    // console.log(web3.utils.toWei(cost.toString(), 'ether'));
    try {
      if (!signer) {
        toast.error('No wallet connected');
        return;
      }

      if (signer === '') {
        toast.error('No wallet connected');
        return;
      }

      // if (chainId !== 1) {
      //   toast.error(
      //     "You're not on the main network, please switch your network"
      //   );
      //   return;
      // }

      // check if provider is set
      if (isObjEmpty(provider)) {
        toast.error(
          '⚠️: Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
        );
        return;
      }

      // check if mint price is set
      if (!mintPrice) {
        toast.error('⚠️: Cannot read mint cost.\nNo action has taken place.');
        return;
      }

      greetingMsg(); // greeting (remove this?)
      const cost: string = (mintPrice * mintAmount).toString();
      const nonce = await web3.eth.getTransactionCount(
        contractAddress,
        'latest'
      ); //get latest nonce
      // console.log(nonce);

      // the transaction
      const tx = {
        to: contractAddress,
        // nonce: nonce,
        gasPrice: '20000000000',
        gas: '21204',
        from: signer,
        // gasLimit: web3.utils.toHex('21204'),
        // value: '1000000000000000000',
        // maxPriorityFeePerGas: 2999999987,
        data: FCatContract.methods.mint(mintAmount).encodeABI(),
      };

      // according to
      // https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft
      const signedTx = await web3.eth.accounts.signTransaction(tx, privKey);
      const transactionReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction || ''
      );

      console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

      // web3.eth.accounts.signTransaction(tx, privKey).then((signedTx) => {
      //   web3.eth
      //     .sendSignedTransaction(signedTx.rawTransaction || '')
      //     .on('confirmation', (confirmationNumber, receipt) => {
      //       console.log('confirmation: ' + confirmationNumber);
      //     })
      //     .on('transactionHash', (hash) => {
      //       console.log('hash');
      //       console.log(hash);
      //     })
      //     .on('receipt', (receipt) => {
      //       console.log('reciept');
      //       console.log(receipt);
      //     })
      //     .on('error', console.error);
      // });

      // await toast.promise(
      //   FCatContract.methods
      //     .mint(mintAmount)
      //     .send({
      //       from: signer,
      //       // to: NEXT_PUBLIC_CONTRACT_ADDR,
      //       value: web3.utils.toWei(cost, 'ether'),
      //       // gas: 39000,
      //       // chainId: 1,
      //     })
      //     // .then(function (result: string) {
      //     //   console.log(`result = ${result}`);
      //     // }),
      //     .then((receipt: string) => {
      //       // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      //       console.log(`receipt = ${receipt}`);
      //       // Build the transaction
      //       const txObject = {
      //         nonce: web3.utils.toHex(nonce),
      //         to: contractAddress,
      //         value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      //         gasLimit: web3.utils.toHex(2100000),
      //         gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
      //         data: FCatContract.methods.mint(mintAmount).encodeABI(),
      //       };
      //       // Sign the transaction
      //       const tx = new Tx(txObject);
      //       tx.sign(privKey1);

      //       const serializedTx = tx.serialize();
      //       const raw = '0x' + serializedTx.toString('hex');

      //       // Broadcast the transaction
      //       const transaction = web3.eth.sendSignedTransaction(
      //         raw,
      //         (err, tx) => {
      //           console.log(tx);
      //         }
      //       );
      //     }),
      //   {
      //     pending: 'Transaction is pending',
      //     success: 'Transaction is approved 👌',
      //     error: 'Transaction is rejected 🤯',
      //   }
      // );
    } catch (err) {
      toast.error(`Oops! Something went wrong.\nError Message: {${err}}`);
      console.error('Error~~~', err);
      return;
    }
    // Error: Could not create addresses from your mnemonic or private key(s).
    // Please check that your inputs are correct.

    // Unhandled Promise Rejection: Error: Returned error:
    // The method eth_sendTransaction does not exist/is not available

    // await result.wait(); // FIXME: Cannot read properties of undefined (reading 'wait')
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
              <h1>{`${supply} / 5888` /* change 5888 to env var */}</h1>
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
                  placeholder='0xabcde...12345'
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
