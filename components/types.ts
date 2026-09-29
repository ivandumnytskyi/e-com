import type { Decimal } from "@prisma/client/runtime/client";

export type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string | null; image: string | null };
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category?: { name: string };
  price: number | string;
  discountPercentage: number | string;
  stock: number;
  brand?: string | null;
  sku: string;
  thumbnail: string | null;
  images: string[];
  ratingSum: number;
  reviewCount: number;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: Decimal;
  product: {
    thumbnail: string | null;
    title: string;
  };
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  total: Decimal;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};