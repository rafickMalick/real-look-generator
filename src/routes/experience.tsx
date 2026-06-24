import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import dishActe1 from "@/assets/dish-acte1.jpg";
import dishCarpaccio from "@/assets/dish-carpaccio.jpg";
import dishAgneau from "@/assets/dish-agneau.jpg";
import dishChocolat from "@/assets/dish-chocolat.jpg";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "L'Ami — L'Expérience" },
      { name: "description", content: "Un voyage gastronomique en quatre actes." },
    ],
  }),
});

const SERIF    = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";
const GOLD     = "#c9a96a";
const CREAM    = "#e9dcc4";
const MUTED    = "#c9b896";
const BG       = "#0c0907";

/* Courbe douce, éditoriale — sans pic de vélocité apparent */
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

type CurtainState = "idle" | "in" | "out";

/* ─── SVG icons ──────────────────────────────────────────── */

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

function CornIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 C 12 6, 10 12, 11 22 C 12 25, 14 26, 16 26 C 18 26, 20 25, 21 22 C 22 12, 20 6, 16 4 Z" />
      <path d="M14 9 H 18 M 13 13 H 19 M 13 17 H 19 M 14 21 H 18" />
      <path d="M11 8 C 8 7, 6 5, 5 3 C 7 4, 9 4, 11 6" />
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

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 C 14 8, 19 11, 19 16 C 19 19, 16 21, 12 21 C 8 21, 5 19, 5 16 C 5 11, 10 8, 12 3 Z" />
      <path d="M12 7 V 19" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6 L 9 12 L 15 18" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 L 15 12 L 9 18" />
    </svg>
  );
}

/* ─── Data ────────────────────────────────────────────────── */

const ACTS = [
  {
    num: "I",
    label: "ACTE I",
    stepLabel: "AMUSE-BOUCHES",
    titleLines: ["LA BRUME", "DE MAÏS"],
    description: "La première brume se lève sur les rives du Mono.",
    Icon: CornIcon,
    image: dishActe1,
    ingredientName: "Maïs du Ouémé",
    ingredientDesc: "Cultivé localement puis fumé lentement, il apporte à cette création ses notes douces et boisées.",
  },
  {
    num: "II",
    label: "ACTE II",
    stepLabel: "ENTRÉES",
    titleLines: ["CARPACCIO", "DE GAMBAS"],
    description: "Les saveurs marines dansent avec les agrumes du terroir béninois.",
    Icon: LeafIcon,
    image: dishCarpaccio,
    ingredientName: "Gambas du Golfe",
    ingredientDesc: "Pêchées fraîches dans le golfe de Guinée, marinées aux agrumes locaux et à l'huile de gingembre.",
  },
  {
    num: "III",
    label: "ACTE III",
    stepLabel: "PLATS",
    titleLines: ["AGNEAU", "DU TERROIR"],
    description: "L'agneau cuit lentement dans les épices du pays.",
    Icon: ClocheIcon,
    image: dishAgneau,
    ingredientName: "Agneau local",
    ingredientDesc: "Élevé au Bénin, cuit lentement au jus de djon djon et accompagné de légumes rôtis du marché.",
  },
  {
    num: "IV",
    label: "ACTE IV",
    stepLabel: "DOUCEURS",
    titleLines: ["CHOCOLAT &", "FÈVE DE TONKA"],
    description: "La douceur finale, un voyage dans le terroir du cacao.",
    Icon: CakeIcon,
    image: dishChocolat,
    ingredientName: "Fève de tonka",
    ingredientDesc: "Épice précieuse au parfum de vanille et d'amande, elle sublime ce dessert chocolaté et croustillant.",
  },
];

/* ─── Brume — 3 couches fixes, purement ambiantes ────────── */

const MIST = [
  { w: "60vw", h: "50vw", top: "0%",  left: "40%",  blur: 72, op: "0d", dur: "22s", delay: "-4s"  },
  { w: "50vw", h: "44vw", top: "28%", left: "-12%", blur: 80, op: "0b", dur: "28s", delay: "-11s" },
  { w: "80vw", h: "28vw", bottom: "0", left: "50%", blur: 90, op: "08", dur: null,  delay: null   },
];

