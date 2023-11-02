import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import DappSideBar from './Dappsidebar';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import dappstyles from "../styles/dapp.module.css";
// component
import Iconify from './Iconify';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import { functions } from 'lodash';
import { faLock } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
const Dapp = () =>  {

  const {router} = useRouter();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  
  useEffect(() => {
    const udetails = JSON.parse(localStorage.getItem("userInfo"));
    const username = udetails.username;
    if(udetails && udetails !== null && udetails !== "") {
      console.log('username',username)
      if(username) {
        setUsername(username);
      }
    }
    
 }, [username])

 async function connectAccount() {
    if(window.ethereum)  {
        // window.web3 = new Web3(web3.currentProvider);
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        // setAccounts(accounts);
    } else {
        //  Create WalletConnect Provider
        const provider = new WalletConnectProvider({
            chainId: 57,
            rpc:'https://bsc-dataseed.binance.org/'
        });
        
        //  Enable session (triggers QR Code modal)
        await provider.enable();

        const web3Provider = new providers.Web3Provider(provider);
    }
}

  return (
    <>
        <div className={dappstyles.main_w}>
            <div className={dappstyles.main_c}>
              <div className={dappstyles.sidebar}>
                  <DappSideBar />
              </div>
              <div className={dappstyles.main}>
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
                                <button className={dappstyles.cw_btn} onClick={connectAccount}>Connect Wallet</button>
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