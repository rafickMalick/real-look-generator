import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useTransitionStore } from "../contexts/transition";
import { useI18n } from "../contexts/i18n";
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
const SLIDE_EASE = "cubic-bezier(.5,0,.15,1)";
const IRIS_EASE  = "cubic-bezier(.4,.02,.18,1)";
const ACT_IMAGES = [dishActe1, dishCarpaccio, dishAgneau, dishChocolat];
const ACT_NUMS = ["I", "II", "III", "IV"];

function pad(n: number) { return n < 10 ? "0" + n : "" + n; }

function ExperiencePage() {
  const [cur, setCur]   = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir]   = useState(1);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelRef  = useRef(0);
  const touchStartRef = useRef(0);
  const pageRef       = useRef<HTMLElement>(null);

  const { get, set } = useTransitionStore();
  const navigate = useNavigate();
  const { t } = useI18n();

  // Capture iris origin before PageTransition cleanup clears it
  const [irisOrigin] = useState(() => {
    const s = get();
    return s.type === "iris" ? s.origin : "";
  });

  // Delay text until iris is fully open (~1000ms)
  const [textReady, setTextReady] = useState(() => get().type !== "iris");
  useEffect(() => {
    if (!textReady) {
      const timer = setTimeout(() => setTextReady(true), 1000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    if (i === cur || i < 0 || i >= t.acts.length || timerRef.current !== null) return;
    setDir(i > cur ? 1 : -1);
    setPrev(cur);
    setCur(i);
    timerRef.current = setTimeout(() => {
      setPrev(null);
      timerRef.current = null;
    }, 900);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelRef.current < 650) return;
    if (Math.abs(e.deltaY) < 12) return;
    if (timerRef.current !== null) return;
    lastWheelRef.current = now;
    if (e.deltaY > 0) goTo(cur + 1);
    else goTo(cur - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartRef.current;
    if (dy < -36) goTo(cur + 1);
    else if (dy > 36) goTo(cur - 1);
  };

  const handleBack = () => {
    if (irisOrigin && pageRef.current) {
      const clone = pageRef.current.cloneNode(true) as HTMLElement;
      const [ox, oy] = irisOrigin.split(" ");
      Object.assign(clone.style, {
        position: "fixed",
        inset: "0",
        zIndex: "100",
        pointerEvents: "none",
        overflow: "hidden",
      });
      clone.style.setProperty("--ox", ox);
      clone.style.setProperty("--oy", oy);
      clone.style.animation = `lamIrisCloseBlur 1.1s ${IRIS_EASE} both`;
      document.body.appendChild(clone);
      setTimeout(() => clone.remove(), 1200);
      set({ type: "iris-close", origin: irisOrigin });
    } else {
      set({ type: "back", origin: "50% 50%" });
    }
    navigate({ to: "/menus" });
  };

  const act = t.acts[cur];

  return (
    <main
      ref={pageRef}
      className="min-h-screen w-full overflow-hidden relative"
      style={{ background: "#0c0907" }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Image stage — full bleed */}
      <div className="absolute inset-0 overflow-hidden">
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={ACT_IMAGES[prev]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: `${dir > 0 ? "lamSlideOutUp" : "lamSlideOutDown"} .9s ${SLIDE_EASE} both`, zIndex: 1 }}
          />
        )}
        <img
          key={`cur-${cur}`}
          src={ACT_IMAGES[cur]}
          alt={`${act.t1} ${act.t2}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: prev !== null ? `${dir > 0 ? "lamSlideInUp" : "lamSlideInDown"} .9s ${SLIDE_EASE} both` : "none", zIndex: 2 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, background: "linear-gradient(180deg, rgba(12,9,7,.62) 0%, rgba(12,9,7,0) 28%, rgba(12,9,7,.18) 48%, rgba(12,9,7,.94) 86%)" }}
        />
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={handleBack}
        className="absolute flex items-center justify-center rounded-full border backdrop-blur-sm transition"
        style={{ top: "clamp(32px,6vw,42px)", left: "clamp(16px,4vw,22px)", width: "34px", height: "34px", borderColor: "rgba(201,169,106,.5)", background: "rgba(8,5,3,.4)", color: CREAM, zIndex: 25 }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,169,106,.18)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(8,5,3,.4)")}
        aria-label="Retour"
      >
        <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6 L 9 12 L 15 18" />
        </svg>
      </button>

      {/* Logo centered top */}
      <div className="absolute left-0 right-0 flex flex-col items-center pointer-events-none" style={{ top: "clamp(38px,7vw,46px)", zIndex: 20 }}>
        <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "21px", letterSpacing: ".16em", color: "#f3ead8", lineHeight: 1, textShadow: "0 2px 16px rgba(0,0,0,.8)" }}>L&apos;AMI</span>
        <span style={{ fontFamily: SERIF_SC, fontSize: "7px", letterSpacing: ".42em", color: "rgba(233,220,196,.8)", textShadow: "0 2px 12px rgba(0,0,0,.8)" }}>SOFITEL BÉNIN</span>
      </div>

      {/* Act counter */}
      <div className="absolute" style={{ top: "clamp(36px,7vw,44px)", right: "clamp(16px,4vw,22px)", fontFamily: SERIF, fontSize: "13px", letterSpacing: ".08em", color: "rgba(233,220,196,.85)", textShadow: "0 2px 10px rgba(0,0,0,.8)", zIndex: 20 }}>
        {pad(cur + 1)} <span style={{ color: "rgba(201,169,106,.7)" }}>/ {pad(t.acts.length)}</span>
      </div>

      {/* Text overlay — hidden until iris fully open, then animated in */}
      {textReady && (
        <div
          key={cur}
          className="absolute"
          style={{ left: "clamp(18px,5vw,26px)", right: "clamp(18px,5vw,26px)", bottom: "clamp(88px,16vw,104px)", zIndex: 4, animation: "lamTextUp .9s ease .1s both" }}
        >
          <div className="flex items-center gap-[10px] mb-3">
            <span style={{ fontFamily: SERIF_SC, color: GOLD, fontSize: "10.5px", letterSpacing: ".38em" }}>{act.label}</span>
            <span className="h-px flex-1 max-w-[44px]" style={{ background: `${GOLD}55` }} />
          </div>
          <h1 className="uppercase leading-[.94]" style={{ fontFamily: SERIF, fontWeight: 500, color: "#fff", fontSize: "clamp(2.2rem,9vw,3rem)", margin: 0 }}>
            <span className="block">{act.t1}</span>
            <span className="block">{act.t2}</span>
          </h1>
          <p className="italic leading-relaxed" style={{ fontFamily: SERIF, fontWeight: 300, color: `${CREAM}CC`, fontSize: "14.5px", margin: "14px 0 0", maxWidth: "260px" }}>
            {act.desc}
          </p>
          <div className="flex items-center gap-[9px] mt-[18px]">
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: GOLD }} />
            <span style={{ fontFamily: SERIF_SC, color: GOLD, fontSize: "10px", letterSpacing: ".26em" }}>{act.ing}</span>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 20, background: "linear-gradient(to top, rgba(8,5,3,.92), rgba(8,5,3,0))", padding: "24px 18px 14px", display: "flex", justifyContent: "space-between" }}
      >
        {t.acts.map((a, i) => {
          const active = i === cur;
          return (
            <button
              key={ACT_NUMS[i]}
              type="button"
              onClick={() => goTo(i)}
              className="flex flex-col items-center flex-1 p-0"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label={a.label}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: `1px solid ${active ? GOLD : "rgba(201,169,106,.22)"}`,
                  background: active ? "rgba(201,169,106,.12)" : "transparent",
                  color: active ? GOLD : "rgba(201,169,106,.4)",
                  fontFamily: SERIF, fontSize: "15px",
                  transform: active ? "scale(1.08)" : "scale(1)",
                  boxShadow: active ? "0 0 16px rgba(201,169,106,.2)" : "none",
                  transition: "all .6s cubic-bezier(.4,0,.2,1)",
                }}
              >
                {ACT_NUMS[i]}
              </span>
              <span style={{ fontFamily: SERIF_SC, fontSize: "7px", letterSpacing: ".12em", marginTop: "6px", color: active ? "rgba(201,169,106,.85)" : "rgba(201,169,106,.3)", transition: "color .6s" }}>
                {a.step}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
