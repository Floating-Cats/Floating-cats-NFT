import { useEffect, useState } from 'react';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FCLayout from 'components/FCLayout';

// other imports
// const env = import.meta.env;
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDR || '';
const provider: EthereumProvider = new ethers.providers.Web3Provider(
  window.ethereum
);

export default function Mint() {
  const [mintAmount, setMintAmount] = useState<number>(1);

  // Clear the form on modal close.
  useEffect(() => {
    clearForm();
  }, []);

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

  const mintToken: () => void = async () => {
    // setCollectionVisible(true);
    // toast.info(`🐱 Let's Mint ${mintAmount} Token!`);
    toast(`🐱 You will mint ${mintAmount} tokens\n🐱 Hit OK to continue`);

    // contract.ownerOf(1).then((result) => {
    //   console.log('1:  ', result);
    // });

    // const cost = env.VITE_COST * mintAmount;
    // console.log('cost = ', cost);

    // const result = await toast.promise(
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
