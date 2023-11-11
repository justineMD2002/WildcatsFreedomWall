import React, { useEffect } from "react";
import { useState } from "react";
import * as Web3 from '@solana/web3.js';
import './connectwalletbutton.css'


function Walletbutton({onClick}){

    return (
        <div className="bg-blue-333 w-full h-full position-relative flex items-center justify-center" >
            <div className="items-center justify-center " >
            <button
            type="button"
            onClick={onClick}
            className="ui-btn text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
            <span>
                Connect to Wallet
            </span>
            </button>
            </div>
        </div>
    )
}


export default Walletbutton;