import React from 'react';
import ThemeContextProvider from '../contexts/theme-context';
import '../styles/globals.css';
// import Web3ModalContextProvider from '../contexts/web3modal-context';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3ModalProvider } from "../contexts/Web3Modal";
import { ethers } from 'ethers';

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

const App = ({ Component, pageProps }) => {

  const getLibrary = () => {
    const library = new ethers.providers.Web3Provider(window.ethereum);
    library.pollingInterval = 8000;
    return library;
  }

  return (
    <ThemeContextProvider>
      <Web3ModalProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
        </Web3ReactProvider>
      </Web3ModalProvider>
    </ThemeContextProvider>
  );
};

export default App;