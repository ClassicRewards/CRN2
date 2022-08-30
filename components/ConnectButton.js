import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Button } from "@chakra-ui/react";
import { getSmartContractAddressByChainId, getAllChains, getcolorBasedOnChain, getABIBasedOnChain } from "../config/utils";
import './myWallet/JQueryLoader';

export function ConnectButton({ chain, networkName, chainId, setContract }) {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [address, setAddress] = useState(null);
  let mainC = null;
  let web3Modal = null;

  let colorBasedOnChain = getcolorBasedOnChain(chainId);
  if (!colorBasedOnChain) {
    colorBasedOnChain = "#C66CFF";
  } 

  useEffect(() => {
    listenToProviderEvents();

    async function listenToProviderEvents() {
      if (provider) {
        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);

        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };

        function handleAccountsChanged(accounts) {
          setAddress(accounts[0]);
        }

        function handleChainChanged() {
          debugger;
          // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
          window.location.reload();
        }

        function handleDisconnect() {
          resetConnection();
        }
      }
    }
  }, []);

  function setWeb3Modal () {
    if (typeof window !== "undefined") {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // rinkeby  testnet
              56: "https://bsc-dataseed.binance.org/", // binance mainnet
              61: "https://www.ethercluster.com/etc", // ethereum classic mainnet
              97: "https://data-seed-prebsc-1-s1.binance.org:8545", // binance testnet
            },
          },
        },
      };
      web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });
    }
  };
  setWeb3Modal();

  return network?.chainId === chainId && address ? (
    <Button
      onClick={resetConnection}
      align="center"
      color={colorBasedOnChain}
      border={`1px solid ${colorBasedOnChain}`}
      backgroundColor="#0B3552"
      w="175px"
      h="50px"
    >
      {chain} DISCONNECT
    </Button>
  ) : (
    <Button
      id={chain + "-connect-button"}
      onClick={connectWallet}
      align="center"
      color={colorBasedOnChain}
      border={`1px solid ${colorBasedOnChain}`}
      backgroundColor="#0B3552"
      w="150px"
      h="50px"
    >
      {chain} CONNECT
    </Button>
  );

  async function connectWallet() {
    try {
      web3Modal = null
      setWeb3Modal();
      const instance = await web3Modal.connect();
      await instance.enable();

      setProvider(instance);
      const _provider = new ethers.providers.Web3Provider(instance);

      const signer = _provider.getSigner();

      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      console.log(userAddress);
      const network = await _provider.getNetwork();
      setNetwork(network);
      console.log(network);

      if (network.chainId !== chainId) {
        alert(`Please, change to ${networkName} network`);
        return;
      }

      await getContracts();

      async function getContracts() {
        const _contract = new ethers.Contract(
          getSmartContractAddressByChainId(chainId),
          getABIBasedOnChain(chainId),
          signer
        );
        setContract(_contract);
        mainC = _contract;

        disableOtherConenctButtons(chain);
      }
      await setContracts(signer);
    } catch (error) {
      if (
        error.message === "User closed modal" ||
        error.message === "User Rejected"
      ) {
        console.log(error.message);
      } else {
        console.error(error);
      }
    }
  }

  function disableOtherConenctButtons (connectedChain) {
    getAllChains().forEach((chain) => {
      if (chain != connectedChain) {
        $(`#${chain}-connect-button`).prop('disabled', true);
      }
    })
  }

  function enableOtherConenctButtons (connectedChain) {
    getAllChains().forEach((chain) => {
      if (chain != connectedChain) {
        $(`#${chain}-connect-button`).prop('disabled', false);
      }
    })
  }

  async function resetConnection() {
    console.log("disconnecting from provider", address, provider, network);

    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      console.log("disconnecting from provider");
      await provider.disconnect();
    }
    localStorage.clear();

    setAddress([""]);
    setProvider(null);
    setContract(null);
    setNetwork({});
    await web3Modal.off();

    enableOtherConenctButtons(chain);

    console.log("disconnected");
  }

  async function setContracts(signer) {
    if(mainC && Number(await mainC.totalSupply()) >= 1050) {
      const _contract = new ethers.Contract(
        getSmartContractAddressByChainId(chainId),
        getABIBasedOnChain(chainId),
        signer
      );
      setContract(_contract);
    }
  }
}
