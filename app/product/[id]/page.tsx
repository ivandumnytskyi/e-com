import productData from "@/data/data";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (Number(id) !== productData.id) {
    notFound();
  }

  return (
    <>
      <ProductDetails product={productData} />
    </>
  );
}

export default page;
