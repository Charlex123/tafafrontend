import React, { createContext, useState } from 'react';

export const Web3ModalContext = createContext()

function Web3ModalContextProvider(props) {
    // eslint-disable-next-line
    const [onClose, setonClose] = useState(false);
    const [onOpen, setonOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);

    const closeWeb3Modal = () => {
        setonClose(true)
        setisOpen(false)
    }

    const openWeb3Modal = () => {
        setonOpen(true);
        setisOpen(true);
    }

    const value = { onOpen, isOpen, onClose, closeWeb3Modal, openWeb3Modal }
    return (
        <Web3ModalContext.Provider value={value}>
            {props.children}
        </Web3ModalContext.Provider>
    )
}


export default Web3ModalContextProvider;