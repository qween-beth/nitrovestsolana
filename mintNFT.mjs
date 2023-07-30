import {ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "./privateKey.mjs";
import { readFileSync } from "fs";

const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const myNftCollection = await sdk.getNFTCollection(
    "6ibU4ee35ZqWaoiiSFtMiSHuaegW5Cdf1FV5AeHCDTym"
);


const metadata = {
    name: "My Awesome NFT",
    description: "My Awesome NFT Description",
    image: readFileSync('./stemgirl.JPG'),
};

const mintedNft = await myNftCollection.mint(metadata);

// Party emoji:  🎉

console.log("🎉, Minted NFT successful:", mintedNft);


// Let's read some data from the NFT

const nftsMinted = await myNftCollection.getAll();

console.log("NFTs minted:", nftsMinted);

// 🎉, Minted NFT successful: E8csAYqLTaQ48G72nrSk6kFDgnf5Y45MuuWymoUqZomY
