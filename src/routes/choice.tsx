import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTransitionStore, originFrom } from "../contexts/transition";
import { useI18n, LANGS, LANG_LABELS } from "../contexts/i18n";
import dishAgneau from "@/assets/dish-agneau.jpg";

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
const MUTED = "#c9b896";
const EASE = "ease";

function LeafLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M20 4 C 22 14, 28 20, 30 30 C 28 40, 22 44, 20 48 C 18 44, 12 40, 10 30 C 12 20, 18 14, 20 4 Z" />
      <path d="M20 6 L20 46" />
      <path d="M20 14 C 16 16, 14 20, 13 24" />
      <path d="M20 14 C 24 16, 26 20, 27 24" />
    </svg>
  );
}

function MortarIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-[34px] h-[34px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 32 H50 L44 50 C 43 53, 41 54, 39 54 H25 C 23 54, 21 53, 20 50 Z" />
      <path d="M12 32 H52" />
      <path d="M38 32 L46 14" />
      <circle cx="46" cy="13" r="2.5" />
      <path d="M28 32 C 28 24, 24 20, 22 18" />
      <path d="M28 32 C 28 24, 32 20, 34 18" />
    </svg>
  );
}

function ClocheIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-[34px] h-[34px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 44 H52" />
      <path d="M14 44 C 14 32, 22 22, 32 22 C 42 22, 50 32, 50 44" />
      <circle cx="32" cy="20" r="2" />
      <path d="M10 48 H54" />
    </svg>
  );
}

function ChoicePage() {
  const { set } = useTransitionStore();
  const navigate = useNavigate();
  const { lang, t, setLang } = useI18n();

  const nextLang = () => {
    const idx = LANGS.indexOf(lang);
    setLang(LANGS[(idx + 1) % LANGS.length]);
  };

  const goComposer = (e: React.MouseEvent) => {
    set({ type: "theatre", origin: originFrom(e) });
    navigate({ to: "/carte" });
  };

  const goConfiance = (e: React.MouseEvent) => {
    set({ type: "theatre", origin: originFrom(e) });
    navigate({ to: "/menus" });
  };

  return (
    <main
      className="min-h-screen w-full text-[#e9dcc4] relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center top, #1f1610 0%, #120c08 60%, #0a0604 100%)" }}
    >
      {/* Language button — top right */}
      <div className="absolute top-4 right-5 z-20">
        <button
          type="button"
          onClick={nextLang}
          className="flex items-center gap-1.5 px-3 h-9 rounded-md border text-sm transition hover:bg-[#c9a96a]/10"
          style={{ borderColor: "rgba(201,169,106,.4)", color: CREAM, fontFamily: SERIF }}
          aria-label="Changer de langue"
        >
          {LANG_LABELS[lang]}
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9 L 12 15 L 18 9" />
          </svg>
        </button>
      </div>

      {/* Bottom photo vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[34%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(180deg, transparent, rgba(10,6,4,.88) 70%, #0a0604), url(${dishAgneau})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center">
        {/* Logo */}
        <header className="flex flex-col items-center text-center">
          <LeafLogo className="w-[22px] h-[28px] text-[#c9a96a] mb-[10px]" />
          <h1
            className="leading-none"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "42px", letterSpacing: ".18em", color: CREAM }}
          >
            L&apos;AMI
          </h1>
          <div style={{ fontFamily: SERIF_SC, fontSize: "8px", letterSpacing: ".45em", color: MUTED, marginTop: "8px" }}>
            SOFITEL BÉNIN
          </div>
        </header>

        {/* Welcome */}
        <section className="mt-9 text-center">
          <h2
            style={{
              fontFamily: SERIF, fontWeight: 400, fontSize: "26px", letterSpacing: ".3em", color: CREAM,
              animation: `lamEmerge 1.1s ${EASE} .45s both`,
            }}
          >
            {t.welcome}
          </h2>
          <p
            style={{
              fontFamily: SERIF, fontSize: "15px", color: MUTED, textAlign: "center", lineHeight: 1.5, margin: "12px 0 0",
              animation: `lamEmerge 1.1s ${EASE} .62s both`,
            }}
          >
            {t.welcome_sub.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-[22px]">
          <span className="h-px w-10" style={{ background: "rgba(201,169,106,.3)" }} />
          <span style={{ color: GOLD, fontSize: "9px" }}>✦</span>
          <span className="h-px w-10" style={{ background: "rgba(201,169,106,.3)" }} />
        </div>

        {/* Cards */}
        <section className="w-full grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goComposer}
            className="relative rounded-sm border px-[14px] py-6 flex flex-col items-center text-center overflow-hidden transition"
            style={{ borderColor: `${GOLD}66`, background: "linear-gradient(180deg, rgba(30,22,16,.7), rgba(18,13,9,.85))", boxShadow: "inset 0 0 40px rgba(0,0,0,.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${GOLD}E6`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${GOLD}66`)}
          >
            <div className="w-[60px] h-[60px] rounded-full border flex items-center justify-center mb-[18px]" style={{ borderColor: `${GOLD}99`, color: GOLD }}>
              <MortarIcon />
            </div>
            <h3 className="leading-[1.15]" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "17px", letterSpacing: ".08em", color: CREAM, margin: 0 }}>
              {t.compose_title.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
            </h3>
            <span className="block h-px w-[34px] my-[14px]" style={{ background: `${GOLD}80` }} />
            <p style={{ fontFamily: SERIF, fontSize: "12px", lineHeight: 1.4, color: "rgba(201,184,150,.9)", margin: 0 }}>
              {t.compose_desc}
            </p>
            <span style={{ fontFamily: SERIF, color: GOLD, fontSize: "22px", marginTop: "16px" }}>‹</span>
          </button>

          <button
            type="button"
            onClick={goConfiance}
            className="relative rounded-sm border px-[14px] py-6 flex flex-col items-center text-center overflow-hidden transition"
            style={{ borderColor: `${GOLD}66`, background: "linear-gradient(180deg, rgba(30,22,16,.7), rgba(18,13,9,.85))", boxShadow: "inset 0 0 40px rgba(0,0,0,.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${GOLD}E6`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${GOLD}66`)}
          >
            <div className="w-[60px] h-[60px] rounded-full border flex items-center justify-center mb-[18px]" style={{ borderColor: `${GOLD}99`, color: GOLD }}>
              <ClocheIcon />
            </div>
            <h3 className="leading-[1.15]" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "17px", letterSpacing: ".08em", color: CREAM, margin: 0 }}>
              {t.trust_title.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
            </h3>
            <span className="block h-px w-[34px] my-[14px]" style={{ background: `${GOLD}80` }} />
            <p style={{ fontFamily: SERIF, fontSize: "12px", lineHeight: 1.4, color: "rgba(201,184,150,.9)", margin: 0 }}>
              {t.trust_desc}
            </p>
            <span style={{ fontFamily: SERIF, color: GOLD, fontSize: "22px", marginTop: "16px" }}>›</span>
          </button>
        </section>

        {/* Quote */}
        <blockquote className="mt-auto pt-8 text-center pb-8">
          <p className="italic leading-relaxed" style={{ fontFamily: SERIF, fontSize: "14px", color: "rgba(233,220,196,.85)", lineHeight: 1.5, margin: 0 }}>
            {t.choice_quote.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
          </p>
          <footer className="mt-[7px]" style={{ fontFamily: SERIF, fontSize: "11px", color: "rgba(201,169,106,.9)" }}>
            {t.choice_author}
          </footer>
        </blockquote>
      </div>
    </main>
  );
}
