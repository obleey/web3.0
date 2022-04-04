import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext<any>(null);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({ provider, signer, transactionContract });
};

interface FormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export const TransactionProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (e) {
      console.log(e);
      throw new Error("No Ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
      throw new Error("No Ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const sendTransaction = async () => {
    try {
      const { addressTo, amount, keyword, message } = formData;

      getEthereumContract();
      if (!ethereum) return alert("Please connect to MetaMask");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
