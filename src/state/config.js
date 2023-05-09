import { BN } from 'bn.js';

// testnet / default
// 基础配置 默认为测试网络
let config = {
  SEED_PHRASE_LOCAL_COPY: '__SEED_PHRASE_LOCAL_COPY',
  FUNDING_DATA: '__FUNDING_DATA',
  ACCOUNT_LINKS: '__ACCOUNT_LINKS',
  GAS: '200000000000000',
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  nameSuffix: '.testnet',
  contractName: 'testnet',
};

// 生产环境配置
if (process.env.REACT_APP_ENV === 'prod') {
  config = {
    ...config,
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    nameSuffix: '.near',
    contractName: 'near',
  };
}

export { config };
