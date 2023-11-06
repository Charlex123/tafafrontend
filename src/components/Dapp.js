import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
// import DappSideBar from './Dappsidebar';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import dappstyles from "../styles/dapp.module.css";
import dappsidebarstyles from '../styles/dappsidebar.module.css';
// component
import Iconify from './Iconify';
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { providers } from "ethers";
import Web3 from "web3";
import { ThemeContext } from '../contexts/theme-context';
import { functions } from 'lodash';
import { faLock, faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';
import DappNav from './Dappnav';
import { fas, faCheck, faCheckCircle, faChevronDown,faAlignJustify, faUserCircle, faCircleDollarToSlot, faGift, faHandHoldingDollar, faPeopleGroup, faChevronUp, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faGoogle, faFacebook,faDiscord, faTelegram, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import SelectWalletModal from "./DappConnectModal";
import { useWeb3React } from "@web3-react/core";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./Networks";
import { connectors } from "./Connectors";
import { toHex, truncateAddress } from "./utils";

library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)
// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
const Dapp = () =>  {

  const { theme, setHandleDrawer, changeTheme, isDark } = useContext(ThemeContext);
  const [isNavOpen, setNavOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false)
  const [dappsidebartoggle, setSideBarToggle] = useState(false);
  const [dropdwnIcon1, setDropdownIcon1] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const [dropdwnIcon2, setDropdownIcon2] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const [dropdwnIcon3, setDropdownIcon3] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const {router} = useRouter();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
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
    const udetails = JSON.parse(localStorage.getItem("userInfo"));
    const username = udetails.username;
    if(udetails && udetails !== null && udetails !== "") {
      console.log('username',username)
      if(username) {
        setUsername(username);
      }
    }

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

  const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);

  return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
  };
  
  
 }, [username])

 // Function to toggle the navigation menu
 const toggleSideBar = () => {
    setSideBarToggle(!dappsidebartoggle);
    setIsSideBarToggled(!isSideBarToggled)
  };

  const toggleIconUp1 = () => {
      setDropdownIcon1(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }
  const toggleIconUp2 = () => {
      setDropdownIcon2(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }
  const toggleIconUp3 = () => {
      setDropdownIcon3(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }

  const toggleIconDown1 = () => {
      setDropdownIcon1(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }
  const toggleIconDown2 = () => {
      setDropdownIcon2(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }

  const toggleIconDown3 = () => {
      setDropdownIcon3(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }

//  async function connectAccount() {
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

const sideBarToggleCheck = dappsidebartoggle ? dappstyles.sidebartoggled : '';
console.log('side bar t chaek',sideBarToggleCheck)
  return (
    <>
        <DappNav/>
        <div className={dappstyles.main_w}>
            <div className={dappstyles.main_c}>
              <div className={`${dappstyles.sidebar} ${sideBarToggleCheck}`}>
                  <nav className={dappsidebarstyles.sidebar}>
                      <div className={dappsidebarstyles.sidebar_container}>
                        <div className={dappsidebarstyles.sidebar_container_p}>
                        <ul className={dappsidebarstyles.upa}>
                            <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp1} onMouseOut={toggleIconDown1}>
                                Dapp {dropdwnIcon1}
                                <ul>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>About TafaXtra</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>RoadMap</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/whitepaper' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>White Paper</span></a></li>
                                </ul>
                            </li>
                            <li className={dappsidebarstyles.drpdwnlist}><a href='/whitepaper' rel='noopener noreferrer'>White Paper</a></li>
                            <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp2} onMouseOut={toggleIconDown2}>
                                Buy TafaXtra {dropdwnIcon2}
                                <ul>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faCircleDollarToSlot} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Staking Rewards</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faGift} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>TafaXtra Free Claim</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faHandHoldingDollar} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>AirDrop Winner</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faPeopleGroup} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Referral</span></a></li>
                                </ul>
                            </li>
                            <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp3} onMouseOut={toggleIconDown3}>
                                Community {dropdwnIcon3}
                                <ul>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Twitter</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Facebook</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Telegram</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Discord</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Medium</span></a></li>
                                    <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>YouTube</span></a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className={dappsidebarstyles.upa}>
                            <li className={dappsidebarstyles.ld}><a href='/dapp#staketafa' rel='noopener noreferrer'>Stake TafaXtra</a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
              </div>
              <div className={`${dappstyles.main} ${sideBarToggleCheck}`}>
              <button title='togglebtn' className={dappstyles.sidebar_toggle_btn} type='button' onClick={toggleSideBar}>
                {isSideBarToggled ? (
                  <FontAwesomeIcon icon={faAlignJustify} size='lg' className={dappstyles.navlisttoggle}/> // Change this to the appropriate icon component or element
                ) : (
                  <FontAwesomeIcon icon={faXmarkCircle} size='lg' className={dappstyles.navlisttoggle}/> // Change this to the appropriate icon component or element
                )}
              </button>
                <div className={dappstyles.head}>
                    <div className={dappstyles.uname}><span>Hi, {username}</span></div>
                    <h1>
                        WELCOME TO TAFAXTRA 
                    </h1>
                    <p>TAFAXtra is a smart contract platform that replicates the traditional Certificate of Deposit but on the blockchain. It allows users to stake their MAXX tokens to earn fixed interest, up to 80% APY. It also has NFT functionality, and is backed by ownership of Validator Nodes.</p>
                    <p>A community DAO manages the MAXXVault, which collects fees from trade tax and early unstakes. The usage of these funds will be voted on by the community, to use on things such as purchasing additional Validator Nodes, Marketing, Conferences, Token Burns etc.</p>
                    <div className={dappstyles.get_sd_btns}>
                      <a title='get started' href='/dapp/#stake' rel='noopener noreferrer' className={dappstyles.getstarted}>Stake TaFaXtra</a>
                      <a href='/dapp' rel='noopener noreferrer' className={dappstyles.learnmore}>Buy TafaXtra</a>
                    </div>
                </div>

                <VStack justifyContent="center" alignItems="center" h="100vh">
                  <HStack marginBottom="10px">
                    <Text
                      margin="0"
                      lineHeight="1.15"
                      fontSize={["1.5em", "2em", "3em", "4em"]}
                      fontWeight="600"
                    >
                      Let's connect with
                    </Text>
                    <Text
                      margin="0"
                      lineHeight="1.15"
                      fontSize={["1.5em", "2em", "3em", "4em"]}
                      fontWeight="600"
                      sx={{
                        background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      Web3-React
                    </Text>
                  </HStack>
                  <HStack>
                    {!active ? (
                      <Button onClick={onOpen}>Connect Wallet</Button>
                    ) : (
                      <Button onClick={disconnect}>Disconnect</Button>
                    )}
                  </HStack>
                  <VStack justifyContent="center" alignItems="center" padding="10px 0">
                    <HStack>
                      <Text>{`Connection Status: `}</Text>
                      {active ? (
                        <FontAwesomeIcon  color="green" />
                      ) : (
                        <FontAwesomeIcon color="#cd5700" />
                      )}
                    </HStack>

                    <Tooltip label={account} placement="right">
                      <Text>{`Account: ${truncateAddress(account)}`}</Text>
                    </Tooltip>
                    <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
                  </VStack>
                  {active && (
                    <HStack justifyContent="flex-start" alignItems="flex-start">
                      <Box
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Button onClick={switchNetwork} isDisabled={!network}>
                            Switch Network
                          </Button>
                          <Select placeholder="Select network" onChange={handleNetwork}>
                            <option value="3">Ropsten</option>
                            <option value="4">Rinkeby</option>
                            <option value="42">Kovan</option>
                            <option value="1666600000">Harmony</option>
                            <option value="42220">Celo</option>
                          </Select>
                        </VStack>
                      </Box>
                      <Box
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Button onClick={signMessage} isDisabled={!message}>
                            Sign Message
                          </Button>
                          <Input
                            placeholder="Set Message"
                            maxLength={20}
                            onChange={handleInput}
                            w="140px"
                          />
                          {signature ? (
                            <Tooltip label={signature} placement="bottom">
                              <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
                            </Tooltip>
                          ) : null}
                        </VStack>
                      </Box>
                      <Box
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Button onClick={verifyMessage} isDisabled={!signature}>
                            Verify Message
                          </Button>
                          {verified !== undefined ? (
                            verified === true ? (
                              <VStack>
                                <FontAwesomeIcon icon={faCheckCircle} color="green" />
                                <Text>Signature Verified!</Text>
                              </VStack>
                            ) : (
                              <VStack>
                                <FontAwesomeIcon icon={faWarning} color="red" />
                                <Text>Signature Denied!</Text>
                              </VStack>
                            )
                          ) : null}
                        </VStack>
                      </Box>
                    </HStack>
                  )}
                  <Text>{error ? error.message : null}</Text>
                </VStack>
                <SelectWalletModal isOpen={isOpen} closeModal={onClose} />

                <div className={dappstyles.stake}>
                    <div className={dappstyles.stake_mod}>
                        <div className={dappstyles.top}><h1>Stake Your TafaXtra</h1></div>
                        <div className={dappstyles.s_m}>
                          <h3>Stake TafaXtra to earn a guaranteed fixed interest rate</h3>
                          <div className={dappstyles.s_m_in}>
                              <div className={dappstyles.s_m_inna}>
                                <div className={dappstyles.s_m_in_c}>
                                    <div className={dappstyles.s_a}>Stake Amount <div>122000000 TAFA</div></div>
                                    <div className={dappstyles.s_b}>Bonus <div>0.56%</div></div>
                                </div>
                                <div className={dappstyles.amountprog}>
                                    <progress></progress>
                                </div>
                              </div>
                              <div className={dappstyles.s_m_inna}>
                                <div className={dappstyles.s_m_in_c}>
                                    <div className={dappstyles.s_a}>Duration  <div>227 Days</div></div>
                                    <div className={dappstyles.s_b}>Bonus <div>200.56%</div></div>
                                </div>
                                <div className={dappstyles.amountprog}>
                                    <progress></progress>
                                </div>
                              </div>

                              <div className={dappstyles.apy}>
                                <h2>56% APY</h2>
                              </div>

                              <div className={dappstyles.interest_returns}>
                                <ul>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>INTEREST</div> <div>TAFA REWARD</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Daily</div> <div>32</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Weekly</div><div>320</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Monthly</div> <div>3200</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Yearly</div><div>32000</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div className={dappstyles.cw_btn_div}>
                                <button className={dappstyles.cw_btn} >Connect Wallet</button>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </>
  );
}

export default Dapp