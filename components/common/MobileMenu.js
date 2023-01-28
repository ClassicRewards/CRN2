import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  HStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  UnorderedList,
  ListItem,
  Center,
  Flex
} from '@chakra-ui/react';
import { FaTwitter, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import HamburgerButton from './HamburgerButton';
import CircleIconButton from './CircleIconButton';
import MobileNavButton from './MobileNavButton';
import { ConnectButton } from '../ConnectButton';
import styles from './styles/nav.module.css';

const NAV_STYLE = { listStyle: 'none', paddingLeft: 0 };
const ICONS_SIZE = '32px';

const MobileMenu = ({ contract, setContract }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  const onHamburguerToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) return null;

  return (
    <>
      <Flex flexDirection={'column'} height={'inherit'} justifyContent={'space-evenly'}>
        <ConnectButton chain={"ETC"} networkName={"Ethereum Classic"} chainId={61} setContract={setContract} />
        <ConnectButton chain={"BNB"} networkName={"Binance"} chainId={56} setContract={setContract} />
      </Flex>
      <Box as="nav" pt="6">
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent px={0}>
            <DrawerHeader bg="#081A3D" px={6}>
              <HStack justifyContent="center">
                <Box h="32px" w="32px" display="inline-block" verticalAlign="middle" position="relative">
                  <Image src="/cr-logo.png" layout="fill" alt="Classic Rewards" />
                </Box>
                <Text fontSize="16px" color="#75A7D3" textAlign="left" fontWeight="900">
                  CLASSIC REWARDS MENU
                </Text>
              </HStack>
            </DrawerHeader>
            <DrawerBody bgColor="#041525" py={6} px={6}>
              <UnorderedList
                style={NAV_STYLE}
                fontFamily="Antonio"
                fontSize="20px"
                fontWeight="bold"
                color="#fff"
                marginStart={0}
                mb={4}
                pb={4}
              >
                <ListItem>
                  <MobileNavButton>BNB CONNECT</MobileNavButton>
                </ListItem>
                <ListItem mb={3}>
                  <a href="/Classic_Reward_Token_WhitePaper.pdf" target="_blank">
                    WHITEPAPER
                  </a>
                </ListItem>
                <MobileNavButton targetElementId="mint" label="MINT" onClose={onClose} />
                <ListItem mb={3}>
                  <a href="https://github.com/AuditRateTech/Smart-Contract-Audits/blob/main/Classic_Rewards_Binance_NFT_0x0cC7f43A7FBBa594b57C9676ccc2ade02eb62D29.pdf" target="_blank">
                    BNB AUDIT
                  </a>
                </ListItem>
                <ListItem mb={3}>
                  <a href="/https://stamfordskirmish.com/" target="_blank">
                    BATTLE
                  </a>
                </ListItem>
                <MobileNavButton targetElementId="lore" label="LORE" onClose={onClose} />
                <MobileNavButton targetElementId="roadmap" label="ROADMAP" onClose={onClose} />
                <MobileNavButton targetElementId="team" label="TEAM" onClose={onClose} />
                {
                  (contract) ?
                    <ListItem mb={3}>
                      <a href={`/Wallet?address=${contract.address}`}>
                        MY NFTs
                      </a>
                    </ListItem>
                  :
                    <ListItem mb={3} className={styles.disabledMenuBtn} title={'Connect your wallet to see your warriors'}>
                      MY NFTs
                    </ListItem>
                }
                <MobileNavButton targetElementId="faq" label="FAQ" onClose={onClose} />
              </UnorderedList>
              <HStack gap={4} justifyContent="center" borderTop="1px dashed rgba(255, 255, 255, 0.2)" pt={5}>
                <CircleIconButton icon={FaTwitter} size="34px" href="https://twitter.com/ClassicRewards" />
                <CircleIconButton icon={FaTelegramPlane} size="34px" href="https://t.me/+oo-kjTs-jkAyZDU5" />
                <CircleIconButton icon={FaYoutube} size="34px" href="https://www.youtube.com/c/PatientMoney" />
              </HStack>
              {/* <HStack mt={10} color="#fff" fontSize="16" justifyContent={"center"}>
								<Link href="#">Terms & Conditions</Link> <Text>|</Text>
								<Link href="#">Privacy Policy</Link>
							</HStack> */}
              <Center mt={4} color="#75A7D3" fontSize="15px">
                © Classic Rewards. All rights reserved.
              </Center>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <HamburgerButton onClick={onHamburguerToggle} isOpen={isOpen} />
      </Box>
    </>
  );
};

export default MobileMenu;
