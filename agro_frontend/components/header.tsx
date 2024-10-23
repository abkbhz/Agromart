import { SearchBar } from "@/components/searchBar";
import logo from "@/public/logo.svg";
import Image from "next/image";
import ShoppingCartButton from "@/components/cartButton";

export default function Header() {
  return (
    <div className="px-2 py-2 sm:px-3 md:px-4 lg:px-6 xl:px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex-1 flex justify-start">
        <Image src={logo} alt="Logo" width={170} />
      </div>
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>
      <div className="flex-1 flex justify-end">
        <ShoppingCartButton />
      </div>
    </div>
  );
}
