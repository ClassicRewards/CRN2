import { useEffect, useState } from "react";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { Center, Input, Button, Box, Text, Divider, Flex } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import ClassicRewards from "../abi/classicRwards.json"
import Web3 from "web3";
import {
  getNetworkInitialsByChainId,
  getMintingPriceByChainId,
  getMaxMintingSupplyByChainId,
  getcolorBasedOnChain, 
  getSmartContractAddressByChainId, 
  getAllChainIds, 
  getNetworkNameByChainId 
} from "../config/utils";
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'

export function MintArea({ contract, updateMintCount }) {
  const [amount, setAmount] = useState(1);
  const [mintMore, setMintMore] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // const [presaleEnd, setPresaleEnd] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [loadingTx, setLoadingTx] = useState(false);

  const web3 = typeof window !== "undefined" ? window.ethereum ? new Web3(window.ethereum) : null : null;
  if(!web3) {
    toast.error("Please Use Metamask Browser!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const chainId = contract ? contract.provider._network.chainId : null;
  const smartContractAddress = contract ? contract.address : getSmartContractAddressByChainId(56);
  const mainCont = web3 ? new web3.eth.Contract(ClassicRewards.abi, smartContractAddress) : {};

  let networkInitials = getNetworkInitialsByChainId(chainId);
  let mintingPrice = getMintingPriceByChainId(chainId);
  let maxMintingSupply = getMaxMintingSupplyByChainId(chainId);
  let colorBasedOnChain = getcolorBasedOnChain(chainId);

  if (!networkInitials) {
    networkInitials = "BNB";
  }  
  
  if (!mintingPrice) {
    mintingPrice = "0.2";
  }  

  if (!maxMintingSupply) {
    maxMintingSupply = 6000;
  }

  if (!colorBasedOnChain) {
    colorBasedOnChain = "#C66CFF";
  }  

  const smartContractArray = [];
  getAllChainIds().forEach(element => {
    smartContractArray.push({[element]: true});
  });

  const [showCopyIcon, setShowCopyIcon] = useState(smartContractArray);

  useEffect(() => {
    (async () => {
      if (contract) {
        try {
          let _isPaused = false;
          if (mainCont != {}) {
            _isPaused = await mainCont.methods.paused().call();
          }         
          console.log(_isPaused);
          setIsPaused(_isPaused);
        } catch (e) {
          // alert("TODO message");
          console.log("Error: ", e);
        }
      }
      try {
        let _total = 0;
        if(mainCont != {}) {
          _total = Number(await mainCont.methods.totalSupply().call());
        } else {
          _total = 1050;
        }
        setTotalSupply(_total);
      } catch (e) {
        console.log("Error: ", e);
      }
    })();
  }, [contract, loadingTx]);

  return (
    <>
      <ToastContainer theme={"dark"} />
      <Center
        h="100%"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!contract && (
          <Text
            textStyle="paragraph"
            maxW={["500", , , , "600"]}
            fontSize={["18px", , , , "20px"]}
            mt={4}
          >
            Connect your wallet!
          </Text>
        )}
        <Box w={["350px", , , ,"450px"]} display={'flex'} justifyContent="center">
          <Button
            align="center"
            color={colorBasedOnChain}
            border={`1px solid ${colorBasedOnChain}`}
            backgroundColor="#0B3552"
            w="100%"
            h="30px"
            onClick={() => window.open("https://youtu.be/gsQjNbhFQ3k")}
          >
            How to mint on mobile
          </Button>
        </Box>
        <Box w={["350px", , , ,"450px"]} display={'flex'} justifyContent="center">
          <Button
            align="center"
            color={colorBasedOnChain}
            border={`1px solid ${colorBasedOnChain}`}
            backgroundColor="#0B3552"
            w="100%"
            h="30px"
            onClick={() => window.open("https://youtu.be/S2Ed7pAII0M")}
            >
              How to mint classic rewards ETC  NFT
          </Button>
        </Box>
        <Box
          bg="linear-gradient(180deg, #362073, #190d35)"
          w={["350px", , , ,"450px"]}
          style={{
            boxShadow:
              "0 20px 20px rgba(66, 32, 111, 0.2), 0px 0px 50px rgba(66, 32, 111, 0.3)",
            borderRadius: "0.8rem",
            height: ["450px", , , , "430px"],
          }}
        >
          <Box>
            <Center>
              <Box>
                <Text textStyle="paragraph" fontWeight={'bold'} fontSize={'40px'}>Warrior Minting</Text>
                <Flex justifyContent={'center'}>
                  <Text textStyle="paragraph" fontWeight={'bold'} fontSize={'24px'} m={'0px 5px'}>Price:</Text>
                  <Text textStyle="paragraph" fontWeight={'bold'} fontSize={'24px'} m={'0px 5px'} color={colorBasedOnChain}>{mintingPrice} {networkInitials}</Text>
                </Flex>
                <Flex justifyContent={'center'}>
                  <Text textStyle="paragraph" fontWeight={'bold'} fontSize={'40px'} color={colorBasedOnChain}>{totalSupply} / {maxMintingSupply}</Text>
                </Flex>
              </Box>
            </Center>
            <Center>
              <Divider w={'90%'} m={'10px 0px'} borderRadius={'8px'} borderStyle={'none'} backgroundColor={'#75A7D3'} height={'15px'}/>
            </Center>
            <Box display={'flex'} flexDirection={'row'} m={'10px 0px 15px 0px'}>
              <Box w={'50%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Text textStyle="paragraph" w={'auto'}>Enter Amount</Text>
                <Input
                  value={amount}
                  onChange={handleInput}
                  focusBorderColor={colorBasedOnChain}
                  placeholder="1"
                  type="number"
                  w="140px"
                  h="45px"
                  borderRadius={'16px'}
                  textAlign={'center'}
                />
              </Box>
                {loadingTx && (
                  <ReactLoading
                    type={"spin"}
                    color={colorBasedOnChain}
                    height={"10%"}
                    width={"10%"}
                  />
                )}
              <Box w={'50%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Text textStyle="paragraph" >Click to Mint</Text>
                <Button
                  align="center"
                  color={colorBasedOnChain}
                  border={`1px solid ${colorBasedOnChain}`}
                  backgroundColor="#0B3552"
                  w="140px"
                  h="45px"
                  onClick={() => onMint(amount)}
                  borderRadius={'16px'}
                  disabled={ isPaused || contract == null || totalSupply === maxMintingSupply || amount > 25 }
                >
                  {mintMore ? "MINT MORE" : "MINT"}
                </Button>
              </Box>
            </Box>
            <Center>
              <Divider w={'90%'} m={'10px 0px'} borderRadius={'8px'} borderStyle={'none'} backgroundColor={'#75A7D3'} height={'15px'}/>
            </Center>
            <Center flexDirection={'column'} m={'10px 0px'}>
              <Text fontSize="md">A maximum of 25 tokens can be minted at a time!</Text>
              <Text fontSize="md">If nothing happens, make sure you have enough </Text>
              <Text fontSize="md">{networkInitials} to purchase an NFT ({mintingPrice} {networkInitials}).</Text>
            </Center>
          </Box>
        </Box>
        <Box w={["350px", , , ,"450px"]} display={'flex'} justifyContent="center">
          <Button
            align="center"
            color={colorBasedOnChain}
            border={`1px solid ${colorBasedOnChain}`}
            backgroundColor="#0B3552"
            w="100%"
            h="30px"
            onClick={() => window.open("https://www.youtube.com/watch?v=ljYJLPSWLuo")}
          >
            How to view your NFT
          </Button>
        </Box>
        <Box h={"auto"} mt={["15px", , , ,"100px"]}>
          {
            showCopyIcon.map((ele, index)=> {
              const id = Object.keys(ele)[0];
              const address = getSmartContractAddressByChainId(id);
              const showCopyIconFlag = ele[id];
              return (
                <Flex key={index}>
                    <Box display={["block", , , "Flex"]}>
                      <Flex>
                        <Text fontSize={["18px", , , , "20px"]} color={getcolorBasedOnChain(id)}>{getNetworkNameByChainId(id)}</Text>
                        <Text fontSize={["18px", , , , "20px"]} ml={"5px"} color={"#75A7D3"}>NFT Contract:</Text>
                      </Flex>
                      <Text fontSize={["14px", , , , "16px"]} color={"lightgray"} ml={["0px", , , "5px"]} alignSelf={"center"}>{address}</Text>
                    </Box>
                  <Box onClick={() => {copyAddress(index, id, address)}} _hover={{ cursor: "pointer" }} alignSelf={["end", , , ,"center"]} title={(showCopyIconFlag ? "Copy address to clipboard" : "Copied")} ml={"5px"}>
                    {
                      showCopyIconFlag ?
                        <CopyIcon/>
                      :
                        <CheckIcon/>
                    }
                  </Box>
                </Flex>
              )
            })
          }
        </Box>
      </Center>
    </>
  );

  async function onMint(amount) {
    if (Number(amount) <= 0 || Number(amount) + totalSupply > maxMintingSupply) {
      toast.error("Not valid Amount", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      setLoadingTx(true);
      const currentTimestamp = new Date().getTime();
      let mintedAmount = 0;
      if(mainCont != {}) {
        mintedAmount = Number(await mainCont.methods.totalSupply().call());
      } else {
        mintedAmount = 1050;
      }      
      const tx = await publicMint();
      setAmount(1);
      const receipt = await tx.wait();
      setLoadingTx(false);
      if (receipt.status === 1) {
        console.log("transaction completed!");
        setMintMore(true);
      } else {
        console.log("transaction failed!");
      }
      setTotalSupply(mintedAmount);
      updateMintCount()
    } catch (error) {
      setLoadingTx(false);
      let errorMsg = error.hasOwnProperty("error") ? error.error : error;
      
      errorMsg = errorMsg.hasOwnProperty("data") ? 
          errorMsg.data.hasOwnProperty("originalError") ? errorMsg.message : error.data.message
        : errorMsg.message;
      
      if (errorMsg.indexOf("insufficient funds") !== -1) {
        errorMsg = "Insufficient Funds";
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        errorMsg = "";
        console.log(errorMsg);
      }
    }
  }


  async function publicMint() {
    
    // let amount_ = await ethers.BigNumber.from(amount);

    // let errorMargin = ethers.utils.parseUnits(String(30000 * amount), "wei");
    // let estimateGas = await contract.estimateGas.mint(
    //   amount
    // );

    console.log(contract);
    let tokenPrice;
    if(mainCont != {}) {
      tokenPrice = await ethers.BigNumber.from(await mainCont.methods.cost().call());
    } else {
      tokenPrice = await ethers.BigNumber.from({_hex: '0x03782dace9d90000', _isBigNumber: true});
    }
    
    console.log(tokenPrice);

    // const val = (tokenPrice * amount)

    // console.log("gasEstimation: ", ethers.utils.formatUnits(estimateGas, 9));
    // console.log("errorMargin: ", ethers.utils.formatUnits(errorMargin, 9));
    console.log(contract);
    await contract.mint(amount, {
      value: tokenPrice.mul(amount),
    });
  }

  function handleInput(event) {
    const value = event.target.value;
    setAmount(value);
  }

  function copyAddress(index, chainId, address) {
    navigator.clipboard.writeText(address);
    toggleCopyIcon(index, chainId, false);
    setTimeout(() => {
      toggleCopyIcon(index, chainId, true);
    }, 1000);
  }

  function toggleCopyIcon(index, chainId, newValue) {
    const newState = [...showCopyIcon];
    newState[index] = {[chainId]: newValue};
    setShowCopyIcon(newState);
  }
}
