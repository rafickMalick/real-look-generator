import { useEffect, useRef, type ReactNode } from "react";
import { useTransitionStore } from "../contexts/transition";

const EASE = "cubic-bezier(.4,.02,.18,1)";

const ANIM: Record<string, { name: string; dur: string }> = {
  theatre:      { name: "enterTheatre", dur: "1.5s" },
  grow:         { name: "enterGrow",    dur: "1.05s" },
  back:         { name: "enterBehind",  dur: "0.82s" },
  iris:         { name: "irisOpen",     dur: "1.35s" },
  "iris-close": { name: "softIn",       dur: "0.5s" },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const { get, set } = useTransitionStore();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { type, origin } = get();
    if (!type || !divRef.current) return;

    const anim = ANIM[type];
    if (!anim) return;

    const el = divRef.current;
    el.style.transformOrigin = origin;
    if (type === "iris") {
      const [ox, oy] = origin.split(" ");
      el.style.setProperty("--ox", ox);
      el.style.setProperty("--oy", oy);
      el.style.zIndex = "100";
    }
    el.style.animation = `${anim.name} ${anim.dur} ${EASE} both`;

    const cleanup = () => {
      el.style.animation = "";
      el.style.transformOrigin = "";
      el.style.zIndex = "";
      set({ type: null, origin: "50% 50%" });
    };
    el.addEventListener("animationend", cleanup, { once: true });
    return () => el.removeEventListener("animationend", cleanup);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={divRef} className="lam-page">
      {children}
    </div>
  );
}
