import { useState } from 'react';

// imports for bootstrap
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// imports for styling
import { toast } from 'react-toastify';
import { Contract } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export default function FCWhiteListModal({
  show,
  onHide,
  FCatContract,
  FCatWL,
  isAccountConnected,
  connectedAccountIsWL,
}: {
  show: boolean;
  onHide: () => void;
  FCatContract: Contract;
  FCatWL: string[];
  isAccountConnected: boolean;
  connectedAccountIsWL: boolean;
}): JSX.Element {
  const [AddrForWL, setAddrForWL] = useState<string>('');

  /**
   * Set the wallet address state for later check WL function
   *
   * @param addr - wallet address to chech if it is whitelisted
   * @returns void
   */
  const onChangeSetAddr: (addr: string) => void = (addr) =>
    setAddrForWL(addr.replace(/\s+/g, '').trim().toLowerCase());
  /**
   * clear form is called when you want the text field of the form to be refreshed
   * @returns void
   */
  const clearForm: () => void = () => setAddrForWL('');
  /**
   * Check if the address set by the hook is on the WL.
   * @returns void
   */
  const isValidAddr: () => boolean = () => {
    // empty string
    if (!AddrForWL.length) return false;
    // length != 42 or doesn't start with 0x
    if (!(AddrForWL.length === 42 && AddrForWL.startsWith('0x'))) {
      toast.warning(
        `⚠️: "${
          AddrForWL.length > 10 ? AddrForWL.substring(0, 10) + '...' : AddrForWL
        }" is not a valid wallet address.`
      );
      return false;
    }
    return true;
  };

  // temporary whitelist check
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const url = '/FCatWL.json'; // TODO: remove temp
  // const fetchJson = async () => {
  //   try {
  //     const data = await fetch(url);
  //     const response = await data.json();
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };
  // const CheckLocalWL: () => void = async () => {
  //   if (!isValidAddr()) return;
  //   let wl = await fetchJson();
  //   if (wl) {
  //     let wlSet = new Set(wl['Whitelist']);
  //     if (wlSet.has(AddrForWL.replace(/\s/g, ''))) {
  //       toast(`🐱 Hi Good Neko! This Address Is on Our Whitelist!`);
  //       clearForm();
  //       return;
  //     } else {
  //       toast(`⚠️: Oops! The Address Is NOT on Our Whitelist!`);
  //       clearForm();
  //       return;
  //     }
  //   } else {
  //     toast(`⚠️: Oops! Something went wrong!`);
  //     return;
  //   }
  // };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Check if the addrForWL is a whitelisted address
   */
  const CheckLocalWL: () => void = async () => {
    if (!isValidAddr()) return;
    if (FCatWL) {
      console.log(AddrForWL);
      if (new Set(FCatWL).has(AddrForWL)) {
        //
        toast.info(`🐱 Hi Good Neko! This Address Is on Our Whitelist!`);
        clearForm();
        return;
      } else {
        toast.warning(`⚠️ Oops! The Address Is NOT on Our Whitelist!`);
        clearForm();
        return;
      }
    } else {
      toast.error(`⚠️ Oops! Something went wrong!`);
      return;
    }
  };
  const statusSpan: () => JSX.Element | JSX.Element[] = () => {
    return !isAccountConnected ? (
      <>
        {/* if no account is connected */}
        <span role='img' aria-label='gold'>
          <img src='/span03.png' height={50} />
        </span>
      </>
    ) : connectedAccountIsWL ? (
      <>
        {/* if connected account is whitelisted */}
        <span role='img' aria-label='gold'>
          <img src='/span04.png' height={50} />
        </span>
      </>
    ) : (
      <>
        {/* if connected account is not whitelisted */}
        <span role='img' aria-label='gold'>
          <img src='/span01.png' height={50} />
        </span>
      </>
    );
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <h3>
            {statusSpan()}
            {!isAccountConnected
              ? ' No Wallet Connected'
              : connectedAccountIsWL
              ? ` Hi Good Neko! You're Whitelisted!`
              : ` Oops! The Connected Wallet Is NOT Whitelisted!`}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <h5>Check Whitelist for Another Wallet?</h5>
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
                onClick={CheckLocalWL}
              >
                GO
              </Button>
            </InputGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-dark' onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
