"use client";

import { useState } from "react";
import Star from "../ProductsGrid/Star";
import type { Product } from "./types";

function ProductInfo({ product }: { product: Product }) {
  const gallery = Array.from(new Set([product.thumbnail, ...product.images]));
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const discountPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <section className="grid grid-cols-1 items-start gap-7 md:grid-cols-2 md:gap-10" aria-labelledby="product-title">
      <div className="grid min-w-0 grid-cols-[82px_minmax(0,1fr)] gap-0">
        <div className="flex flex-col gap-3" aria-label="Product images">
          {gallery.map((image, index) => (
            <button
              type="button"
              className={`aspect-square cursor-pointer rounded border bg-(--white-colour) ${selectedImage === image ? "border-(--main-colour) shadow-(--shadow)" : "border-transparent"}`}
              key={image}
              onClick={() => setSelectedImage(image)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={selectedImage === image}
            >
              <img src={image} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
        <div className="ml-4 grid min-w-0 aspect-[1/1.08] place-items-center rounded bg-(--white-colour) p-8">
          <img src={selectedImage} alt={product.title} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
        </div>
      </div>

      <div className="min-w-0 pt-2 max-[760px]:pt-0">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-(--main-colour)">{product.brand} / {product.sku}</p>
        <h1 id="product-title" className="m-0 max-w-140 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] max-[760px]:text-[2.4rem]">{product.title}</h1>
        <div className="my-4.5 mb-6 flex items-center gap-3.5 text-[0.85rem]">
          <Star rating={product.rating} />
          <span>{product.reviews.length} customer reviews</span>
        </div>
        <p className="max-w-140 leading-[1.65] opacity-80">{product.description}</p>

        <div className="my-7 mb-4.5 flex items-center gap-3">
          <strong className="text-[2rem]">${discountPrice.toFixed(2)}</strong>
          <span className="opacity-50 line-through">${product.price.toFixed(2)}</span>
          <span className="bg-[#c5ead9] px-1.75 py-1 text-xs font-bold text-[#176b4d]">-{product.discountPercentage.toFixed(0)}%</span>
        </div>

        <div className="flex items-center gap-2 border-y border-(--text-colour)/15 py-3.5 text-[0.85rem]">
          <span className="h-2.25 w-2.25 rounded-full bg-[#2d9b6f]" />
          <strong>{product.availabilityStatus}</strong>
          <span className="ml-auto opacity-65">{product.stock} units available</span>
        </div>

        <dl className="mt-5">
          <div className="grid grid-cols-[90px_1fr] gap-4 py-2.5 text-[0.85rem]"><dt className="font-bold">Shipping</dt><dd className="m-0 opacity-70">{product.shippingInformation}</dd></div>
          <div className="grid grid-cols-[90px_1fr] gap-4 py-2.5 text-[0.85rem]"><dt className="font-bold">Warranty</dt><dd className="m-0 opacity-70">{product.warrantyInformation}</dd></div>
          <div className="grid grid-cols-[90px_1fr] gap-4 py-2.5 text-[0.85rem]"><dt className="font-bold">Returns</dt><dd className="m-0 opacity-70">{product.returnPolicy ?? "See store policy"}</dd></div>
        </dl>
      </div>
    </section>
  );
}

export default ProductInfo;