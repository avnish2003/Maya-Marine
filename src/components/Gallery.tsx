"use client";
/* 4f. GALLERY — company YouTube films in a swipeable slider; clicking a card
   plays the video in a lightbox (privacy-enhanced YouTube embed). */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { GALLERY, YOUTUBE_CHANNEL } from "@/data/gallery";

const thumb = (id: string, hd: boolean) => `https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`;

export default function Gallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [prog, setProg] = useState(0);
  const close = useCallback(() => setPlaying(null), []);

  /* Prev / next: scroll by one card */
  const step = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector("li");
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  /* Disable arrows at the ends */
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const update = () => {
      setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth > t.scrollWidth - 8 });
      const max = t.scrollWidth - t.clientWidth;
      setProg(max > 0 ? t.scrollLeft / max : 1);
    };
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { t.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  /* Lightbox: lock scroll, Escape to close, restore focus */
  useEffect(() => {
    if (playing === null) return;
    const prev = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    document.documentElement.classList.add("menu-open");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.classList.remove("menu-open");
      prev?.focus();
    };
  }, [playing, close]);

  return (
    <section id="gallery" className="gal" aria-labelledby="gal-title">
      <div className="container gal-head">
        <div>
          <p className="eyebrow" data-reveal>Our Gallery</p>
          <h2 id="gal-title" className="section-title" data-reveal>Transparency Leads To Dependability!</h2>
        </div>
        <div className="gal-actions" data-reveal>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="gal-yt">View all on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button type="button" className="gal-nav" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous videos"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" className="gal-nav" onClick={() => step(1)} disabled={edge.end} aria-label="Next videos"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>

      <ul ref={trackRef} className="gal-track" data-lenis-prevent-wheel aria-label="Company videos">
        {GALLERY.map((v, i) => (
          <li key={v.id} className="gal-card" data-stagger={i < 4 ? "" : undefined}>
            <button type="button" className="gal-btn" onClick={() => setPlaying(i)} aria-label={`Play video: ${v.title}`}>
              <span className="gal-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(v.id, v.hd)} alt="" loading="lazy" decoding="async" width={1280} height={720} />
                <span className="gal-play" aria-hidden="true"><Play size={20} fill="currentColor" /></span>
              </span>
              <span className="gal-meta">
                <span className="gal-date">{v.date}</span>
                <span className="gal-title">{v.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="container"><div className="gal-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.06, prog)})` }} /></div></div>

      {playing !== null && (
        <div className="gal-lightbox" role="dialog" aria-modal="true" aria-label={GALLERY[playing].title} onClick={close}>
          <div className="gal-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button ref={closeRef} type="button" className="gal-lightbox-x" onClick={close} aria-label="Close video"><X size={22} aria-hidden="true" /></button>
            <div className="gal-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${GALLERY[playing].id}?autoplay=1&rel=0&modestbranding=1`}
                title={GALLERY[playing].title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <p className="gal-caption">{GALLERY[playing].title} <span>{GALLERY[playing].date}</span></p>
          </div>
        </div>
      )}
    </section>
  );
}
