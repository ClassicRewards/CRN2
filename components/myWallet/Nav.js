import React from "react";
import styles from './wallet.module.css';
import { Box, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'

function Nav() {
  const navHeader = [styles.section_title, styles.nav_center].join(" ");
  const variant = useBreakpointValue({ base: 'hamburger', lg: 'menu' }) || 'menu';

  return (
    <nav>
      {
        (variant === 'menu') ?
          <Flex>
            <Flex w={"100px"} alignItems={"center"} paddingLeft={"20px"}>
              <Button
                onClick={() => {window.location.href = "/"}}
                align="center"
                color={"#C66CFF"}
                border={"1px solid #C66CFF"}
                backgroundColor="#0B3552"
                w="100px"
                h="50px"
              >
                Back
              </Button>
            </Flex>
            <Flex w={"100%"} justifyContent={"center"} paddingRight={[,,,,"120px"]}>
              <span className={navHeader}>My Warriors</span>
            </Flex>
          </Flex>
        :
          <Box>
            <Box onClick={() => {window.location.href = "/"}} w={"auto"}>
              <ArrowBackIcon w={"50%"}/>
            </Box>
            <Box w={"100%"} justifyContent={"center"}>
              <span className={navHeader}>My Warriors</span>
            </Box>
          </Box>
      }
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
