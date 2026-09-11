'use client'
import { useState } from "react";

function Filter() {
  const [isOpened, setIsOpened] = useState(false);
  const options = ['Price: Low to High', 'Price: High to low', 'Newest', 'Best Rate']
  return (
    <div className="relative w-40"
    onBlur={(e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpened(false);
    }
  }}>
    <button
      className="flex items-center w-full h-8 gap-2 px-4 py-1 bg-(--white-colour) cursor-pointer"
      type="button"
      onClick={()=>isOpened ? setIsOpened(false) : setIsOpened(true)}
      
    >
      Filter
      <img src="/filter.svg" alt="Filter" className="h-4" />
    </button>
    {isOpened && (
        <div className="absolute top-6.5 left-0 mt-2 w-full rounded-b-lg  bg-(--white-colour) shadow-lg h-40 overflow-auto">
          <ul>
            {options.map((option, index )=> <li key={index} className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer">
              {option}
            </li>)}
          </ul>
        </div>
      )}
    </div>
    
  );
}

export default Filter;
