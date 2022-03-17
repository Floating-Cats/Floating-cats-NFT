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
const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;

export default function Mint(): JSX.Element {
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  const [mintAmount, setMintAmount] = useState<number>(1);

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
      /* check before mint */
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
      if (isObjEmpty(library)) {
        toast.error(
          '⚠️: Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
        );
        return;
      }

      /* alert */
      greetingMsg();

      /* mint */
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
                  onChange={(e) => setMintAmount(parseInt(e.target.value))}
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
