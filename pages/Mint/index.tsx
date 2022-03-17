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
import FCWhiteListModal from 'components/FCWhiteListModal';
import FCMintAmountForm from 'components/FCMintAmountForm';

import { Contract } from 'ethers';

// helpers
// import { Account } from 'web3/eth/accounts'; // for typechecking
// import Contract from 'web3/eth/contract'; // for typechecking
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';

// imports for env vars
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_MAX_SUPPLY } = process.env;
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;
const { NEXT_PUBLIC_INFURA_PROJECT_ID } = process.env;

export default function Mint(): JSX.Element {
  // import provider library
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

  // react hooks
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [supply, setSupply] = useState<string>('-');

  // get contract address
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  // get signer
  const FCatSigner: JsonRpcSigner | any = library
    ? library.getSigner()
    : undefined;

  // init contract
  let FCatContract: Contract = new ethers.Contract(
    contractAddress,
    FCat.abi,
    new ethers.providers.InfuraProvider(
      'rinkeby',
      NEXT_PUBLIC_INFURA_PROJECT_ID
    )
  );
  // console.log('contract with provider - ', FCatContract);

  if (FCatSigner)
    FCatContract = new ethers.Contract(contractAddress, FCat.abi, FCatSigner);
  // console.log('contract with signer   - ', FCatContract);

  /**
   *
   * @param e
   * @param show
   */
  const setShowModelTo = (
    e: React.MouseEvent<Element, MouseEvent>,
    show: boolean
  ): void => {
    e.preventDefault();
    setShowModal(show);
  };
  /**
   * get the number of supply count
   */
  const getCount = async () => {
    try {
      let count = await FCatContract.count();
      setSupply(count);
    } catch {
      setSupply('-');
    }
  };
  if (supply === '-') getCount();
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
   * Set mint amount
   *
   * @returns void
   */
  const onChangeSetMintAmount: (val: string) => void = (val) =>
    setMintAmount(parseInt(val));

  /**
   * Execute mint action
   *
   * @returns void
   */
  const mintToken: () => void = async () => {
    alert('Mint is not live');
    // try {
    //   /* check before mint */
    //   if (!FCatSigner || !active) {
    //     toast.error('Oops! No wallet connected');
    //     return;
    //   }
    //   if (chainId !== 1) {
    //     toast.error(
    //       "You're not on the main network, please switch your network"
    //     );
    //     return;
    //   }
    //   if (isObjEmpty(library)) {
    //     toast.error(
    //       '⚠️: Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
    //     );
    //     return;
    //   }

    //   /* alert */
    //   greetingMsg();

    //   /* mint */
    //   await toast.promise(
    //     FCatContract.mint(mintAmount, {
    //       value: ethers.utils.parseEther('0.02'),
    //     }),
    //     {
    //       pending: 'Transaction is pending',
    //       success: 'Transaction is approved 👌',
    //       error: 'Transaction is rejected 🤯',
    //     }
    //   );
    // } catch (err) {
    //   toast.error(`⚠️: Oops! Something went wrong.\n${err}`);
    //   console.error('Error~~~', err);
    //   return;
    // }
  };

  return (
    <>
      <FCBgCloud />
      <div id='mintPageBg'>
        <div className='' id='mintPage'>
          <div id='mintInfo'>
            <h1>{`${supply} / ${NEXT_PUBLIC_MAX_SUPPLY} Adopted`}</h1>
            <button
              data-toggle='modal'
              data-target='#exampleModal'
              id='checkWL'
              onClick={(e) => setShowModelTo(e, true)}
            >
              Check Whitelist
            </button>
            <div id='priceInfo'>
              <h4>{`Pre-Sale: ${NEXT_PUBLIC_COST} Ξ`}</h4>
              <h4>{`Max ${NEXT_PUBLIC_MAX_MINT_AMOUNT} per wallet`}</h4>
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
        <FCWhiteListModal
          show={showModal}
          onHide={() => setShowModal(false)}
          FCatContract={FCatContract}
        />
      </div>
    </>
  );
}
