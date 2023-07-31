import {ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "./privateKey.mjs";


const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const nftCollection = await sdk.deployer.createNftCollection({
    name: "Nitrovest",
    description: "Real Estate Minting Dapp",
    symbol: "NTVEST",
    sellerFeeBasisPoints: 250,
    isMutable: true,
    maxNumberOfMetadata: 10,
    isDisabled: false,
    royaltyPayments: [
        {
            address: "AUTb8mpmV9ZEYrXMkAB15fsH43EbF6XsUFy5ab6PMJZ3",
            basisPoints: 100,
        },
    ],
})

console.log(nftCollection);

//F1myk1urfXpwknwoR5sFaTj5BKQ2Gmtxd6gEM3iTDA8n
