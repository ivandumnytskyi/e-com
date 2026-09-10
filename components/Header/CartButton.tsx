'use client'

import { useContext } from "react";
import { CartContext } from "../Cart/CartProvider"

function CartButton() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("CartDrawer must be used inside CartProvider");
  }

  const { toggleCart } = context
  return (
    <button onClick={toggleCart}>
      <img src="/cart.svg" alt="Cart" className="h-8" />
    </button>
  )
}

export default CartButton