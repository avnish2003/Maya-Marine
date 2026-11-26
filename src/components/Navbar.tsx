"use client";
/* 1. HEADER — logo + a single "Menu" button (opens the menu drawer).
   Transparent over the hero, frosted navy after 80px, hides on scroll down. */
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 600 && y > last + 4);
      if (y < last - 4 || y < 600) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}`}>
      <nav className="nav-bar container" aria-label="Main navigation">
        <a href="#home" className="nav-logo" aria-label="Maya Marine & Logistics — back to top">
          {/* Official registered logo (white, transparent) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/maya-logo-white.png" alt="Maya Marine & Logistics" width={490} height={493} fetchPriority="high" />
        </a>
        <button type="button" className="menu-btn" data-open="menu" aria-label="Open menu" aria-haspopup="dialog">
          <span className="menu-txt">Menu</span>
          <span className="menu-ic" aria-hidden="true"><i /><i /></span>
        </button>
      </nav>
    </header>
  );
}
