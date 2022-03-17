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
// import { Account } from 'web3/eth/accounts'; // for typechecking
// import Contract from 'web3/eth/contract'; // for typechecking
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';

// imports for env vars
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_INFURA_ENDPOINT_RINKEBY } = process.env;
const { FC_TEST_INFURA_PROJECT_ID } = process.env;
const { FC_TEST_INFURA_SECRET } = process.env;

export default function Mint(): JSX.Element {
  const mintPrice: number = parseFloat(NEXT_PUBLIC_COST || '');
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const [mintAmount, setMintAmount] = useState<number>(1);

  let cost: string = (mintPrice * mintAmount).toString();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();
  console.log(library);

  let FCatSigner: JsonRpcSigner | any = library
    ? library.getSigner()
    : undefined;
  console.log(FCatSigner);

  let FCatContract = new ethers.Contract(contractAddress, FCat.abi, library);

  if (FCatSigner) {
    FCatContract = new ethers.Contract(contractAddress, FCat.abi, FCatSigner);
  }

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
   * Execute mint action
   *
   * @returns void
   */
  const mintToken: () => void = async () => {
    try {
      if (!FCatSigner) {
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
      if (isObjEmpty(library)) {
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
      await toast.promise(
        FCatContract.mint(mintAmount, {
          value: ethers.utils.parseEther('0.02'),
        }),
        {
          pending: 'Transaction is pending',
          success: 'Transaction is approved 👌',
          error: 'Transaction is rejected 🤯',
        }
      );
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
          {/* <Col xs={5}>
            <FCSupplyMaxSupply FCatContract={FCatContract} />
          </Col>
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
