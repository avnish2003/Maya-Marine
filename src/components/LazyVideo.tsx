"use client";
/* Background video that only downloads when it nears the viewport, plays while
   visible and pauses off-screen. Skipped entirely on < 768px (poster only). */
import { useEffect, useRef } from "react";

export default function LazyVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !window.matchMedia("(min-width: 768px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) { v.src = src; v.load(); }
        if (!reduce) v.play().catch(() => {});
      } else if (v.src) v.pause();
    }, { rootMargin: "300px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}