const IMG_MASK = [
  "linear-gradient(to right,  transparent 0%, black 18%, black 72%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
].join(", ");

/* ─── Page ────────────────────────────────────────────────── */

function ExperiencePage() {
  const [actIdx,       setActIdx]       = useState(0);
  const [curtainState, setCurtainState] = useState<CurtainState>("idle");
  const [revealed,     setRevealed]     = useState(false);
  const [indLeft,      setIndLeft]      = useState(0);

  const pendingAct = useRef<number>(0);
  const navRef     = useRef<HTMLDivElement>(null);
  const btnRefs    = useRef<(HTMLButtonElement | null)[]>([]);

  const act      = ACTS[actIdx];
  const { Icon } = act;

  /* Reveal initial */
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* Voile fondu entrant — 1.2s → swap → voile sortant */
  useEffect(() => {
    if (curtainState !== "in") return;
    const t = setTimeout(() => {
      setActIdx(pendingAct.current);
      setRevealed(false);
      setCurtainState("out");
    }, 1200);
    return () => clearTimeout(t);
  }, [curtainState]);

  useEffect(() => {
    if (curtainState !== "out") return;
    const t = setTimeout(() => {
      setCurtainState("idle");
      setTimeout(() => setRevealed(true), 60);
    }, 1400);
    return () => clearTimeout(t);
  }, [curtainState]);

  /* Indicateur glissant */
  useEffect(() => {
    const btn = btnRefs.current[actIdx];
    if (!btn || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndLeft(btnRect.left - navRect.left + btnRect.width / 2 - 20);
  }, [actIdx]);

  const navigate = (idx: number) => {
    if (idx === actIdx || curtainState !== "idle") return;
    pendingAct.current = idx;
    setCurtainState("in");
  };

  const goNext = () => navigate((actIdx + 1) % ACTS.length);

  /* Styles de transition groupés pour lisibilité */
  const fadeIn  = (delay: number, dur = 1.4) =>
    `opacity ${dur}s ${EASE} ${delay}s`;
  const riseIn  = (delay: number, dur = 1.4) =>
    `opacity ${dur}s ${EASE} ${delay}s, transform ${dur}s ${EASE} ${delay}s`;

  return (
    <main
      className="lami-experience min-h-screen w-full overflow-x-hidden relative pb-28"
      style={{ background: BG, color: CREAM }}
    >

      {/* ── VOILE ÉDITORIAL ───────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: BG,
          visibility: curtainState === "idle" ? "hidden" : "visible",
          pointerEvents: curtainState === "idle" ? "none" : "all",
          animation:
            curtainState === "in"
              ? "lamCurtainIn 1.2s ease forwards"
              : curtainState === "out"
              ? "lamCurtainOut 1.4s ease forwards"
              : "none",
        }}
      />

      {/* ── BRUME AMBIANTE — 3 couches, flottement doux ──── */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", overflow: "hidden" }}
      >
        {MIST.map((m, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: m.w,
              height: m.h,
              top: m.top,
              left: m.left,
              bottom: m.bottom,
              ...(i === 2 ? { transform: "translateX(-50%)" } : {}),
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${GOLD}${m.op} 0%, transparent 68%)`,
              filter: `blur(${m.blur}px)`,
              opacity: revealed ? 1 : 0,
              transition: `opacity 3s ${EASE}`,
              ...(m.dur ? { animation: `lamMistFloat ${m.dur} ease-in-out ${m.delay} infinite` } : {}),
            }}
          />
        ))}
      </div>

      {/* ── BARRE HAUTE ───────────────────────────────────── */}
      <div
        className="relative flex items-center justify-between px-5 pt-4"
        style={{
          zIndex: 20,
          opacity: revealed ? 1 : 0,
          transition: fadeIn(0.1, 1.2),
        }}
      >
        <Link
          to="/menus"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ borderColor: `${GOLD}40`, color: CREAM, transition: `background 0.6s ${EASE}` }}
          aria-label="Retour"
          onMouseEnter={(e) => (e.currentTarget.style.background = `${GOLD}10`)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Link>

        <div className="flex flex-col items-center" style={{ color: GOLD }}>
          <LeafLogo className="w-5 h-7" />
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
        </div>

        <div className="w-10 h-10" aria-hidden="true" />
      </div>

      {/* ── SECTION HERO ──────────────────────────────────── */}
      <section
        className="relative mt-5 overflow-hidden"
        style={{ minHeight: "clamp(420px, 62vh, 560px)" }}
      >

        {/* Image — première à apparaître, priorité absolue */}
        <div
          className="absolute inset-0"
          style={{
            left: "36%",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(1.025)",
            transition: riseIn(0, 1.8),
          }}
        >
          <img
            key={actIdx}
            src={act.image}
            alt={act.titleLines.join(" ")}
            className="w-full h-full object-cover"
            style={{
              maskImage: IMG_MASK,
              maskComposite: "intersect",
              WebkitMaskImage: IMG_MASK,
              WebkitMaskComposite: "source-in",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${BG} 0%, rgba(12,9,7,0.85) 28%, rgba(12,9,7,0.18) 60%, transparent 100%)`,
            }}
          />
        </div>

        {/* Texte gauche */}
        <div className="relative px-5 pt-4 max-w-[58%]" style={{ zIndex: 10 }}>

          {/* Label acte */}
          <div
            className="flex items-center gap-3"
            style={{
              opacity: revealed ? 1 : 0,
              transition: fadeIn(0.28, 1.2),
            }}
          >
            <span style={{ fontFamily: SERIF_SC, color: GOLD, fontSize: "0.65rem", letterSpacing: "0.4em" }}>
              {act.label}
            </span>
            <span className="h-px flex-1 max-w-[2.5rem]" style={{ background: `${GOLD}45` }} />
          </div>

          {/* Titre — bloc entier, pas de per-character */}
          <h1
            className="mt-5 uppercase leading-[0.93]"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 9.5vw, 3.5rem)",
              color: CREAM,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(14px)",
              transition: riseIn(0.36, 1.5),
            }}
          >
            {act.titleLines.map((line, li) => (
              <span key={li} className="block">{line}</span>
            ))}
          </h1>

          {/* Icône + description — une seule vague */}
          <div
            className="mt-6"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(10px)",
              transition: riseIn(0.52, 1.4),
            }}
          >
            <div style={{ color: GOLD }}>
              <Icon className="w-6 h-6" />
            </div>
            <p
              className="mt-3 leading-relaxed"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: "0.9rem",
                color: `${CREAM}aa`,
              }}
            >
              {act.description}
            </p>
          </div>
        </div>

        {/* Flèche suivant + compteur */}
        <div
          className="absolute bottom-4 right-5 flex flex-col items-end gap-2"
          style={{
            zIndex: 10,
            opacity: revealed ? 1 : 0,
            transition: fadeIn(0.7, 1.2),
          }}
        >
          <button
            type="button"
            onClick={goNext}
            disabled={curtainState !== "idle"}
            className="w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm disabled:opacity-30"
            style={{
              borderColor: `${GOLD}40`,
              color: CREAM,
              background: "rgba(12,9,7,0.4)",
              transition: `background 0.6s ${EASE}`,
            }}
            aria-label="Acte suivant"
            onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(201,169,106,0.1)`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(12,9,7,0.4)")}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <span style={{ fontFamily: SERIF, fontSize: "0.7rem", letterSpacing: "0.08em", color: `${GOLD}80` }}>
            <span style={{ color: `${CREAM}cc` }}>0{actIdx + 1}</span> / 04
          </span>
        </div>
      </section>

      {/* ── SÉPARATEUR ────────────────────────────────────── */}
      <div
        className="mx-5 mt-7 h-px"
        style={{
          background: `${GOLD}14`,
          opacity: revealed ? 1 : 0,
          transition: fadeIn(0.8, 1.6),
        }}
      />

      {/* ── INGRÉDIENT — deux colonnes ────────────────────── */}
      <section
        className="px-5 mt-6"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(10px)",
          transition: riseIn(0.9, 1.4),
        }}
      >
        <div className="flex items-start gap-4">

          {/* Colonne gauche */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2" style={{ color: GOLD }}>
              <Icon className="w-4 h-4" />
            </div>
            <p style={{ fontFamily: SERIF_SC, color: `${GOLD}bb`, fontSize: "0.58rem", letterSpacing: "0.32em" }}>
              INGRÉDIENT PHARE
            </p>
            <h3
              className="mt-1.5"
              style={{ fontFamily: SERIF, color: GOLD, fontWeight: 400, fontSize: "clamp(1.1rem, 4vw, 1.4rem)" }}
            >
              {act.ingredientName}
            </h3>
            <div className="h-px w-6 my-2.5" style={{ background: `${GOLD}45` }} />
            <p
              className="leading-relaxed"
              style={{ fontFamily: SERIF, fontWeight: 300, color: `${CREAM}88`, fontSize: "0.84rem" }}
            >
              {act.ingredientDesc}
            </p>
          </div>

          {/* Colonne droite — histoire */}
          <div
            style={{
              width: "44%",
              flexShrink: 0,
              border: `1px solid ${GOLD}18`,
              background: "#0e0a07",
              borderRadius: 14,
              padding: 16,
              opacity: revealed ? 1 : 0,
              transition: fadeIn(1.05, 1.2),
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: `${GOLD}99`, display: "flex" }}>
                <LeafIcon className="w-3.5 h-3.5" />
              </span>
              <span style={{ fontFamily: SERIF_SC, color: `${GOLD}99`, fontSize: "0.48rem", letterSpacing: "0.32em" }}>
                L&apos;HISTOIRE
              </span>
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: "0.77rem",
                color: `${CREAM}77`,
                lineHeight: 1.75,
              }}
            >
              {act.ingredientName} est au cœur de cette création.{" "}
              {act.ingredientDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION BAS ────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-20 border-t"
        style={{
          borderColor: `${GOLD}0a`,
          background: "linear-gradient(to top, rgba(8,5,3,0.97) 0%, rgba(8,5,3,0.86) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 -1px 0 rgba(201,169,106,0.06), 0 -40px 60px rgba(8,5,3,0.55)",
        }}
      >
        <div ref={navRef} className="max-w-lg mx-auto px-5 py-3 relative">

          {/* Indicateur doré glissant */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: indLeft,
              width: 40,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}cc, transparent)`,
              transition: `left 1s ${EASE}`,
            }}
          />

          {/* Progression continue */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 21,
              left: "13%",
              right: "13%",
              height: 1,
              background: "rgba(201,169,106,0.08)",
            }}
          >
            <div
              style={{
                width: `${(actIdx / (ACTS.length - 1)) * 100}%`,
                height: "100%",
                background: `${GOLD}60`,
                transition: `width 0.8s ${EASE}`,
              }}
            />
          </div>

          <div className="flex items-start justify-between">
            {ACTS.map((a, i) => {
              const active = i === actIdx;
              return (
                <button
                  key={a.num}
                  ref={(el) => { btnRefs.current[i] = el; }}
                  type="button"
                  onClick={() => navigate(i)}
                  disabled={curtainState !== "idle"}
                  className="flex flex-col items-center gap-1.5 flex-1 disabled:pointer-events-none"
                >
                  <span
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                    style={{
                      borderColor: active ? `${GOLD}cc` : "rgba(201,169,106,0.2)",
                      background: active ? "rgba(201,169,106,0.1)" : "transparent",
                      color: active ? GOLD : "rgba(201,169,106,0.35)",
                      fontFamily: SERIF,
                      fontSize: "0.88rem",
                      letterSpacing: "0.04em",
                      transform: active ? "scale(1.06)" : "scale(1)",
                      boxShadow: active ? `0 0 16px ${GOLD}18` : "none",
                      transition: `border-color 0.6s ${EASE}, background 0.6s ${EASE}, color 0.6s ${EASE}, transform 0.6s ${EASE}, box-shadow 0.6s ${EASE}`,
                    }}
                  >
                    {a.num}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF_SC,
                      color: active ? `${GOLD}cc` : "rgba(201,169,106,0.3)",
                      fontSize: "0.48rem",
                      letterSpacing: "0.16em",
                      transition: `color 0.6s ${EASE}`,
                    }}
                  >
                    {a.stepLabel}
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
