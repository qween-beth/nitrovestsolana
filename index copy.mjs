import {ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "./privateKey.mjs";


const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const nftCollection = await sdk.deployer.createNftCollection({
    name: "My NFT Collection",
    description: "A collection of my NFTs",
})

console.log(nftCollection);

//6ibU4ee35ZqWaoiiSFtMiSHuaegW5Cdf1FV5AeHCDTym
