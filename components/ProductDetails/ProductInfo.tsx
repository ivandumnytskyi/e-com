"use client";

import { useContext, useState } from "react";
import Star from "../ProductsGrid/Star";
import type { Product } from "../types";
import { CartContext } from "../Cart/CartProvider";

function ProductInfo({ product }: { product: Product }) {
  const cartContext = useContext(CartContext);
  const gallery = Array.from(new Set([...product.images]));
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState("1");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const discountPrice =
    Number(product.price) * (1 - Number(product.discountPercentage) / 100);
  const numericQuantity = Number(quantity);
  const isQuantityValid =
    Number.isInteger(numericQuantity) &&
    numericQuantity >= 1 &&
    numericQuantity <= product.stock;

  async function addToCart() {
    setIsAddingToCart(true);
    setCartMessage("");

    try {
      const response = await fetch(`/api/cart/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: numericQuantity }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Sign in to add items to your cart."
            : (result?.error ?? "Could not update your cart."),
        );
      }

      cartContext?.refreshCart();
      setCartMessage("Cart updated.");
    } catch (error) {
      setCartMessage(
        error instanceof Error ? error.message : "Could not update your cart.",
      );
    } finally {
      setIsAddingToCart(false);
    }
  }

  return (
    <section
      className="grid grid-cols-1 items-start gap-7 md:grid-cols-2 md:gap-10"
      aria-labelledby="product-title"
    >
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
              <img
                src={image}
                alt=""
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
        <div className="ml-4 grid min-w-0 aspect-[1/1.08] place-items-center rounded bg-(--white-colour) p-8">
          <img
            src={selectedImage}
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
      </div>

      <div className="min-w-0 pt-2 max-[760px]:pt-0">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-(--main-colour)">
          {product.brand} / {product.sku}
        </p>
        <h1
          id="product-title"
          className="m-0 max-w-140 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] max-[760px]:text-[2.4rem]"
        >
          {product.title}
        </h1>
        <div className="my-4.5 mb-6 flex items-center gap-3.5 text-[0.85rem]">
          <Star
            rating={Number(product.ratingSum) / Number(product.reviewCount)}
          />
          <span>{Number(product.reviewCount)} customer reviews</span>
        </div>
        <p className="max-w-140 leading-[1.65] opacity-80">
          {product.description}
        </p>

        <div className="my-7 mb-4.5 flex items-center gap-3">
          <strong className="text-[2rem]">${discountPrice.toFixed(2)}</strong>
          <span className="opacity-50 line-through">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="bg-[#c5ead9] px-1.75 py-1 text-xs font-bold text-[#176b4d]">
            -{Number(product.discountPercentage).toFixed(0)}%
          </span>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex h-12 items-center border border-(--text-colour)/20"
            aria-label="Quantity"
          >
            <button
              type="button"
              className="h-full w-11 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() =>
                setQuantity(String(Math.max(1, numericQuantity - 1)))
              }
              disabled={!isQuantityValid || numericQuantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={product.stock}
              step={1}
              inputMode="numeric"
              aria-label="Quantity"
              className="h-full w-14 focus: outline-none appearance-none bg-transparent text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={quantity}
              onChange={(event) => setQuantity(event.currentTarget.value)}
              onBlur={() => {
                if (product.stock < 1) {
                  setQuantity("1");
                  return;
                }

                const parsedQuantity = Number(quantity);
                const normalizedQuantity = Number.isInteger(parsedQuantity)
                  ? Math.min(product.stock, Math.max(1, parsedQuantity))
                  : 1;
                setQuantity(String(normalizedQuantity));
              }}
              disabled={product.stock < 1}
            />
            <button
              type="button"
              className="h-full w-11 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() =>
                setQuantity(
                  String(Math.min(product.stock, numericQuantity + 1)),
                )
              }
              disabled={!isQuantityValid || numericQuantity >= product.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="min-h-12 min-w-48 flex-1 cursor-pointer bg-(--main-colour) px-6 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={addToCart}
            disabled={isAddingToCart || !isQuantityValid}
          >
            {isAddingToCart
              ? "Adding..."
              : product.stock < 1
                ? "Out of stock"
                : "Add to cart"}
          </button>
        </div>
        {cartMessage && (
          <p className="mb-4 text-sm" role="status" aria-live="polite">
            {cartMessage}
          </p>
        )}

        <div className="flex items-center gap-2 border-y border-(--text-colour)/15 py-3.5 text-[0.85rem]">
          {product.stock < 1 ? (
            <>
              <span className="h-2.25 w-2.25 rounded-full bg-[#d71d1d]" />
              <strong>Out of stock</strong>
            </>
          ) : (
            <>
              <span className="h-2.25 w-2.25 rounded-full bg-[#2d9b6f]" />
              <strong>In stok: {product.stock}</strong>
            </>
          )}
          <span className="ml-auto opacity-65">
            {product.stock} units available
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
