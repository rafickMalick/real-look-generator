import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import carpaccioImg from "@/assets/dish-carpaccio.jpg";
import filetImg from "@/assets/dish-acte1.jpg";
import agneauImg from "@/assets/dish-agneau.jpg";
import chocolatImg from "@/assets/dish-chocolat.jpg";

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

const CATEGORIES = ["TOUS", "ENTRÉES", "PLATS", "DESSERTS", "BOISSONS"] as const;

type Category = (typeof CATEGORIES)[number];

type Dish = {
  name: string;
  desc: string;
  price: string;
  category: Exclude<Category, "TOUS">;
  image: string;
  signature: boolean;
};

const DISHES: Dish[] = [
  {
    name: "Carpaccio de gambas",
    desc: "Agrumes du Bénin, mangue verte, huile de gingembre.",
    price: "12 000",
    category: "ENTRÉES",
    image: carpaccioImg,
    signature: false,
  },
  {
    name: "Le Filet des Rives du Mono",
    desc: "Maïs fumé, légumes de saison, émulsion au beurre noisette.",
    price: "24 000",
    category: "PLATS",
    image: filetImg,
    signature: true,
  },
  {
    name: "Agneau du terroir",
    desc: "Cuit lentement, jus corsé au djon djon, légumes rôtis.",
    price: "22 000",
    category: "PLATS",
    image: agneauImg,
    signature: false,
  },
  {
    name: "Chocolat & fève de tonka",
    desc: "Crémeux chocolat noir, croustillant praliné, glace fève de tonka.",
    price: "9 000",
    category: "DESSERTS",
    image: chocolatImg,
    signature: false,
  },
];

function CartePage() {
  const [activeCat, setActiveCat] = useState<Category>("TOUS");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = DISHES.filter(
    (d) => activeCat === "TOUS" || d.category === activeCat
  );

  const toggle = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const total = [...selected].reduce((sum, i) => {
    const price = Number(DISHES[i]?.price.replace(/\s/g, "") ?? 0);
    return sum + price;
  }, 0);

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden pb-28"
      style={{ background: BG, fontFamily: SERIF, color: CREAM }}
    >
      <div className="max-w-2xl mx-auto px-5 pt-5">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <Link
            to="/choice"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#c9a96a]/10 transition"
            style={{ borderColor: `${GOLD}45` }}
            aria-label="Retour"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </Link>

          <Link to="/choice" className="flex flex-col items-center">
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
          </Link>

          {/* Spacer pour équilibrer le header */}
          <div className="w-10 h-10" aria-hidden="true" />
        </div>

        {/* ── TITLE ── */}
        <header className="mt-8 text-center">
          <h1
            className="tracking-[0.14em] uppercase"
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2rem,7vw,2.8rem)", color: CREAM }}
          >
            NOTRE CARTE
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
            Une expérience gastronomique imaginée<br />par la Chef Georgiana Viou.
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
              {cat}
            </button>
          ))}
        </div>

        {/* ── DISHES GRID ── */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dish) => {
            const realIdx = DISHES.indexOf(dish);
            const isSelected = selected.has(realIdx);
            return (
              <article
                key={realIdx}
                className="relative rounded-xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-200"
                style={{
                  borderColor: isSelected ? GOLD : `${GOLD}18`,
                  background: "linear-gradient(180deg, #16110c 0%, #0a0604 100%)",
                  boxShadow: isSelected ? `0 0 0 1px ${GOLD}40` : "none",
                }}
                onClick={() => toggle(realIdx)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Gradient overlay */}
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
                      SIGNATURE
                    </span>
                  )}

                  {/* Add button */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggle(realIdx); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full border flex items-center justify-center transition"
                    style={{
                      borderColor: isSelected ? GOLD : `${GOLD}55`,
                      background: isSelected ? GOLD : "rgba(10,6,4,0.8)",
                      color: isSelected ? BG : GOLD,
                    }}
                    aria-label={isSelected ? "Retirer" : "Ajouter"}
                  >
                    {isSelected ? (
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
                    {dish.name}
                  </h3>
                  <p
                    className="leading-snug flex-1"
                    style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "0.72rem", color: `${MUTED}99` }}
                  >
                    {dish.desc}
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
          {/* Bag icon with count */}
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 relative"
            style={{ borderColor: `${GOLD}45`, color: GOLD }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7 H 18 L 17 20 H 7 Z" />
              <path d="M9 7 V 5 A 3 3 0 0 1 15 5 V 7" />
            </svg>
            {selected.size > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[0.55rem]"
                style={{ background: GOLD, color: BG, fontFamily: SERIF_SC }}
              >
                {selected.size}
              </span>
            )}
          </div>

          {/* Count + total */}
          <div className="flex-1 flex items-center gap-3" style={{ fontFamily: SERIF }}>
            <span className="text-[0.72rem]" style={{ color: CREAM }}>
              <span style={{ color: GOLD }}>{selected.size}</span>{" "}
              {selected.size === 1 ? "PLAT" : "PLATS"}
            </span>
            <span className="text-[0.65rem] tracking-[0.2em]" style={{ color: `${MUTED}60`, fontFamily: SERIF_SC }}>
              TOTAL
            </span>
            <span className="text-[0.82rem]" style={{ color: CREAM }}>
              {total.toLocaleString("fr-FR")} XOF
            </span>
          </div>

          {/* CTA */}
          <button
            type="button"
            disabled={selected.size === 0}
            className="px-5 h-10 rounded-full flex items-center gap-2 text-[0.72rem] tracking-[0.14em] shrink-0 transition disabled:opacity-40"
            style={{
              background: selected.size > 0 ? `linear-gradient(135deg, #d4b878 0%, #b8954c 100%)` : `${GOLD}30`,
              color: selected.size > 0 ? BG : GOLD,
              fontFamily: SERIF_SC,
            }}
          >
            MA SÉLECTION
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
