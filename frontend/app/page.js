"use client";

import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from './page.module.css'

import Table from './components/table'
import Wheel from './components/wheel'

import { createBetObject, wonOrLost } from './utils'

const ROULETTE_ADDRESS = process.env.NEXT_PUBLIC_ROULETTE_ADDRESS
import contract from "./contract/Roulette.json"
const abi = contract.abi
const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  // for messages
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  // contract balance
  const [contractBalance, setContractBalance] = useState('')
  // user choice
  const [selected, setSelected] = useState('')
  // object with info to use on the contract
  const [bet, setBet] = useState({})
  // winning number
  const [result, setResult] = useState('')
  // bid
  const [bid, setBid] = useState(0.01)
  // possible win
  const [possibleWin, setPossibleWin] = useState(0)

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
      getContractBalance()
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (parseInt(chainId) !== parseInt(NETWORK_ID)) {
      setErrorMessage(`Change the network to ${NETWORK_NAME}`);
      throw new Error(`Change the network to ${NETWORK_NAME}`);
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: NETWORK_NAME,
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet()
    }
  }, [walletConnected]);

  /**
   * Function to get the contract balance
   */
  const getContractBalance = async () => {
    try {
      const provider = await getProviderOrSigner()
      const balance = await provider.getBalance(ROULETTE_ADDRESS)
      setContractBalance(utils.formatEther(balance))
    }
    catch(err) {
      console.log(err)
    }
  }

  // Updates the possible win every time the user changes his choice
  useEffect(() => {
    const betObject = createBetObject(selected)
    setBet(betObject)
    if(selected) {
      setSuccessMessage('')
      setErrorMessage('')
    }
    if(betObject && betObject.moltiplicator) setPossibleWin((bid * betObject.moltiplicator).toFixed(2))
  }, [selected])

  /**
   * Function to print success/error messages
   * @returns success/error messages
   */
  const renderMessages = () => {
    if(successMessage) {
      return (
        <p className={styles.successMessage}>
          {successMessage}
        </p>
      )
    }
    if(errorMessage) {
      return (
        <p className={styles.errorMessage}>
          {errorMessage}
        </p>
      )
    }
  }

  /**
   * Function called when a user confirms the bet
   * This calls the contract function based on the choice made by the user
   * Listening to the event on the contract it retrieves the winning number and checks if the user has won or not
   */
  const confirmBid = async () => {
    try{
      setErrorMessage('')
      setSuccessMessage('')
      setLoading(true)

      const signer = await getProviderOrSigner(true)
      const rouletteContract = new Contract(
        ROULETTE_ADDRESS,
        abi,
        signer
      )
      const tx = await rouletteContract[bet.type](bet.value, {
        value: utils.parseEther(bid.toString()),
      })

      rouletteContract
      .on("SpinComplete", (requestId, spinNumber, qrngResult) => {
        const resultNumber = ethers.BigNumber.from(qrngResult.mod(37)).toNumber()
        setResult(resultNumber)
        setLoading(false)
        if(wonOrLost(bet, resultNumber)) {
          setSuccessMessage(`The winnig number is ${resultNumber}! You won!!`)
        } else {
          setErrorMessage(`The winnig number is ${resultNumber}! You lost!!`)
        }
        setSelected('')
        getContractBalance()
      })
    }
    catch(err) {
      console.error(err)
      setErrorMessage("Error during confirm bid")
      setLoading(false)
      setSelected('')
    }
  }

  return (
    <div>
      <Head>
        <title>Roulette game</title>
        <meta name="description" content="Roulette game app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        {renderMessages()}
        { loading ? (
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        ) : ''}
        <div className={styles.containerTableBet}>
          <Table selected={selected} setSelected={setSelected} />
          <Wheel selected={selected} setSelected={setSelected} result={result} bid={bid} possibleWin={possibleWin} confirmBid={confirmBid} contractBalance={contractBalance} />
        </div>
      </div>

      <footer className={styles.footer}>Created by <a href="https://linktr.ee/falconandrea" target="_blank" title="">Falcon Andrea</a></footer>
    </div>
  )
}
