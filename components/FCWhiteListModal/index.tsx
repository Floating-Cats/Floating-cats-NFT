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

const url = '/FCatWL.json';

export default function FCWhiteListModal({
  show,
  onHide,
  FCatContract,
}: {
  show: boolean;
  onHide: () => void;
  FCatContract: Contract;
}): JSX.Element {
  const [AddrForWL, setAddrForWL] = useState<string>('');

  /**
   * Set the wallet address state for later check WL function
   *
   * @param addr - wallet address to chech if it is whitelisted
   * @returns void
   */
  const onChangeSetAddr: (addr: string) => void = (addr) => setAddrForWL(addr);
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
    if (!(AddrForWL.length === 42 && AddrForWL.startsWith('0x'))) {
      toast.error(
        `⚠️: "${
          AddrForWL.length > 10 ? AddrForWL.substring(0, 10) + '...' : AddrForWL
        }" is not a valid wallet address.`
      );
      return false;
    }
    return true;
  };
  /**
   * Check if the addrForWL is a whitelisted address
   */
  const onSubmitCheckWL: () => void = () => {
    try {
      FCatContract.isWhitelisted(AddrForWL).then(function (result: boolean) {
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

  // temporary whitelist check
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * fetch json file
   * @returns
   */
  const fetchJson = async () => {
    try {
      const data = await fetch(url);
      const response = await data.json();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  /**
   * Check if the addrForWL is a whitelisted address
   */
  const CheckLocalWL: () => void = async () => {
    if (!isValidAddr()) return;
    let wl = await fetchJson();
    if (wl) {
      let wlSet = new Set(wl['Whitelist']);
      if (wlSet.has(AddrForWL.replace(/\s/g, ''))) {
        toast(`🐱 Hi Good Neko! This Address Is on Our Whitelist!`);
        clearForm();
        return;
      } else {
        toast(`⚠️: Oops! The Address Is NOT on Our Whitelist!`);
        clearForm();
        return;
      }
    } else {
      toast(`⚠️: Oops! Something went wrong!`);
      return;
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
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
                onClick={CheckLocalWL}
                // onClick={onSubmitCheckWL}
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
