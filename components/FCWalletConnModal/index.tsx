import dynamic from 'next/dynamic';
// imports for bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MetaMaskDiv = dynamic(() => import('../connectors/MetaMaskDiv'), {
  ssr: false,
});
const WalletConnectDiv = dynamic(
  () => import('../connectors/WalletConnectDiv'),
  { ssr: false }
);

export default function FCWalletConnModal(
  // props: {
  //   show: boolean;
  //   onHide: any;
  // },
  {
    show,
    onHide,
    setConnection,
  }: {
    show: boolean;
    onHide: () => void;
    setConnection: (
      chainId: number | any,
      account: string | any,
      error: string | any,
      isActivating: boolean | any,
      isActive: boolean,
      provider: object | any,
      ENSNames: object | any,
      testMsg: string | any
    ) => void;
  }
) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row className='justify-content-center'>
          <ListGroup>
            <MetaMaskDiv
              setConnection={(
                chainId: number | any = null,
                account: string | any = null,
                error: string | any = null,
                isActivating: boolean | any = null,
                isActive: boolean = false,
                provider: object | any = null,
                ENSNames: object | any = null,
                testMsf: string
              ) => {
                setConnection(
                  chainId,
                  account,
                  error,
                  isActivating,
                  isActive,
                  provider,
                  ENSNames,
                  'FCWalletConnModal'
                );
              }}
            />
            <WalletConnectDiv
              setConnection={(
                chainId: number | any = null,
                account: string | any = null,
                error: string | any = null,
                isActivating: boolean | any = null,
                isActive: boolean = false,
                provider: object | any = null,
                ENSNames: object | any = null,
                testMsf: string
              ) => {
                setConnection(
                  chainId,
                  account,
                  error,
                  isActivating,
                  isActive,
                  provider,
                  ENSNames,
                  'FCWalletConnModal' // TODO: remove all this so it doesn't call fn w/ null params?
                );
              }}
            />
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
