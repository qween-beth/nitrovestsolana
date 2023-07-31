import { NextPage } from "next";
import Link from "next/link";
import { WalletModalProvider} from "@solana/wallet-adapter-react-ui";
//import { ThirdwebProvider, useWallet } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";

const NavbarContainer: NextPage = () => {


  return (
    <div className="w-full mx-auto my-8 flex flex-row justify-between items-center gap-8">
      <div className="text-[27.15px] text-white">
        <b>Nitro</b>
        <span className="font-light font-title-heading-4">Vest</span>
      </div>

      <ul className="flex flex-row justify-end items-right gap-8 list-none">
      {[
        ["Home", "/"],
        ["Listings", "/"],
        ["Mint", "/launchapp"],
        ["Say Hello", "/"],
      ].map(([list, url], index) => (
        <li key={index}>
          <Link href={url} className="text-white no-underline  hover:text-gray">
            {list}
          </Link>
        </li>
      ))}
      </ul> 


      <div className="flex flex-row items-center justify-between gap-2 text-lg text-mediumblue-100">
      <Link href="/launchapp">
          <button className="h-[50px] w-[180px] bg-mediumblue-100  items-center justify-center 
            tracking-[0.07em] font-semibold text-white rounded-3xl hover:bg-blue-500 "
          >
          Connect Wallet
          </button>
        </Link>
      </div>

    </div>
  );
};

export default NavbarContainer;