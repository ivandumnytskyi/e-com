import Link from "next/link";
import prisma from "@/lib/prisma";
import LikedButton from "./LikedButton";
import Star from "./Star";
import { auth } from "@/auth";
import searchProducts from "@/lib/search/searchProsucts";
import sortProducts from "@/lib/sort";

async function Grid({ query, sort }: { query: string; sort: string }) {
  const session = await auth();

  const [products, user] = await Promise.all([
    query
      ? searchProducts(query)
      : prisma.product.findMany({
          include: { category: { select: { name: true } } },
        }),
    session?.user?.id
      ? prisma.user.findUnique({
          where: { id: session.user.id },
          select: { likedProducts: { select: { id: true } } },
        })
      : Promise.resolve(null),
  ]);
  const likedProductIds = new Set(
    user?.likedProducts.map((product) => product.id) ?? [],
  );

  const sortedProducts = sortProducts(
    products.map((product) => ({
      ...product,
      price: Number(product.price),
      discountPercentage: Number(product.discountPercentage),
    })),
    sort,
  );
  return (
    <main className="grid grid-cols-[repeat(auto-fit,176px)] gap-4 justify-center px-2 sm:px-6">
      {sortedProducts.map((product) => {
        const discountPrice =
          Number(product.price) *
          (1 - Number(product.discountPercentage) / 100);
        const rating = product.reviewCount
          ? product.ratingSum / product.reviewCount
          : 0;
        return (
          <div
            key={product.id}
            className="relative h-86 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-between gap-2 rounded-lg"
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
              <h2 className="overflow-hidden h-12 flex items-center font-bold">
                {product.title}
              </h2>
            </Link>
            <LikedButton
              isLiked={likedProductIds.has(product.id)}
              productId={product.id}
            />
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <strong className="whitespace-nowrap">
                ${discountPrice.toFixed(2)}
              </strong>
              <span className="whitespace-nowrap opacity-50 line-through">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="whitespace-nowrap bg-[#c5ead9] px-1.75 py-1 text-xs font-bold text-[#176b4d]">
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
    </main>
  );
}

export default Grid;
