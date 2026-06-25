import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "../contexts/cart";
import { useTransitionStore, originFrom } from "../contexts/transition";
import { useI18n } from "../contexts/i18n";
import { DISHES, dishPrice } from "../data/dishes";

export const Route = createFileRoute("/selection")({
  component: SelectionPage,
  head: () => ({
    meta: [
      { title: "L'Ami — Ma Sélection" },
      { name: "description", content: "Votre menu sur-mesure." },
    ],
  }),
});

const SERIF = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";
const GOLD = "#c9a96a";
const CREAM = "#e9dcc4";
const MUTED = "#c9b896";
const BG = "#0a0604";
const EASE = "cubic-bezier(.4,.02,.18,1)";

function SelectionPage() {
  const { ids, remove, clear } = useCart();
  const { set } = useTransitionStore();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [confirmed, setConfirmed] = useState(false);

  const selectedDishes = [...ids].map((i) => ({ idx: i, dish: DISHES[i] })).filter((x) => x.dish);
  const isEmpty = selectedDishes.length === 0;
  const total = [...ids].reduce((sum, i) => sum + (DISHES[i] ? dishPrice(DISHES[i]) : 0), 0);
  const platLabel = ids.size === 1 ? "PLAT" : "PLATS";

  const handleBack = (e: React.MouseEvent) => {
    set({ type: "back", origin: originFrom(e) });
    navigate({ to: "/carte" });
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleRestart = (e: React.MouseEvent) => {
    clear();
    set({ type: "back", origin: originFrom(e) });
    navigate({ to: "/" });
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col"
      style={{ background: BG, fontFamily: SERIF, color: CREAM, position: "relative" }}
    >
      {/* Radial glow top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(130% 50% at 50% 0%, rgba(201,169,106,.08), transparent 60%)" }}
      />

      <div className="relative flex flex-col flex-1 max-w-2xl mx-auto w-full pt-12">

        {/* ── HEADER ── */}
        <div className="relative flex items-center px-5 flex-shrink-0">
          <button
            type="button"
            onClick={handleBack}
            className="relative z-10 w-[34px] h-[34px] rounded-full border flex items-center justify-center transition hover:bg-[#c9a96a]/14"
            style={{ borderColor: `${GOLD}45`, color: GOLD }}
            aria-label="Retour à la carte"
          >
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </button>

          <div className="absolute inset-x-0 flex flex-col items-center pointer-events-none">
            <span style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "22px", letterSpacing: ".16em", color: CREAM, lineHeight: 1 }}>
              L&apos;AMI
            </span>
            <span style={{ fontFamily: SERIF_SC, fontSize: "6.5px", letterSpacing: ".4em", color: MUTED, marginTop: "2px" }}>
              SOFITEL BÉNIN
            </span>
          </div>
        </div>

        {/* ── TITLE ── */}
        <div className="text-center mt-[18px] flex-shrink-0 px-5">
          <div
            style={{ fontFamily: SERIF_SC, fontSize: "9px", letterSpacing: ".34em", color: `${GOLD}D9` }}
          >
            {t.sel_surtitle}
          </div>
          <h1
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "30px", letterSpacing: ".04em", color: CREAM, margin: "6px 0 0" }}
          >
            {t.sel_title}
          </h1>
          <div className="flex items-center justify-center gap-[10px] mt-2">
            <span className="h-px w-[34px]" style={{ background: `${GOLD}80` }} />
            <span style={{ color: GOLD, fontSize: "9px" }}>✦</span>
            <span className="h-px w-[34px]" style={{ background: `${GOLD}80` }} />
          </div>
        </div>

        {/* ── EMPTY STATE ── */}
        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-[14px]">
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={`${GOLD}80`} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7 H 18 L 17 20 H 7 Z" />
              <path d="M9 7 V 5 A 3 3 0 0 1 15 5 V 7" />
            </svg>
            <p
              className="italic leading-[1.5]"
              style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "16px", color: `${CREAM}99` }}
            >
              {t.sel_empty.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
            </p>
            <button
              type="button"
              onClick={handleBack}
              className="mt-[6px] px-[18px] h-[38px] flex items-center gap-[7px] rounded-full border transition hover:bg-[#c9a96a]/10"
              style={{ borderColor: `${GOLD}80`, color: GOLD, fontFamily: SERIF_SC, fontSize: "9px", letterSpacing: ".18em" }}
            >
              {t.sel_back}
            </button>
          </div>
        )}

        {/* ── DISH LIST ── */}
        {!isEmpty && (
          <div className="flex-1 overflow-y-auto min-h-0 px-5 pt-4 pb-[150px]">
            <div className="flex flex-col gap-3">
              {selectedDishes.map(({ idx, dish }) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-3 border-b"
                  style={{ borderColor: `${GOLD}18` }}
                >
                  <div
                    className="w-[58px] h-[58px] rounded-lg overflow-hidden flex-shrink-0 border"
                    style={{ borderColor: `${GOLD}40` }}
                  >
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      style={{ fontFamily: SERIF_SC, fontSize: "7px", letterSpacing: ".24em", color: GOLD }}
                    >
                      {dish.category}
                    </div>
                    <div
                      className="leading-[1.15] mt-0.5"
                      style={{ fontFamily: SERIF, fontSize: "16px", color: CREAM }}
                    >
                      {t.dishes[idx]?.name ?? dish.name}
                    </div>
                    <div
                      className="mt-1"
                      style={{ fontFamily: SERIF, fontSize: "13px", color: `${MUTED}D9` }}
                    >
                      {dish.price}{" "}
                      <span style={{ fontSize: "9px", color: `${MUTED}80` }}>XOF</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition hover:border-[#c9a96a]/70"
                    style={{ borderColor: `${GOLD}4D`, color: `${GOLD}CC`, fontFamily: SERIF, fontSize: "15px", lineHeight: 1 }}
                    aria-label={`Retirer ${dish.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <p
              className="italic text-center leading-[1.5] mt-[22px] mx-3"
              style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "13px", color: `${CREAM}80` }}
            >
              {t.sel_brigade}
            </p>
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR (total + CTA) ── */}
      {!isEmpty && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 border-t"
          style={{
            background: "rgba(10,6,4,0.97)",
            backdropFilter: "blur(12px)",
            borderColor: `${GOLD}38`,
            padding: "14px 18px 18px",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-baseline justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".22em", color: `${MUTED}8C` }}>
                  {ids.size} {platLabel}
                </span>
                <span style={{ fontFamily: SERIF_SC, fontSize: "8px", color: `${MUTED}8C` }}>·</span>
                <span style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".22em", color: `${MUTED}8C` }}>
                  {t.total}
                </span>
              </div>
              <div style={{ fontFamily: SERIF, fontSize: "22px", color: CREAM }}>
                {total.toLocaleString("fr-FR")}{" "}
                <span style={{ fontSize: "12px", color: `${MUTED}99` }}>XOF</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full h-[50px] rounded-full flex items-center justify-center gap-[9px] transition hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #d4b878, #b8954c)",
                color: BG,
                fontFamily: SERIF_SC,
                fontSize: "10px",
                letterSpacing: ".2em",
                boxShadow: "0 8px 24px -10px rgba(201,169,106,.6)",
              }}
            >
              {t.sel_confirm}
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 L 15 12 L 9 18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── CONFIRMATION OVERLAY ── */}
      {confirmed && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center px-10 text-center"
          style={{
            background: "radial-gradient(ellipse at center, #15110b 0%, #0a0604 75%)",
            animation: `enterTheatre 1s ${EASE} both`,
          }}
        >
          <div
            className="w-[74px] h-[74px] rounded-full border flex items-center justify-center"
            style={{
              borderColor: `${GOLD}80`,
              color: GOLD,
              animation: `lamEmerge 1s ${EASE} 0.1s both`,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-[34px] h-[34px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13 L 10 18 L 19 6" />
            </svg>
          </div>

          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "30px",
              color: CREAM,
              margin: "24px 0 0",
              animation: `lamEmerge 1s ${EASE} 0.25s both`,
            }}
          >
            {t.sel_merci}
          </h2>

          <p
            className="italic leading-[1.6]"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "16px",
              color: `${CREAM}BF`,
              margin: "14px 0 0",
              animation: `lamEmerge 1s ${EASE} 0.4s both`,
            }}
          >
            {t.sel_transmitted.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
          </p>

          <button
            type="button"
            onClick={handleRestart}
            className="mt-[30px] px-[22px] h-[44px] flex items-center gap-2 rounded-full border transition hover:bg-[#c9a96a]/10"
            style={{
              borderColor: `${GOLD}80`,
              color: GOLD,
              fontFamily: SERIF_SC,
              fontSize: "9px",
              letterSpacing: ".2em",
              animation: `lamEmerge 1s ${EASE} 0.55s both`,
            }}
          >
            {t.sel_restart}
          </button>
        </div>
      )}
    </main>
  );
}
