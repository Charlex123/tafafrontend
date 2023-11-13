import React from 'react';
import ThemeContextProvider from '../contexts/theme-context';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/globals.css';
import Web3ModalContextProvider from '../contexts/web3modal-context';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from 'ethers';
import { library } from '@fortawesome/fontawesome-svg-core';

const App = ({ Component, pageProps }) => {

  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  return (
    <ThemeContextProvider>
      <Web3ModalContextProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
        </Web3ReactProvider>
      </Web3ModalContextProvider>
    </ThemeContextProvider>
  );
};

export default App;