import {ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "./privateKey.mjs";
import { readFileSync } from "fs";

const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

// 1. Create NFT Collection
const nftCollection = await sdk.deployer.createNftCollection({
    name: "Real Estate NFTs",
    description: "A collection of real estate NFTs",
});

console.log("NFT Collection:", nftCollection);

// 2. Create Listing
const createListing = async (propertyAddress, price, image, type) => {
    const metadata = {
        propertyAddress,
        price,
        image,
        type,
    };

    const listing = await sdk.nft.createNft({
        collection: nftCollection,
        metadata,
    });

    console.log("Listing created:", listing);
};

// 3. Mint Listing
const mintListing = async (tokenId) => {
    const mintedListing = await sdk.nft.mintNft({
        collection: nftCollection,
        tokenId,
    });

    console.log("Listing minted:", mintedListing);
};

// 4. Receive Tokens
const receiveTokens = async () => {
    const tokens = await sdk.nft.getMyTokens(nftCollection);
    console.log("My Tokens:", tokens);
};

// 5. Approve Listing
const approveListing = async (tokenId) => {
    const approvedListing = await sdk.nft.approveNft({
        collection: nftCollection,
        tokenId,
    });

    console.log("Listing approved:", approvedListing);
};

// Example usage
//createListing("123 Main St", 1000000, "./stemgirl.JPG", "Residential");
//mintListing(1);
//receiveTokens();
//approveListing(1);



//8S2ja6ziCw75Wr7MWnofiDv1APjPs7Lgvr5LE3sAkp1b