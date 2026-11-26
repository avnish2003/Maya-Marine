"use client";
/* ==========================================================================
   Motion controller — Lenis smooth scroll + every GSAP/ScrollTrigger animation.
   Animation start-states live in CSS under `html.anim`, a class that is only
   added when JS runs AND the user does not prefer reduced motion.
   ========================================================================== */
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window { __lenis?: Lenis; __mmalReady?: boolean; __heroReady?: boolean }
}

const EASE = "power3.out";

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const animate = root.classList.contains("anim");
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];

    /* ---------- Lazy background images (data-bg) — always on ---------- */
    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.style.setProperty("--bg", `url("${el.dataset.bg}")`);
        bgObserver.unobserve(el);
      });
    }, { rootMargin: "600px 0px" });
    document.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => bgObserver.observe(el));
    /* Sections added/moved after load also get their background */
    const bgMo = new MutationObserver((recs) => recs.forEach((r) => r.addedNodes.forEach((n) => {
      if (!(n instanceof HTMLElement)) return;
      if (n.matches("[data-bg]")) bgObserver.observe(n);
      n.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => bgObserver.observe(el));
    })));
    bgMo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => { bgObserver.disconnect(); bgMo.disconnect(); });

    /* ---------- Smooth scroll (Lenis) ---------- */
    let lenis: Lenis | undefined;
    if (animate) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      if (!window.__mmalReady) lenis.stop();
      cleanups.push(() => { gsap.ticker.remove(raf); lenis!.destroy(); window.__lenis = undefined; });
    }

    /* ---------- In-page anchor links ---------- */
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const target = hash === "#" || hash === "#home" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      const go = () => {
        if (lenis) lenis.scrollTo(target, { duration: 1.4, force: true });
        else if (target === 0) window.scrollTo({ top: 0 });
        else target.scrollIntoView();
      };
      /* If a drawer is open, wait until it has closed and scrolling is unlocked */
      if (root.classList.contains("menu-open")) setTimeout(go, 80);
      else go();
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onAnchor);
    cleanups.push(() => document.removeEventListener("click", onAnchor));

    if (!animate) return () => cleanups.forEach((fn) => fn());

    const ctx = gsap.context(() => {
      /* ---------- HERO intro (plays once the loader finishes) ---------- */
      const intro = () => {
        lenis?.start();
        gsap.timeline({ defaults: { ease: EASE } })
          .to(".hero-media", { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
          .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.9 }, 0.15)
          .fromTo(".hero-title .w > span", { y: 0, yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.25)
          .to(".hero-sub", { opacity: 1, y: 0, duration: 1 }, "-=0.55")
          .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
          .to(".hero-badges", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
          .to(".nav-bar", { opacity: 1, y: 0, duration: 0.9 }, 0.1);
      };
      if (window.__mmalReady) intro();
      else window.addEventListener("mmal:ready", intro, { once: true });

      /* Hero content drifts up & fades as you scroll away */
      gsap.to(".hero-inner", { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    });

    /* ---------- Scroll reveals (IntersectionObserver) ----------
       Uses the element's real on-screen position, so it can never get out of
       sync with pinned sections, lazy images or late layout changes. */
    const reveal = (el: HTMLElement, instant = false) => {
      if (el.hasAttribute("data-clip")) {
        if (instant) { gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" }); return; }
        gsap.timeline()
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut", delay: Number(el.dataset.delay || 0) })
          .from(el.querySelector("img"), { scale: 1.25, duration: 1.4, ease: EASE }, "<");
        return;
      }
      if (el.hasAttribute("data-count")) {
        const end = Number(el.dataset.count), obj = { v: 0 };
        const dec = Number(el.dataset.decimals || 0); // e.g. 440.5 → 1 decimal
        const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (instant) { el.textContent = fmt(end); return; }
        gsap.to(obj, { v: end, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = fmt(dec ? obj.v : Math.round(obj.v)); } });
        return;
      }
      if (instant) gsap.set(el, { opacity: 1, y: 0 });
      else gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: EASE, delay: Number(el.dataset.delay || 0) });
    };
    const io = new IntersectionObserver((entries) => {
      let n = 0;
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          io.unobserve(el);
          if (el.hasAttribute("data-stagger")) el.dataset.delay = String(0.12 * n++);
          reveal(el);
        } else if (e.boundingClientRect.bottom < 0) { io.unobserve(el); reveal(el, true); } // already scrolled past
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => { el.textContent = "0"; });
    const SEL = "[data-reveal],[data-stagger],[data-clip],[data-count]";
    document.querySelectorAll<HTMLElement>(SEL).forEach((el) => io.observe(el));

    /* Content added or re-rendered after load (client components, hot updates)
       must also be revealed — otherwise it would stay invisible. */
    const mo = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(SEL)) io.observe(node);
        node.querySelectorAll<HTMLElement>(SEL).forEach((el) => io.observe(el));
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => mo.disconnect());
    cleanups.push(() => io.disconnect());

    /* ---------- Breakpoint / pointer specific motion ---------- */
    const mm = gsap.matchMedia();

    /* Fleet: pinned horizontal scroll on tablet & desktop (native swipe on mobile) */
    mm.add("(min-width: 768px)", () => {
      const track = document.querySelector<HTMLElement>(".fleet-track");
      const bar = document.querySelector<HTMLElement>(".fleet-progress span");
      if (!track) return;
      const dist = () => track.scrollWidth - track.clientWidth;
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: ".fleet", pin: true, scrub: 1, start: "top top", end: () => `+=${dist()}`, invalidateOnRefresh: true,
          onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
        },
      });
    });

    /* Magnetic buttons + custom cursor — fine pointers only */
    mm.add("(pointer: fine)", () => {
      const offs: (() => void)[] = [];
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE });
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        offs.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
      });

      const dot = document.querySelector<HTMLElement>(".cursor-dot");
      const ring = document.querySelector<HTMLElement>(".cursor-ring");
      if (dot && ring) {
        root.classList.add("has-cursor");
        const dx = gsap.quickTo(dot, "x", { duration: 0.1 }), dy = gsap.quickTo(dot, "y", { duration: 0.1 });
        const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: EASE }), ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: EASE });
        const move = (e: MouseEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); root.classList.add("cursor-on"); };
        const over = (e: MouseEvent) => root.classList.toggle("cursor-hover", !!(e.target as HTMLElement).closest("a, button, input, [data-magnetic]"));
        const out = () => root.classList.remove("cursor-on");
        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", over);
        document.addEventListener("mouseleave", out);
        offs.push(() => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseleave", out); root.classList.remove("has-cursor", "cursor-on", "cursor-hover"); });
      }
      return () => offs.forEach((fn) => fn());
    });

    /* Recalculate trigger positions once lazy images have laid out */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    cleanups.push(() => { window.removeEventListener("load", refresh); mm.revert(); ctx.revert(); });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  /* Custom cursor elements (hidden unless a fine pointer is detected) */
  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
