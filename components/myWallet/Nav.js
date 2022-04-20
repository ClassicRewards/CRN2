import React from "react";
import styles from './wallet.module.css';

function Nav() {
  const navHeader = [styles.section_title, styles.nav_center].join(" ");

  return (
    <nav>
      <span className={navHeader}>My Warriors</span>
      <div className={styles.nav_links_section}>
        <div className={styles.nav_links_middle}>
          {/* <a href="/Nfts" className={styles.nav_link}>
            Full Collection
          </a> */}
        </div>
      </div>
      {/* <div className={styles.menu}></div> */}
    </nav>
  );
}

export default Nav;
