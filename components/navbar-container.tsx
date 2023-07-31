import { NextPage } from "next";
import Link from "next/link";
import { WalletModalProvider} from "@solana/wallet-adapter-react-ui";
//import { ThirdwebProvider, useWallet } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";

const NavbarContainer: NextPage = () => {


  return (
    <div className="w-full mx-auto my-8 flex flex-row justify-between items-center gap-3">
      <div className="text-[27.15px] text-white">
        <b>Nitro</b>
        <span className="font-light font-title-heading-4">Vest</span>
      </div>

      <ul className={`flex flex-row justify-center items-center gap-8 list-none`}>
        {[
          ["Home", "/"],
          ["Listings", "/"],
          ["Mint", "/launchapp"],
          ["Say Hello", "/"],
        ].map(([list, url], index) => (
          <li key={index}>
            <Link href={`${url}`} className="text-gray-500 no-underline">
              {list}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-row items-center justify-between gap-2 text-lg text-mediumblue-100">
          
      </div>

    </div>
  );
};

export default NavbarContainer;