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

// helpers
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { NavBarInterface } from 'components/helpers/NavBarInterface';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export default function Mint({
  navBarParams,
}: {
  navBarParams: NavBarInterface;
}) {
  const { accounts, provider } = navBarParams; // params
  const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env; // env vars
  const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env; // env vars
  const { NEXT_PUBLIC_COST } = process.env; // env vars

  // vars for mint action
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '0.06'); // TODO: change this to real mint price
  const [mintAmount, setMintAmount] = useState<number>(1);

  const web3 = new Web3(provider);
  // const web3 = new Web3(window.ethereum);
  console.log(web3);

  console.debug('FCat.abi');
  console.log({ ...FCat.abi });

  const contract: Contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify([...FCat.abi])),
    accounts ? accounts[0] : ''
  );
  // const provider: EthereumProvider = new ethers.providers.Web3Provider(
  //   window.ethereum
  // );

  console.debug('...contract connected');
  console.log(contract);
  console.log(contract.defaultBlock);

  console.debug('...accounts');
  console.log(accounts);

  console.debug('...provider');
  console.log(provider);

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
    // await toast.promise(
    //   contract.mint(mintAmount, {
    //     value: ethers.utils.parseEther(cost.toString()),
    //   }),
    //   {
    //     pending: 'Transaction is pending',
    //     success: 'Transaction is approved 👌',
    //     error: 'Transaction is rejected 🤯',
    //   }
    // );
    // await result.wait(); // FIXME: Cannot read properties of undefined (reading 'wait')
  };

  console.debug('contract methods = ');
  // console.log(contract.methods.balanceOf(accounts[0]).call());
  console.log(contract.methods);
  console.log(contract.methods.count());

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
          <Col xs={10}></Col>
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
