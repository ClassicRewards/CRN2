import abi from "../abi.json";
import Web3 from "web3";

let web3 = {};
const address = "0x0cC7f43A7FBBa594b57C9676ccc2ade02eb62D29";

if (typeof window !== "undefined") {
  web3 = new Web3(window.ethereum);
}

export const totalSupply = async () => {
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

export const walletOfOwner = async () => {
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