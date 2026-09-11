import productData from "@/data/data";
import Header from "@/components/Header/Header";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (Number(id) !== productData.id) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductDetails product={productData} />
    </>
  );
}

export default page;
