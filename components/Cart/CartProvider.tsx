'use client';

import { createContext, useState, type ReactNode } from "react";

type CartContextType = {
  isOpened: boolean;
  closeCart: () => void;
  toggleCart: () => void;
};
export const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: ReactNode; }) {
  const [isOpened, setIsOpened] = useState(false)
  const closeCart = () => setIsOpened(false)
  const toggleCart = () =>setIsOpened(prev =>  !prev)
  return <CartContext.Provider
  value={
    {isOpened,
    closeCart,
    toggleCart}
  }>
    {children}
  </CartContext.Provider>
}

export default CartProvider;
