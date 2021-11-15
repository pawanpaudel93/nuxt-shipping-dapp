import Web3 from 'web3';
declare let window: any;

export const web3: Web3 = (typeof window !== 'undefined' && window.ethereum !== 'undefined') ? new Web3(window.ethereum) : new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API!));