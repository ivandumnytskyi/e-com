import Grid from "@/components/ProductsGrid/ProductsGrid";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  
  const { q,sort } = await searchParams;
  const query = Array.isArray(q) ? q[0] ?? "" : q ?? "";
  const sortOption = Array.isArray(sort) ? sort[0] ?? "" : sort ?? ""

  return <Grid query={query} sort={sortOption}/>;
}
