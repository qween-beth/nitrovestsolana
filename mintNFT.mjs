//Using the Thirdweb SDK for Solana to interact with NFTs on the Solana network. 

import {ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "./privateKey.mjs";
import { readFileSync } from "fs";

const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const myNftCollection = await sdk.getNFTCollection(
    "F1myk1urfXpwknwoR5sFaTj5BKQ2Gmtxd6gEM3iTDA8n"
);


const metadata = {
    name: "NitroVest",
    description: "Real Estate Minting Dapp",
    image: readFileSync('./realestate1.jpg'),
};

const mintedNft = await myNftCollection.mint(metadata);

// Party emoji:  🎉

console.log("🎉, Minted NFT successful:", mintedNft);


// Let's read some data from the NFT

const nftsMinted = await myNftCollection.getAll();

console.log("NFTs minted:", nftsMinted);

// 🎉, Minted NFT successful: 7BBUrzEGR69rhRw8mhBQPe26uzgLByDH4HZ6MjdeRcYE
