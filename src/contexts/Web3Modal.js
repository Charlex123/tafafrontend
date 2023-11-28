"use client"
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import dotenv from 'dotenv';
dotenv.config()
// 1. Get projectId
const projectId = process.env['NEXT_PUBLIC_WALLETCONNECTPROJECTID'];
// 2. Set chains
const mainnet = [
    {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
      },
      {
        chainId: 56,
        name: 'BNB Chain',
        currency: 'BNB',
        explorerUrl: 'https://bscscan.io',
        rpcUrl: 'https://bsc-dataseed.bnbchain.org'
      }
]

// 3. Create modal
const metadata = {
  name: 'Tafaxtra',
  description: 'Tafaxtra Staking Dapp',
  url: 'https://tafaextra.io',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

export function Web3ModalProvider({ children }) {
  return children;
}