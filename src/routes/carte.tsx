import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "../contexts/cart";
import { useTransitionStore, originFrom } from "../contexts/transition";
import { useI18n } from "../contexts/i18n";
import { CATEGORIES, DISHES, type Category } from "../data/dishes";
import { useState } from "react";

export const Route = createFileRoute("/carte")({
  component: CartePage,
  head: () => ({
    meta: [
      { title: "L'Ami — Notre Carte" },
      { name: "description", content: "Composez votre expérience gastronomique." },
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

function LeafLogo({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 50" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M20 4 C 22 14, 28 20, 30 30 C 28 40, 22 44, 20 48 C 18 44, 12 40, 10 30 C 12 20, 18 14, 20 4 Z" />
      <path d="M20 6 L20 46" />
      <path d="M20 14 C 16 16, 14 20, 13 24" />
      <path d="M20 14 C 24 16, 26 20, 27 24" />
      <path d="M20 24 C 16 26, 14 30, 13 34" />
      <path d="M20 24 C 24 26, 26 30, 27 34" />
    </svg>
  );
}

function CartePage() {
  const [activeCat, setActiveCat] = useState<Category>("TOUS");
  const [selectedDishIdx, setSelectedDishIdx] = useState<number | null>(null);
  const [overlayOrigin, setOverlayOrigin] = useState("50% 50%");
  const [isClosingOverlay, setIsClosingOverlay] = useState(false);

  const { ids, toggle } = useCart();
  const { set } = useTransitionStore();
  const navigate = useNavigate();
  const { t } = useI18n();

  const catLabels: Record<Category, string> = {
    TOUS: t.cat_all,
    ENTRÉES: t.cat_starters,
    PLATS: t.cat_mains,
    DESSERTS: t.cat_desserts,
    BOISSONS: t.cat_drinks,
  };

  const filtered = DISHES.filter(
    (d) => activeCat === "TOUS" || d.category === activeCat
  );

  const total = [...ids].reduce((sum, i) => {
    const price = Number(DISHES[i]?.price.replace(/\s/g, "") ?? 0);
    return sum + price;
  }, 0);

  const handleGoSelection = (e: React.MouseEvent) => {
    if (ids.size === 0) return;
    set({ type: "grow", origin: originFrom(e) });
    navigate({ to: "/selection" });
  };

  const openDetail = (e: React.MouseEvent, idx: number) => {
    setOverlayOrigin(originFrom(e));
    setIsClosingOverlay(false);
    setSelectedDishIdx(idx);
  };

  const closeDetail = () => {
    setIsClosingOverlay(true);
  };

  const handleOverlayAnimEnd = () => {
    if (isClosingOverlay) {
      setSelectedDishIdx(null);
      setIsClosingOverlay(false);
    }
  };

  const dish = selectedDishIdx !== null ? DISHES[selectedDishIdx] : null;
  const tr = selectedDishIdx !== null ? t.dishes[selectedDishIdx] : null;
  const isSelected = selectedDishIdx !== null ? ids.has(selectedDishIdx) : false;

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden pb-28"
      style={{ background: BG, fontFamily: SERIF, color: CREAM }}
    >
      <div className="max-w-2xl mx-auto px-5 pt-5">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => { set({ type: "back", origin: originFrom(e) }); navigate({ to: "/choice" }); }}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#c9a96a]/10 transition"
            style={{ borderColor: `${GOLD}45` }}
            aria-label="Retour"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { set({ type: "back", origin: originFrom(e) }); navigate({ to: "/choice" }); }}
            className="flex flex-col items-center"
          >
            <LeafLogo className="w-5 h-7" style={{ color: GOLD } as React.CSSProperties} />
            <span
              className="mt-1 tracking-[0.16em] leading-none"
              style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(1.45rem,5.5vw,1.8rem)", color: CREAM }}
            >
              L&apos;AMI
            </span>
            <span
              className="mt-1 tracking-[0.4em] text-[9px] uppercase"
              style={{ fontFamily: SERIF_SC, color: MUTED }}
            >
              SOFITEL BENIN
            </span>
          </button>

          <div className="w-10 h-10" aria-hidden="true" />
        </div>

        {/* ── TITLE ── */}
        <header className="mt-8 text-center">
          <h1
            className="tracking-[0.14em] uppercase"
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2rem,7vw,2.8rem)", color: CREAM }}
          >
            {t.carte_title}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2.5">
            <span className="h-px w-10" style={{ background: `${GOLD}55` }} />
            <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" style={{ color: GOLD } as React.CSSProperties} fill="currentColor">
              <path d="M8 1 L9 7 L15 8 L9 9 L8 15 L7 9 L1 8 L7 7 Z" />
            </svg>
            <span className="h-px w-10" style={{ background: `${GOLD}55` }} />
          </div>
          <p
            className="mt-4 italic leading-snug"
            style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "0.95rem", color: `${CREAM}99` }}
          >
            {t.carte_subline}
          </p>
        </header>

        {/* ── CATEGORIES ── */}
        <div className="mt-7 flex items-center gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className="shrink-0 px-4 h-9 rounded-full border text-[0.72rem] tracking-[0.18em] transition"
              style={{
                borderColor: activeCat === cat ? GOLD : `${GOLD}28`,
                color: activeCat === cat ? GOLD : `${CREAM}80`,
                background: activeCat === cat ? `${GOLD}12` : "transparent",
                fontFamily: SERIF_SC,
              }}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        {/* ── DISHES GRID ── */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dish) => {
            const realIdx = DISHES.indexOf(dish);
            const isSel = ids.has(realIdx);
            return (
              <article
                key={realIdx}
                className="relative rounded-xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-200"
                style={{
                  borderColor: isSel ? GOLD : `${GOLD}18`,
                  background: "linear-gradient(180deg, #16110c 0%, #0a0604 100%)",
                  boxShadow: isSel ? `0 0 0 1px ${GOLD}40` : "none",
                }}
                onClick={(e) => openDetail(e, realIdx)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(10,6,4,0.6) 0%, transparent 50%)" }}
                  />

                  {dish.signature && (
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded text-[0.52rem] tracking-[0.2em]"
                      style={{
                        fontFamily: SERIF_SC,
                        color: GOLD,
                        background: "rgba(10,6,4,0.85)",
                        border: `1px solid ${GOLD}55`,
                      }}
                    >
                      {t.dish_sig}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggle(realIdx); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full border flex items-center justify-center transition"
                    style={{
                      borderColor: isSel ? GOLD : `${GOLD}55`,
                      background: isSel ? GOLD : "rgba(10,6,4,0.8)",
                      color: isSel ? BG : GOLD,
                    }}
                    aria-label={isSel ? "Retirer" : "Ajouter"}
                  >
                    {isSel ? (
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12 H 19" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5 V 19 M 5 12 H 19" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1.5 flex-1">
                  <h3
                    className="leading-tight"
                    style={{ fontFamily: SERIF, fontSize: "0.92rem", color: CREAM }}
                  >
                    {t.dishes[realIdx]?.name ?? dish.name}
                  </h3>
                  <p
                    className="leading-snug flex-1"
                    style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "0.72rem", color: `${MUTED}99` }}
                  >
                    {t.dishes[realIdx]?.desc ?? dish.desc}
                  </p>
                  <div
                    className="pt-2 mt-1 border-t flex items-baseline gap-1"
                    style={{ borderColor: `${GOLD}18` }}
                  >
                    <span style={{ fontFamily: SERIF, fontSize: "0.9rem", color: CREAM }}>
                      {dish.price}
                    </span>
                    <span style={{ fontFamily: SERIF_SC, fontSize: "0.58rem", color: `${MUTED}80`, letterSpacing: "0.2em" }}>
                      XOF
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ── ALLERGIES BANNER ── */}
        <div
          className="mt-8 rounded-xl border px-4 py-3.5 flex items-center gap-3"
          style={{ background: "rgba(20,14,9,0.6)", borderColor: `${GOLD}20` }}
        >
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: `${GOLD}40`, color: GOLD }}
          >
            <LeafLogo className="w-4 h-5" />
          </div>
          <p
            className="flex-1 leading-snug text-[0.78rem]"
            style={{ fontFamily: SERIF, color: `${CREAM}88` }}
          >
            Chaque plat peut être adapté à certaines allergies ou régimes alimentaires.
          </p>
          <button
            type="button"
            className="text-[0.65rem] tracking-[0.2em] flex items-center gap-1 shrink-0"
            style={{ fontFamily: SERIF_SC, color: GOLD }}
          >
            INFORMER
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── BOTTOM SELECTION BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t"
        style={{ background: "rgba(10,6,4,0.97)", backdropFilter: "blur(12px)", borderColor: `${GOLD}22` }}
      >
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 relative"
            style={{ borderColor: `${GOLD}45`, color: GOLD }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7 H 18 L 17 20 H 7 Z" />
              <path d="M9 7 V 5 A 3 3 0 0 1 15 5 V 7" />
            </svg>
            {ids.size > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[0.55rem]"
                style={{ background: GOLD, color: BG, fontFamily: SERIF_SC }}
              >
                {ids.size}
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center gap-3" style={{ fontFamily: SERIF }}>
            <span className="text-[0.72rem]" style={{ color: CREAM }}>
              <span style={{ color: GOLD }}>{ids.size}</span>{" "}
              {ids.size === 1 ? t.plat_singular : t.plat_plural}
            </span>
            <span className="text-[0.65rem] tracking-[0.2em]" style={{ color: `${MUTED}60`, fontFamily: SERIF_SC }}>
              {t.total}
            </span>
            <span className="text-[0.82rem]" style={{ color: CREAM }}>
              {total.toLocaleString("fr-FR")} XOF
            </span>
          </div>

          <button
            type="button"
            disabled={ids.size === 0}
            onClick={handleGoSelection}
            className="px-5 h-10 rounded-full flex items-center gap-2 text-[0.72rem] tracking-[0.14em] shrink-0 transition disabled:opacity-40"
            style={{
              background: ids.size > 0 ? `linear-gradient(135deg, #d4b878 0%, #b8954c 100%)` : `${GOLD}30`,
              color: ids.size > 0 ? BG : GOLD,
              fontFamily: SERIF_SC,
            }}
          >
            {t.ma_selection}
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DISH DETAIL OVERLAY ── */}
      {selectedDishIdx !== null && dish && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: BG,
            transformOrigin: overlayOrigin,
            animation: `${isClosingOverlay ? "exitShrink" : "enterGrow"} 0.52s ${EASE} both`,
          }}
          onAnimationEnd={handleOverlayAnimEnd}
        >
          {/* Hero image — top 54% */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "54%" }}>
            <img
              src={dish.image}
              alt={tr?.name ?? dish.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #0a0604 4%, rgba(10,6,4,.1) 45%, rgba(10,6,4,.45))" }}
            />
            {dish.signature && (
              <span
                className="absolute px-[9px] py-1 rounded"
                style={{
                  top: "54px",
                  right: "22px",
                  fontFamily: SERIF_SC,
                  fontSize: "8px",
                  letterSpacing: ".24em",
                  color: GOLD,
                  background: "rgba(10,6,4,.7)",
                  border: `1px solid ${GOLD}8C`,
                }}
              >
                {t.dish_sig}
              </span>
            )}
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={closeDetail}
            className="absolute flex items-center justify-center rounded-full border backdrop-blur-sm transition"
            style={{
              top: "42px",
              left: "22px",
              width: "34px",
              height: "34px",
              borderColor: "rgba(201,169,106,.5)",
              background: "rgba(8,5,3,.4)",
              color: CREAM,
              zIndex: 25,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,169,106,.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(8,5,3,.4)")}
            aria-label={t.back}
          >
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </button>

          {/* Text content — bottom half */}
          <div
            className="absolute flex flex-col"
            style={{ left: "28px", right: "28px", top: "48%", bottom: "28px", zIndex: 10 }}
          >
            {/* Category */}
            <div
              style={{
                fontFamily: SERIF_SC,
                fontSize: "9px",
                letterSpacing: ".32em",
                color: GOLD,
                animation: `lamTextUp .7s ${EASE} .18s both`,
              }}
            >
              {dish.category}
            </div>

            {/* Dish name */}
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 7vw, 2.2rem)",
                lineHeight: 1.05,
                color: "#f3ead8",
                margin: "8px 0 0",
                animation: `lamTextUp .7s ${EASE} .27s both`,
              }}
            >
              {tr?.name ?? dish.name}
            </h2>

            {/* Divider */}
            <div
              className="flex items-center gap-[10px] my-[14px]"
              style={{ animation: `lamTextUp .7s ${EASE} .35s both` }}
            >
              <span className="h-px w-[34px]" style={{ background: `${GOLD}80` }} />
              <span style={{ color: GOLD, fontSize: "9px" }}>✦</span>
            </div>

            {/* Description */}
            <p
              className="leading-relaxed"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.6,
                color: "rgba(233,220,196,.8)",
                margin: 0,
                animation: `lamTextUp .7s ${EASE} .43s both`,
              }}
            >
              {tr?.longDesc ?? dish.desc}
            </p>

            {/* Ingredient */}
            <div
              className="mt-[18px]"
              style={{ animation: `lamTextUp .7s ${EASE} .51s both` }}
            >
              <span
                style={{
                  fontFamily: SERIF_SC,
                  fontSize: "8px",
                  letterSpacing: ".3em",
                  color: "rgba(201,169,106,.8)",
                }}
              >
                {t.detail_product}
              </span>
              <div
                className="italic mt-[3px]"
                style={{ fontFamily: SERIF, fontSize: "17px", color: GOLD }}
              >
                {tr?.ing ?? ""}
              </div>
            </div>

            {/* Price + CTA */}
            <div
              className="mt-auto flex items-center gap-[14px] pt-[18px]"
              style={{ animation: `lamTextUp .7s ${EASE} .59s both` }}
            >
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: SERIF_SC,
                    fontSize: "7px",
                    letterSpacing: ".24em",
                    color: "rgba(201,184,150,.5)",
                  }}
                >
                  PRIX
                </span>
                <span
                  className="leading-tight"
                  style={{ fontFamily: SERIF, fontSize: "24px", color: CREAM, lineHeight: 1.1 }}
                >
                  {dish.price}{" "}
                  <span style={{ fontSize: "12px", color: "rgba(201,184,150,.6)" }}>XOF</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggle(selectedDishIdx)}
                className="flex-1 h-[48px] rounded-full flex items-center justify-center gap-2 transition"
                style={{
                  fontFamily: SERIF_SC,
                  fontSize: "10px",
                  letterSpacing: ".18em",
                  cursor: "pointer",
                  border: `1px solid ${GOLD}`,
                  background: isSelected
                    ? "transparent"
                    : "linear-gradient(135deg, #d4b878, #b8954c)",
                  color: isSelected ? GOLD : BG,
                  transition: `all .3s ${EASE}`,
                }}
              >
                {isSelected ? t.detail_added : t.detail_add}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
