import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft  } from "@fortawesome/free-solid-svg-icons";
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import regstyles from "../styles/register.module.css";
// component

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
const EmailVStatus = () =>  {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  const router = useRouter();

  const { name } = router.query;
  
  const username = name;

  const ResendVerifyEmail = async () => {
    const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      const {data} = await axios.post("https://tafabackend.onrender.com/api/users/resendverifyemail", {
            username,
      }, config);
      if(data) {
        setLoading(false);
        setError(data.message)
      }
  }

  return (
    <>
        <a href='/register' rel='noopener noreferrer' className={regstyles.back}> <FontAwesomeIcon icon={faChevronLeft} />Back </a>
        <div className={regstyles.regsuccess}>
            <div className={regstyles.regs_in}>
                <h3>Account Activation Success <FontAwesomeIcon icon={faCheckCircle} /></h3>
                <div>
                    <p>Hello <span>{username}</span>, your account creation is successful</p>
                    <a href='/signin' rel='noopener noreferrer'> Proceed To Login </a>
                </div>
            </div>
        </div>
    </>
  );
}

export default EmailVStatus