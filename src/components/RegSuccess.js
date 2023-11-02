import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
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
const RegSuccess = () =>  {

  const router = useRouter();

  const { name } = router.query;
  
  const username = name;


  return (
    <>
        <a href='/register' rel='noopener noreferrer' className={regstyles.back}> <FontAwesomeIcon icon={faChevronLeft} />Back </a>
        <div className={regstyles.regsuccess}>
            <h3>Registration Successful <FontAwesomeIcon icon={faCheckCircle} /></h3>
            <div>
                <p>Hello, <span>{username}</span>, you've successfully registered with TafaXtra</p>
                <a href='/dapp' rel='noreferrer noopener'>Log In To Dapp</a>
            </div>
        </div>
    </>
  );
}

export default RegSuccess