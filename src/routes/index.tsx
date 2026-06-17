import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import userPhoto from "@/assets/user-photo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 8 : p + 1.2));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#1a1410] text-[#e9dcc4] font-serif overflow-hidden">
      <div
        className="min-h-screen w-full flex flex-col items-center px-6 py-10 sm:py-14"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center top, #2a1f17 0%, #15100c 55%, #0d0907 100%)",
        }}
      >
        {/* Logo */}
        <header className="flex flex-col items-center text-center">
          <svg width="28" height="34" viewBox="0 0 28 34" className="text-[#c9a96a] mb-2" fill="currentColor">
            <path d="M14 2c-2 4-6 5-6 10 0 3 2 5 5 6-1-2-1-4 1-6 1 3 3 4 3 7 2-2 3-4 3-7 0-5-4-6-6-10z" opacity="0.9"/>
            <path d="M14 18c-1 4-3 8-3 12h6c0-4-2-8-3-12z" opacity="0.7"/>
          </svg>
          <h1
            className="text-[#e9dcc4] tracking-[0.15em] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(3rem,9vw,4.5rem)" }}
          >
            L'AMI
          </h1>
          <div
            className="mt-2 text-[#c9b896] tracking-[0.4em] text-xs sm:text-sm"
            style={{ fontFamily: "'Cormorant SC', serif" }}
          >
            SOFITEL BENIN
          </div>
        </header>

        {/* Tagline */}
        <section className="mt-10 sm:mt-12 text-center max-w-xl">
          <p
            className="text-[#e9dcc4] tracking-[0.1em] leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.1rem,3vw,1.6rem)" }}
          >
            LA CUISINE D'UNE FEMME,
            <br />
            LE GOÛT D'UN TERRITOIRE.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-16 bg-[#c9a96a]/40" />
            <span className="text-[#c9a96a] text-xs">✦</span>
            <span className="h-px w-16 bg-[#c9a96a]/40" />
          </div>

          <p
            className="mt-5 text-[#c9a96a] tracking-[0.35em] text-xs sm:text-sm"
            style={{ fontFamily: "'Cormorant SC', serif" }}
          >
            UN VOYAGE EN 4 ACTES
          </p>
        </section>

        {/* Portrait */}
        <figure className="mt-10 w-full max-w-md px-4">
          <img
            src={userPhoto}
            alt="Photo envoyée"
            className="w-full h-auto"
          />
        </figure>

        {/* Quote */}
        <blockquote className="mt-8 max-w-md text-center px-6">
          <p
            className="text-[#e9dcc4]/90 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem,2.5vw,1.15rem)" }}
          >
            <span className="text-[#c9a96a] text-2xl align-top mr-1">“</span>
            Je m'inspire du terroir Béninois pour sublimer la tradition française et créer des émotions vraies.
            <span className="text-[#c9a96a] text-2xl align-bottom ml-1">”</span>
          </p>
          <footer
            className="mt-4 text-[#c9a96a]/80 text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            — Georgiana, Cheffe de L'Ami
          </footer>
        </blockquote>

        {/* Loader */}
        <section className="mt-12 w-full max-w-md flex flex-col items-center">
          <p
            className="text-[#c9b896] tracking-[0.35em] text-xs"
            style={{ fontFamily: "'Cormorant SC', serif" }}
          >
            PRÉPARATION DU VOYAGE…
          </p>
          <div className="mt-4 h-px w-full bg-[#3a2d1f] overflow-hidden relative">
            <div
              className="h-full transition-all duration-150 ease-linear"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, transparent, #c9a96a 40%, #f0d9a0 70%, #c9a96a)",
                boxShadow: "0 0 8px #c9a96a, 0 0 16px #c9a96a66",
              }}
            />
          </div>

          {/* Chef hat */}
          <svg width="36" height="36" viewBox="0 0 36 36" className="mt-8 text-[#c9a96a]" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 18c-3 0-5-2-5-5s2-5 5-5c1-3 4-5 7-5h4c3 0 6 2 7 5 3 0 5 2 5 5s-2 5-5 5v8c0 1-1 2-2 2H11c-1 0-2-1-2-2v-8z" />
            <path d="M11 22h14" />
          </svg>
        </section>
      </div>
    </main>
  );
}
