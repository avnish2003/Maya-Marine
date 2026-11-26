"use client";
/* 2. HERO — full-viewport company video (poster image on < 768px), service label,
   word-by-word headline, CTAs, recognition badge and "Watch Our Story" lightbox. */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { MEDIA } from "@/data/site";

const HEADLINE = "Powering Marine Operations From Gujarat To The World";
const LINE = ["Shipyard", "Towage", "Offshore"];
const DESKTOP_MQ = "(min-width: 768px)";

/* Media-query subscription (SSR renders the lightweight poster first) */
const subscribe = (cb: () => void) => { const m = window.matchMedia(DESKTOP_MQ); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); };
const useIsDesktop = () => useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_MQ).matches, () => false);

/* Tell the loader the hero is ready to be revealed */
const signalReady = () => {
  if (window.__heroReady) return;
  window.__heroReady = true;
  window.dispatchEvent(new Event("mmal:hero-ready"));
};

export default function Hero() {
  const isDesktop = useIsDesktop();
  const posterRef = useRef<HTMLImageElement>(null);
  const [story, setStory] = useState(false);

  /* Mobile: no video, so the poster image is the "ready" signal */
  useEffect(() => {
    if (isDesktop) return;
    const img = posterRef.current;
    if (img?.complete) signalReady();
  }, [isDesktop]);

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        {/* Poster doubles as the mobile hero and the slow-connection fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={posterRef} src={MEDIA.heroPoster} alt="" className="hero-poster" fetchPriority="high" onLoad={() => !isDesktop && signalReady()} />
        {isDesktop && (
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={MEDIA.heroPoster} onLoadedData={signalReady} onError={signalReady}>
            <source src={MEDIA.heroVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner container">
        <p className="hero-eyebrow" aria-label="Shipyard, Towage, Offshore">
          {LINE.map((w, i) => (
            <span key={w} className="he-item" aria-hidden="true">
              {i > 0 && <i />}
              <span className="he-word">{w}</span>
            </span>
          ))}
        </p>
        <h1 className="hero-title" aria-label={HEADLINE}>
          {HEADLINE.split(" ").map((w, i) => (
            <span key={i}><span className="w" aria-hidden="true"><span>{w}</span></span>{" "}</span>
          ))}
        </h1>
        <p className="hero-sub">Towage, shipyard, offshore and logistics expertise from the Gulf of Khambhat, trusted by owners, ports and navies across three continents. We assist ships to their last port.</p>
        <div className="hero-ctas">
          <a href="#our-services" className="btn btn-primary btn-lg" data-magnetic>Explore Services <ArrowRight size={18} aria-hidden="true" /></a>
          <button type="button" className="btn btn-outline btn-lg" data-magnetic onClick={() => setStory(true)} aria-haspopup="dialog">
            <span className="play-ic"><Play size={14} fill="currentColor" aria-hidden="true" /></span> Watch Our Story
          </button>
        </div>
      </div>

      {/* Recognition badge */}
      <div className="hero-badges" aria-label="Recognition: featured in Forbes India and recognised by Startup India">
        <span className="hb-label">As featured in</span>
        <span className="hb-row" aria-hidden="true">
          <span className="hb-forbes">Forbes<sup>India</sup></span>
          <span className="hb-sep" />
          <span className="hb-startup"><b>#</b>startupindia</span>
        </span>
      </div>

      {story && <VideoModal onClose={() => setStory(false)} />}
    </section>
  );
}

/* ---------- Video lightbox ---------- */
function VideoModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.__lenis?.stop();
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.classList.remove("menu-open");
      prev?.focus();
    };
  }, [close]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Our story video" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="modal-close" onClick={close} aria-label="Close video"><X size={22} aria-hidden="true" /></button>
        <video src={MEDIA.storyVideo} controls autoPlay playsInline preload="auto" poster={MEDIA.heroPoster} />
      </div>
    </div>
  );
}
