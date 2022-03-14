import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;

export default function FCMintAmountForm({
  mintAmount,
  setMintAmount,
}: {
  mintAmount: number;
  setMintAmount: (mintAmount: number) => void;
}): JSX.Element {
  /**
   * Set the mint amount state for mint function
   * @param mint_amount - amount of NFT to mint, an integer of string type
   * @returns void
   */
  const onChangeSetMintAmount: (mint_amount: string) => void = (mint_amount) =>
    setMintAmount(parseInt(mint_amount));

  return (
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
  );
}
