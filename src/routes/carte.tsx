import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/carte-hero.jpg";
import carpaccioImg from "@/assets/dish-carpaccio.jpg";
import filetImg from "@/assets/dish-acte1.jpg";
import agneauImg from "@/assets/dish-agneau.jpg";
import chocolatImg from "@/assets/dish-chocolat.jpg";

export const Route = createFileRoute("/carte")({
  component: CartePage,
  head: () => ({
    meta: [
      { title: "L'Ami — Notre Carte" },
      { name: "description", content: "Une expérience gastronomique en quatre temps." },
    ],
  }),
});

const SERIF = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";

function LeafLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M20 4 C 22 14, 28 20, 30 30 C 28 40, 22 44, 20 48 C 18 44, 12 40, 10 30 C 12 20, 18 14, 20 4 Z" />
      <path d="M20 6 L20 46" />
      <path d="M20 14 C 16 16, 14 20, 13 24" />
      <path d="M20 14 C 24 16, 26 20, 27 24" />
      <path d="M20 24 C 16 26, 14 30, 13 34" />
      <path d="M20 24 C 24 26, 26 30, 27 34" />
    </svg>
  );
}

const CATEGORIES = ["TOUS", "ENTRÉES", "PLATS", "DESSERTS", "BOISSONS"];

const DISHES = [
  {
    name: "Carpaccio\nde gambas",
    desc: "Agrumes du Bénin,\nmangue verte, huile\nde gingembre.",
    price: "12 000",
    image: carpaccioImg,
    signature: false,
  },
  {
    name: "Le Filet des Rives\ndu Mono",
    desc: "Maïs fumé, légumes\nde saison, émulsion\nau beurre noisette.",
    price: "24 000",
    image: filetImg,
    signature: true,
  },
  {
    name: "Agneau du terroir",
    desc: "Cuit lentement, jus corsé\nau djon djon, légumes\nrôtis.",
    price: "22 000",
    image: agneauImg,
    signature: false,
  },
  {
    name: "Chocolat & fève\nde tonka",
    desc: "Crémeux chocolat noir,\ncroustillant praliné,\nglace fève de tonka.",
    price: "9 000",
    image: chocolatImg,
    signature: false,
  },
];

