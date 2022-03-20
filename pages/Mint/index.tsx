import { useEffect, useState } from 'react';
import FCBgCloud from 'components/FCHome/FCBgCloud';

// bootstrap imports
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// other imports
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// whitelist mint verification
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

// contracts
import FCatTest4 from 'pages/artifacts/contracts/FCatTest4.sol/FCatTest4.json';
const FCat = FCatTest4;

// components
import FCWhiteListModal from 'components/FCWhiteListModal';

// helpers
import { Contract } from 'ethers';
import { isObjEmpty } from 'components/helpers/isObjEmpty';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';

// whitelist
const url = '/FCatWL.json';

// imports for env vars
const { NEXT_PUBLIC_CONTRACT_ADDR } = process.env;
const { NEXT_PUBLIC_INFURA_PROJECT_ID } = process.env;
// const FCatWL: string[] = CollectionConfig.whitelistAddresses;

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
  const [maxSupply, setMaxSupply] = useState<string>('🐱');
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState<string>('🐱');
  const [cost, setCost] = useState<number>(0.0);
  const [contractStatus, setContractStatus] = useState<string>('TBD');
  const [FCatWL, setFCatWL] = useState<string[]>([]);

  // whitelist helper
  let isAccountConnected: boolean = account ? true : false;
  let connectedAccountIsWL: boolean = isAccountConnected
    ? new Set(FCatWL).has((account || '').replace(/\s/g, ''))
    : false;

  useEffect(() => {
    if (supply === '🐱') initParams();
    if (active) initParams();
    if (!FCatWL.length) fetchJson();

    return;
  }, [supply, active]);

  const fetchJson = async () => {
    try {
      const data = await fetch(url);
      const response = await data.json();
      setFCatWL(response['Whitelist']);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  // get contract address
  const contractAddress: string = NEXT_PUBLIC_CONTRACT_ADDR || '';
  // init signer
  const FCatSigner: JsonRpcSigner | any = library
    ? library.getSigner()
    : undefined;

  // init contract
  let FCatContract: Contract = new ethers.Contract(
    contractAddress,
    FCat.abi,
    new ethers.providers.InfuraProvider(
      'rinkeby', // FIXME: change to 'homestead' upon deploy official contract
      NEXT_PUBLIC_INFURA_PROJECT_ID
    )
  );

  if (FCatSigner)
    FCatContract = new ethers.Contract(contractAddress, FCat.abi, FCatSigner);

  /**
   *
   * @param e
   * @param show
   */
  const setShowModelTo = (
    e: React.MouseEvent<Element, MouseEvent>,
    show: boolean
  ): void => {
    connectedAccountIsWL
      ? toast(`🐱 Hi Good Neko! This Address Is on Our Whitelist!`)
      : null;
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

      // console.log(`paused_ = ${paused_}`);
      // console.log(`whitelistMintEnabled_ = ${whitelistMintEnabled_}`);

      if (paused_) setContractStatus('Paused');
      if (whitelistMintEnabled_) setContractStatus('Whitelist Only');
      if (!paused_ && !whitelistMintEnabled_) setContractStatus('Public Sale');
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
      // check if an account is connected
      if (!FCatSigner || !active) {
        toast.error('⚠️ Oops! No wallet connected');
        return;
      }

      // check if the user is on mainnet
      // if (chainId !== 1) {
      //   toast.error(
      //     "You're not on the main network, please switch your network"
      //   );
      //   return;
      // }

      // check if provider is not empty
      if (isObjEmpty(library)) {
        toast.error(
          '⚠️ Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
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
      toast.error(`⚠️ Oops! ${errMsg}`);
      return;
    }
  };
  /**
   * Returns merkle proof of the given address
   * @param address
   * @returns
   */
  const getMerkleProof: (address: string) => string[] = (address) => {
    // merkle tree
    const leafNodes = FCatWL.map((addr: string) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    // Build the Merkle Tree
    const proof = merkleTree
      .getHexProof(keccak256(address))
      .toString()
      .replace(/'/g, '')
      .replace(/ /g, '');

    return proof.toString().split(',');
  };
  /**
   * whitelist mint token function
   */
  const whitelistMintToken: () => void = async () => {
    try {
      // check if an account is connected
      if (!account || !FCatSigner || !active) {
        toast.error('⚠️ Oops! No wallet connected!');
      }

      // check if the connected account is whitelisted
      let signerIsWhiteListed: boolean = new Set(FCatWL).has(
        (account || '').replace(/\s/g, '')
      );
      if (!signerIsWhiteListed) {
        toast.error('⚠️ Oops! This address is not whitelisted!');
        return;
      }

      // check if the proof is valid
      let proof: string[] = getMerkleProof(account || '');
      if (!proof.length) {
        toast.error('⚠️ Oops! Proof list is empty');
        return;
      }

      // check if the user is on mainnet
      // if (chainId !== 1) {
      //   toast.error(
      //     "You're not on the main network, please switch your network"
      //   );
      //   return;
      // }

      // check if provider is not empty
      if (isObjEmpty(library)) {
        toast.error(
          '⚠️ Oops! Something went wrong with your wallet provider while we connect you to the ethereum server.\nNo action has taken place.'
        );
        return;
      }

      /* alert */
      greetingMsg();

      /* mint */
      await toast.promise(
        FCatContract.whitelistMint(mintAmount, proof, {
          value: ethers.utils.parseEther((cost * mintAmount).toString()),
        }),
        {
          pending: 'Transaction is pending',
          success: 'Transaction is approved 👌',
          error: 'Transaction is rejected 🤯',
        }
      );
    } catch (err: Error | any) {
      console.error('Error~~~ ', err);
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
      toast.error(`⚠️ Oops! ${errMsg}`);
      return;
    }
  };

  /**
   * temporary mint
   */
  const tempMintPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Mint is not live</Popover.Header>
      <Popover.Body style={{ justifyContent: 'center' }}>
        <img src='/Hidden.gif' height={222} />
      </Popover.Body>
    </Popover>
  );
  /**
   * return mint button according to contract's current state
   * @returns mint button according to contract's current state
   */
  const mintButton: () => JSX.Element | JSX.Element[] = () => {
    return (
      <>
        {/* paused */}
        <OverlayTrigger
          trigger='click'
          placement='bottom'
          overlay={tempMintPopover}
        >
          <button id='mintbtn'>Mint</button>
        </OverlayTrigger>
      </>
    );
    return contractStatus === 'Whitelist Only' ? (
      <>
        {/* whitelist sale */}
        <button id='mintbtn' onClick={whitelistMintToken}>
          Whitelist Mint
        </button>
      </>
    ) : contractStatus === 'Public Sale' ? (
      <>
        {/* public sale */}
        <button id='mintbtn' onClick={mintToken}>
          Mint
        </button>
      </>
    ) : (
      <>
        {/* paused */}
        <OverlayTrigger
          trigger='click'
          placement='bottom'
          overlay={tempMintPopover}
        >
          <button id='mintbtn'>Mint</button>
        </OverlayTrigger>
      </>
    );
  };

  const statusSpan: () => JSX.Element | JSX.Element[] = () => {
    return contractStatus === 'Whitelist Only' ? (
      <>
        {/* whitelist sale */}
        <span role='img' aria-label='gold'>
          <img src='/span01.png' height={50} />
        </span>
      </>
    ) : contractStatus === 'Public Sale' ? (
      <>
        {/* public sale */}
        <span role='img' aria-label='gold'>
          <img src='/span02.png' height={50} />
        </span>
      </>
    ) : (
      <>
        {/* paused */}
        <span role='img' aria-label='gold'>
          <img src='/span03.png' height={50} />
        </span>
      </>
    );
  };

  return (
    <>
      <FCBgCloud />
      <div id='mintPageBg'>
        <div className='' id='mintPage'>
          <div id='mintInfo'>
            <h1>{`${'-'} / ${5888} Adopted`}</h1>
            {/* <h1>{`${supply} / ${maxSupply} Adopted`}</h1> TODO: uncomment this */}
            <button
              data-toggle='modal'
              data-target='#exampleModal'
              id='checkWL'
              onClick={(e) => setShowModelTo(e, true)}
            >
              Check Whitelist
            </button>
            <div id='priceInfo'>
              {/* <h4>TODO: uncomment this {`Pre-Sale: ${cost} Ξ`}</h4>
              <h4>{`Max ${maxMintAmountPerTx} per transaction`}</h4>
              <h4>
                {`Sale Status: ${contractStatus} `} {statusSpan()}
              </h4> */}
              <h4>{`Pre-Sale/Public: ${'0.04 / 0.05'} Ξ`}</h4>
              <h4>{`Max ${5} per transaction`}</h4>
              <h4>
                {`Sale Status: ${'Not live yet'} `} {statusSpan()}
              </h4>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  disabled // TODO: remove this
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

            {mintButton()}
          </div>
        </div>
        <FCWhiteListModal
          show={showModal}
          onHide={() => setShowModal(false)}
          FCatContract={FCatContract}
          FCatWL={FCatWL}
          isAccountConnected={isAccountConnected}
          connectedAccountIsWL={connectedAccountIsWL}
        />
      </div>
    </>
  );
}
