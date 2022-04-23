import abi from "../abi.json";
import Web3 from "web3";

let web3 = {};

if (typeof window !== "undefined") {
  web3 = new Web3(window.ethereum);
}

export const totalSupply = async (address) => {
  const contract = new web3.eth.Contract(abi, address);

  try {
    const supply = await contract.methods.totalSupply().call();
    return supply;
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const walletOfOwner = async (address) => {
  const contract = new web3.eth.Contract(abi, address);
  const accounts = await web3.eth.getAccounts();

  try {
    const token = await contract.methods.walletOfOwner(accounts[0]).call();
    return token;
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};