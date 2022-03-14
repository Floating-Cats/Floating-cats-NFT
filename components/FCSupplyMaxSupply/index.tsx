import { useState } from 'react';
import Row from 'react-bootstrap/Row';

// other imports
import { Contract } from 'web3-eth-contract'; // for typechecking

const { NEXT_PUBLIC_MAX_SUPPLY } = process.env;

export default function FCSupplyMaxSupply({
  FCatContract,
}: {
  FCatContract: Contract;
}): JSX.Element {
  const [supply, setSupply] = useState<string>('-');
  const [maxSupply, setMaxSupply] = useState('-');
  // console.debug('FCatContract count = ');
  FCatContract.methods
    .count()
    .call()
    .then((supply: string) => setSupply(supply));

  FCatContract.methods
    .maxSupply()
    .call()
    .then((maxSup: string) => setMaxSupply(maxSup));
  return (
    <Row>
      <h1>{
        `${supply} / ${
          maxSupply || NEXT_PUBLIC_MAX_SUPPLY
        }` /* change 5888 to env var */
      }</h1>
    </Row>
  );
}
