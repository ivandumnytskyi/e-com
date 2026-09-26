import Link from "next/link";
import LikedButton from "./LikedButton";
import Star from "./Star";

const response = await fetch("http://localhost:3000/api/product");

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand?: string | null;
  sku: string;
  thumbnail: string;
  images: string[];
  ratingSum: number;
  reviewCount: number;
};
const products: Product[] = await response.json();

function Grid() {
  console.log(products[0].ratingSum, products[0].reviewCount);
console.log(
  Number(products[0].ratingSum),
  Number(products[0].reviewCount)
);
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
