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
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Chrono } from "react-chrono";
import 'react-vertical-timeline-component/style.min.css';
import { fas, faCheck, faCheckCircle, faCheckSquare,faAlignJustify, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)

const Home = () => {
// Create a state variable to manage the visibility of the navigation menu
const [isNavOpen, setNavOpen] = useState(false);
const { theme, drawerOpen } = useContext(ThemeContext);

const items = [{
  title: "May 1940",
  cardTitle: "Dunkirk",
  url: "http://www.history.com",
  cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  media: {
    type: "IMAGE",
    source: {
      url: "http://someurl/image.jpg"
    }
  }
},]
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
          <a href='https://coingecko.com' rel='noreferrer noopener'><Image src={cgk} className={styles.dexlinks} /></a>
          <a href='https://coinmarketcap.io' rel='noreferrer noopener'><Image src={cmc} className={styles.dexlinks} /></a>
          <a href='https://dextools.io' rel='noreferrer noopener'><Image src={dextools} className={styles.dexlinks} /></a>
          <a href='https://quickswap.exchange' rel='noreferrer noopener'><Image src={quckswap} className={styles.dexlinks} /></a>
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
              <div className={styles.dexlinks}>
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
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="2011 - present"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Creative Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                    <p>
                      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2010 - 2011"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Art Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2008 - 2010"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                    <p>
                      User Experience, Visual Design
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2006 - 2008"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                      User Experience, Visual Design
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="April 2013"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                    <p>
                      Strategy, Social Media
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="November 2012"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                    <p>
                      Creative Direction, User Experience, Visual Design
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2002 - 2006"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  >
                    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                    <p>
                      Creative Direction, Visual Design
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<FontAwesomeIcon icon={faCheckCircle} size='lg' className={styles.navdrbdwnbrandicon}/>}
                  />
                  </VerticalTimeline>
                </div>
             </div>   
        </div>
      </div>

    </div>

    

    </>
  )
}

export default Home