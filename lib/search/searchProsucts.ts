import prisma from "@/lib/prisma";
import tokenizeQuery from "./tokenize";
import expandTokens from "./expendTokens";
import scoreProduct from "./scoredProduct";
import type { Product } from "@/components/types";

async function searchProducts(query: string): Promise<Product[]> {
  const tokens = tokenizeQuery(query);
  const expandedTokens = expandTokens(tokens);

  if (expandedTokens.length === 0) return [];

  const res = await prisma.product.findMany({
    where: {
      AND: expandedTokens.map((terms) => ({
        OR: terms.flatMap((term) => [
          { title: { contains: term, mode: "insensitive" as const } },
          { description: { contains: term, mode: "insensitive" as const } },
          { brand: { contains: term, mode: "insensitive" as const } },
          {
            category: {
              is: {
                name: { contains: term, mode: "insensitive" as const },
              },
            },
          },
        ]),
      })),
    },
    include: { category: { select: { name: true } } },
  });

  const products = res.map((product) => ({
    ...product,
    price: Number(product.price),
    discountPercentage: Number(product.discountPercentage),
  }));

  const scoredProducts = products.map(product => (
    {
      product : {
        ...product
      },
      score: scoreProduct(product, query, expandedTokens)
    }
  )).sort((a, b) => b.score - a.score)
  .map(({product}) => product)
  return scoredProducts
}

export default searchProducts;