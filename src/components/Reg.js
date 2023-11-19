import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft  } from "@fortawesome/free-solid-svg-icons";
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import regstyles from "../styles/register.module.css";
// component
import Iconify from './Iconify';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import { functions } from 'lodash';
import { faLock } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
const RegisterForm = () =>  {

  const router = useRouter();
  let upline;

  console.log('router', router.query.id)
  if(router.query.id == undefined) {
      upline = router.query.id;
  }else {
      upline = router.query.id;
  }
  
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [refsponsor, setRefSponsor] = useState(upline);
  const [sponsor_, setSponsor_] = useState("");
  const [sponsor, setSponsor] = useState(upline);
  const [level, setLevel] = useState("White Label");
  const [tpin, setTPin] = useState(1234);
  const [loading, setLoading] = useState(false);
  const [status] = useState("Inactive");
  const [refBonus] = useState(0);
  const [totalrefBonus] = useState(0);
  const [withdrawnRefBonus] = useState(0);
  const [passwordinputType, setpasswordinputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEye} />);
  //   const [accounts, setAccounts] = useState([]);

//   const isConnected = Boolean(accounts[0]);


    // mainnet 
    // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    // testnet
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

    const bscaccount = web3.eth.accounts.create();
    const bscwalletaddress = bscaccount.address;
    const bscwalletprivatekey = bscaccount.privateKey;

    const togglePasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  
  const checkPass = (e) => {
    if (password !== confirmpassword) {
      setError(true)
      setErrorMessage("Passwords do not match");
    }else {
      setError(false);
    }
  } 

  const checkUsername = async (e) => {
    setLoading(true);
    setUserame(e.target.value)
    console.log(username)
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    const {data} = await axios.post("http://localhost:7000/api/users/checkusername", {
          username,
    }, config);
    if(data) {
      setLoading(false);
      setMessage(true)
      setMessageContent(data.message)
    }
  }

  const checkEmail = async (e) => {
    setLoading(true);
    setEmail(e.target.value)
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    const {data} = await axios.post("http://localhost:7000/api/users/checkemail", {
          email,
    }, config);
    if(data) {
      setLoading(false);
      setMessage(true)
      setMessageContent(data.message)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('uname',username)
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    }else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }  
        if(sponsor) {
          setSponsor_(sponsor);
        }else if(refsponsor){
          setSponsor_(refsponsor);
        }
        
        setLoading(true);
        setLevel("White Whale");
        const {data} = await axios.post("http://localhost:7000/api/users/register", {
          username,
          sponsor_,
          email,
          level,
          tpin,
          status,
          password,
          refBonus,
          totalrefBonus,
          withdrawnRefBonus,
          bscwalletaddress,
          bscwalletprivatekey,
          pic
        }, config);
  
        console.log('Reg response data',data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        router.push(`/emailverifystatus/${data.message}`)
      } catch (error) {
        setError(error.response.data.message)
        console.log(error.response.data)
      }
  }
  
}

  return (
    <>
        <a href='/' rel='noopener noreferrer' className={regstyles.back}> <FontAwesomeIcon icon={faChevronLeft} />Back to home</a>
        <form className={regstyles.formTag} onSubmit={submitHandler}>
        
        {error && <AlertMessage variant="danger">{errorMessage}</AlertMessage>}
        {message && <AlertMessage variant="danger">{messageContent}</AlertMessage>}
        {loading && <Loading />}
        
        <div className={regstyles.fhead}>
            <h3>Create Account <FontAwesomeIcon icon={faLock} /></h3>
        </div>
        
        <div className={regstyles.form_group}>
            <label className={regstyles.formlabel} htmlFor="grid-last-name">Username</label>
            <input className={regstyles.forminput} id="grid_user_name" type="varchar" placeholder="Enter username" required
              value={username}
              onBlur={checkUsername}
              onChange={(e) => setUserame(e.target.value.replace(' ', ''))}
              />
        </div>
            
        <div className={regstyles.form_group}>
          <label className={regstyles.formlabel} htmlFor="grid-email"> Email</label>
                <input className={regstyles.forminput} id="email" type="email" placeholder="Enter email" required
                value={email}
                onBlur={checkEmail}
                onChange={(e) => setEmail(e.target.value.replace(' ', ''))}
                />
        </div>

        <div className='form-group'>
            <label className={regstyles.formlabel} htmlFor="chromegrid-password"> Password</label>
              <input className={regstyles.forminput} id="password" type={passwordinputType} placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(' ', ''))}
              />
              <button className={regstyles.passhideshowButton} onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
              <p className={regstyles.formpTag}>Make it as long and as crazy as you'd like</p>
        </div>

        <div className={regstyles.form_group}>
            <label className={regstyles.formlabel} htmlFor="grid-password">Confirm Password</label>
              <input className={regstyles.forminput} id="confirmpassword" type={passwordinputType} placeholder="Confirm password"
              value={confirmpassword}
              onBlur={checkPass}
              onChange={(e) => setConfirmPassword(e.target.value.replace(' ', ''))}
              />
              <button className={regstyles.passhideshowButton} onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            <p className={regstyles.formpTag}>Your password is encrypted and secured, we will not disclose your password with any third</p>
        </div>

        <div className={regstyles.form_group}>
            <label className={regstyles.formlabel} htmlFor="grid-password">SponsorID</label>
              <input className={regstyles.forminput} id="sponsor" type="text" placeholder="Sponsor"
              value={refsponsor}
              onChange={(e) => setRefSponsor(e.target.value.replace(' ', ''))}
              />
        </div>
        
        <div className={regstyles.btns}>
          <button className={regstyles.registerButton} type="submit">
            Register
          </button>
          <div className={regstyles.alink}>Already have account? <a href='/signin' rel='noopener noreferrer'>Sign In</a></div>
        </div>
      </form>
    </>
  );
}

export default RegisterForm