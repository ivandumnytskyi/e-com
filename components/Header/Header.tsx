import Togle from "./Togle";
import Search from "./Search";
import Filter from "./Filter";
import Link from "next/link";
import CartButton from "./CartButton";
import { auth } from "@/auth";

async function Header() {
  const session = await auth();
  

  return (
    <header className="sticky mb-6 w-screen px-4 py-2 bg-(--main-colour)  top-0 z-50">
      <div className="flex items-center justify-between w-full gap-4">
        <Link href="/" className="flex gap-2 items-center">
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <span className="hidden sm:block">E-com</span>
        </Link>
        <div className="hidden flex-1 max-w-180 md:block">
          <Search />
        </div>
        <Togle />
        <Filter />
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <CartButton />
            </li>
            <li>
              {session ? (
                <Link href="/profile">
                  <img
                    src="/profile.svg"
                    alt="profile"
                    className="h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link href={"/auth/signin"}> LogIn </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-2 md:hidden">
        <Search />
      </div>
    </header>
  );
}

export default Header;
