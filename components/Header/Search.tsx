"use client";
import { useState } from "react";

function Search() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <form
      action=""
      className={`bg-(--white-colour) flex-1 max-w-180 flex ${isOpened ? "rounded-t-2xl" : "rounded-2xl"} relative`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpened(false);
        }
      }}
    >
      <input
        onFocus={() => setIsOpened(true)}
        type="search"
        name="search"
        placeholder="I'm searching for..."
        className="flex-1 max-h-9 px-4 focus:outline-none rounded-l-full transition-all duration-300"
      />

      {isOpened && (
        <div className="absolute top-6.5 left-0 mt-2 w-full rounded-b-lg  bg-(--white-colour) shadow-lg h-40 z-50">
          <ul>
            <li className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer">
              <a href="#">Product 1</a>
            </li>
            <li className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer">
              <a href="#">Product 2</a>
            </li>
            <li className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer">
              <a href="#">Product 3</a>
            </li>
          </ul>
        </div>
      )}
      <button
        className="flex items-center gap-2 px-2 py-1 border-l-2 border-black border-solid cursor-pointer"
        type="submit"
      >
        Search
        <img src="/search.svg" alt="Search" className="h-4" />
      </button>
    </form>
  );
}

export default Search;
