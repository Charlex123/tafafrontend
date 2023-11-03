import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import BackToTop from '../../components/back-to-top/back-to-top';
import ChangeTheme from '../../components/change-theme/change-theme';
import EmailVerifyStatus from '../../components/Emailverifystatus';

const EmailVerifyStatusPage = () => {
    const router = useRouter();
    console.log('username',router.query.verify[1])
    console.log('emailcode',router.query.verify[2])
    const [username] = useState(router.query.verify[1]);
    const [emailcode] = useState(router.query.verify[2]);
    useEffect (() => {
        console.log('username',username)
        console.log('emailcode',emailcode)
        
        const verify_User = async (e) => {
            const config = {
              headers: {
                "Content-type": "application/json"
              }
            }
            const {data} = await axios.post("http://localhost:7000/api/users/activateaccount", {
                  username,emailcode
            }, config);
            if(data) {
                console.log('data fff', data)
            }
        }

        verify_User()
    },[username,emailcode])
    
  return (
    <>
      <BackToTop />
      <ChangeTheme />
      <EmailVerifyStatus />
    </>
  )
}

export default EmailVerifyStatusPage
