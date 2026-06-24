import { createFileRoute, Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import heroBg from "@/assets/menus-hero-bg.jpg";
import plats1 from "@/assets/plats_1.png";
import plats2 from "@/assets/plats_2.png";
import plats3 from "@/assets/plats_3.png";

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
const GOLD = "#C9A84C";
const OFF_WHITE = "#F5F0E8";
const WHITE = "#FFFFFF";
const BG = "#0a0a0a";

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

function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7 H 20 M 4 12 H 20 M 4 17 H 20" />
    </svg>
  );
}

function CompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M15.5 8.5 L13.5 13.5 L8.5 15.5 L10.5 10.5 Z" />
    </svg>
  );
}

function FeatherIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C 14 4, 8 10, 8 16 C 8 18, 9.5 20, 12 20 C 18 20, 20 14, 20 8 Z" />
      <path d="M8 16 L4 20" />
      <path d="M10 14 H16" />
    </svg>
  );
}

function VegLeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 C 15 7, 19 10, 19 15 C 19 18.5, 16 21, 12 21 C 8 21, 5 18.5, 5 15 C 5 10, 9 7, 12 3 Z" />
      <path d="M12 7 V 19" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" />
    </svg>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-[clamp(0.8rem,2.6vw,1.2rem)]">
      <span className="h-px w-[clamp(3.5rem,18vw,5.5rem)] bg-[#C9A84C]/70" />
      <span className="text-[#C9A84C] text-[clamp(0.8rem,2.3vw,1rem)]">✦</span>
      <span className="h-px w-[clamp(3.5rem,18vw,5.5rem)] bg-[#C9A84C]/70" />
    </div>
  );
}

type MenuCardProps = {
  title: string;
  steps: string;
  description: string;
  tag: string;
  image: string;
  bgColor: string;
  Icon: ComponentType<{ className?: string }>;
};

