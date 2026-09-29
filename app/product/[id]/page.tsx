import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const record = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { name: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, image: true } },
        },
      },
    },
  });

  if (!record) notFound();

  const product = {
    ...record,
    price: Number(record.price),
    discountPercentage: Number(record.discountPercentage),
    reviews: record.reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    })),
  };

  return (
    <ProductDetails product={product} />
  );
}

export default ProductPage;
