import React, { useEffect, useState } from "react";
import './App.css'
import Navbar from "./components/Navbar";
import Walletbutton from "./components/Walletbutton";
import Feed from "./components/Feed";
import Modal from "./components/Modal";
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import kp from './keypair.json'
import idl from './wildcats_contract.json'
import { Buffer } from 'buffer';
import './loadscreen.css'


const { SystemProgram, Keypair } = web3;
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const postAccount = web3.Keypair.fromSecretKey(secret);
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
  preflightCommitment: "processed"
}

function App() {
  window.Buffer = Buffer;
  const [walletAddress, setwalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [postList , setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const openModal = () => {
    if(postList.length === 0) {
      setIsModalOpen(true);
    }
  };

  const handleAccept = () => {
    createPostAccount();
    setIsModalOpen(false);
    setInputValue(""); 
  };

  const handleDecline = () => {
    setIsModalOpen(false);
    console.log('User declined.');
  };

  const getProgram = async () => {
    return new Program(idl, programID, getProvider());
  }

  const getDataFromNavbar = (inputValue) => {
    setInputValue(inputValue)
  }

  const connectWallet = async () => {
    try {
      const { solana } = window;
      const response = await solana.connect();
      setwalletAddress(response.publicKey.toString());
      setIsLoading(true);
      await getPostList();
    } catch (error) {
      setIsModalOpen(true);
      alert("You have no wallet in your browser T_T...");
    } finally {
      setIsLoading(false); 
    }
  };
  
  const getPostList = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const program = await getProgram();
      const account = await program.account.postAccount.fetch(postAccount.publicKey);
  
      console.log("Got the account!", account);
      console.log("Post List:", account.postList); 
  
      setPostList(account.postList);
    } catch (error) {
      console.log("Error in getPostList: ", error);
      setPostList([]); 
    } finally {
      setIsLoading(false); 
    }
  };

  const sendPost = async (inputValue) => {
    if (inputValue.length === 0 || inputValue === undefined) {
      console.log("No text input!");
      return;
    }
  
    console.log("Post:", inputValue);
    console.log("User:", walletAddress);
  
    try {
      const provider = getProvider();
      const program = await getProgram();
  
      await program.rpc.addPost(inputValue, {
        accounts: {
          postAccount: postAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("Post successfully sent to program", inputValue);
      setInputValue("");
      await getPostList();
    } catch (error) {
      openModal();
      window.location.reload();
      console.log("Error in posting: ", error);
    } finally {
      setInputValue("");
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
        connection, window.solana, opts.preflightCommitment,
    );
    return provider;
  }

  const createPostAccount = async() => {
    try {
      const provider = getProvider();
      const program = await getProgram();
      console.log("ping")
      await program.rpc.initialize({
        accounts: {
            postAccount: postAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [postAccount]
      })
      console.log("Created a new post account with address:", postAccount.publicKey.toString());
      await getPostList()
    } catch (error) {
      console.log("Error in creating post account account: ", error);
    }
  }

  useEffect(() => {
    if (inputValue) {
      console.log("Sending post...");
      sendPost(inputValue);
    }
  }, [inputValue, postList]);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching post list...");
      getPostList();
    }
  }, [walletAddress]);
  

  return (
    <div className="App">
      <div className="w-full">
        {walletAddress && <Navbar onClick={getDataFromNavbar} />}
      </div>
      <div className="w-full h-full">
        {!walletAddress && <Walletbutton onClick={connectWallet} />}
        {isLoading && (
          <div className="loader-wrapper">
            <div className="loader">
              <div class="loader">
                  <div class="cube">
                      <div class="face"></div>
                      <div class="face"></div>
                      <div class="face"></div>
                      <div class="face"></div>
                      <div class="face"></div>
                      <div class="face"></div>
                  </div>
              </div>
            </div>
          </div>
        )}
        {walletAddress && <Feed posts={postList} />}
        {isModalOpen && <Modal onAccept={handleAccept} onDecline={handleDecline} />}
      </div>
    </div>
  );
}

export default App;
