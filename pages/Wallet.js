/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import NFTs from "../ranking.json";
import React, { useState, useEffect, useRef } from "react";
import { walletOfOwner } from "../utils/interact";
import styles from '../components/myWallet/wallet.module.css';
import '../components/myWallet/JQueryLoader';
import { useRouter } from 'next/router';
import { getWarriorLinksByAddress } from "../config/utils";

function Index() {
  const [List, setList] = useState(NFTs);
  const [token, setToken] = useState([]);
  const bgVideo = useRef();
  const router = useRouter();

  const warriorLinks = getWarriorLinksByAddress(router.query.address);
  const warriorVedioLink = warriorLinks ? warriorLinks.mp4 : "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      const token = await walletOfOwner(router.query.address);
      setToken(token);
      bgVideo.current?.play();
  });

  function arrayObjectIndexOf(myArray, property, searchTerm) {
    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === parseInt(searchTerm)) {
        return (
          <div className={styles.grey} data-sort="a" key={i}>
              <video
                playsInline
                autoPlay
                muted
                loop
                ref={bgVideo}
              >
                <source src={warriorVedioLink + searchTerm + ".mp4"} type="video/mp4" />
              </video>
            <p className={styles.grey_rank}>Token ID #{searchTerm}</p>
            <p className="swaggo_owner"></p>
          </div>
        );
      }
    }
    return null;
  }

  const walletSectionClasses = [styles.no_side_space, styles.mp_up].join(" ");
  const swaggosCollectionClasses = [styles.swaggos_collection, styles.mt_30].join(" ");

  return (
    <>
      {
        (router.query.address !== "") ?
          <section className={walletSectionClasses}>
            {/* <span className={styles.section_title}>My Warriors</span> */}
            <div className={swaggosCollectionClasses}>
              {Array.isArray(token) === true ? (
                token.map((item, i) => {
                  return arrayObjectIndexOf(NFTs, "ID", item);
                })
              ) : (
                <div className={styles.center}>
                  <h5>If you have not already, please connect your wallet. If it already has been connected, there are no Warriors in this address!</h5>
                </div>
              )}
            </div>
          </section>
        :
          null
      }
    </>
  );
}

export default Index;
