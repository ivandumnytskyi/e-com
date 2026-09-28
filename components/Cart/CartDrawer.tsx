"use client";

import { useContext } from "react";
import { CartContext } from "./CartProvider";
import { useState, useEffect } from "react";
import type { Product } from "../types";

type CartItem = {
  cartId: string;
  id: string;
  product: Product;
  productId: string;
  quantity: number;
};

export default function CartDrawer() {
  const [cart, setCart] = useState<{ id?: string; items: CartItem[] }>({
    items: [],
  });
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null,
  );
  const [cartError, setCartError] = useState("");

  console.log(cart);
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartDrawer must be used inside CartProvider");
  }

  const { isOpened, closeCart, cartRevision, refreshCart } = context;

  async function removeFromCart(productId: string) {
    setDeletingProductId(productId);
    setCartError("");

    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "Could not remove this item.");
      }

      setCart((currentCart) => ({
        ...currentCart,
        items: currentCart.items.filter((item) => item.productId !== productId),
      }));
      refreshCart();
    } catch (error) {
      setCartError(
        error instanceof Error ? error.message : "Could not remove this item.",
      );
    } finally {
      setDeletingProductId(null);
    }
  }

  async function clearCart() {
    setCartError("");
    try {
      const response = await fetch(`/api/cart`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "Could not remove this item.");
      }

      setCart(() => ({
        items: []
      }));
      refreshCart();
    }catch (error) {
      setCartError(
        error instanceof Error ? error.message : "Could not remove items from cart.",
      );
    }
  }

  useEffect(() => {
    if (!isOpened) return;

    async function getCart() {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (!res.ok) return;

      const data = await res.json();

      setCart(data);
    }

    getCart();
  }, [isOpened, cartRevision]);

  let totalprice = 0;
  cart.items.map(
    (item) =>
      (totalprice +=
        item.quantity *
        (Number(item.product.price) *
          (1 - Number(item.product.discountPercentage) / 100))),
  );

  return (
    <>
      <div
        onClick={closeCart}
        className={`bg-black/60 inset-0 fixed 
          transition-opacity duration-300 z-60
          ${isOpened ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-(--background)
          transition-transform duration-300 z-60 flex flex-col gap-2 items-center p-4
          ${isOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        <p className="text-gray-500 text-xs">your cart id: {cart.id ?? ""}</p>
        <p className="text-[1.1rem]">total = {totalprice.toFixed(2)}$</p>
        <h1 className="text-xl">Your cart:</h1>

        {cartError && (
          <p className="text-sm text-red-700" role="alert">
            {cartError}
          </p>
        )}
        <section className="flex flex-col border-2 rounded-xl border-(--main-colour)">
          {cart.items && cart.items.length > 0 ? (
            <>
              {cart.items.map((item, index) => {
                const product = item.product;
                return (
                  <div
                    key={item.productId}
                    className={`flex w-90 h-22 items-center px-4 ${index === cart.items.length - 1 ? "" : "border-b-2 border-(--main-colour)"}`}
                  >
                    <img src={product.thumbnail} className="h-20"></img>
                    <div className="flex flex-col gap-2 flex-1">
                      <h2 className="max-w-50">{product.title}</h2>
                      <span className="text-xs text-gray-500">
                        quantity: {item.quantity}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="flex justify-center items-center bg-(--main-colour) w-8 h-8 hover:cursor-pointer disabled:cursor-wait disabled:opacity-50"
                      onClick={() => removeFromCart(item.productId)}
                      disabled={deletingProductId === item.productId}
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-2xl font-bold p-4">No items</p>
          )}
        </section>
        <div className="absolute bottom-2 flex gap-2 w-full px-2">
            <button onClick={() => clearCart()} className="border-3 border-(--main-colour) flex-1">
              Clear cart
            </button>
            <button className="bg-(--main-colour) flex-1"> Order </button>
        </div>
      </div>
    </>
  );
}
