"use client";
/* 4d. ISO CERTIFICATIONS — white theme.
   Left: three capability cards. Right: two certificate cards with a full-size viewer. */
import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, X } from "lucide-react";
import { Icon, type IconName } from "@/components/Icon";

const CAPABILITIES: { title: string; icon: IconName; text: string }[] = [
  { title: "Marine Engineering", icon: "wrench", text: "Advanced dry dock engineering and technical marine support services." },
  { title: "Naval Refits", icon: "shield", text: "Specialised repair and modernisation solutions for defence and marine vessels." },
  { title: "Ship Building", icon: "ship", text: "Construction and fabrication support for tugboats, barges and marine infrastructure." },
];

const CERTS = [
  { title: "Quality Management System", tag: "ISO 9001:2015", src: "/media/iso-9001-certificate.png", alt: "ABS Quality Evaluations ISO 9001:2015 Certificate of Conformance for Maya Marine & Logistics" },
  { title: "Certified Operational Facilities", tag: "Annex Certification", src: "/media/iso-9001-annex.webp", alt: "ISO 9001:2015 Certificate of Conformance annex listing Maya Marine & Logistics facilities in Bhavnagar and Ghogha" },
];

export default function Certifications() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);

  /* Viewer: lock scroll, Escape to close, return focus */
  useEffect(() => {
    if (open === null) return;
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
  }, [open, close]);

  return (
    <section id="certifications" className="iso" aria-labelledby="iso-title">
      <div className="container">
        <div className="iso-head">
          <p className="eyebrow center" data-reveal>ISO Certifications</p>
          <h2 id="iso-title" className="section-title center" data-reveal>Certified Excellence &amp; Global Standards</h2>
          <p className="iso-intro" data-reveal>Maya Marine &amp; Logistics follows internationally recognised quality and operational standards to ensure reliability, safety and engineering excellence across marine services.</p>
        </div>

        <div className="iso-grid">
          <ul className="iso-caps">
            {CAPABILITIES.map((c) => (
              <li key={c.title} className="iso-cap" data-stagger>
                <span className="iso-cap-ic"><Icon name={c.icon} size={24} /></span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="iso-certs">
            {CERTS.map((c, i) => (
              <figure key={c.src} className="iso-cert" data-stagger>
                <button type="button" className="iso-cert-img" onClick={() => setOpen(i)} aria-label={`View ${c.title} certificate full size`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" width={600} height={847} />
                  <span className="iso-view" aria-hidden="true"><Eye size={18} /></span>
                </button>
                <figcaption>
                  <strong>{c.title}</strong>
                  <span>{c.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="iso-meta" data-reveal>
          Issued by <b>ABS Quality Evaluations</b><i aria-hidden="true" />Certificate No. <b>QMS10594</b><i aria-hidden="true" />Valid until <b>07 May 2029</b>
        </p>
      </div>

      {/* Full-size certificate viewer */}
      {open !== null && (
        <div className="iso-viewer" role="dialog" aria-modal="true" aria-label={CERTS[open].title} onClick={close}>
          <div className="iso-viewer-box" onClick={(e) => e.stopPropagation()}>
            <button ref={closeRef} type="button" className="iso-viewer-x" onClick={close} aria-label="Close certificate"><X size={22} aria-hidden="true" /></button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CERTS[open].src} alt={CERTS[open].alt} />
          </div>
        </div>
      )}
    </section>
  );
}
