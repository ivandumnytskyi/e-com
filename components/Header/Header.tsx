import Togle from "./Togle"
import Search from "./Search"
import Filter from "./Filter"

function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-14 bg-orange-400">
      <a href="" className="flex gap-2 items-center">
        <img src="/logo.svg" alt="Logo" className="h-8"/>
        <span>E-com</span>
      </a>
      <Search />
      <Togle />
      <Filter />
      <nav>
        <ul className="flex items-center gap-4">
          <li><a href=""><img src="/cart.svg" alt="Cart" className="h-8"/></a></li>
          <li><a href=""><img src="/profile.svg" alt="profile" className="h-8 rounded-full"/></a></li>
          
        </ul>
      </nav>
    </header>
  )
}

export default Header