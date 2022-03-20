import { useEffect, useState } from 'react';
import FCBgCloud from 'components/FCHome/FCBgCloud';

// bootstrap imports
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// other imports
import { BigNumber, ethers } from 'ethers';
import { toast } from 'react-toastify';

// contracts
import FCatTest3 from 'pages/artifacts/contracts/FCatTest3.sol/FCatTest3.json';
//rename
const FCat = FCatTest3;

// components
import FCWhiteListModal from 'components/FCWhiteListModal';

import { Contract } from 'ethers';

// helpers
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import { isObjEmpty } from 'components/helpers/isObjEmpty';

// imports for env vars
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
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
  const [supply, setSupply] = useState<string>('🐱');
  const [maxSupply, setMaxSupply] = useState('🐱');
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState('🐱');
  const [cost, setCost] = useState<number>(0.0);
  const [contractStatus, setContractStatus] = useState('TBD 🐱');

  useEffect(() => {
    if (supply === '🐱') initParams();
    if (active) initParams();

    return;
  }, [supply]);

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
      'rinkeby', // FIXME: change to 'homestead'
      NEXT_PUBLIC_INFURA_PROJECT_ID
    )
  );
  console.log('contract with provider - ', FCatContract);

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
   * get the number of supply count for this connected address (or current contract state)
   */
  const initParams = async () => {
    try {
      let supply_: number = await FCatContract.totalSupply();
      let maxSupply_: number = await FCatContract.maxSupply();
      let cost_: number = await FCatContract.cost(); // return unit in Wei
      let maxMintAmountPerTx_: number = await FCatContract.maxMintAmountPerTx();

      /* set contract status */
      let paused_: boolean = await FCatContract.paused(); // public sale open/closed
      let whitelistMintEnabled_: boolean =
        await FCatContract.whitelistMintEnabled(); // whitelist sale open/closed

      console.log(`paused_ = ${paused_}`);
      console.log(`whitelistMintEnabled_ = ${whitelistMintEnabled_}`);

      if (paused_) setContractStatus('Paused 🐱');
      else if (whitelistMintEnabled_) setContractStatus('Whitelist Only 🐱');
      else if (!paused_ && !whitelistMintEnabled_)
        setContractStatus('Public Sale 🐱');
      /***********************/

      setSupply(String(supply_));
      setMaxSupply(String(maxSupply_));
      setCost(parseFloat(ethers.utils.formatEther(cost_)));
      setMaxMintAmountPerTx(String(maxMintAmountPerTx_));
    } catch {
      return;
    }
  };
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
    try {
      /* check before mint */
      if (!FCatSigner || !active) {
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
          value: ethers.utils.parseEther((cost * mintAmount).toString()),
        }),
        {
          pending: 'Transaction is pending',
          success: 'Transaction is approved 👌',
          error: 'Transaction is rejected 🤯',
        }
      );
    } catch (err: Error | any) {
      let errMsg: string = err['message'].toString();
      let beginIndex: number = errMsg.search('execution reverted: ');
      errMsg = errMsg.includes('The contract is paused!', beginIndex)
        ? 'The contract is paused!'
        : errMsg.includes('Insufficient funds!', beginIndex)
        ? 'Insufficient funds!'
        : errMsg.includes('Invalid mint amount!', beginIndex)
        ? 'Invalid mint amount!'
        : errMsg.includes('The whitelist sale is not enabled!', beginIndex)
        ? 'The whitelist sale is not enabled!'
        : errMsg.includes('Address already claimed!', beginIndex)
        ? 'Address already claimed!'
        : errMsg.includes('Invalid proof!', beginIndex)
        ? 'Invalid proof!'
        : errMsg.includes('Max supply exceeded!', beginIndex)
        ? 'Max supply exceeded!'
        : 'Unexpected Error';
      toast.error(`⚠️: Oops! ${errMsg}`);
      return;
    }
  };
  // const whitelistMintToken:(address: string)=>void = (address) => {
  //   // Check configuration
  //   if (CollectionConfig.whitelistAddresses.length < 1) {
  //     throw 'The whitelist is empty, please add some addresses to the configuration.';
  //   }

  //   // Build the Merkle Tree
  //   const leafNodes = CollectionConfig.whitelistAddresses.map((addr) =>
  //     keccak256(addr)
  //   );
  //   const merkleTree = new MerkleTree(leafNodes, keccak256, {
  //     sortPairs: true,
  //   });
  //   const proof = merkleTree
  //     .getHexProof(keccak256(taskArgs.address))
  //     .toString()
  //     .replace(/'/g, '')
  //     .replace(/ /g, '');

  //   console.log('The whitelist proof for the given address is: ' + proof);
  // }

  // temporary mint
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tempMintPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Mint is not live</Popover.Header>
      <Popover.Body style={{ justifyContent: 'center' }}>
        <img src='/Hidden.gif' height={222} />
      </Popover.Body>
    </Popover>
  );
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <FCBgCloud />
      <div id='mintPageBg'>
        <div className='' id='mintPage'>
          <div id='mintInfo'>
            <h1>{`${supply} / ${maxSupply} Adopted`}</h1>
            <button
              data-toggle='modal'
              data-target='#exampleModal'
              id='checkWL'
              onClick={(e) => setShowModelTo(e, true)}
            >
              Check Whitelist
            </button>
            <div id='priceInfo'>
              <h4>{`Pre-Sale: ${cost} Ξ` /* TODO: change to sale status */}</h4>
              <h4>{`Max ${maxMintAmountPerTx} per wallet`}</h4>
              <h4>{`Sale Status: ${contractStatus}`}</h4>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  id='mint-quantity'
                  type='number'
                  min='1'
                  max={maxMintAmountPerTx}
                  // placeholder='a number'
                  value={mintAmount}
                  onChange={(e) => onChangeSetMintAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
            <button id='mintbtn' onClick={mintToken}>
              Mint
            </button>
            {/* <OverlayTrigger
              trigger='click'
              placement='bottom'
              overlay={tempMintPopover}
            >
              <button id='mintbtn'>Mint</button>
            </OverlayTrigger> */}
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
