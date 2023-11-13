import React from 'react';
import ThemeContextProvider from '../contexts/theme-context';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
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
        <ChakraProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
          </Web3ReactProvider>
        </ChakraProvider>
    </ThemeContextProvider>
  );
};

export default App;