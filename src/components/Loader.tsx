"use client";
/* Page loader — the Maya logo builds itself: tile rises in, the ship's bow is
   carved out piece by piece, MAYA letters draw on, tagline fades up, and a
   wave-line progress bar fills. Exits once the hero media is ready. */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "@/components/Logo";

const MIN_SHOW = 2300; // ms — lets the logo build fully
const MAX_WAIT = 5500; // ms — never block the page on a slow video

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    const animate = root.classList.contains("anim");
    const start = performance.now();
    let finished = false;

    /* Build-in timeline */
    let build: gsap.core.Timeline | undefined;
    if (el && animate) {
      const letters = el.querySelectorAll<SVGGeometryElement>(".lg-letter");
      letters.forEach((l) => { const len = l.getTotalLength(); gsap.set(l, { strokeDasharray: len, strokeDashoffset: len }); });
      build = gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(el.querySelector(".lg-box"), { y: 40, opacity: 0, duration: 0.9 })
        .from(el.querySelectorAll(".lg-cut"), { scale: 0, transformOrigin: "50% 50%", opacity: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.6)" }, "-=0.35")
        .to(letters, { strokeDashoffset: 0, duration: 0.7, stagger: 0.09, ease: "power2.inOut" }, "-=0.4")
        .from(el.querySelector(".lg-tag"), { opacity: 0, y: 14, duration: 0.6 }, "-=0.3")
        .from(el.querySelector(".lg-reg"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.5 }, "<")
        .from(el.querySelector(".loader-tag"), { opacity: 0, y: 10, duration: 0.6 }, "-=0.3");
      gsap.to(el.querySelector(".loader-bar span"), { scaleX: 0.85, duration: MIN_SHOW / 1000, ease: "power1.inOut" });
    }

    const done = () => {
      if (finished) return;
      finished = true;
      const reveal = () => {
        window.__mmalReady = true;
        root.classList.remove("is-loading");
        window.dispatchEvent(new Event("mmal:ready"));
      };
      if (!el || !animate) { if (el) el.hidden = true; reveal(); return; }
      build?.progress(1);
      gsap.timeline({ onComplete: () => { el.hidden = true; } })
        .to(el.querySelector(".loader-bar span"), { scaleX: 1, duration: 0.35, ease: "power2.out" })
        .to(el.querySelector(".loader-inner"), { y: -30, opacity: 0, duration: 0.6, ease: "power3.in" })
        .to(el, { yPercent: -100, duration: 1.1, ease: "power3.inOut" }, "-=0.2")
        .add(reveal, "-=0.6");
    };

    const finish = () => setTimeout(done, Math.max(0, MIN_SHOW - (performance.now() - start)));
    if (window.__heroReady) finish();
    else window.addEventListener("mmal:hero-ready", finish, { once: true });
    const safety = setTimeout(done, MAX_WAIT);
    return () => { clearTimeout(safety); window.removeEventListener("mmal:hero-ready", finish); build?.revert(); };
  }, []);

  return (
    <div ref={ref} className="loader" role="status" aria-label="Loading Maya Marine & Logistics">
      <div className="loader-wave" aria-hidden="true" />
      <div className="loader-inner" aria-hidden="true">
        <Logo id="ld" className="loader-logo" />
        <div className="loader-bar"><span /></div>
        <p className="loader-tag">Shipyard · Towage · Offshore</p>
      </div>
    </div>
  );
}
