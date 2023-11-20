import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import footerstyles from '../styles/footer.module.css'
// import cgk from '../assets/images/coingecko-aace8f3c.png';
// import cmc from '../assets/images/coinmarketcap-a91aaec1.png';
import { fas, faCheck, faCheckCircle, faCircleDollarToSlot, faGift, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome, faGoogle,faDiscord, faFacebook, faTelegram, faMedium, faYoutube, faBandcamp } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faGoogle, faCheck,faCheckCircle, faCircleDollarToSlot, faGift, faPeopleGroup)

const DappFooter = () => {
   return (
      <div className={footerstyles.footer}>
         <div><div className={footerstyles.footam}>TAFAXTRA | ©2023 <br></br></div></div>
      </div>
   )
}

export default DappFooter