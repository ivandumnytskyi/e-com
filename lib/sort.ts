import type { Product } from "@/components/types";

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => Number(a.price) - Number(b.price));

    case "price-desc":
      return sorted.sort((a, b) => Number(b.price) - Number(a.price));

    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    case "rating":
      return sorted.sort((a, b) => {
        const ratingA = a.reviewCount ? a.ratingSum / a.reviewCount : 0;
        const ratingB = b.reviewCount ? b.ratingSum / b.reviewCount : 0;
        return ratingB - ratingA;
      });

    default:
      return sorted;
  }
}

export default sortProducts