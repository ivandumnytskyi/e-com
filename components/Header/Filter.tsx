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
      className="relative w-48"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpened(false);
        }
      }}
    >
      <button
        className="flex justify-center items-center w-full h-8 gap-2 px-4 py-1 bg-(--white-colour) cursor-pointer overflow-hidden"
        type="button"
        onClick={() => (isOpened ? setIsOpened(false) : setIsOpened(true))}
      >
        <p>{selectedOption?.text ?? "Filter"}</p>
        <img src="/filter.svg" alt="Filter" className="h-4" />
      </button>
      {isOpened && (
        <div className="absolute top-6.5 left-0 mt-2 w-full rounded-b-lg  bg-(--white-colour) shadow-lg h-40 overflow-auto">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer"
              >
                <button type="button" onClick={() => useSort(option)}>
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
