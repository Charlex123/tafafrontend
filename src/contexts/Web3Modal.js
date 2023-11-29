"use client"
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import dotenv from 'dotenv';
dotenv.config()
// 1. Get projectId
const projectId = process.env['NEXT_PUBLIC_WALLETCONNECTPROJECTID'];
// 2. Set chains
const chains = [
  {
    chainId: 56,
    name: 'BNB Chain',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.io',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  }
]

// 3. Create modal
const ethersConfig = defaultConfig({
  metadata: {
    name: 'Tafaxtra',
    description: 'Tafaxtra Staking Dpp',
    url: 'https://tafaextra.io',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 56,
  rpcUrl: 'https://bsc-dataseed.binance.org/'
})

createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true
})

export function Web3ModalProvider({ children }) {
  return children;
}