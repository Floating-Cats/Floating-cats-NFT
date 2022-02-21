import { useState } from 'react';
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
      ENSNames: object | any
    ) => void;
  }
) {
  const [ConnChainId, setConnChainId] = useState(null);
  const [ConnAccount, setConnAccount] = useState(null);
  const [ConnError, setConnError] = useState(null);
  const [ConnIsActivating, setConnIsActivating] = useState(null);
  const [ConnIsActive, setConnIsActive] = useState(false);
  const [ConnProvider, setConnProvider] = useState(null);
  const [ConnENSNames, setConnENSNames] = useState(null);

  //
  /**
   * Fetch account information for MetaMask or WalletConnect. If params
   * are null, it won't trigger the hook in _app.tsx as well as updating
   * the account information.
   *
   */
  const setUpConnection = (
    ConnChainId: number | any = null,
    ConnAccount: string | any = null,
    ConnError: string | any = null,
    ConnIsActivating: boolean | any = null,
    ConnIsActive: boolean = false,
    ConnProvider: object | any = null,
    ConnENSNames: object | any = null
  ) => {
    // console.log('setConnection()');
    if (ConnChainId) {
      setConnChainId(ConnChainId);
      setConnAccount(ConnAccount);
      setConnError(ConnError);
      setConnIsActivating(ConnIsActivating);
      setConnIsActive(ConnIsActive);
      setConnProvider(ConnProvider);
      setConnENSNames(ConnENSNames);

      // trigger hook
      setConnection(
        ConnChainId,
        ConnAccount,
        ConnError,
        ConnIsActivating,
        ConnIsActive,
        ConnProvider,
        ConnENSNames
      );
    }
  };

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
              setUpConnection={(
                ConnChainId: number | any = null,
                ConnAccount: string | any = null,
                ConnError: string | any = null,
                ConnIsActivating: boolean | any = null,
                ConnIsActive: boolean = false,
                ConnProvider: object | any = null,
                ConnENSNames: object | any = null
              ) => {
                setUpConnection(
                  ConnChainId,
                  ConnAccount,
                  ConnError,
                  ConnIsActivating,
                  ConnIsActive,
                  ConnProvider,
                  ConnENSNames
                );
              }}
            />
            <WalletConnectDiv
              setUpConnection={(
                ConnChainId: number | any = null,
                ConnAccount: string | any = null,
                ConnError: string | any = null,
                ConnIsActivating: boolean | any = null,
                ConnIsActive: boolean = false,
                ConnProvider: object | any = null,
                ConnENSNames: object | any = null
              ) => {
                setUpConnection(
                  ConnChainId,
                  ConnAccount,
                  ConnError,
                  ConnIsActivating,
                  ConnIsActive,
                  ConnProvider,
                  ConnENSNames
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
