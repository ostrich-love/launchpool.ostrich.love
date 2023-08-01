import TESTADDRESS from './test.json'
import MAINADDRESS from './main.json'
import { NET_TYPE } from '../global'

import { providerOptions } from '../wallet/providerOptions';
import Web3 from 'web3';
const ZKS_TEST = {
     name: 'zkSync Era Testnet',
     params: {
       chainId: Web3.utils.toHex(280),
       chainName: 'zkSync Era Testnet',
       nativeCurrency: {
         name: 'Ethereum',
         symbol: 'ETH',
         decimals: 18,
       },
       blockExplorerUrls: ['https://goerli.explorer.zksync.io/'],
       rpcUrls: ['https://testnet.era.zksync.dev/']
     },
     networkId: 280,
     httpProviderURL: 'https://testnet.era.zksync.dev/',
     connectors: {
       network: 'mainnet',
       cacheProvider: true,
       providerOptions: providerOptions({
         walletconnectOptions: {
           rpc: {
             280: 'https://testnet.era.zksync.dev/',
           }
         }
       })
     }
   }
   const ZKS_MAIN = {
     name: 'zkSync Era Mainnet',
     params: {
       blockExplorerUrls: ['https://zksync2-testnet.zkscan.io'],
     },
     networkId: 280,
     httpProviderURL: 'https://testnet.era.zksync.dev/',
     connectors: {
       network: 'mainnet',
       cacheProvider: true,
       providerOptions: providerOptions({
         walletconnectOptions: {
           rpc: {
             280: 'https://testnet.era.zksync.dev/',
           }
         }
       })
     }
   }

export const getAddress = () => {
     return NET_TYPE == 'test' ? TESTADDRESS : MAINADDRESS
}
export const getNetwork = () => {
     return NET_TYPE == 'test' ? ZKS_TEST : ZKS_MAIN
}
export const SyncSwapClassicPoolFactory = NET_TYPE == 'test' ?'0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006':'0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb'