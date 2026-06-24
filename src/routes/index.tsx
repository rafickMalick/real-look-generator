import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
      <path d="M20 24 C 16 26, 14 30, 13 34" />
      <path d="M20 24 C 24 26, 26 30, 27 34" />
    </svg>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-5 sm:my-6">
      <span className="h-px w-14 sm:w-20 bg-[#c9a96a]/35" />
      <svg viewBox="0 0 48 16" className="w-10 h-3 text-[#c9a96a]" fill="currentColor">
        <path d="M24 8 C22 4, 18 3, 14 5 C16 2, 20 1, 24 3 C28 1, 32 2, 34 5 C30 3, 26 4, 24 8 Z" opacity="0.9" />
        <circle cx="24" cy="8" r="1.2" />
        <path d="M8 8 C10 6, 12 7, 14 8 C12 9, 10 10, 8 8 Z" opacity="0.6" />
        <path d="M40 8 C38 6, 36 7, 34 8 C36 9, 38 10, 40 8 Z" opacity="0.6" />
      </svg>
      <span className="h-px w-14 sm:w-20 bg-[#c9a96a]/35" />
    </div>
  );
}

function ChefHat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 36 C 14 36, 12 30, 14 26 C 12 20, 16 14, 22 16 C 24 12, 30 10, 32 14 C 34 10, 40 12, 42 16 C 48 14, 52 20, 50 26 C 52 30, 50 36, 44 36 Z" />
      <path d="M20 36 V 48 H 44 V 36" />
      <path d="M20 42 H 44" />
    </svg>
  );
}

function Index() {
  const [progress, setProgress] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.1;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => navigate({ to: "/choice" }), 500);
          return 100;
        }
        return next;
      });
    }, 85);
    return () => clearInterval(id);
  }, [navigate]);

  return (
    <main
      className="min-h-screen w-full overflow-hidden text-[#e9dcc4]"
      style={{
        backgroundColor: "#0c0907",
        backgroundImage:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #1e1610 0%, #0f0b08 45%, #080604 100%)",
      }}
    >
      <div className="relative min-h-screen w-full flex flex-col items-center px-5 py-8 sm:py-10 max-w-lg mx-auto">
        {/* subtle grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Header */}
        <header className="relative z-10 flex flex-col items-center text-center animate-in fade-in duration-1000">
          <LeafLogo className="w-7 h-8 sm:w-8 sm:h-10 text-[#c9a96a] mb-3" />
          <h1
            className="leading-none tracking-[0.12em]"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(2.75rem, 11vw, 4rem)",
              color: CREAM,
            }}
          >
            L&apos;AMI
          </h1>
          <p
            className="mt-2 tracking-[0.45em] text-[10px] sm:text-xs uppercase"
            style={{ fontFamily: SERIF_SC, color: MUTED }}
          >
            SOFITEL BENIN
          </p>
        </header>

        {/* Taglines */}
        <section className="relative z-10 mt-8 sm:mt-10 text-center animate-in fade-in duration-1000 delay-150">
          <p
            className="tracking-[0.08em] leading-snug uppercase"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 2.8vw, 1.35rem)",
              color: CREAM,
            }}
          >
            LA CUISINE D&apos;UNE FEMME,
            <br />
            LE GOÛT D&apos;UN TERRITOIRE.
          </p>

          <FloralDivider />

          <p
            className="tracking-[0.35em] text-[10px] sm:text-xs uppercase"
            style={{ fontFamily: SERIF_SC, color: GOLD }}
          >
            UN VOYAGE EN 4 ACTES
          </p>
        </section>

        {/* Hero portrait */}
        <figure className="relative z-10 mt-6 sm:mt-8 w-full max-w-[340px] sm:max-w-[380px] animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <img
            src={splashHero}
            alt="Georgiana, Cheffe de L'Ami"
            className="w-full h-auto select-none"
            draggable={false}
          />
        </figure>

        {/* Quote */}
        <blockquote className="relative z-10 mt-4 sm:mt-6 max-w-sm text-center px-2 animate-in fade-in duration-1000 delay-500">
          <p
            className="italic leading-relaxed"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              color: "rgba(233, 220, 196, 0.92)",
            }}
          >
            <span className="not-italic text-[#c9a96a] text-3xl leading-none align-top mr-0.5" style={{ fontFamily: SERIF }}>
              &ldquo;
            </span>
            Je m&apos;inspire du terroir Béninois pour sublimer la tradition française et créer des émotions vraies.
            <span className="not-italic text-[#c9a96a] text-3xl leading-none align-bottom ml-0.5" style={{ fontFamily: SERIF }}>
              &rdquo;
            </span>
          </p>
          <footer
            className="mt-3 text-sm"
            style={{ fontFamily: SERIF, color: "rgba(201, 169, 106, 0.85)" }}
          >
            — Georgiana, Cheffe de L&apos;Ami
          </footer>
        </blockquote>

        {/* Loader */}
        <section className="relative z-10 mt-8 sm:mt-10 w-full max-w-xs sm:max-w-sm flex flex-col items-center animate-in fade-in duration-1000 delay-700">
          <p
            className="tracking-[0.35em] text-[9px] sm:text-[10px] uppercase"
            style={{ fontFamily: SERIF_SC, color: MUTED }}
          >
            PRÉPARATION DU VOYAGE…
          </p>

          <div className="mt-4 w-[88%] relative">
            <div className="h-px w-full bg-[#2a2018]" />
            <div
              className="absolute top-0 left-0 h-px transition-all duration-150 ease-linear"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, #f0d9a0 70%, ${GOLD} 100%)`,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#f0e4cc] transition-all duration-150 ease-linear"
              style={{
                left: `calc(${progress}% - 4px)`,
                boxShadow: `0 0 6px ${GOLD}, 0 0 14px rgba(201, 169, 106, 0.5)`,
              }}
            />
          </div>

          <ChefHat className="w-8 h-8 sm:w-9 sm:h-9 mt-7 text-[#c9a96a]/90" />
        </section>
      </div>
    </main>
  );
}
