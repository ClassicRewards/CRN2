import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import Nav from "../myWallet/Nav";
import { useRouter } from 'next/router';
import '../myWallet/JQueryLoader';
import styles from '../myWallet/wallet.module.css';
import BGSection1 from "../../public/section1-bg.jpg";

const Layout = ({ children }) => {
  const [contract, setContract] = useState(null);

  const walletRoutes = ["/Wallet", "/Nfts"];

  useEffect(()=> {
    if (walletRoutes.includes(router.pathname)) {
      document.body.style.height = "100vh";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundImage = "url(" + BGSection1.src + ")";

      $(() => {
        $(`.${styles["menu"]}`).on('click',(e) => {
          e.target.classList.toggle(`${styles["close_mode"]}`);
          $(`.${styles["nav_links_section"]}`).slideToggle();
        });
    
        $(`.${styles["nav_link"]}`).on('click',() => {
          if (window.innerWidth < 1111) {
            $(`.${styles["menu"]}`).removeClass(`${styles["close_mode"]}`);
            $(`.${styles["nav_links_section"]}`).slideUp();
          }
        });
    
        $(window).on('resize',() => {
          if (window.innerWidth > 1110) {
            $(`.${styles["nav_links_section"]}`).show();
          } else {
            $(`.${styles["nav_links_section"]}`).hide();
          }
          $(`.${styles["menu"]}`).removeClass(`${styles["close_mode"]}`);
        });
      });
    }
  }, [])
  
  let container;
  const router = useRouter()
  const element =  React.cloneElement(children, { contract });

  if (walletRoutes.includes(router.pathname)) {
    container = <Box className='wallet-body'>
                  <Nav/>
                  {element}
                </Box>;
  } else {
    container = <><Header contract={contract} setContract={setContract}/>{element}<Footer/></>;
  }

  return (
    <Box color="white">
      {container}
    </Box>
  );
};

export default Layout;
