import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import footerstyles from '../styles/footer.module.css'
// import cgk from '../assets/images/coingecko-aace8f3c.png';
// import cmc from '../assets/images/coinmarketcap-a91aaec1.png';
import { fas, faCheck, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faGoogle,faDiscord, faFacebook, faTelegram, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faGoogle, faCheck,faCheckCircle)

const Footer = () => {
//    const [modalState, setModalState] = useState<boolean>(false);
//    const [recipientModalState, setRecipientModalState] = useState<boolean>(false);
//    const [bulkRecipients, setBulkRecipients] = useState<string>("");
//    const [recipientsInputType, seRecipientsInputType] = useState<string>("");

   
   return (
      <div className={footerstyles.footer}>
         <div className={footerstyles.footermain}>
            <div className={footerstyles.footer_c}>
               <h3>Social</h3>
               <div className={footerstyles.f_c}>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Twitter</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Facebook</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Telegram</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Discord</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Medium</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>YouTube</span></a>
               </div>
            </div>

            <div className={footerstyles.footer_c}>
               <h3>Feature</h3>
               <div className={footerstyles.f_c}>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Twitter</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Facebook</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Telegram</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Discord</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Medium</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>YouTube</span></a>
               </div>
            </div>

            <div className={footerstyles.footer_c}>
               <h3>Press</h3>
               <div className={footerstyles.f_c}>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Twitter</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Facebook</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Telegram</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Discord</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Medium</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>YouTube</span></a>
               </div>
            </div>

            <div className={footerstyles.footer_c}>
               <h3>TAFXTRA Contract</h3>
               <div className={footerstyles.f_c}>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Twitter</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Facebook</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Telegram</span></a>
               <a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={footerstyles.navdrbdwnbrandicon}/> <span className={footerstyles.brnd}>Discord</span></a>
               <div><button>Coin</button></div>
               </div>
            </div>
         </div>
         <div className={footerstyles.footer}><div className={footerstyles.footam}><br></br><br></br>TAFAXTRA | ©2023 <a href='privacy-policy' rel='noopener noreferrer' className='text-white ml-4'>Privacy Policy</a> <a href='terms' rel='noopener noreferrer' className='text-white ml-8'>Terms</a> <a href='support' rel='noopener noreferrer' className='text-white ml-2'>Support</a>  <br></br><br></br><br></br></div></div>
      </div>
   )
   }

export default Footer