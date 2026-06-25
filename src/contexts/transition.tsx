import { createContext, useContext, useRef, type ReactNode } from "react";

export type TransitionType = "theatre" | "grow" | "iris" | "iris-close" | "back" | null;

export type TransitionState = {
  type: TransitionType;
  origin: string;
};

type TransitionContextType = {
  set: (t: TransitionState) => void;
  get: () => TransitionState;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const store = useRef<TransitionState>({ type: null, origin: "50% 50%" });

  const set = (t: TransitionState) => {
    store.current = t;
  };
  const get = () => store.current;

  return (
    <TransitionContext.Provider value={{ set, get }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionStore() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransitionStore must be inside TransitionProvider");
  return ctx;
}

export function originFrom(e: React.MouseEvent): string {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = (((rect.left + rect.width / 2) / window.innerWidth) * 100).toFixed(1);
  const y = (((rect.top + rect.height / 2) / window.innerHeight) * 100).toFixed(1);
  return `${x}% ${y}%`;
}

export function originFromEl(el: HTMLElement): string {
  const rect = el.getBoundingClientRect();
  const x = (((rect.left + rect.width / 2) / window.innerWidth) * 100).toFixed(1);
  const y = (((rect.top + rect.height / 2) / window.innerHeight) * 100).toFixed(1);
  return `${x}% ${y}%`;
}
