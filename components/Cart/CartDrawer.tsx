"use client";

import { useContext } from "react";
import { CartContext } from "./CartProvider";

export default function CartDrawer() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartDrawer must be used inside CartProvider");
  }

  const { isOpened, closeCart } = context;

  return (
    <>
      <div
        onClick={closeCart}
        className={`bg-black/60 inset-0 fixed 
          transition-opacity duration-300 
          ${isOpened ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-(--background)
          transition-transform duration-300
          ${isOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2>Your Cart</h2>
      </div>
    </>
  );
}
