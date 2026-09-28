'use client';

import { createContext, useState, type ReactNode } from "react";

type CartContextType = {
  isOpened: boolean;
  closeCart: () => void;
  toggleCart: () => void;
  cartRevision: number;
  refreshCart: () => void;
};
export const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: ReactNode; }) {
  const [isOpened, setIsOpened] = useState(false);
  const [cartRevision, setCartRevision] = useState(0);
  const closeCart = () => setIsOpened(false)
  const toggleCart = () =>setIsOpened(prev =>  !prev)
  const refreshCart = () => setCartRevision((revision) => revision + 1);
  return <CartContext.Provider
  value={
    {isOpened,
    closeCart,
    toggleCart,
    cartRevision,
    refreshCart}
  }>
    {children}
  </CartContext.Provider>
}

export default CartProvider;
