import React, { useContext, useState, useEffect } from 'react';
import  { Web3ModalContext } from '../contexts/web3modal-context';
import { ThemeContext } from '../contexts/theme-context';
import styles from '../styles/dappnav.module.css';
import logo from '../assets/images/logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { providers } from "ethers";
import Web3 from "web3";
import SelectWalletModal from "./web3-Modal";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "./web3-networks";
import { connectors } from "./web3-connectors";
import { toHex, truncateAddress } from "../utils/web3react-utils";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCheck, faCheckCircle, faChevronDown,faAlignJustify, faCircleDollarToSlot, faGift, faHandHoldingDollar, faPeopleGroup, faChevronUp, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faFacebook,faDiscord, faTelegram, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)



function Navbar() {
    const { theme, setHandleDrawer, changeTheme, isDark } = useContext(ThemeContext);
    const [isNavOpen, setNavOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [dropdwnIcon1, setDropdownIcon1] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>);
    const [dropdwnIcon2, setDropdownIcon2] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>);
    const [dropdwnIcon3, setDropdownIcon3] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>);

    const { isOpen, onOpen, onClose, closeWeb3Modal,openWeb3Modal } = useContext(Web3ModalContext);
    
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };    
    useEffect(() => {

        // const provider = window.localStorage.getItem("provider");
        // if (provider) activate(connectors[provider]);

        // Function to handle window resize
        const handleResize = () => {
            // Check the device width and update isNavOpen accordingly
            if (window.innerWidth <= 990) {
            setNavOpen(false);
            } else {
            setNavOpen(true);
            }
        };

        // Initial check when the component mounts
        handleResize();

        // Add a resize event listener to update isNavOpen when the window is resized
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts

        const handleScroll = () => {
            if (window.scrollY > 50) {
            setScrolling(true);
            } else {
            setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // async function connectAccount() {
    //     if(window.ethereum)  {
    //         // window.web3 = new Web3(web3.currentProvider);
    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //         // setAccounts(accounts);
    //     } else {
    //         //  Create WalletConnect Provider
    //         const provider = new WalletConnectProvider({
    //             chainId: 57,
    //             rpc:'https://bsc-dataseed.binance.org/'
    //         });
            
    //         //  Enable session (triggers QR Code modal)
    //         await provider.enable();
    
    //         const web3Provider = new providers.Web3Provider(provider);
    //     }
    // }

    // Function to toggle the navigation menu
    const toggleNav = () => {
    setNavOpen(!isNavOpen);
    };

    const toggleIconUp1 = () => {
        setDropdownIcon1(<FontAwesomeIcon icon={faChevronUp} size='lg' className={styles.navlisttoggle}/>)
    }
    const toggleIconUp2 = () => {
        setDropdownIcon2(<FontAwesomeIcon icon={faChevronUp} size='lg' className={styles.navlisttoggle}/>)
    }
    const toggleIconUp3 = () => {
        setDropdownIcon3(<FontAwesomeIcon icon={faChevronUp} size='lg' className={styles.navlisttoggle}/>)
    }

    const toggleIconDown1 = () => {
        setDropdownIcon1(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>)
    }
    const toggleIconDown2 = () => {
        setDropdownIcon2(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>)
    }

    const toggleIconDown3 = () => {
        setDropdownIcon3(<FontAwesomeIcon icon={faChevronDown} size='lg' className={styles.navlisttoggle}/>)
    }


    const shortname = (name) => {
        if (name.length > 12) {
            return name.split(' ')[0];
        } else {
            return name;
        }
    };

    const navClass = scrolling ? styles.scrolled : '';

    return (
        <nav className={styles.nav}>
            {/* <button title='togglebtn' className={styles.nav_toggle_btn} type='button' onClick={toggleNav}><FontAwesomeIcon icon={faAlignJustify} size='lg' className={styles.toggle_icon}/></button> */}
            <div className={`${styles.nav_container} ${navClass}`}>
                <div className={styles.logo}>
                <a href='/' rel='noopener noreferrer'><Image src={logo} alt='logo' className={styles.logoni}/></a>
                </div> 
                
                {isNavOpen && (
                <div className={styles.nav_container_p}>
                <ul className={styles.upa}>
                    <li className={styles.drpdwnlist} onMouseEnter={toggleIconUp1} onMouseOut={toggleIconDown1}>
                        Dapp {dropdwnIcon1}
                        <ul>
                            <li><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>About TafaXtra</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>RoadMap</span></a></li>
                            <li><a href='/whitepaper' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>White Paper</span></a></li>
                        </ul>
                    </li>
                    <li><a href='/whitepaper' rel='noopener noreferrer'>White Paper</a></li>
                    <li className={styles.drpdwnlist} onMouseEnter={toggleIconUp2} onMouseOut={toggleIconDown2}>
                        Buy TafaXtra {dropdwnIcon2}
                        <ul>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faCircleDollarToSlot} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Staking Rewards</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faGift} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>TafaXtra Free Claim</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faHandHoldingDollar} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>AirDrop Winner</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faPeopleGroup} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Referral</span></a></li>
                        </ul>
                    </li>
                    <li className={styles.drpdwnlist} onMouseEnter={toggleIconUp3} onMouseOut={toggleIconDown3}>
                        Community {dropdwnIcon3}
                        <ul>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Twitter</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Facebook</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Telegram</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Discord</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>Medium</span></a></li>
                            <li><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}>YouTube</span></a></li>
                        </ul>
                    </li>
                </ul>
                <ul className={styles.upa}>
                    <li className={styles.ld}>
                        {!active ? (
                        <button onClick={openWeb3Modal}>Connect Wallet</button>
                        ) : (
                        <button onClick={disconnect}>Disconnect</button>
                        )}</li>
                    <li className={styles.si}><a href='/signin' rel='noopener noreferrer'>Logout</a></li>
                </ul>
                </div>)
                }
            </div>
            {isOpen && (<SelectWalletModal isOpen={isOpen} closeWeb3Modal={closeWeb3Modal} />)}
        </nav>
    );
}

export default Navbar;
