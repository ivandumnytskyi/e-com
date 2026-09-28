import Link from "next/link";
import LikedButton from "./LikedButton";
import Star from "./Star";
import type { Product } from "../types";

const response = await fetch("http://localhost:3000/api/product");

const products: Product[] = await response.json();

function Grid() {
  return (
    <main className="grid grid-cols-[repeat(auto-fit,180px)] justify-center gap-4">
      {products.map((product) => {
        const discountPrice =
          Number(product.price) *
          (1 - Number(product.discountPercentage) / 100);
        return (
          <div
            key={product.id}
            className="relative h-80 w-46 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-between gap-2 rounded-lg"
          >
            <Link className="flex flex-col gap-2" href={`/product/${product.id}` }>
              <img
                className="h-36 p-2"
                src={product.thumbnail}
                alt={product.title}
              />
              <h2 className="overflow-hiden h-12 flex items-center font-bold">{product.title}</h2>
            </Link>
            <LikedButton />
            <div className="flex w-40 items-center justify-between">
              <strong>
                ${discountPrice.toFixed(2)}
              </strong>
              <span className="opacity-50 line-through">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="bg-[#c5ead9] px-1.75 py-1 text-xs font-bold text-[#176b4d]">
                -{Number(product.discountPercentage).toFixed(0)}%
              </span>
            </div>
            <Star
              rating={Number(product.ratingSum) / Number(product.reviewCount)}
            />
            <Link
              href={`/product/${product.id}`}
              className="bg-amber-500 flex justify-center"
            >
              More info
            </Link>
          </div>
        );
      })}
    </main>
  );
}

export default Grid;
