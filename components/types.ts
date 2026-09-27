export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

export type Product = {
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
  ratingSum: number;
  reviewCount: number;
};