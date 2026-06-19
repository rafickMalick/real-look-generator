import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import dishImage from "@/assets/dish-acte1.jpg";
import chefImage from "@/assets/user-photo.png";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "L'Ami — Acte I" },
      { name: "description", content: "Les amuse-bouches — première scène de votre voyage." },
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

function MasksIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10 C 6 18, 10 22, 14 22 C 18 22, 20 18, 20 12 C 20 10, 18 9, 14 9 C 10 9, 6 9, 6 10 Z" />
      <circle cx="10" cy="14" r="0.8" fill="currentColor" />
      <circle cx="16" cy="14" r="0.8" fill="currentColor" />
      <path d="M11 18 C 12 19, 14 19, 15 18" />
      <path d="M14 9 C 18 9, 22 9, 24 10 C 24 18, 22 22, 18 22" />
      <circle cx="20" cy="14" r="0.8" fill="currentColor" />
      <path d="M17 18 C 18 17, 20 17, 21 18" />
    </svg>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 C 14 8, 19 11, 19 16 C 19 19, 16 21, 12 21 C 8 21, 5 19, 5 16 C 5 11, 10 8, 12 3 Z" />
      <path d="M12 7 V 19" />
    </svg>
  );
}

function ClocheIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17 H 20" />
      <path d="M5 17 C 5 12, 8 8, 12 8 C 16 8, 19 12, 19 17" />
      <circle cx="12" cy="7" r="0.8" fill="currentColor" />
      <path d="M3 19 H 21" />
    </svg>
  );
}

function CakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20 H 19 V 13 H 5 Z" />
      <path d="M5 16 C 7 14, 9 18, 12 16 C 15 14, 17 18, 19 16" />
      <path d="M12 13 V 9" />
      <path d="M12 9 C 11 8, 11 7, 12 6 C 13 7, 13 8, 12 9 Z" fill="currentColor" />
    </svg>
  );
}

function CornIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 C 12 6, 10 12, 11 22 C 12 25, 14 26, 16 26 C 18 26, 20 25, 21 22 C 22 12, 20 6, 16 4 Z" />
      <path d="M14 9 H 18 M 13 13 H 19 M 13 17 H 19 M 14 21 H 18" />
      <path d="M11 8 C 8 7, 6 5, 5 3 C 7 4, 9 4, 11 6" />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22 C 12 22, 19 15, 19 10 C 19 6, 16 3, 12 3 C 8 3, 5 6, 5 10 C 5 15, 12 22, 12 22 Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8 6 L 18 12 L 8 18 Z" />
      <rect x="3" y="9" width="2" height="6" rx="0.5" />
      <rect x="6" y="7" width="1.2" height="10" rx="0.5" />
    </svg>
  );
}

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6 L 9 12 L 15 18" />
    </svg>
  );
}

const ACTS = [
  { num: "I", label: "ACTE I", title: "LES AMUSE-BOUCHES", icon: MasksIcon },
  { num: "II", label: "ACTE II", title: "L'ENTRÉE", icon: LeafIcon },
  { num: "III", label: "ACTE III", title: "LE PLAT", icon: ClocheIcon },
  { num: "IV", label: "ACTE IV", title: "LE DESSERT", icon: CakeIcon },
];

