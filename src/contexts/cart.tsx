import { createContext, useContext, useState, type ReactNode } from "react";
import { DISHES, dishPrice } from "../data/dishes";

type CartContextType = {
  ids: Set<number>;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: () => number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const remove = (id: number) =>
    setIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const clear = () => setIds(new Set());

  const total = () =>
    [...ids].reduce((sum, i) => sum + (dishPrice(DISHES[i]) ?? 0), 0);

  return (
    <CartContext.Provider value={{ ids, toggle, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
