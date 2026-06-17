import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/choice")({
  component: ChoicePage,
  head: () => ({
    meta: [
      { title: "L'Ami — Bienvenue" },
      { name: "description", content: "Composez votre menu ou faites confiance à la Cheffe." },
    ],
  }),
});

const SERIF = "'Cormorant Garamond', serif";
const SERIF_SC = "'Cormorant SC', serif";
const GOLD = "#c9a96a";
const CREAM = "#e9dcc4";

function LeafOrnament({ className = "" }: { className?: string }) {
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

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <span className="h-px w-20 bg-[#c9a96a]/30" />
      <LeafOrnament className="w-5 h-6 text-[#c9a96a]" />
      <span className="h-px w-20 bg-[#c9a96a]/30" />
    </div>
  );
}

function MortarIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 32 H50 L44 50 C 43 53, 41 54, 39 54 H25 C 23 54, 21 53, 20 50 Z" />
      <path d="M12 32 H52" />
      <path d="M38 32 L46 14" />
      <circle cx="46" cy="13" r="2.5" />
      <path d="M28 32 C 28 24, 24 20, 22 18" />
      <path d="M28 32 C 28 24, 32 20, 34 18" />
      <path d="M28 32 C 28 26, 30 22, 32 20" />
    </svg>
  );
}

function ClocheIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 44 H52" />
      <path d="M14 44 C 14 32, 22 22, 32 22 C 42 22, 50 32, 50 44" />
      <circle cx="32" cy="20" r="2" />
      <path d="M10 48 H54" />
    </svg>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div
      className="relative flex-1 rounded-sm border border-[#c9a96a]/40 px-6 py-10 flex flex-col items-center text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(30,22,16,0.7) 0%, rgba(18,13,9,0.85) 100%)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* corner leaves */}
      <LeafOrnament className="absolute -left-2 bottom-2 w-16 h-20 text-[#c9a96a]/10 rotate-12" />
      <LeafOrnament className="absolute -right-2 bottom-4 w-16 h-20 text-[#c9a96a]/10 -rotate-12" />

      <div
        className="w-20 h-20 rounded-full border border-[#c9a96a]/60 flex items-center justify-center text-[#c9a96a] mb-8"
      >
        {icon}
      </div>

      <h3
        className="text-[#e9dcc4] tracking-[0.12em] leading-tight"
        style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(1.1rem,4vw,1.4rem)" }}
      >
        {title}
      </h3>

      <span className="block h-px w-10 bg-[#c9a96a]/50 my-5" />

      <p
        className="text-[#c9b896]/90 leading-relaxed text-sm sm:text-base"
        style={{ fontFamily: SERIF }}
      >
        {description}
      </p>

      <span className="mt-8 text-[#c9a96a] text-2xl" style={{ fontFamily: SERIF }}>
        ›
      </span>
    </div>
  );
}

function ChoicePage() {
  return (
    <main
      className="min-h-screen w-full text-[#e9dcc4] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center top, #1f1610 0%, #120c08 60%, #0a0604 100%)",
      }}
    >
      {/* Decorative leaves background */}
      <LeafOrnament className="absolute top-20 -left-6 w-40 h-56 text-[#c9a96a]/10 -rotate-12" />
      <LeafOrnament className="absolute top-60 -left-10 w-32 h-44 text-[#c9a96a]/[0.07] rotate-6" />

      {/* Bottom photo vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, rgba(10,6,4,0.9) 70%, #0a0604 100%), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=60&blur=20')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center">
        {/* Logo */}
        <header className="flex flex-col items-center text-center">
          <LeafOrnament className="w-7 h-9 text-[#c9a96a] mb-3" />
          <h1
            className="text-[#e9dcc4] tracking-[0.18em] leading-none"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(2.6rem,8vw,3.5rem)" }}
          >
            L'AMI
          </h1>
          <div
            className="mt-3 text-[#c9b896] tracking-[0.45em] text-[0.7rem] sm:text-xs"
            style={{ fontFamily: SERIF_SC }}
          >
            SOFITEL BENIN
          </div>
        </header>

        {/* Welcome */}
        <section className="mt-14 text-center">
          <h2
            className="text-[#e9dcc4] tracking-[0.3em]"
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(1.6rem,5vw,2rem)" }}
          >
            BIENVENUE
          </h2>
          <p
            className="mt-4 text-[#c9b896] leading-relaxed"
            style={{ fontFamily: SERIF, fontSize: "clamp(1rem,3vw,1.15rem)" }}
          >
            Comment souhaitez-vous
            <br />
            vivre votre expérience ?
          </p>
        </section>

        <Divider />

        {/* Cards */}
        <section className="w-full grid grid-cols-2 gap-4 sm:gap-6">
          <Link to="/" className="contents">
            <Card
              icon={<MortarIcon />}
              title={<>COMPOSER<br />MON MENU</>}
              description="Composez votre propre voyage en sélectionnant vos plats préférés."
            />
          </Link>
          <Link to="/" className="contents">
            <Card
              icon={<ClocheIcon />}
              title={<>FAIRE CONFIANCE<br />À LA CHEFFE</>}
              description="Laissez-vous guider par la Cheffe et découvrez ses menus signature."
            />
          </Link>
        </section>

        <Divider />

        {/* Quote */}
        <blockquote className="text-center px-4 pb-16">
          <p
            className="text-[#e9dcc4]/90 italic leading-relaxed"
            style={{ fontFamily: SERIF, fontSize: "clamp(1.05rem,3vw,1.25rem)" }}
          >
            <span className="text-[#c9a96a] text-2xl align-top mr-1">“</span>
            Chaque plat est une rencontre.
            <br />
            Chaque repas, une histoire.
            <span className="text-[#c9a96a] text-2xl align-bottom ml-1">”</span>
          </p>
          <footer
            className="mt-4 text-[#c9a96a]/90 text-sm"
            style={{ fontFamily: SERIF }}
          >
            — Georgiana, Cheffe de L'Ami
          </footer>
        </blockquote>
      </div>
    </main>
  );
}
