import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import  { Web3ModalContext } from '../contexts/web3modal-context';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
// import DappSideBar from './Dappsidebar';
// material

// import Loading from "./Loading";
// import AlertMessage from "./AlertMessage";
import dappstyles from "../styles/dapp.module.css";
import dappsidebarstyles from '../styles/dappsidebar.module.css';
// component
import SelectWalletModal from "./web3-Modal";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "./web3-networks";
import { toHex, truncateAddress } from "../utils/web3react-utils";
// import { providers } from "ethers";
import axios from 'axios';
import Web3 from "web3";
import { ThemeContext } from '../contexts/theme-context';
import DappNav from './Dappnav';
import DappFooter from './DappFooter';
import { fas, faCheck, faCheckCircle, faChevronDown,faAlignJustify, faCircleDollarToSlot, faGift, faHandHoldingDollar, faPeopleGroup, faChevronUp, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faFacebook,faDiscord, faTelegram, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';



library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)
// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
const Dapp = () =>  {

  const router = useRouter();

  const { theme, setHandleDrawer, changeTheme, isDark } = useContext(ThemeContext);
  const [isNavOpen, setNavOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false)
  const [dappsidebartoggle, setSideBarToggle] = useState(false);
  const [dropdwnIcon1, setDropdownIcon1] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const [dropdwnIcon2, setDropdownIcon2] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const [dropdwnIcon3, setDropdownIcon3] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");  
  
  const { isOpen, onOpen, onClose, closeWeb3Modal,openWeb3Modal } = useContext(Web3ModalContext);
  
  const [referralLink, setreferralLink] = useState('');
  const [buttonText, setButtonText] = useState("Copy");

  const [tafaStakeValue, settafaStakeValue] = useState(50); // Initial value

  const handleChange = (event) => {
    const newValue = event.target.value;
    settafaStakeValue(newValue);
};

const handleCopyClick = () => {
   // Create a temporary textarea element
   const textArea = document.createElement('textarea');
   
   // Set the value of the textarea to the text you want to copy
   textArea.value = referralLink;

   // Append the textarea to the document
   document.body.appendChild(textArea);

   // Select the text inside the textarea
   textArea.select();

   // Execute the copy command
   document.execCommand('copy');

   // Remove the temporary textarea
   document.body.removeChild(textArea);

   // Set the state to indicate that the text has been copied
   setButtonText("Copied");

   // Reset the state after a brief period (optional)
   setTimeout(() => {
      setButtonText("Copy");
   }, 1500);
 };

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
    const username_ = udetails.username;
    if(udetails && udetails !== null && udetails !== "") {
      
      if(username_) {
        console.log('u details',udetails)
        setUsername(username_);
        setUserId(udetails.userId)
        setreferralLink(`https://tafaextra.io/register/${udetails.userId}`);
      }
    }else {
      router.push(`/signin`);
    }

    async function getreferrals() {
      try {
         const config = {
         headers: {
            "Content-type": "application/json"
         }
         }  
         const {refdata} = await axios.get(`https://tafabackend.vercel.app/api/users/getreferrals/${udetails.userId}`, {
         }, config);
         console.log('ref data',refdata);
      } catch (error) {
         console.log(error)
      }
   }
   getreferrals();

    // Function to handle window resize
    const handleResize = () => {
      // Check the device width and update isNavOpen accordingly
      if (window.innerWidth <= 990) {
      setNavOpen(false);
      setSideBarToggle(true);
      setIsSideBarToggled(true);
      } else {
      setNavOpen(true);
      setSideBarToggle(false);
      setIsSideBarToggled(false);
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
  
  
 }, [userId, router])

 // Function to toggle the navigation menu
 const toggleSideBar = () => {
    setSideBarToggle(!dappsidebartoggle);
    setIsSideBarToggled(!isSideBarToggled);
  };

  // const toggleIconUp1 = () => {
  //     setDropdownIcon1(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  // }
  // const toggleIconUp2 = () => {
  //     setDropdownIcon2(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  // }
  const toggleIconUp3 = () => {
      setDropdownIcon3(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }

  // const toggleIconDown1 = () => {
  //     setDropdownIcon1(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  // }
  // const toggleIconDown2 = () => {
  //     setDropdownIcon2(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  // }

  const toggleIconDown3 = () => {
      setDropdownIcon3(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.sidebarlisttoggle}/>)
  }

  const logout = () => {
    // Simulate a logout action
    localStorage.removeItem('userInfo');
    router.push(`/signin`);
  };
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

  return (
    <>
        <DappNav/>
        <div className={dappstyles.main_w}>
            <div className={dappstyles.main_c}>
              <div className={`${dappstyles.sidebar} ${sideBarToggleCheck}`}>
                  <nav className={dappsidebarstyles.sidebar}>
                    {!isSideBarToggled && (
                      <div className={dappsidebarstyles.overlay_dapp}></div>
                    )}
                    <button title='togglebtn' className={dappsidebarstyles.sidebar_toggle_btn} type='button' onClick={toggleSideBar}>
                      <FontAwesomeIcon icon={faXmarkCircle} size='lg' className={dappsidebarstyles.navlisttoggle}/> 
                    </button>
                      <div className={dappsidebarstyles.sidebar_container}>
                        <div className={dappsidebarstyles.sidebar_container_p}>
                        <ul className={dappsidebarstyles.upa}>
                            <li>
                              <a href='https://pancakeswap.finance/swap?outputCurrency=0x5ae155F89308CA9050f8Ce1C96741BaDd342C26B' rel='noopener noreferrer' className={dappsidebarstyles.buytafa}>BUY TAFA</a>
                            </li>
                            <li><a href='/dapp/#mystakes' rel='noopener noreferrer' className={dappsidebarstyles.linka}>My Stakes</a></li>
                            <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp3} onMouseOut={toggleIconDown3}>
                                Community {dropdwnIcon3}
                                <ul>
                                    {/* <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faTwitter} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Twitter</span></a></li> */}
                                    {/* <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faFacebook} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Facebook</span></a></li> */}
                                    <li className={dappsidebarstyles.lista}><a href='https://t.me/tafaxtraweb' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faTelegram} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Telegram</span></a></li>
                                    {/* <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faDiscord} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Discord</span></a></li> */}
                                    {/* <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faMedium} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Medium</span></a></li> */}
                                    {/* <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' className={dappsidebarstyles.linka}><FontAwesomeIcon icon={faYoutube} size='lg' className={dappsidebarstyles.sidebardrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>YouTube</span></a></li> */}
                                </ul>
                            </li>
                        </ul>
                        <ul className={dappsidebarstyles.upa}>
                            <li className={dappsidebarstyles.ld}><a href='/dapp#staketafa' rel='noopener noreferrer'>Stake TafaXtra</a></li>
                            <li><button type='button' onClick={logout} className={dappsidebarstyles.linka}>Logout</button></li>
                        </ul>
                        
                        </div>
                    </div>
                </nav>
              </div>
              <div className={`${dappstyles.main} ${sideBarToggleCheck}`}>
              <div className={dappstyles.con_btns}>
              {!active ? (
                <button onClick={openWeb3Modal} className={dappstyles.connect}>Connect Wallet</button>
                ) : (
                <button onClick={disconnect} className={dappstyles.connected}><span>connected</span>Disconnect</button>
                )}
              </div>
              <button title='togglebtn' className={dappstyles.sidebar_toggle_btn} type='button' onClick={toggleSideBar}>
                <FontAwesomeIcon icon={faAlignJustify} size='lg' className={dappstyles.navlisttoggle}/> 
              </button>
                <div className={dappstyles.reflink}>
                    <div className={dappstyles.reflinkdex}>Ref Link: <input value={referralLink} onChange={(e) => setreferralLink(e.target.value)} /><button type='button' onClick={handleCopyClick}>{buttonText}</button> </div>
                    <div><small>Share referral link to increase your profits</small></div>
                </div>
              
                <div className={dappstyles.head}>
                    <div className={dappstyles.uname}><span>Hi, {username}</span></div>
                    <h1>
                        WELCOME TO TAFAXTRA 
                    </h1>
                    <p>TAFAXtra is a smart contract platform that replicates the traditional Certificate of Deposit but on the blockchain. It allows users to stake their TAFA tokens to earn fixed interest, 2% daily ROI. It also has NFT functionality, and is backed by ownership of Validator Nodes.</p>
                    <p>A community DAO manages the TAFA Vault, which collects fees from trade tax and early unstakes. The usage of these funds will be voted on by the community, to use on things such as purchasing additional Validator Nodes, Marketing, Conferences, Token Burns etc.</p>
                    <div className={dappstyles.get_sd_btns}>
                      <a title='get started' href='/dapp/#stake' rel='noopener noreferrer' className={dappstyles.getstarted}>Stake TaFaXtra</a>
                      <a href='https://pancakeswap.finance/swap?outputCurrency=0x5ae155F89308CA9050f8Ce1C96741BaDd342C26B' rel='noopener noreferrer' className={dappstyles.learnmore}>Buy TafaXtra</a>
                    </div>
                </div>

                <div className={dappstyles.stake}>
                    <div className={dappstyles.stake_mod}>
                        <div className={dappstyles.top}><h1>Stake Your TafaXtra</h1></div>
                        <div className={dappstyles.s_m}>
                          <h3>Stake TafaXtra to earn 2% profit daily</h3>
                          <div className={dappstyles.s_m_in}>
                              <div className={dappstyles.s_m_inna}>
                                <div className={dappstyles.s_m_in_c}>
                                    <div className={dappstyles.s_a}>Stake Amount <div>{tafaStakeValue} TAFA</div></div>
                                    <div className={dappstyles.s_b}>Bonus <div>2%</div></div>
                                </div>
                                <div className={dappstyles.amountprog}>
                                  <input
                                    type="range"
                                    id="horizontalInput"
                                    min={0}
                                    max={10000000}
                                    step={1}
                                    value={tafaStakeValue}
                                    onChange={handleChange}
                                    style={{ width: '100%',height: '5px', cursor: 'pointer' }}
                                  />
                                </div>
                              </div>
                              <div className={dappstyles.s_m_inna}>
                                <h3>Stake Duration</h3>
                                <div className={dappstyles.s_m_in_c}>
                                    <div className={dappstyles.s_a}>
                                      <select>
                                        <option value="">Select Duration</option>
                                        <option value="30">30 Days</option>
                                        <option value="90">90 Days</option>
                                        <option value="365">365 Days</option>
                                        <option value="1000">1000 Days</option>
                                      </select>
                                    </div>
                                </div>
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
                                      <div>Daily</div> <div>2%</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Weekly</div><div>14%</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Monthly</div> <div>60%</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className={dappstyles.ir_c}>
                                      <div>Yearly</div><div>730%</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div className={dappstyles.cw_btn_div}>
                                  <div>
                                      <button type='button' className={dappstyles.stakebtn}>Stake</button>
                                  </div>
                                  <div>
                                      <button type='button' className={dappstyles.calcrwd}>Calc Reward</button>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        {isOpen && (<SelectWalletModal isOpen={isOpen} closeWeb3Modal={closeWeb3Modal} />)}
        <DappFooter />
    </>
  );
}

export default Dapp