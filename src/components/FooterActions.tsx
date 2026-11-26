"use client";
/* Footer back-to-top button (uses Lenis when smooth scrolling is active) */
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button type="button" className="to-top" data-magnetic aria-label="Back to top" onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6, force: true }) : window.scrollTo({ top: 0 }))}>
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