function ExperiencePage() {
  const [activeAct, setActiveAct] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const act = ACTS[activeAct];
  const ActIcon = act.icon;

  return (
    <main
      className="min-h-screen w-full text-[#e9dcc4] relative overflow-hidden pb-28"
      style={{
        background:
          "radial-gradient(ellipse at top, #1a120c 0%, #0a0604 60%, #050302 100%)",
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-5 pt-5">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <Link
            to="/menus"
            className="w-11 h-11 rounded-full border border-[#c9a96a]/40 flex items-center justify-center text-[#e9dcc4] hover:bg-[#c9a96a]/10 transition"
            aria-label="Retour"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div className="flex flex-col items-center">
            <LeafLogo className="w-6 h-8 text-[#c9a96a]" />
            <h1
              className="text-[#e9dcc4] tracking-[0.18em] leading-none mt-1"
              style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "1.9rem" }}
            >
              L'AMI
            </h1>
            <div
              className="mt-1.5 text-[#c9b896] tracking-[0.4em] text-[0.6rem]"
              style={{ fontFamily: SERIF_SC }}
            >
              SOFITEL BENIN
            </div>
          </div>

          <button
            className="px-3 h-11 rounded-md border border-[#c9a96a]/40 flex items-center gap-1.5 text-[#e9dcc4] text-sm"
            style={{ fontFamily: SERIF }}
          >
            FR
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9 L 12 15 L 18 9" />
            </svg>
          </button>
        </div>

        {/* Acte header */}
        <header className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c9a96a]/50" />
            <span
              className="text-[#c9a96a] tracking-[0.35em] text-sm"
              style={{ fontFamily: SERIF }}
            >
              {act.label}
            </span>
            <span className="h-px w-10 bg-[#c9a96a]/50" />
          </div>
          <h2
            className="mt-3 text-[#e9dcc4] tracking-[0.1em]"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(1.7rem,6.5vw,2.4rem)" }}
          >
            {act.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-12 bg-[#c9a96a]/40" />
            <ActIcon className="w-7 h-7 text-[#c9a96a]" />
            <span className="h-px w-12 bg-[#c9a96a]/40" />
          </div>
        </header>

        {/* Dish image */}
        <div className="mt-8 flex justify-center">
          <img
            src={dishImage}
            alt="La Brume de Maïs"
            className="w-full max-w-md aspect-square object-cover"
            style={{
              maskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 90%)",
            }}
          />
        </div>

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === slideIdx ? 18 : 6,
                height: 6,
                background: i === slideIdx ? "#c9a96a" : "rgba(201,169,106,0.3)",
              }}
              aria-label={`Plat ${i + 1}`}
            />
          ))}
        </div>

        {/* Dish title & description */}
        <div className="mt-8 text-center">
          <h3
            className="text-[#e9dcc4] tracking-[0.06em]"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(1.3rem,5vw,1.7rem)" }}
          >
            <span className="text-[#c9a96a]">01.</span>{"  "}LA BRUME DE MAÏS
          </h3>
          <p
            className="mt-3 text-[#e9dcc4]/85 leading-relaxed px-4"
            style={{ fontFamily: SERIF, fontSize: "clamp(0.95rem,3vw,1.1rem)" }}
          >
            Crémeux de maïs fumé, mousseline au fromage local,
            <br />
            poudre de charbon végétal et pickles de légumes.
          </p>
        </div>

        <div className="my-7 h-px w-full bg-[#c9a96a]/25" />

        {/* Three info columns */}
        <section className="grid grid-cols-3 gap-3 text-center">
          <div className="flex flex-col items-center px-1">
            <LeafIcon className="w-7 h-7 text-[#c9a96a]" />
            <div
              className="mt-2 text-[#c9a96a] tracking-[0.18em] text-[0.7rem]"
              style={{ fontFamily: SERIF_SC }}
            >
              ÉVOQUE
            </div>
            <p
              className="mt-2 text-[#e9dcc4]/80 text-xs leading-snug"
              style={{ fontFamily: SERIF }}
            >
              Les matins brumeux sur les rives du Mono, entre terre et eau.
            </p>
          </div>
          <div className="flex flex-col items-center px-1">
            <CornIcon className="w-7 h-7 text-[#c9a96a]" />
            <div
              className="mt-2 text-[#c9a96a] tracking-[0.18em] text-[0.7rem]"
              style={{ fontFamily: SERIF_SC }}
            >
              INGRÉDIENT PHARE
            </div>
            <p
              className="mt-2 text-[#e9dcc4]/80 text-xs leading-snug"
              style={{ fontFamily: SERIF }}
            >
              Maïs local fumé
              <br />
              Origine : Ouémé, Bénin
            </p>
          </div>
          <div className="flex flex-col items-center px-1">
            <PinIcon className="w-7 h-7 text-[#c9a96a]" />
            <div
              className="mt-2 text-[#c9a96a] tracking-[0.18em] text-[0.7rem]"
              style={{ fontFamily: SERIF_SC }}
            >
              ORIGINE
            </div>
            <p
              className="mt-2 text-[#e9dcc4]/80 text-xs leading-snug"
              style={{ fontFamily: SERIF }}
            >
              Produit local
              <br />
              du Bénin
            </p>
          </div>
        </section>

        {/* Chef quote card */}
        <section
          className="mt-9 rounded-2xl border border-[#c9a96a]/25 overflow-hidden relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,14,10,0.95) 0%, rgba(10,6,4,0.98) 100%)",
          }}
        >
          <div className="flex">
            {/* Chef portrait */}
            <div className="w-[42%] shrink-0 relative">
              <img
                src={chefImage}
                alt="Cheffe Georgiana"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: 280 }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 70%, rgba(10,6,4,0.95) 100%)",
                }}
              />
            </div>

            {/* Quote */}
            <div className="flex-1 px-4 py-5 flex flex-col">
              <div className="text-[#c9a96a] text-3xl leading-none" style={{ fontFamily: SERIF }}>
                &ldquo;
              </div>
              <p
                className="text-[#e9dcc4] leading-relaxed -mt-1"
                style={{ fontFamily: SERIF, fontSize: "0.95rem" }}
              >
                Bienvenue à L'Ami.
                <br />
                <br />
                Je suis Georgiana, et je vous invite à commencer ce voyage par une première scène délicate et surprenante. Laissez vos sens s'éveiller…&rdquo;
              </p>
              <div
                className="mt-3 text-[#c9a96a] italic text-right"
                style={{ fontFamily: SERIF, fontSize: "1.15rem" }}
              >
                Georgiana
              </div>

              <div className="mt-auto pt-4 flex items-center gap-3">
                <button
                  className="w-11 h-11 rounded-full bg-[#c9a96a] flex items-center justify-center text-[#1a120c] hover:bg-[#d8b87a] transition shrink-0"
                  aria-label="Écouter la présentation"
                >
                  <PlayIcon className="w-4 h-4" />
                </button>
                <div
                  className="text-[#e9dcc4] tracking-[0.2em] text-[0.65rem] leading-tight"
                  style={{ fontFamily: SERIF_SC }}
                >
                  ÉCOUTER
                  <br />
                  MA PRÉSENTATION
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom act stepper */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#c9a96a]/15"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,4,0.85) 0%, rgba(5,3,2,0.98) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-2xl mx-auto px-5 py-3 relative">
          {/* connecting line */}
          <div className="absolute top-[34px] left-[14%] right-[14%] h-px bg-[#c9a96a]/25" />
          <div className="flex items-start justify-between relative">
            {ACTS.map((a, i) => {
              const Icon = a.icon;
              const active = i === activeAct;
              return (
                <button
                  key={a.num}
                  onClick={() => setActiveAct(i)}
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <span
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition"
                    style={{
                      borderColor: active ? "#c9a96a" : "rgba(201,169,106,0.35)",
                      background: active ? "rgba(201,169,106,0.12)" : "rgba(10,6,4,0.9)",
                      color: active ? "#c9a96a" : "rgba(201,169,106,0.55)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span
                    className="tracking-[0.2em] text-[0.65rem]"
                    style={{
                      fontFamily: SERIF_SC,
                      color: active ? "#c9a96a" : "rgba(201,169,106,0.55)",
                    }}
                  >
                    {a.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </main>
  );
}
