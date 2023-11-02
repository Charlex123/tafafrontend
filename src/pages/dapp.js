import React from 'react';
import BackToTop from '../components/back-to-top/back-to-top';
import ChangeTheme from '../components/change-theme/change-theme';
import Dashboard from '../components/Dapp';
import DappNav from '../components/Dappnav';
function Dapp() {

  return (
    <>
        <BackToTop />
        <ChangeTheme />
        <DappNav />
        <Dashboard />
    </>
  )
}

export default Dapp
