import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { useTransitionStore, originFrom, originFromEl } from "../contexts/transition";
import { useI18n } from "../contexts/i18n";
import dishActe1 from "@/assets/dish-acte1.jpg";
import dishAgneau from "@/assets/dish-agneau.jpg";
import dishCarpaccio from "@/assets/dish-carpaccio.jpg";

export const Route = createFileRoute("/menus")({
  component: MenusPage,
  head: () => ({
    meta: [
      { title: "L'Ami — Nos Menus" },
      { name: "description", content: "Choisissez votre destination gastronomique." },
    ],
  }),
});

const SERIF = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";
const GOLD = "#c9a96a";
const CREAM = "#e9dcc4";
const MUTED = "#c9b896";

const MENU_IMAGES = [dishActe1, dishAgneau, dishCarpaccio];
const MENU_PRICES = ["100", "150", "120"];

function MenusPage() {
  const { set } = useTransitionStore();
  const navigate = useNavigate();
  const { t } = useI18n();
  const pageRef = useRef<HTMLElement>(null);

  const handleBack = (e: React.MouseEvent) => {
    set({ type: "back", origin: originFrom(e) });
    navigate({ to: "/choice" });
  };

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const img = e.currentTarget.querySelector("img");
    const origin = img ? originFromEl(img) : originFrom(e);

    // Clone la page actuelle comme fond visible pendant l'ouverture de l'iris
    if (pageRef.current) {
      const clone = pageRef.current.cloneNode(true) as HTMLElement;
      Object.assign(clone.style, {
        position: "fixed",
        inset: "0",
        zIndex: "50",
        pointerEvents: "none",
        overflow: "hidden",
        animation: "lamBlurOut 1.35s cubic-bezier(.4,.02,.18,1) both",
      });
      document.body.appendChild(clone);
      setTimeout(() => clone.remove(), 1400);
    }

    set({ type: "iris", origin });
    navigate({ to: "/experience" });
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen w-full flex flex-col"
      style={{ background: "radial-gradient(120% 60% at 50% 0%, rgba(201,169,106,.10), transparent 60%), #0c0907", color: CREAM }}
    >
      {/* Header */}
      <div className="relative flex items-center px-[18px] pt-[46px] flex-shrink-0">
        <button
          type="button"
          onClick={handleBack}
          className="relative z-10 w-[34px] h-[34px] rounded-full border flex items-center justify-center transition hover:bg-[#c9a96a]/14"
          style={{ borderColor: `${GOLD}72`, color: GOLD }}
          aria-label={t.back}
        >
          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L 9 12 L 15 18" />
          </svg>
        </button>
        <div className="absolute inset-x-0 flex flex-col items-center pointer-events-none">
          <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "26px", letterSpacing: ".16em", color: GOLD, lineHeight: 1 }}>L&apos;AMI</span>
          <span style={{ fontFamily: SERIF_SC, fontSize: "7px", letterSpacing: ".42em", color: MUTED }}>SOFITEL BÉNIN</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-[22px] px-[30px] flex-shrink-0">
        <div style={{ fontFamily: SERIF_SC, fontSize: "9px", letterSpacing: ".34em", color: `${GOLD}D9` }}>{t.menu_surtitle}</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "38px", color: CREAM, letterSpacing: ".02em", margin: "8px 0 0" }}>{t.menu_title}</h2>
        <p style={{ fontFamily: SERIF, fontWeight: 300, fontStyle: "italic", fontSize: "14.5px", color: `${CREAM}99`, margin: "6px 0 0" }}>{t.menu_subtitle}</p>
        <div className="flex items-center justify-center gap-[10px] mt-[14px]">
          <span className="h-px w-10" style={{ background: `${GOLD}80` }} />
          <span style={{ color: GOLD, fontSize: "9px" }}>✦</span>
          <span className="h-px w-10" style={{ background: `${GOLD}80` }} />
        </div>
      </div>

      {/* Menu list */}
      <div className="mt-3 flex flex-col flex-1 overflow-y-auto min-h-0">
        {t.menus.map((m, i) => (
          <button
            key={m.name}
            type="button"
            onClick={handleMenu}
            className="flex items-center gap-[15px] px-6 py-[15px] border-t text-left transition"
            style={{ borderColor: `${GOLD}21`, background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,169,106,.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: `${GOLD}4D` }}>
              <img src={MENU_IMAGES[i]} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "19px", letterSpacing: ".05em", color: CREAM }}>{m.name}</div>
              <div style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".28em", color: GOLD, marginTop: "2px" }}>{m.steps}</div>
              <div style={{ fontFamily: SERIF, fontWeight: 300, fontStyle: "italic", fontSize: "12.5px", color: `${CREAM}94`, marginTop: "3px" }}>{m.desc}</div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end mr-1">
              <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "22px", lineHeight: 1, color: GOLD }}>{MENU_PRICES[i]}</span>
              <span style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".2em", color: MUTED, marginTop: "1px" }}>EUR</span>
            </div>
            <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        ))}
      </div>

      {/* Bottom quote */}
      <div className="px-[30px] pb-[28px] pt-[16px] text-center flex-shrink-0">
        <p style={{ fontFamily: SERIF, fontWeight: 300, fontStyle: "italic", fontSize: "14px", color: `${CREAM}9E`, lineHeight: 1.5, margin: 0 }}>
          {t.menu_quote.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
        </p>
        <p style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".3em", color: `${GOLD}BF`, marginTop: "8px" }}>{t.menu_quote_author}</p>
      </div>
    </main>
  );
}
