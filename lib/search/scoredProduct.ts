import type { Product } from "@/components/types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function scoreProduct(
  product: Product,
  query: string,
  tokenGroups: string[][],
): number {
  const title = normalizeText(product.title);
  const brand = normalizeText(product.brand);
  const category = normalizeText(product.category?.name);
  const description = normalizeText(product.description);
  const normalizedQuery = normalizeText(query);

  let score = 0;

  if (title === normalizedQuery) score += 1000;
  else if (title.startsWith(normalizedQuery)) score += 500;

  for (const terms of tokenGroups) {
    if (terms.some((term) => title.includes(normalizeText(term)))) {
      score += 40;
    } else if (terms.some((term) => brand.includes(normalizeText(term)))) {
      score += 20;
    } else if (terms.some((term) => category.includes(normalizeText(term)))) {
      score += 10;
    } else if (
      terms.some((term) => description.includes(normalizeText(term)))
    ) {
      score += 2;
    }
  }

  return score;
}

export default scoreProduct