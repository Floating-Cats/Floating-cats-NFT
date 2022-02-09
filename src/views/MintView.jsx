import { useEffect, useState } from 'react';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// other imports
const env = import.meta.env;
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const MintView = ({ contract }) => {
  const [mintAmount, setMintAmount] = useState(1);

  // Clear the form on modal close.
  useEffect(() => {
    clearForm();
  }, []);

  /**
   * Initializes the states (mintAmounts) used for the form.
   */
  const clearForm = () => {
    setMintAmount(1);
  };

  const mintToken = async () => {
    // setCollectionVisible(true);
    // toast.info(`🐱 Let's Mint ${mintAmount} Token!`);
    alert(`🐱 You will mint ${mintAmount} tokens\n🐱 Hit OK to continue`);

    contract.ownerOf(1).then((result) => {
      console.log('1:  ', result);
    });

    const cost = env.VITE_COST * mintAmount;
    console.log('cost = ', cost);

    const result = await toast.promise(
      contract.mint(mintAmount, {
        value: ethers.utils.parseEther(cost.toString()),
      }),
      {
        pending: 'Transaction is pending',
        success: 'Transaction is approved 👌',
        error: 'Transaction is rejected 🤯',
      }
    );

    // await result.wait(); // FIXME: Cannot read properties of undefined (reading 'wait')
  };

  return (
    <>
      <div>
        <Row>
          <Col xs={1}>
            <Form>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  id='item-quantity'
                  type='number'
                  placeholder='a number'
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={9}>
            {/* <Button
              onClick={async () => {
                await contract.count().then((res) => {
                  toast.promise(res);
                });
              }}
            >
              Click me
            </Button> */}
          </Col>
        </Row>
      </div>
      <div className='mintPageBg'>
        <img src='pics/mint-bg-top.png' alt='' id='mint-bg' />
        <div className='container' id='mintPage'>
          <div className='row'>
            <div className='col'>
              <img
                id='mintBtn-blue'
                src='pics/mint-btn-blue.png'
                alt=''
                onClick={() => mintToken()}
              />
            </div>
            <div className='col'>
              <img
                id='mintBtn-red'
                src='pics/mint-btn-red.png'
                alt=''
                onClick={() => mintToken()}
              />
            </div>
            <div className='col'>
              <img
                id='mintBtn-yellow'
                src='pics/mint-btn-yellow.png'
                alt=''
                onClick={() => mintToken()}
              />
            </div>
          </div>
        </div>
        <img src='pics/mint-bg-bt.png' alt='' id='mint-bg' />
      </div>
    </>
  );
};

export default MintView;
