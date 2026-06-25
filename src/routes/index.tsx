import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "../contexts/transition";
import { useI18n } from "../contexts/i18n";
import splashHero from "@/assets/splash-hero.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const SERIF = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";
const GOLD = "#c9a96a";
const CREAM = "#e9dcc4";
const MUTED = "#c9b896";

function LeafLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M20 4 C 22 14, 28 20, 30 30 C 28 40, 22 44, 20 48 C 18 44, 12 40, 10 30 C 12 20, 18 14, 20 4 Z" />
      <path d="M20 6 L20 46" />
      <path d="M20 14 C 16 16, 14 20, 13 24" />
      <path d="M20 14 C 24 16, 26 20, 27 24" />
    </svg>
  );
}

function Index() {
  const navigate = useNavigate();
  const { set } = useTransitionStore();
  const { t } = useI18n();
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToChoice = () => {
    if (autoRef.current) clearTimeout(autoRef.current);
    set({ type: "theatre", origin: "50% 50%" });
    navigate({ to: "/choice" });
  };

  useEffect(() => {
    autoRef.current = setTimeout(goToChoice, 2300);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      onClick={goToChoice}
      className="min-h-screen w-full overflow-hidden text-[#e9dcc4] cursor-pointer select-none"
      style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, #1e1610 0%, #0f0b08 45%, #080604 100%)" }}
    >
      <div className="relative min-h-screen w-full flex flex-col items-center px-[26px] pt-[54px] pb-[30px] max-w-lg mx-auto">

        <LeafLogo className="w-[22px] h-[28px] text-[#c9a96a] mb-[10px]" />
        <h1 className="leading-[.95]" style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "54px", letterSpacing: ".12em", color: CREAM, margin: 0 }}>
          L&apos;AMI
        </h1>
        <div style={{ fontFamily: SERIF_SC, fontSize: "9px", letterSpacing: ".45em", color: MUTED, marginTop: "8px" }}>
          SOFITEL BÉNIN
        </div>

        <p className="text-center leading-snug uppercase" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "14px", letterSpacing: ".07em", color: CREAM, lineHeight: 1.4, margin: "24px 0 0" }}>
          {t.loading_tagline.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
        </p>

        <div className="flex items-center justify-center gap-[10px] my-[14px]">
          <span className="h-px w-[44px]" style={{ background: "rgba(201,169,106,.35)" }} />
          <span style={{ color: GOLD, fontSize: "9px" }}>✦</span>
          <span className="h-px w-[44px]" style={{ background: "rgba(201,169,106,.35)" }} />
        </div>

        <div className="w-full overflow-hidden" style={{ maxWidth: "270px", borderRadius: "8px", border: "1px solid rgba(201,169,106,.14)" }}>
          <img src={splashHero} alt="Georgiana, Cheffe de L'Ami" className="w-full h-auto block" draggable={false} />
        </div>

        <p className="italic text-center leading-relaxed" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "13px", color: "rgba(233,220,196,.9)", lineHeight: 1.5, margin: "14px 0 0", padding: "0 6px" }}>
          «&nbsp;{t.loading_quote}&nbsp;»
        </p>
        <div style={{ fontFamily: SERIF, fontSize: "11px", color: "rgba(201,169,106,.85)", marginTop: "6px" }}>
          {t.loading_author}
        </div>

        <div className="mt-auto w-full flex flex-col items-center">
          <div style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".35em", color: MUTED }}>
            {t.loading_preparing}
          </div>
          <div className="mt-[14px] w-[86%] relative" style={{ height: "8px" }}>
            <div className="absolute top-[3px] left-0 right-0 h-px" style={{ background: "#2a2018" }} />
            <div
              className="absolute top-[3px] left-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD} 30%, #f0d9a0 70%, ${GOLD})`, animation: "lamLoadOnce 2.2s ease forwards" }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ right: "-4px", background: "#f0e4cc", boxShadow: `0 0 6px ${GOLD}, 0 0 14px rgba(201,169,106,.5)` }} />
            </div>
          </div>
          <div style={{ fontFamily: SERIF_SC, fontSize: "7.5px", letterSpacing: ".3em", color: "rgba(201,169,106,.55)", marginTop: "16px" }}>
            {t.loading_touch}
          </div>
        </div>
      </div>
    </main>
  );
}
