import { useState } from 'react';
import Row from 'react-bootstrap/Row';

// other imports
import { Contract } from 'web3-eth-contract'; // for typechecking

const { NEXT_PUBLIC_MAX_SUPPLY } = process.env;
const { NEXT_PUBLIC_COST } = process.env;
const { NEXT_PUBLIC_MAX_MINT_AMOUNT } = process.env;

export default function FCSupplyMaxSupply({
  FCatContract,
}: {
  FCatContract: Contract;
}): JSX.Element {
  const [supply, setSupply] = useState<string>('-');
  // const [maxSupply, setMaxSupply] = useState('');
  console.log(FCatContract);
  // FCatContract.methods
  //   .count()
  //   .call()
  //   .then((supply: string) => setSupply(supply));
  // console.log(FCatContract.count());
  // const getCount = async () => {
  //   try {
  //     let count = await FCatContract.count();
  //     setSupply(count);
  //   } catch {
  //     return '-';
  //   }
  // };

  // FCatContract.methods
  //   .maxSupply()
  //   .call()
  //   .then((maxSup: string) => setMaxSupply(maxSup));
  return (
    <Row>
      <Row>
        <h1>{
          `${supply} / ${NEXT_PUBLIC_MAX_SUPPLY} Adopted` /* change 5888 to env var */
        }</h1>
      </Row>
      <Row>
        <h3>{`${NEXT_PUBLIC_COST} ETH adopt price`}</h3>
        <h3>{`Max ${NEXT_PUBLIC_MAX_MINT_AMOUNT} per wallet`}</h3>
      </Row>
    </Row>
  );
}
