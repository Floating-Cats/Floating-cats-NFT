import { useState } from 'react';

// imports for bootstrap
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// imports for styling
import { toast } from 'react-toastify';

// other imports
import { Contract } from 'web3-eth-contract'; // for typechecking

export default function FCWhiteListForm({
  FCatContract,
}: {
  FCatContract: Contract;
}): JSX.Element {
  const [AddrForWL, setAddrForWL] = useState<string>('');

  /**
   * clear form is called when you want the text field of the form to be refreshed
   * @returns void
   */
  const clearForm: () => void = () => setAddrForWL('');

  /**
   * Set the wallet address state for later check WL function
   *
   * @param addr - wallet address to chech if it is whitelisted
   * @returns void
   */
  const onChangeSetAddr: (addr: string) => void = (addr) => setAddrForWL(addr);

  /**
   * Check if the address set by the hook is on the WL.
   * @returns void
   */
  const onSubmitCheckWL: () => void = () => {
    try {
      FCatContract.methods
        .isWhitelisted(AddrForWL)
        .call()
        .then(function (result: boolean) {
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

  return (
    <>
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
            onClick={onSubmitCheckWL}
          >
            GO
          </Button>
        </InputGroup>
      </Row>
    </>
  );
}
