import {React, useContext} from 'react'
// import { Container } from '../App'
// import { OutreachButton } from './styles/ButtonVariants.styled'
// import {HashRouter as Router,} from "react-router-dom";
// import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import styles from '../../styles/landing.module.css'
import { useState, useEffect } from 'react';
import Typed from 'react-typed';
import Heroimg from '../../assets/images/herobg.png';
import cgk from '../../assets/images/coingecko-aace8f3c.png';
import cmc from '../../assets/images/coinmarketcap-a91aaec1.png';
import dextools from '../../assets/images/dextools-chart-95a9780d.png';
import quckswap from '../../assets/images/quickswap-light-3af62abd.png';
import peopl_ from '../../assets/images/group.png';
import trust from '../../assets/images/trust.png';
import stat from '../../assets/images/statistics.png';
import developt from '../../assets/images/development.png';
import stakebanner from '../../assets/images/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avllogo from '../../assets/images/blockchain-avalanche-white-5bb3c6b6.png';
import bnblogo from '../../assets/images/blockchain-binance-white-71f5d555.png';
import cronlogo from '../../assets/images/blockchain-cronos-light-78484d18.png';
import ethlogo from '../../assets/images/blockchain-ethereum-white-c6bf63d1.png';
import fantlogo from '../../assets/images/blockchain-fantom-white-0b93e569.png';
import polychlogo from '../../assets/images/blockchain-polygon-white-024b04f0.png';
import { ThemeContext } from '../../contexts/theme-context';
import { library } from '@fortawesome/fontawesome-svg-core'
import { Chrono } from "react-chrono";
import 'react-vertical-timeline-component/style.min.css';
import { fas, faCheck, faCheckCircle,faAlignJustify, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)

