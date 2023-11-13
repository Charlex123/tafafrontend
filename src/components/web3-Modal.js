import Image from "next/image";
import mmlogo from '../assets/images/mm.png'
import wclogo from '../assets/images/wc.png'
import cblogo from '../assets/images/cb.png'
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./web3-connectors";
import styles from "../styles/web3modal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SelectWalletModal({ isOpen, closeWeb3Modal }) {
  const { activate } = useWeb3React();
  console.log('activate lout', activate)
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  return (
    <>
    <div className={styles.modal}>
      <div className={styles.modaloverlay} onClick={closeWeb3Modal} />
      <div className={styles.modalcontent}>
        <h1>Select Wallet</h1>
        <div className={styles.closemodal}>
          <button className={styles.closebtn} onClick={closeWeb3Modal}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className={styles.modalbody}>
          <div>

            <div className={styles.selectdrpdwn}>
              <button
                variant="outline"
                onClick={() => {
                  activate(connectors.coinbaseWallet);
                  setProvider("coinbaseWallet");
                  closeWeb3Modal();
                }}
                className={styles.wcbtn}
              >
                <div>
                  <Image
                    src={cblogo}
                    alt="Coinbase Wallet Logo"
                    width={25}
                    height={25}
                    className={styles.wlogo}
                  />
                  <div className={styles.wtext}>Coinbase Wallet</div>
                </div>
              </button>
            </div>
            
            <div className={styles.selectdrpdwn}>
              <button
                variant="outline"
                onClick={() => {
                  activate(connectors.walletConnect);
                  setProvider("walletConnect");
                  closeWeb3Modal();
                }}
                className={styles.wcbtn}
              >
                <div>
                  <Image
                    src={wclogo}
                    alt="Wallet Connect Logo"
                    width={26}
                    height={26}
                    className={styles.wlogo}
                  />
                  <div className={styles.wtext}>Wallet Connect</div>
                </div>
              </button>
            </div>

            <div className={styles.selectdrpdwn}>
              <button
                variant="outline"
                onClick={() => {
                  activate(connectors.injected);
                  setProvider("injected");
                  closeWeb3Modal();
                }}
                className={styles.wcbtn}
              >
                <div>
                  <Image
                    src={mmlogo}
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    className={styles.wlogo}
                  />
                  <div className={styles.wtext}>Metamask</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
