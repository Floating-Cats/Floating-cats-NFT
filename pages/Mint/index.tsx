import { useEffect, useState } from 'react';
import FCBgCloud from 'components/FCHome/FCBgCloud';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// other imports
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// contracts
import FCat from 'pages/artifacts/contracts/MyNFT.sol/FloatingCats.json';

// helpers
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
// import HDWalletProvider from '@truffle/hdwallet-provider';

export default function Mint({
  navBarParams,
}: {
  navBarParams: NavBarInterface;
}) {
  // ################### nav bar params
  const { accounts /*provider*/ } = navBarParams; // params

  // ################### env vars
  const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;
  const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
  const { NEXT_PUBLIC_COST } = process.env;
  const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;
  const { NEXT_PUBLIC_RINKEBY_PKEY_ACC1 } = process.env;
  const { NEXT_PUBLIC_RINKEBY_PKEY_ACC4 } = process.env;

  // ################### vars for mint action
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '0.06'); // TODO: change this to real mint price
  const [mintAmount, setMintAmount] = useState<number>(1);

  // ################### set up provider and contract
  const provider = new Web3.providers.HttpProvider(
    NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY || ''
  );
  const web3 = new Web3(provider);

  // ################### set up middleware

  // get hex keys
  console.log(
    'NEXT_PUBLIC_RINKEBY_PKEY_ACC1 = ',
    NEXT_PUBLIC_RINKEBY_PKEY_ACC1
  );
  console.log(
    'NEXT_PUBLIC_RINKEBY_PKEY_ACC4 = ',
    NEXT_PUBLIC_RINKEBY_PKEY_ACC4
  );

  // const privKey1: string = Buffer.from(
  //   NEXT_PUBLIC_RINKEBY_PKEY_ACC1,
  //   'hex'
  // ).toString();
  // const privKey4: string = Buffer.from(
  //   NEXT_PUBLIC_RINKEBY_PKEY_ACC4,
  //   'hex'
  // ).toString();

  // console.log('privKey1 = ', privKey1);
  // console.log('privKey4 = ', privKey4);

  // create web3.js middleware that signs transactions locally
  // https://forum.openzeppelin.com/t/binance-testnet-deployment-error-could-not-create-addresses-from-your-mnemonic-or-private-key-s/5438/5
  // const localKeyProvider = new HDWalletProvider({
  //   privateKeys: [privKey1, privKey4],
  //   providerOrUrl: provider,
  // });
  // const web3 = new Web3(localKeyProvider);
  // const myAccount = web3.eth.accounts.privateKeyToAccount(privKey1);

  const contract: Contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify([...FCat.abi])),
    contractAddress,
    {
      from: accounts ? accounts[0] : '',
      // gasPrice: gasPrice,
    }
  );

  console.debug('contract count = ');
  contract.methods
    .count()
    .call()
    .then(function (result: string) {
      console.log(result);
    });

  /**
   * Initializes the states (mintAmounts) used for the form.
   */
  const clearForm: () => void = () => {
    setMintAmount(1);
  };

  const onChangeSetMintAmount: (mint_amount: string) => void = (
    mint_amount
  ) => {
    const amount = parseInt(mint_amount);
    setMintAmount(amount);
  };

  const greetingMsg: () => void = () => {
    mintAmount < 10
      ? alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱   Hit OK to continue   🐱`)
      : alert(`
🐱 You will mint ${mintAmount} tokens🐱\n
🐱   Hit OK to continue     🐱`);

    // toast(`🐱 Let's getti!🐱`);
  };

  const mintToken: () => void = async () => {
    // await window.ethereum.enable();
    // greeting (remove this?)
    greetingMsg();

    // setContract(new ethers.Contract(contractAddress, FCat.abi, provider));

    // check if contract signer is set
    // if (!accounts.length || !contract.signer) {
    //   toast.error(
    //     '⚠️: Your wallet cannot be read while we connect you to the ethereum server.\nNo action has taken place.'
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

    const cost: number = mintPrice * mintAmount;
    console.log('cost = ');
    console.log(cost);
    console.log(cost.toString());
    console.log(web3.utils.toWei(cost.toString(), 'ether'));
    // console.log(ethers.utils.parseEther(cost.toString()));
    await toast.promise(
      contract.methods
        .mint(mintAmount)
        .send({ from: accounts ? accounts[0] : '' })
        .then(function (result: string) {
          console.log(result);
        }),
      {
        pending: 'Transaction is pending',
        success: 'Transaction is approved 👌',
        error: 'Transaction is rejected 🤯',
      }
    );
    // await result.wait(); // FIXME: Cannot read properties of undefined (reading 'wait')
  };

  return (
    <>
      <FCBgCloud />
      <div id='mintPageBg'>
        <div className='' id='mintPage'>
          <div id='mintInfo'>
            <h1>0 / 5888 Adopted</h1>
            <button
              data-toggle='modal'
              data-target='#exampleModal'
              id='checkWL'
            >
              Check Whitelist
            </button>
            <div id='priceInfo'>
              <h4>Pre-Sale: 0.04 Ξ</h4>
              <h4>Max 5 per wallet</h4>
            </div>
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
            <button id='mintbtn' onClick={mintToken}>
              Mint
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
