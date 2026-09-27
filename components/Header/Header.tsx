import Togle from "./Togle";
import Search from "./Search";
import Filter from "./Filter";
import Link from "next/link";
import CartButton from "./CartButton";
import { auth } from "@/auth";


async function Header() {
  const session = await auth();
  console.log(session?.user)
  
  return (
    <header className="sticky mb-6 w-screen flex items-center justify-between px-4 h-14 bg-(--main-colour) top-0 z-50">
      <Link href="/" className="flex gap-2 items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <span>E-com</span>
      </Link>
      <Search />
      <Togle />
      <Filter />
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <CartButton />
          </li>
          <li>
            {session? <Link href="/profile">
              <img
                src="/profile.svg"
                alt="profile"
                className="h-8 rounded-full" 
              />
            </Link> : <Link href={'/auth/signin'}> LogIn </Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
