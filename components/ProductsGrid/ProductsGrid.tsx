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
        return (
          <div key={product.id} className="relative h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-between gap-2 rounded-lg">
            <Link href={`/product/${product.id}`}>
              <img
                className="h-36"
                src={product.thumbnail}
                alt={product.title}
              />
              <h2>{product.title}</h2>
            </Link>
            <LikedButton />
            <p>${product.price}</p>
            <Star rating={Number(product.ratingSum)/Number(product.reviewCount)} />
            <button className="bg-amber-500">Add to Cart</button>
          </div>
        );
      })}
    </main>
  );
}

export default Grid;
