import ProductDetails from "@/components/ProductDetails/ProductDetails";


async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/product/${id}`)
  const product = await res.json()

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}

export default page;
