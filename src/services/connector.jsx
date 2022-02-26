import { InjectedConnector } from 'web3-react/dist/connectors';

// chainIds reference: https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
