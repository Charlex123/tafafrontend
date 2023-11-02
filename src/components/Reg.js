import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft  } from "@fortawesome/free-solid-svg-icons";
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
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

  const navigate = useRouter();

  const { id } = useParams();
  
  const sponsorId = id;
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
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

    console.log('bsc wall add',bscwalletaddress)
    console.log('bsc private key',bscwalletprivatekey)
    
    const togglePasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  
  

  const submitHandler = async (e) => {
    e.preventDefault();
    
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
        setLoading(true);
        setLevel("White Whale");

        const {data} = await axios.post("https://tafabackend.onrender.com/api/users/register", {
          username,
          sponsorId,
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
  
        console.log('log data',data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        navigate.push(`regsuccess/${data.username}`, { replace: true })
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
        
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        
        <div className={regstyles.fhead}>
            <h3>Create Account <FontAwesomeIcon icon={faLock} /></h3>
        </div>
        
        <div className={regstyles.form_group}>
            <label className={regstyles.formlabel} htmlFor="grid-last-name">Username</label>
            <input className={regstyles.forminput} id="grid_user_name" type="varchar" placeholder="Enter username" required
              value={username}
              onChange={(e) => setUserame(e.target.value)}
              />
        </div>
            
        <div className={regstyles.form_group}>
          <label className={regstyles.formlabel} htmlFor="grid-email"> Email</label>
                <input className={regstyles.forminput} id="email" type="email" placeholder="Enter email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
        </div>

        <div className='form-group'>
            <label className={regstyles.formlabel} htmlFor="chromegrid-password"> Password</label>
              <input className={regstyles.forminput} id="password" type={passwordinputType} placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button className={regstyles.passhideshowButton} onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
              <p className={regstyles.formpTag}>Make it as long and as crazy as you'd like</p>
        </div>

        <div className={regstyles.form_group}>
            <label className={regstyles.formlabel} htmlFor="grid-password">Confirm Password</label>
              <input className={regstyles.forminput} id="confirmpassword" type={passwordinputType} placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className={regstyles.passhideshowButton} onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            <p className={regstyles.formpTag}>Your password is encrypted and secured, we will not disclose your password with any third</p>
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