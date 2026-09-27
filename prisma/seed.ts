import prisma from "@/lib/prisma";
import { Prisma } from "../app/generated/prisma/client";

type DummyReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand?: string | null;
  sku: string;
  thumbnail: string;
  images: string[];
  reviews: DummyReview[];
};



async function main() {
  const response = await fetch("https://dummyjson.com/products?limit=0");
  const data = await response.json();

  const products: DummyProduct[] = data.products;

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

for (const product of products) {
  const category = await prisma.category.findUnique({
    where: { name: product.category },
  });

  if (!category) continue;

  const dbProduct = await prisma.product.upsert({
    where: {
      sku: product.sku,
    },
    update: {},
    create: {
      sku: product.sku,
      title: product.title,
      description: product.description,
      price: new Prisma.Decimal(product.price),
      stock: product.stock,
      discountPercentage: product.discountPercentage,
      brand: product.brand,
      thumbnail: product.thumbnail,
      images: product.images,
      categoryId: category.id,
    },
  });

  for (const review of product.reviews) {
    const user = await prisma.user.upsert({
      where: {
        email: review.reviewerEmail,
      },
      update: {},
      create: {
        name: review.reviewerName,
        email: review.reviewerEmail,
      },
    });

    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: dbProduct.id,
        },
      },
      update: {
        rating: review.rating,
        comment: review.comment,
      },
      create: {
        rating: review.rating,
        comment: review.comment,
        userId: user.id,
        productId: dbProduct.id,
        createdAt: new Date(review.date),
      },
    });
  }
}


  console.log(
    `Seeded ${categories.length} categories and ${products.length} products.`,
  );


}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });