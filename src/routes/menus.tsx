import { createFileRoute, Link } from "@tanstack/react-router";

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

function ChefHat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 36 C 14 36, 12 30, 14 26 C 12 20, 16 14, 22 16 C 24 12, 30 10, 32 14 C 34 10, 40 12, 42 16 C 48 14, 52 20, 50 26 C 52 30, 50 36, 44 36 Z" />
      <path d="M20 36 V 48 H 44 V 36" />
      <path d="M20 42 H 44" />
    </svg>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="h-px w-24 bg-[#c9a96a]/40" />
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#c9a96a]" fill="currentColor">
        <path d="M10 2 L11 9 L18 10 L11 11 L10 18 L9 11 L2 10 L9 9 Z" />
      </svg>
      <span className="h-px w-24 bg-[#c9a96a]/40" />
    </div>
  );
}

function MenuCard({
  title,
  steps,
  description,
  tag,
  image,
  bgGradient,
  borderColor,
}: {
  title: string;
  steps: string;
  description: string;
  tag: string;
  image: string;
  bgGradient: string;
  borderColor: string;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border flex"
      style={{
        background: bgGradient,
        borderColor,
        minHeight: 200,
      }}
    >
      {/* Left content */}
      <div className="relative flex-1 p-5 flex flex-col justify-between z-10">
        <div>
          <h3
            className="text-[#e9dcc4] tracking-[0.08em] leading-tight"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(1.05rem,4.2vw,1.4rem)" }}
          >
            {title}
          </h3>
          <div
            className="mt-1 text-[#c9a96a] tracking-[0.2em] text-[0.7rem]"
            style={{ fontFamily: SERIF_SC }}
          >
            {steps}
          </div>
          <span className="block h-px w-10 bg-[#c9a96a]/40 mt-2" />
          <p
            className="mt-3 text-[#e9dcc4]/85 leading-snug"
            style={{ fontFamily: SERIF, fontSize: "0.95rem" }}
          >
            {description}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="flex items-start gap-2 max-w-[60%]">
            <div className="w-7 h-7 rounded-full border border-[#c9a96a]/50 flex items-center justify-center shrink-0 text-[#c9a96a]">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 C 14 8, 18 11, 18 16 C 18 19, 15 21, 12 21 C 9 21, 6 19, 6 16 C 6 11, 10 8, 12 3 Z" />
                <path d="M12 7 V 19" />
              </svg>
            </div>
            <p
              className="text-[#c9b896] text-[0.75rem] leading-tight"
              style={{ fontFamily: SERIF }}
            >
              {tag}
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-full border border-[#c9a96a]/60 flex items-center justify-center text-[#c9a96a] hover:bg-[#c9a96a]/10 transition shrink-0"
            aria-label="Voir le menu"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right image with fade */}
      <div className="relative w-[45%] shrink-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${borderColor.replace("0.5", "1")} 0%, transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
}

function MenusPage() {
  return (
    <main
      className="min-h-screen w-full text-[#e9dcc4] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center top, #1f1610 0%, #0e0907 60%, #050302 100%)",
      }}
    >
      {/* Top restaurant ambience photo */}
      <div
        className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,6,4,0.5) 0%, rgba(10,6,4,0.7) 60%, #0a0604 100%), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-6">
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
            <LeafLogo className="w-6 h-8 text-[#c9a96a]" />
          </Link>

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

        {/* Logo */}
        <header className="flex flex-col items-center text-center mt-2">
          <h1
            className="text-[#e9dcc4] tracking-[0.18em] leading-none"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(2.4rem,8vw,3.2rem)" }}
          >
            L'AMI
          </h1>
          <div
            className="mt-2 text-[#c9b896] tracking-[0.45em] text-[0.7rem]"
            style={{ fontFamily: SERIF_SC }}
          >
            SOFITEL BENIN
          </div>
        </header>

        {/* Welcome */}
        <section className="mt-10 text-center">
          <h2
            className="text-[#e9dcc4] tracking-[0.18em]"
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2rem,7vw,2.8rem)" }}
          >
            BIENVENUE
          </h2>
          <p
            className="mt-3 text-[#e9dcc4]/85 leading-snug"
            style={{ fontFamily: SERIF, fontSize: "1.05rem" }}
          >
            Commencez votre voyage
            <br />
            gastronomique
          </p>
        </section>

        <FloralDivider />

        <p
          className="text-center text-[#c9a96a] tracking-wide"
          style={{ fontFamily: SERIF, fontSize: "1rem" }}
        >
          Choisissez votre destination
        </p>

        {/* Menu cards */}
        <section className="mt-6 flex flex-col gap-4">
          <MenuCard
            title="MENU DÉCOUVERTE"
            steps="4 ÉTAPES"
            description="Une immersion délicate en quatre temps."
            tag="Idéal pour une première expérience"
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=70"
            bgGradient="linear-gradient(90deg, #0d1822 0%, #122436 60%, #0d1822 100%)"
            borderColor="rgba(40,70,100,0.5)"
          />
          <MenuCard
            title="MENU DÉGUSTATION"
            steps="7 ÉTAPES"
            description="Le grand voyage gastronomique du Chef."
            tag="L'expérience signature de L'Ami"
            image="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=70"
            bgGradient="linear-gradient(90deg, #2a0d14 0%, #3d1620 60%, #2a0d14 100%)"
            borderColor="rgba(120,40,55,0.5)"
          />
          <MenuCard
            title="MENU VÉGÉTARIEN"
            steps="5 ÉTAPES"
            description="La nature sublimée en cinq actes."
            tag="Créatif, végétal et gourmand"
            image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=70"
            bgGradient="linear-gradient(90deg, #0e1a0e 0%, #16261a 60%, #0e1a0e 100%)"
            borderColor="rgba(50,90,55,0.5)"
          />
        </section>

        {/* Quote */}
        <div className="mt-12 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-20 bg-[#c9a96a]/40" />
            <ChefHat className="w-7 h-7 text-[#c9a96a]" />
            <span className="h-px w-20 bg-[#c9a96a]/40" />
          </div>
          <blockquote className="mt-6 text-center pb-12">
            <p
              className="text-[#c9a96a] italic leading-relaxed"
              style={{ fontFamily: SERIF, fontSize: "1.05rem" }}
            >
              "Chaque plat est une rencontre.
              <br />
              Chaque repas, une histoire."
            </p>
            <footer
              className="mt-3 text-[#e9dcc4]/80 text-sm"
              style={{ fontFamily: SERIF }}
            >
              – Le Chef de L'Ami
            </footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
