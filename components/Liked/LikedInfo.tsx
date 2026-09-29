import Link from "next/link";
import type { Product } from "../types";
import Star from "../ProductsGrid/Star";
import LikedButton from "../ProductsGrid/LikedButton";

function LikedInfo({ likedProducts }: { likedProducts: Product[] }) {

  return (
    <div className="col-span-2 flex flex-col gap-4 items-center rounded-2xl">
      <h1 className="my-4 w-full text-center text-2xl font-bold bg-(--white-colour) shadow-(--shadow) rounded-xl">
        Your liked items:
      </h1>

      <section className="grid w-full grid-cols-[repeat(auto-fit,11rem)] gap-4">
        {likedProducts.map((product) => {
          const discountPrice =
            Number(product.price) *
            (1 - Number(product.discountPercentage) / 100);
          const rating = product.reviewCount
            ? product.ratingSum / product.reviewCount
            : 0;
          return (
            <div
              key={product.id}
              className="relative h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-between gap-2 rounded-lg"
            >
              <Link
                className="flex flex-col gap-2"
                href={`/product/${product.id}`}
              >
                <img
                  className="h-36 p-2"
                  src={product.thumbnail ?? product.images[0] ?? ""}
                  alt={product.title}
                />
                <h2 className="overflow-hiden h-12 flex items-center font-bold">
                  {product.title}
                </h2>
              </Link>
              <LikedButton
                isLiked={true}
                productId={product.id}
              />
              <div className="flex w-40 items-center justify-between">
                <strong>${discountPrice.toFixed(2)}</strong>
                <span className="opacity-50 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="bg-[#c5ead9] px-1.75 py-1 text-xs font-bold text-[#176b4d]">
                  -{Number(product.discountPercentage).toFixed(0)}%
                </span>
              </div>
              <Star rating={rating} />
              <Link
                href={`/product/${product.id}`}
                className="bg-amber-500 flex justify-center"
              >
                More info
              </Link>
            </div>
          );
        })}
        
      </section>
    </div>
  );
}

export default LikedInfo;