const Home = () => {
// Create a state variable to manage the visibility of the navigation menu
const [isNavOpen, setNavOpen] = useState(false);
const { theme, drawerOpen } = useContext(ThemeContext);


useEffect(() => {
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
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


// Function to toggle the navigation menu
const toggleNav = () => {
  setNavOpen(!isNavOpen);
};

  return (
    <>
    <div className={styles.homemain}>
      <div className={styles.overlay_d}></div>
      <div className={styles.c_content}>
          <div className={styles.hero_h1}>
            <div>
              <h1 className={styles.h1}>
                Welcome To TafaXtra  
              </h1>
            </div>
            <Typed
                    strings={[
                        'Newly Launched',
                        'Reliable',
                        'Sustainable',
                        'Trusted']}
                    typeSpeed={40}
                    backSpeed={50}
                    className={styles.typedHeader}
                    style={{ color: '#08d34f', fontSize: '40px',fontWeight: 600,fontFamily: 'Verdana' }}
                    loop
                />
                <h1>Staking Dapp</h1>
            <div>
              <h4 className={styles.hero_h4}>The best time-locked staking system on the blockchain. High yield, protected by deflationary measures backed by validator nodes</h4>
            </div>
            
            <div className={styles.get_sd_btns}>
              <a title='get started' href='/' rel='noopener noreferrer' className={styles.getstarted}>Buy TAFAXtra</a>
              <a href='/signin' rel='noopener noreferrer' className={styles.learnmore}>Launch Dapp</a>
            </div>
          </div>
          <div className={styles.hero_image}>
            <Image src={Heroimg} alt='hero img' className={styles.hero_image_} quality={90} />
          </div>
      </div>
      
      {/* dex tools */}

      <div className={styles.exchmain}>
        <div className={styles.dexchanges}>
          <a href='https://coingecko.com' rel='noreferrer noopener'><Image src={cgk} className={styles.delginks} /></a>
          <a href='https://coinmarketcap.io' rel='noreferrer noopener'><Image src={cmc} className={styles.delginks} /></a>
          <a href='https://dextools.io' rel='noreferrer noopener'><Image src={dextools} className={styles.delginks} /></a>
          <a href='https://quickswap.exchange' rel='noreferrer noopener'><Image src={quckswap} className={styles.delginks} /></a>
        </div>
      </div>

      <div className={styles.stkb}>
        <div>
          <h3>Lauching... </h3>
          <h1>TAFAXTRA ECO SYSTEM</h1>
        </div>
        <div>
          <Image src={stakebanner} quality={90} style={{objectFit:"contain"}} className={styles.stakebanner}/>
        </div>

        <div className={styles.gov}>
          <div className={styles.gov_in}>
            <div className={styles.gov_c}>
              <div className={styles.image_c}><Image src={trust} className={styles.gov_img}/></div>
              <h2>Stake Tafa</h2>
              <p>Earn sustainable passive rewards by time locking in our innovative gamified smart contracts.</p>
            </div>
            <div className={styles.gov_c}>
              <div className={styles.image_c}><Image src={peopl_} className={styles.gov_img}/></div>
              <h2>DOA Governance </h2>
              <p>Self-sustainable community driven TAFAVAULT with onchain voting</p>
            </div>
            <div className={styles.gov_c}>
              <div className={styles.image_c}><Image src={stat} className={styles.gov_img}/></div>
              <h2>Sustainability</h2>
              <p>Mathematically programmed rewards through carefully balanced tokenomics</p>
            </div>
            <div className={styles.gov_c}>
              <div className={styles.image_c}><Image src={developt} className={styles.gov_img}/></div>
              <h2>Utility</h2>
              <p>The protocol is asset backed to protect from even the worst conditions in the market.</p>
            </div>  
          </div>
        </div>
      </div>

      <div className={styles.tkl}>
        <div className={styles.tkl_in}>
            <div className={styles.tkl_head}>
              <h4>TAFAXTRA</h4>
              <h1>Token Launch Schedule</h1>
              <p>TAFAXTRA is launching in three stages over the coming months</p>
              <p>We start with a huge airdrop, allowing thousands of DeFi users to Free Claim some TAFAXTRA Tokens</p>
              <div className={styles.delginks}>
                <a href='https://avax.network' rel='noreferrer noopener' className={styles.dl}><Image src={avllogo} className={styles.launchlinks} /></a>
                <a href='https://bnbchain.org' rel='noreferrer noopener' className={styles.dl}><Image src={bnblogo} className={styles.launchlinks} /></a>
                <a href='https://fantom.foundation' rel='noreferrer noopener' className={styles.dl}><Image src={fantlogo} className={styles.launchlinks} /></a>
                <a href='https://ethereum.org/en' rel='noreferrer noopener' className={styles.dl}><Image src={ethlogo} className={styles.launchlinks} /></a>
                <a href='https://polygon.technology' rel='noreferrer noopener' className={styles.dl}><Image src={polychlogo} className={styles.launchlinks} /></a>
                <a href='https://cronos.org' rel='noreferrer noopener' className={styles.dl}><Image src={cronlogo} className={styles.launchlinks} /></a>
              </div>
            </div>
            <div className={styles.tkl_body}>
              <div className={`${styles.tkl_bc} ${styles.skew1_}`}>
                <h3>STAGE 1</h3>
                <h2>FREE CLAIM</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <div className={styles.button}>COMPLETED <FontAwesomeIcon icon={faCheck} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}></span></div>
              </div>
              <div className={`${styles.tkl_bc} ${styles.skew2_}`}>
                <h3>STAGE 1</h3>
                <h2>MAINNET LAUNCH</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <div className={`${styles.button} ${styles.btn}`}><button >LIVE NOW <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/> <span className={styles.brnd}> </span></button></div>
              </div>
            </div>
        </div>

        <div className={styles.roadmap}> 
            <div className={styles.rdm}>
                <h1>TAFAXTRA ROADMAP</h1>
                <h4>A Timely Events of TAFAXTRA</h4>
                <div className={styles.tmlc}>
                <Chrono 
                  mode="VERTICAL_ALTERNATING" 
                  theme={{
                    primary: 'green',
                    secondary: 'transparent',
                    cardBgColor: 'green',
                    cardTitle: 'green',
                    titleColor: 'white',
                    titleColorActive: 'white',
                  }}
                  cardHeight = "auto"
                  cardWidth = "auto"
                  fontSizes={{
                    cardTitle: '.1rem',
                    title: '1rem',
                    cardText: '10rem'
                  }}
                  
                  items={[
                    {
                      title: "22-09-2023",
                     },
                    {
                      title: "22-09-2023",
                     },{
                      title: "22-09-2023",
                     },{
                      title: "22-09-2023",
                    },{
                      title: "22-09-2023",
                     }
                    ,{
                      title: "22-09-2023",
                    }
                    ,{
                      title: "22-09-2023",
                    },
                    {
                      title: "22-09-2023",
                     },
                     {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    },
                    {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    },
                    {
                      title: "22-09-2023",
                     },
                     {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    },
                    {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    },
                    {
                      title: "22-09-2023",
                     },
                     {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    },
                    {
                      title: "Coming Soon",
                     },
                     {
                      title: "Coming Soon",
                    }
                  ]}
                  
                >
                  <div>
                    <h1 className={styles.chronoh1}>website design <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>TafaXtra Web Design Completed </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>token contract development <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>TafaXtra Smart Contract Completed </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Contract Audit <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>Contract Audited And approved </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Pancakeswap listing <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>PancakeSwap Listing Successful </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>10k Telegram and Twitter<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>10k Telegram and Twitter community membership </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>500+ tafa holders <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>500+ tafa holders </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Website redesign/relaunch <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>Website redesign/relaunch</p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Launch of staking program <FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.chronotitleicon}/></h1>
                    <p className={styles.chronop}>Launch of staking program </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Coin Gecko listing <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Coin Gecko listing </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>CMC listing <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>CMC Listing </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}> 2M market cap ($1/1 tafa) <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>2M market cap ($1/1 tafa) </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Listing on MEXC, Gate.io, HUOBI, Kucoin and Okx. <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Listing on MEXC, Gate.io, HUOBI, Kucoin and Okx. </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>20m mc  ($10/1tafa) <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>20m mc  ($10/1tafa) </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>NFT <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>NFT </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Tafa  Taxi🚕 flag off <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Tafa  Taxi🚕 flag off </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>TAFA Swap <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>TAFA Swap </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>100m mc  $50/1tafa <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>100m mc  $50/1tafa</p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Tafa Block chain (TFA20) <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Tafa Block chain (TFA20) </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Tafa partnerships <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Tafa partnerships </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Listing on Binance, Kraken, bitstamp and Coinbase. <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Listing on Binance, Kraken, bitstamp and Coinbase. </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>1B mc ($500/1tafa)<FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>1B mc ($500/1tafa) </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Tafa token burning <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Tafa token burning </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Special tafa Target $5000/1tafa (2025) <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Special tafa Target $5000/1tafa (2025) </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Meterverse building <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Meterverse building </p>
                  </div>
                  <div>
                    <h1 className={styles.chronoh1}>Charity <FontAwesomeIcon icon={faCircleChevronRight} size='lg' className={styles.chronotitleicon2}/></h1>
                    <p className={styles.chronop}>Charity </p>
                  </div>
                  </Chrono>
                
                </div>
             </div>   
        </div>
      </div>

    </div>

    

    </>
  )
}

export default Home