function MenuCard({ title, steps, description, tag, image, bgColor, Icon }: MenuCardProps) {
  return (
    <div
      className="group relative flex h-[clamp(10rem,35vw,13.75rem)] lg:h-[260px] flex-row overflow-hidden rounded-2xl border border-transparent transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:border-[#C9A84C]/40"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative z-[2] flex w-[45%] flex-col justify-between p-[clamp(12px,3vw,20px)]">
        <div className="min-w-0">
          <h3
            className="whitespace-nowrap leading-tight tracking-[0.08em] sm:tracking-[0.12em] uppercase"
            style={{
              color: WHITE,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(0.85rem, 3.5vw, 1.1rem)",
            }}
          >
            {title}
          </h3>
          <p
            className="mt-0.5 tracking-[0.22em] sm:tracking-[0.28em] uppercase"
            style={{
              color: GOLD,
              fontFamily: SERIF,
              fontSize: "clamp(0.55rem, 2vw, 0.7rem)",
            }}
          >
            {steps}
          </p>
          <span className="mt-1 block h-px w-8 bg-[#C9A84C]/70" />
          <p
            className="mt-1 leading-snug"
            style={{
              color: OFF_WHITE,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
            }}
          >
            {description}
          </p>
        </div>

        <div className="mt-1.5 flex items-end justify-between gap-1">
          <div className="flex min-w-0 max-w-[72%] items-start gap-1.5">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/70 text-[#C9A84C]">
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>
            <p
              className="leading-tight"
              style={{
                color: GOLD,
                fontFamily: SERIF,
                fontSize: "clamp(0.55rem, 2vw, 0.7rem)",
              }}
            >
              {tag}
            </p>
          </div>
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/70 text-white transition-all duration-300 ease-in-out group-hover:bg-[#C9A84C]">
            <ArrowRightIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>
      </div>

      <div className="relative w-[55%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to right, ${bgColor} 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}

function MenusPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-[#F5F0E8]" style={{ background: BG }}>
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[clamp(17rem,42vw,25rem)]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 60%, #0a0a0a 100%), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-[clamp(0.95rem,4vw,1.5rem)] py-[clamp(0.95rem,3.2vw,1.6rem)]">
        <div className="flex items-center justify-between">
          <Link
            to="/choice"
            className="flex h-[clamp(2.4rem,5.5vw,2.9rem)] w-[clamp(2.4rem,5.5vw,2.9rem)] items-center justify-center rounded-full border border-[#C9A84C]/55 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition"
            aria-label="Retour"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L 9 12 L 15 18" />
            </svg>
          </Link>

          <div className="flex flex-col items-center text-center">
            <LeafLogo className="h-[clamp(1.5rem,4vw,2.1rem)] w-[clamp(1.1rem,3vw,1.5rem)] text-[#C9A84C]" />
            <span
              className="mt-1 leading-none tracking-[0.16em]"
              style={{
                color: GOLD,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(2rem,6vw,3.2rem)",
              }}
            >
              L&apos;AMI
            </span>
            <p
              className="mt-1 tracking-[0.42em] uppercase"
              style={{
                color: GOLD,
                fontFamily: SERIF,
                fontSize: "clamp(0.45rem,1.25vw,0.7rem)",
              }}
            >
              SOFITEL BENIN
            </p>
          </div>

          {/* Spacer pour équilibrer le header */}
          <div className="h-[clamp(2.4rem,5.5vw,2.9rem)] w-[clamp(2.4rem,5.5vw,2.9rem)]" aria-hidden="true" />
        </div>

        <section className="mt-[clamp(1.5rem,5vw,2.7rem)] text-center">
          <h2
            className="tracking-[0.18em] uppercase"
            style={{
              color: GOLD,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(2.5rem,8vw,4rem)",
            }}
          >
            BIENVENUE
          </h2>
          <p
            className="mt-2 leading-snug"
            style={{
              color: OFF_WHITE,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(1rem,2.2vw,1.35rem)",
            }}
          >
            Commencez votre voyage
            <br />
            gastronomique
          </p>
        </section>

        <FloralDivider />

        <p
          className="text-center italic tracking-wide"
          style={{
            color: GOLD,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(1rem,2vw,1.35rem)",
          }}
        >
          Choisissez votre destination
        </p>

        <section className="mt-[clamp(1rem,2.7vw,1.7rem)] flex flex-col gap-[clamp(10px,2vw,16px)]">
          <Link to="/experience" className="block">
            <MenuCard
              title="MENU DÉCOUVERTE"
              steps="4 ÉTAPES"
              description="Une immersion délicate en quatre temps."
              tag="Idéal pour une première expérience"
              image={plats1}
              bgColor="#091117"
              Icon={CompassIcon}
            />
          </Link>
          <Link to="/experience" className="block">
            <MenuCard
              title="MENU DÉGUSTATION"
              steps="7 ÉTAPES"
              description="Le grand voyage gastronomique du Chef."
              tag="L'expérience signature de L'Ami"
              image={plats2}
              bgColor="#19060a"
              Icon={FeatherIcon}
            />
          </Link>
          <Link to="/experience" className="block">
            <MenuCard
              title="MENU VÉGÉTARIEN"
              steps="5 ÉTAPES"
              description="La nature sublimée en cinq actes."
              tag="Créatif, végétal et gourmand"
              image={plats3}
              bgColor="#0a140b"
              Icon={VegLeafIcon}
            />
          </Link>
        </section>

        <div className="mt-[clamp(2.2rem,6vw,3.2rem)] flex flex-col items-center pb-[clamp(1.2rem,4vw,2rem)]">
          <div className="flex items-center gap-3">
            <span className="h-px w-[clamp(3.6rem,18vw,8rem)] bg-[#C9A84C]/60" />
            <ChefHat className="h-[clamp(1.15rem,2.5vw,1.5rem)] w-[clamp(1.15rem,2.5vw,1.5rem)] text-[#C9A84C]" />
            <span className="h-px w-[clamp(3.6rem,18vw,8rem)] bg-[#C9A84C]/60" />
          </div>
          <blockquote className="mt-[clamp(0.9rem,2.7vw,1.35rem)] text-center">
            <p
              className="italic leading-relaxed"
              style={{
                color: OFF_WHITE,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: "clamp(0.95rem,2vw,1.25rem)",
              }}
            >
              &ldquo;Chaque plat est une rencontre.
              <br />
              Chaque repas, une histoire.&rdquo;
            </p>
            <footer
              className="mt-2"
              style={{
                color: OFF_WHITE,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: "clamp(0.82rem,1.7vw,1.05rem)",
              }}
            >
              – Le Chef de L&apos;Ami
            </footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
