import Drawer from '@material-ui/core/Drawer';
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/theme-context';
import dappsidebarstyles from '../styles/dappsidebar.module.css';
import logo from '../assets/images/logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCheck, faCheckCircle, faChevronDown,faAlignJustify, faUserCircle, faCircleDollarToSlot, faGift, faHandHoldingDollar, faPeopleGroup, faChevronUp, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faGoogle, faFacebook,faDiscord, faTelegram, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
library.add(fas, faTwitter, faFontAwesome,faQuestionCircle, faCheck,faCheckCircle,faAlignJustify)

function DappSideBar() {
    const { theme, setHandleDrawer, changeTheme, isDark } = useContext(ThemeContext);
    const [isNavOpen, setNavOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [dropdwnIcon1, setDropdownIcon1] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>);
    const [dropdwnIcon2, setDropdownIcon2] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>);
    const [dropdwnIcon3, setDropdownIcon3] = useState(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>);

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

    const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
    }, []);


    // Function to toggle the navigation menu
    const toggleSideBar = () => {
    setNavOpen(!isNavOpen);
    alert('clicked')
    };

    const toggleIconUp1 = () => {
        setDropdownIcon1(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }
    const toggleIconUp2 = () => {
        setDropdownIcon2(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }
    const toggleIconUp3 = () => {
        setDropdownIcon3(<FontAwesomeIcon icon={faChevronUp} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }

    const toggleIconDown1 = () => {
        setDropdownIcon1(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }
    const toggleIconDown2 = () => {
        setDropdownIcon2(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }

    const toggleIconDown3 = () => {
        setDropdownIcon3(<FontAwesomeIcon icon={faChevronDown} size='lg' className={dappsidebarstyles.navlisttoggle}/>)
    }


    const shortname = (name) => {
        if (name.length > 12) {
            return name.split(' ')[0];
        } else {
            return name;
        }
    };

    return (
        <nav className={dappsidebarstyles.nav}>
            <button title='togglebtn' className={dappsidebarstyles.nav_toggle_btn} type='button' onClick={toggleSideBar}><FontAwesomeIcon icon={faAlignJustify} size='lg' className={dappsidebarstyles.toggle_icon}/></button>
                <div className={dappsidebarstyles.nav_container}>
                <div className={dappsidebarstyles.nav_container_p}>
                <ul className={dappsidebarstyles.upa}>
                    <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp1} onMouseOut={toggleIconDown1}>
                        Dapp {dropdwnIcon1}
                        <ul>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>About TafaXtra</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>RoadMap</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/whitepaper' rel='noopener noreferrer' > <FontAwesomeIcon icon={faAngleRight} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>White Paper</span></a></li>
                        </ul>
                    </li>
                    <li className={dappsidebarstyles.drpdwnlist}><a href='/whitepaper' rel='noopener noreferrer'>White Paper</a></li>
                    <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp2} onMouseOut={toggleIconDown2}>
                        Buy TafaXtra {dropdwnIcon2}
                        <ul>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faCircleDollarToSlot} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Staking Rewards</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faGift} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>TafaXtra Free Claim</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faHandHoldingDollar} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>AirDrop Winner</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faPeopleGroup} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Referral</span></a></li>
                        </ul>
                    </li>
                    <li className={dappsidebarstyles.drpdwnlist} onMouseEnter={toggleIconUp3} onMouseOut={toggleIconDown3}>
                        Community {dropdwnIcon3}
                        <ul>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTwitter} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Twitter</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faFacebook} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Facebook</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faTelegram} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Telegram</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faDiscord} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Discord</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faMedium} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>Medium</span></a></li>
                            <li className={dappsidebarstyles.lista}><a href='/' rel='noopener noreferrer' ><FontAwesomeIcon icon={faYoutube} size='lg' className={dappsidebarstyles.navdrbdwnbrandicon}/> <span className={dappsidebarstyles.brnd}>YouTube</span></a></li>
                        </ul>
                    </li>
                </ul>
                <ul className={dappsidebarstyles.upa}>
                    {/* <li className={dappsidebarstyles.si}><a href='/signin' rel='noopener noreferrer'>Sign In</a></li> */}
                    <li className={dappsidebarstyles.ld}><a href='/dapp#staketafa' rel='noopener noreferrer'>Stake TafaXtra</a></li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default DappSideBar;
