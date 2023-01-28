import React, { useState } from 'react';
import { Box, HStack, Link } from '@chakra-ui/react';
import Image from 'next/image';
import DesktopNavButton from './DesktopNavButton';
import styles from './styles/nav.module.css';
import { ConnectButton } from '../ConnectButton';
const NAV_STYLE = { listStyle: 'none', paddingLeft: 0 };

const DesktopMenu = ({ contract, setContract }) => {
  return (
    <Box as="nav" pt="2">
      <HStack as="ul" textStyle="navButton" spacing={8} style={NAV_STYLE} fontWeight="bold">
        <li>
          <Image src="/cross-chain.png" height="60px" width="116px" alt="Cross Chain" />
        </li>
        <li>
          <ConnectButton chain={"ETC"} networkName={"Ethereum Classic"} chainId={61} setContract={setContract} />
        </li>
        <li>
          <ConnectButton chain={"BNB"} networkName={"Binance"} chainId={56} setContract={setContract} />
        </li>
        <li className={styles.menuBtn}>
          <a href="/Classic_Reward_Token_WhitePaper.pdf" target="_blank">
            WHITEPAPER
          </a>
        </li>
        <DesktopNavButton targetElementId="mint" label="MINT" />
        <li className={styles.menuBtn}>
          <a href="https://github.com/AuditRateTech/Smart-Contract-Audits/blob/main/Classic_Rewards_Binance_NFT_0x0cC7f43A7FBBa594b57C9676ccc2ade02eb62D29.pdf" target="_blank">
            BNB AUDIT
          </a>
        </li>
        <li className={styles.menuBtn}>
          <a href="https://stamfordskirmish.com/" target="_blank">
            BATTLE
          </a>
        </li>
        <DesktopNavButton targetElementId="lore" label="LORE" />
        <DesktopNavButton targetElementId="roadmap" label="ROADMAP" />
        <DesktopNavButton targetElementId="team" label="TEAM" />
        {
          (contract) ?
            <li className={styles.menuBtn}>
              <a href={`/Wallet?address=${contract.address}`}>
                MY NFTs
              </a>
            </li>
          :
            <li className={styles.disabledMenuBtn} title={'Connect your wallet to see your warriors'}>
              MY NFTs
            </li>
        }
        <DesktopNavButton targetElementId="faq" label="FAQ" />
      </HStack>
    </Box>
  );
};

export default DesktopMenu;
