"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import type { Product } from "../types";

async function fetchSearchResults(
  query: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`/api/search?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  const data: { products: Product[] } = await response.json();
  return data.products;
}

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState(false);
  const [text, setText] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname === "/") return;

    setText("");
    setResults([]);
    setIsOpened(false);
  }, [pathname]);

  useEffect(() => {
    const query = text.trim();
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetchSearchResults(query, controller.signal)
        .then(setResults)
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError")) {
            console.error(error);
          }
        });
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [text]);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = text.trim();

    if (!query) return;

    setIsOpened(false);
    inputRef.current?.blur();
    router.push(`/?q=${encodeURIComponent(query)}`);
  }

  function selectProduct(title: string) {
    setText(title);
    setIsOpened(false);
    inputRef.current?.blur();
    router.push(`/?q=${encodeURIComponent(title)}`);
  }

  return (
    <form
      action=""
      className={`bg-(--white-colour) flex-1 max-w-180 flex ${isOpened ? "rounded-t-2xl" : "rounded-2xl"} relative`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpened(false);
        }
      }}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        onFocus={() => setIsOpened(true)}
        type="search"
        name="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I'm searching for..."
        className="flex-1 max-h-9 px-4 focus:outline-none rounded-l-full transition-all duration-300"
      />

      {isOpened && (
        <div className="absolute top-6.5 left-0 mt-2 w-full rounded-b-lg  bg-(--white-colour) shadow-lg max-h-40 z-50 overflow-scroll">
          <ul>
            {results.slice(0, 5).map((product) => (
              <li className="px-4 py-2 hover:bg-(--hover-colour) cursor-pointer" key={product.id}>
                <button type="button" onClick={() => selectProduct(product.title)}>
                  {product.title}
                </button>
              </li>
            ))}
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
