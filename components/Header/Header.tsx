import Togle from "./Togle";
import Search from "./Search";
import Filter from "./Filter";
import Link from "next/link";
import CartButton from "./CartButton";

function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-14 bg-(--main-colour) ">
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
            <Link href="/profile">
              <img
                src="/profile.svg"
                alt="profile"
                className="h-8 rounded-full"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