function CartePage() {
  const [activeCat, setActiveCat] = useState("TOUS");
  const [selectedIdx, setSelectedIdx] = useState<number>(1);

  return (
    <main
      className="min-h-screen w-full text-[#e9dcc4] relative overflow-x-hidden pb-28"
      style={{ background: "#0a0604", fontFamily: SERIF }}
    >
      <div className="max-w-6xl mx-auto px-5 pt-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            className="w-11 h-11 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#e9dcc4]"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 7 H 20 M 4 12 H 20 M 4 17 H 20" />
            </svg>
          </button>

          <Link to="/choice" className="flex flex-col items-center">
            <LeafLogo className="w-6 h-7 text-[#c9a96a]" />
            <span className="mt-1 tracking-[0.18em] text-[#e9dcc4]" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "1.5rem", lineHeight: 1 }}>
              L'AMI
            </span>
            <span className="mt-1 text-[#c9b896] tracking-[0.4em] text-[0.55rem]" style={{ fontFamily: SERIF_SC }}>
              SOFITEL BENIN
            </span>
          </Link>

          <button className="px-3 h-11 rounded-md border border-[#c9a96a]/40 flex items-center gap-1.5 text-[#e9dcc4] text-sm">
            FR
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9 L 12 15 L 18 9" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <header className="mt-8 text-center">
          <h1
            className="text-[#e9dcc4] tracking-[0.12em]"
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2rem,7vw,2.6rem)" }}
          >
            NOTRE CARTE
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-10 bg-[#c9a96a]/50" />
            <svg viewBox="0 0 16 16" className="w-3 h-3 text-[#c9a96a]" fill="currentColor">
              <path d="M8 1 L9 7 L15 8 L9 9 L8 15 L7 9 L1 8 L7 7 Z" />
            </svg>
            <span className="h-px w-10 bg-[#c9a96a]/50" />
          </div>
          <p className="mt-4 text-[#e9dcc4]/85 italic leading-snug" style={{ fontSize: "0.95rem" }}>
            Une expérience gastronomique en quatre temps,<br />
            imaginée par la Chef Georgiana Viou.
          </p>
        </header>

        {/* Categories */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 px-4 h-9 rounded-full border text-[0.78rem] tracking-[0.15em] transition ${
                activeCat === cat
                  ? "border-[#c9a96a] text-[#c9a96a]"
                  : "border-[#c9a96a]/25 text-[#e9dcc4]/80"
              }`}
              style={{ fontFamily: SERIF }}
            >
              {cat}
            </button>
          ))}
          <button className="shrink-0 ml-auto px-3 h-9 rounded-full border border-[#c9a96a]/40 flex items-center gap-1.5 text-[#c9a96a] text-[0.78rem] tracking-[0.15em]">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6 H 21 M 6 12 H 18 M 10 18 H 14" />
            </svg>
            FILTRES
          </button>
        </div>

        {/* Hero dish slider */}
        <div className="mt-6 relative">
          <div className="relative overflow-hidden aspect-[16/10] rounded-2xl">
            <img
              src={heroImg}
              alt="Plat signature"
              width={1600}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(10,6,4,0.75) 95%)",
              }}
            />
          </div>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#c9a96a] bg-[#0a0604]/40"
            aria-label="Précédent"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#c9a96a] bg-[#0a0604]/40"
            aria-label="Suivant"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
          {/* dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[0, 1, 2, 3, 4, 5].map((d) => (
              <span
                key={d}
                className={`rounded-full ${d === 3 ? "bg-[#c9a96a] w-3 h-1.5" : "bg-[#c9a96a]/30 w-1.5 h-1.5"}`}
              />
            ))}
          </div>
        </div>

        {/* Nos créations */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-[#e9dcc4] italic" style={{ fontFamily: SERIF, fontSize: "1.35rem" }}>
            Nos créations
          </h2>
          <span className="flex-1 h-px bg-[#c9a96a]/30" />
          <button className="text-[#c9a96a] text-[0.8rem] tracking-wide flex items-center gap-1" style={{ fontFamily: SERIF }}>
            Voir la carte complète
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {DISHES.map((dish, idx) => {
            const selected = selectedIdx === idx;
            return (
              <article
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`relative rounded-xl border overflow-hidden flex flex-col cursor-pointer transition ${
                  selected ? "border-[#c9a96a]" : "border-[#c9a96a]/15"
                }`}
                style={{ background: "linear-gradient(180deg, #14100b 0%, #0a0604 100%)" }}
              >
                <div className="relative aspect-[4/4] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name.replace("\n", " ")}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {dish.signature && (
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded border border-[#c9a96a]/60 bg-[#0a0604]/80 text-[#c9a96a] text-[0.55rem] tracking-[0.2em]"
                      style={{ fontFamily: SERIF_SC }}
                    >
                      PLAT SIGNATURE
                    </span>
                  )}
                  <button
                    className="absolute top-2 right-2 w-7 h-7 rounded-full border border-[#c9a96a]/60 bg-[#0a0604]/80 flex items-center justify-center text-[#c9a96a]"
                    aria-label="Ajouter"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5 V 19 M 5 12 H 19" />
                    </svg>
                  </button>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <h3
                    className="text-[#e9dcc4] leading-tight whitespace-pre-line"
                    style={{ fontFamily: SERIF, fontSize: "0.98rem" }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className="text-[#c9b896]/80 leading-snug whitespace-pre-line text-[0.72rem]"
                    style={{ fontFamily: SERIF }}
                  >
                    {dish.desc}
                  </p>
                  <div className="mt-auto pt-2 border-t border-[#c9a96a]/15 flex items-baseline gap-1">
                    <span className="text-[#e9dcc4]" style={{ fontFamily: SERIF, fontSize: "0.95rem" }}>
                      {dish.price}
                    </span>
                    <span className="text-[#c9b896]/70 text-[0.6rem] tracking-[0.2em]" style={{ fontFamily: SERIF_SC }}>
                      XOF
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Voir tous les plats */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="text-[#c9a96a]">◇</span>
          <button
            className="px-6 h-11 rounded-full border border-[#c9a96a]/40 text-[#e9dcc4] tracking-[0.18em] text-[0.78rem]"
            style={{ fontFamily: SERIF }}
          >
            VOIR TOUS LES PLATS
          </button>
          <span className="text-[#c9a96a]">◇</span>
        </div>

        {/* Allergies banner */}
        <div className="mt-8 rounded-lg border border-[#c9a96a]/20 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(20,14,9,0.5)" }}>
          <div className="w-9 h-9 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#c9a96a] shrink-0">
            <LeafLogo className="w-4 h-5" />
          </div>
          <p className="flex-1 text-[#e9dcc4]/85 text-[0.78rem] leading-snug" style={{ fontFamily: SERIF }}>
            Chaque plat peut être adapté à certaines<br />
            allergies ou régimes alimentaires.
          </p>
          <button className="text-[#c9a96a] text-[0.7rem] tracking-[0.2em] flex items-center gap-1" style={{ fontFamily: SERIF_SC }}>
            INFORMER LE CHEF
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom selection bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#c9a96a]/20"
        style={{ background: "rgba(10,6,4,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#c9a96a] shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7 H 18 L 17 20 H 7 Z" />
              <path d="M9 7 V 5 A 3 3 0 0 1 15 5 V 7" />
            </svg>
          </div>
          <div className="flex-1 flex items-center gap-3 text-[0.72rem]" style={{ fontFamily: SERIF }}>
            <span className="text-[#e9dcc4]">
              <span className="text-[#c9a96a]">0</span> PLAT SÉLECTIONNÉ
            </span>
            <span className="text-[#c9b896]/60 tracking-[0.2em]">TOTAL</span>
            <span className="text-[#e9dcc4]">0 XOF</span>
          </div>
          <button
            className="px-4 h-11 rounded-full flex items-center gap-2 text-[#0a0604] tracking-[0.15em] text-[0.78rem] font-medium shrink-0"
            style={{ background: "linear-gradient(180deg, #d4b878 0%, #b8954c 100%)", fontFamily: SERIF }}
          >
            VOIR MA SÉLECTION
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L 15 12 L 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
