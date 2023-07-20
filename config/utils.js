import EthereumClassicABI from "../abi/ethereumClassicABI.json"
import BinanceABI from "../abi/binanceABI.json"

export const getSmartContractAddressByChainId = (chainId) => {
    const address = {
        56: "0xd5B60DeaE08d2d6D4B69eB9bc8B3B3172fFFa5CA",
        61: "0x1F7FEfBcdc8E1DD1DFdF508efaac0f10BA0961C5"
    };

    return address[chainId];
}

export const getWarriorLinksByAddress = (address) => {
    const links = {
        "0xd5B60DeaE08d2d6D4B69eB9bc8B3B3172fFFa5CA": {
            "jpg": "https://classicrewards.mypinata.cloud/ipfs/QmZHcKiTnGMPjdwEZ7dGGgtf1AZJwHYeHaYuXKxhonvckm/%20",
            "mp4": "https://classicrewards.mypinata.cloud/ipfs/QmbjmK3Ui26XWgtWPVCxkiTY9ybAyWkVdu32XC1PH463o1/%20"
        },
        "0x1F7FEfBcdc8E1DD1DFdF508efaac0f10BA0961C5": {
            "jpg": "https://classicrewards.mypinata.cloud/ipfs/QmZtFmRktAzsi4coGnmP3LLmSMdfowDB34iRG6Ftzg8hUF/",
            "mp4": "https://classicrewards.mypinata.cloud/ipfs/QmZjpRshkApUfGwYnfzypqTMEv6m69LfWZVpEFkrQ99yFR/"
        }
    };

    return links[address];
}

export const getNetworkInitialsByChainId = (chainId) => {
    const initials = {
        56: "BNB",
        61: "ETC"
    };

    return initials[chainId];
}

export const getNetworkNameByChainId = (chainId) => {
    const networkName = {
        56: "Binance",
        61: "Ethereum Classic"
    };

    return networkName[chainId];
}

export const getMintingPriceByChainId = (chainId) => {
    const mintingPrice = {
        56: "0.1",
        61: "0.5"
    };

    return mintingPrice[chainId];
}

export const getAllChains = () => {
    return [
        "BNB",
        "ETC"
    ];
}

export const getAllChainIds = () => {
    return [
        56,
        61
    ];
}

export const getMaxMintingSupplyByChainId = (chainId) => {
    const mintingPrice = {
        56: 10000,
        61: 10000
    };

    return mintingPrice[chainId];
}

export const getcolorBasedOnChain = (chainId) => {
    const mintBoxColor = {
        56: "#F1B80F",
        61: "#6FBD44"
    };

    return mintBoxColor[chainId];
}

export const getcolorBasedOnAddress = (address) => {
    const mintBoxColor = {
        "0xd5B60DeaE08d2d6D4B69eB9bc8B3B3172fFFa5CA": "#F1B80F",
        "0x1F7FEfBcdc8E1DD1DFdF508efaac0f10BA0961C5": "#6FBD44"
    };

    return mintBoxColor[address];
}

export const getABIBasedOnChain = (chainId) => {
    const chainABIs = {
        56: BinanceABI,
        61: EthereumClassicABI
    };

    return chainABIs[chainId];
}

export const getRpcBasedOnChain = (chainId) => {
    const rpc = {
        56: "https://bsc-dataseed.binance.org/",
        61: "https://www.ethercluster.com/etc",
    }

    return rpc[chainId];
}
