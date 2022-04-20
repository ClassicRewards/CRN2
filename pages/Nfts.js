/* eslint-disable no-unused-vars */
import NFTs from "../ranking.json";
import React, { useState, useEffect } from "react";
import Pagination from "../components/myWallet/Pagination";
import styles from '../components/myWallet/wallet.module.css';

function Index() {
  const [List, setList] = useState(NFTs);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(50);
  const [currentPost, setCurrentPost] = useState([]);
  let [indexOfFirstPost, setindexOfFirstPost] = useState(0);
  let [indexOfLastPost, setindexOfLastPost] = useState(50);

  useEffect(
    () => {
      setList(NFTs);
      setindexOfLastPost(currentPage * postsPerPage);
      setindexOfFirstPost(indexOfLastPost - postsPerPage);
      var currentPosts = List.slice(indexOfFirstPost, indexOfLastPost);
      console.log(currentPage);
      console.log(currentPosts);
      setCurrentPost(currentPosts);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage],
    [currentPost]
  );

  // Get current NFTs

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lowetTokend = () => {
    const list = List.sort((a, b) => b.ID - a.ID);
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
    setCurrentPage(1);
  };

  const HighestTokend = () => {
    const list = List.sort((a, b) => a.ID - b.ID);
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
    setCurrentPage(1);
  };

  const lowetRarity = () => {
    const list = List.sort((a, b) => a.Rarity - b.Rarity);
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
    console.log(currentPost);
    setCurrentPage(1);
  };

  const HighRarity = () => {
    const list = List.sort((a, b) => b.Rarity - a.Rarity);
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
    setCurrentPage(1);
  };

  const DefaultList = () => {
    var currentPosts = List.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
    setCurrentPage(1);
  };

  const nftsSectionClasses = [styles.no_side_space, styles.mp_up].join(" ");

  return (
    <section className={nftsSectionClasses}>
      <span className={styles.section_title}>The Warriors</span>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.grey}>
            <a href={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201.jpg`} target="_blank">
                <img className={styles.greys}
                    src={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201.jpg`} alt=""
                />
            </a>
            <p className={styles.grey_rank}>Level 1 Archer</p>
            <p className="swaggo_owner"></p>
          </div>
          <div className={styles.grey}>
            <a href={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%20601.jpg`} target="_blank">
                <img className={styles.greys}
                    src={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%20601.jpg`} alt=""
                />
            </a>
            <p className={styles.grey_rank}>Level 2 Archer</p>
            <p className="swaggo_owner"></p>
          </div>
          <div className={styles.grey}>
            <a href={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201201.jpg`} target="_blank">
                <img className={styles.greys}
                    src={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201201.jpg`} alt=""
                />
            </a>
            <p className={styles.grey_rank}>Level 3 Archer</p>
            <p className="swaggo_owner"></p>
          </div>
          <div className={styles.grey}>
            <a href={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201501.jpg`} target="_blank">
                <img className={styles.greys}
                    src={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201501.jpg`} alt=""
                />
            </a>
            <p className={styles.grey_rank}>Level 4 Archer</p>
            <p className="swaggo_owner"></p>
          </div>
          <div className={styles.grey}>
            <a href={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201901.jpg`} target="_blank">
                <img className={styles.greys}
                    src={`https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%201901.jpg`} alt=""
                />
            </a>
            <p className={styles.grey_rank}>Level 5 Archer</p>
            <p className="swaggo_owner"></p>
          </div>
      <Pagination
        // postsPerPage={postsPerPage}
        // totalPosts={List.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
}

export default Index;
