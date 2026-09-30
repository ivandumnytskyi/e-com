"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const options = [
    { text: "Default order", option: "" },
    { text: "Price: Low to High", option: "price-asc" },
    { text: "Price: High to low", option: "price-desc" },
    { text: "Newest", option: "newest" },
    { text: "Best Rate", option: "rating" },
  ];
  const selectedOption = options.find(
    (option) => option.option === searchParams.get("sort"),
  ) ?? options[0];

  function useSort(option: { text: string; option: string }) {
    const params = new URLSearchParams(searchParams.toString());
    if (option.option) {
      params.set("sort", option.option);
    } else {
      params.delete("sort");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
    setIsOpened(false);
  }

  return (
    <div
      className="relative w-46.5 max-h-8 px-4 py-1 bg-(--white-colour)"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpened(false);
        }
      }}
    >
      <button
        className="flex justify-center w-full max-h-8  gap-2  sm:items-center cursor-pointer overflow-hidden"
        type="button"
        onClick={() => (isOpened ? setIsOpened(false) : setIsOpened(true))}
      >
        <p className="max-h-7 overflow-hidden">{selectedOption?.text ?? "Filter"}</p>
        <img src="/filter.svg" alt="Filter" className="h-4 self-center" />
      </button>
      {isOpened && (
        <div className="absolute top-6.5 left-0 mt-2 w-full rounded-b-lg  bg-(--white-colour) shadow-lg h-40 overflow-auto z-100">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="hover:bg-(--hover-colour) cursor-pointer"
              >
                <button type="button" className="w-full px-4 py-2" onClick={() => useSort(option)}>
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Filter;
