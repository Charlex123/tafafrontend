export const networkParams = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrl: ["https://explorer.celo.org"],
    iconUrls: [
      "https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg"
    ]
  },
  "0x38": {
    chainId: "0x38", // BSC Mainnet chainId
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    chainName: "Binance Smart Chain",
    nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
    blockExplorerUrls: ["https://bscscan.com/"],
    iconUrls: ["URL_TO_YOUR_BNB_ICON"] // Replace with the actual icon URL
  },
  "0x61": {
    chainId: "0x61", // BSC Testnet chainId
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: { name: "bnbt", decimals: 18, symbol: "tBNB" },
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
    iconUrls: ["URL_TO_YOUR_BNB_TESTNET_ICON"] // Replace with the actual icon URL
  }
};
