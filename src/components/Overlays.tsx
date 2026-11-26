"use client";
/* ==========================================================================
   Overlays — left Menu drawer · right Contact drawer · Inquiry modal ·
   floating "Inquiry Now" button.
   Any element with data-open="menu" | "contact" | "inquiry" opens a panel
   (works from server-rendered markup too).
   ========================================================================== */
import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, Building2, ChevronDown, CircleCheck, CircleHelp, House, Image as ImageIcon, Mail, MapPin, Phone, Send, Settings, User, X } from "lucide-react";
import Logo from "@/components/Logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/Icon";
import { COMPANY, GROUP, SERVICES, SOCIALS } from "@/data/site";

type Panel = "menu" | "contact" | "inquiry" | null;

/* Menu items (same order as the company's existing site). Items without an
   href don't have a page yet and show a "Soon" tag. */
const MENU = [
  { label: "Home", href: "#home", icon: House },
  { label: "About", href: "#about", icon: User },
  { label: "Services", href: "#our-services", icon: Settings },
  { label: "Gallery", href: null, icon: ImageIcon },
  { label: "FAQ", href: null, icon: CircleHelp },
  { label: "Blogs", href: null, icon: BookOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];
const SOCIAL_ICONS = { LinkedIn: LinkedInIcon, X: XIcon, Instagram: InstagramIcon, Facebook: FacebookIcon, YouTube: YouTubeIcon };

export default function Overlays() {
  const [panel, setPanel] = useState<Panel>(null);
  const [ready, setReady] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setPanel(null), []);

  /* Open from any [data-open] trigger */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-open]");
      if (!t) return;
      e.preventDefault();
      opener.current = t;
      setPanel(t.dataset.open as Panel);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* Floating button appears after the loader, once the visitor scrolls past most of the hero */
  useEffect(() => {
    /* …and steps aside at the very bottom so it never covers the footer bar */
    const update = () => {
      const y = window.scrollY, vh = window.innerHeight;
      const atBottom = y + vh > document.documentElement.scrollHeight - 140;
      setReady(!!window.__mmalReady && y > vh * 0.55 && !atBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("mmal:ready", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("mmal:ready", update); };
  }, []);

  /* Scroll lock, Escape, focus handling while a panel is open */
  useEffect(() => {
    if (!panel) return;
    const root = document.documentElement;
    window.__lenis?.stop();
    root.classList.add("menu-open");
    const box = document.querySelector<HTMLElement>(`[data-panel="${panel}"]`);
    const focusT = setTimeout(() => box?.querySelector<HTMLElement>("[data-autofocus], button, a, input")?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    const back = opener.current;
    return () => {
      clearTimeout(focusT);
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      root.classList.remove("menu-open");
      back?.focus({ preventScroll: true });
    };
  }, [panel]);

  return (
    <>
      {/* Shared scrim */}
      <div className={`scrim${panel ? " is-on" : ""}`} onClick={close} aria-hidden="true" />

      {/* ---------- LEFT: Menu drawer ---------- */}
      <aside data-panel="menu" className={`drawer drawer-left${panel === "menu" ? " is-open" : ""}`} aria-label="Site menu" aria-hidden={panel !== "menu"} inert={panel !== "menu"}>
        <div className="drawer-head">
          <Logo id="dm" className="drawer-logo" />
          <p className="drawer-title">Menu</p>
          <button type="button" className="drawer-x" onClick={close} aria-label="Close menu" data-autofocus><X size={22} aria-hidden="true" /></button>
        </div>
        {/* Scrollable body: menu links */}
        <div className="drawer-scroll" data-lenis-prevent>
          <nav className="drawer-nav" aria-label="Site menu links">
            <ul>
              {MENU.map((m, i) => (
                <li key={m.label} style={{ "--i": i } as React.CSSProperties}>
                  {m.href ? (
                    <a href={m.href} onClick={close}><span className="dn-ic"><m.icon size={18} aria-hidden="true" /></span><span className="dn-txt">{m.label}</span></a>
                  ) : (
                    <span className="dn-soon" aria-disabled="true"><span className="dn-ic"><m.icon size={18} aria-hidden="true" /></span><span className="dn-txt">{m.label}</span><em>Soon</em></span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="drawer-foot" style={{ "--i": MENU.length + 1 } as React.CSSProperties}>
          <ul className="df-social" aria-label="Social media">
            {SOCIALS.map((s) => { const Ic = SOCIAL_ICONS[s.name]; return (<li key={s.name}><a href={s.href} aria-label={s.name}><Ic size={15} /></a></li>); })}
          </ul>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setPanel("inquiry")}><Send size={15} aria-hidden="true" /> Inquiry Now</button>
        </div>
      </aside>

      {/* ---------- RIGHT: Contact drawer ---------- */}
      <aside data-panel="contact" className={`drawer drawer-right${panel === "contact" ? " is-open" : ""}`} aria-label="Contact us" aria-hidden={panel !== "contact"} inert={panel !== "contact"}>
        <div className="drawer-head">
          <p className="drawer-title lg">Contact Us</p>
          <button type="button" className="drawer-x" onClick={close} aria-label="Close contact panel" data-autofocus><X size={22} aria-hidden="true" /></button>
        </div>
        <div className="drawer-scroll" data-lenis-prevent>
          <ContactAccordion />
        </div>
        <ul className="drawer-social" aria-label="Social media">
          {SOCIALS.map((s) => { const Ic = SOCIAL_ICONS[s.name]; return (<li key={s.name}><a href={s.href} aria-label={s.name}><Ic size={16} /></a></li>); })}
        </ul>
      </aside>

      {/* ---------- Inquiry modal ---------- */}
      <div data-panel="inquiry" className={`inq${panel === "inquiry" ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="inq-title" aria-hidden={panel !== "inquiry"} inert={panel !== "inquiry"} onClick={close}>
        <div className="inq-box" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="drawer-x inq-x" onClick={close} aria-label="Close inquiry form"><X size={22} aria-hidden="true" /></button>
          {panel === "inquiry" && <InquiryForm onDone={close} />}
        </div>
      </div>

      {/* ---------- Floating Inquiry button ---------- */}
      <button type="button" className={`fab${ready && panel !== "inquiry" ? " is-on" : ""}`} data-open="inquiry" data-magnetic aria-haspopup="dialog">
        <span className="fab-ring" aria-hidden="true" />
        <Send size={18} aria-hidden="true" /> <span>Inquiry Now</span>
      </button>
    </>
  );
}

/* ---------- Contact accordion (group companies) ---------- */
function ContactAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="acc">
      {GROUP.map((g, i) => {
        const isOpen = open === i;
        const id = `acc-${i}`;
        return (
          <li key={g.name} className={`acc-item${isOpen ? " is-open" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <button type="button" className="acc-btn" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="acc-logo"><Logo id={`acc${i}`} variant="mark" /></span>
              <span className="acc-name"><strong>{g.name}</strong><small>{g.tag}</small></span>
              <ChevronDown className="acc-chev" size={18} aria-hidden="true" />
            </button>
            <div id={id} className="acc-panel" role="region" aria-label={g.name}>
              <div className="acc-inner">
                <ul className="acc-list">
                  {g.entries.map((e, k) => (
                    <li key={k} className={`acc-row k-${e.kind}`}>
                      {e.kind === "office" && <><Building2 size={16} aria-hidden="true" /><span><strong>{e.label}</strong> — {e.note}</span></>}
                      {e.kind === "address" && <><MapPin size={16} aria-hidden="true" /><span>{e.text}</span></>}
                      {e.kind === "phone" && <><Phone size={16} aria-hidden="true" /><a href={e.href}>{e.text}</a></>}
                      {e.kind === "email" && <><Mail size={16} aria-hidden="true" /><a href={e.href}>{e.text}</a></>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Inquiry form → opens the visitor's mail app, prefilled ---------- */
function InquiryForm({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const body = [`Name: ${v("name")}`, `Company: ${v("company")}`, `Email: ${v("email")}`, `Phone: ${v("phone")}`, `Service: ${v("service")}`, "", v("message")].join("\n");
    /* TODO: swap for an API route / form service to receive inquiries server-side */
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Inquiry: ${v("service")} — ${v("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="inq-done" role="status">
        <CircleCheck size={64} strokeWidth={1.5} aria-hidden="true" />
        <h2 id="inq-title">Thank you!</h2>
        <p>Your email app has opened with the inquiry ready to send. Our team replies within one business day. For anything urgent, call <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>.</p>
        <button type="button" className="btn btn-dark" onClick={onDone}>Close</button>
      </div>
    );
  }

  return (
    <form className="inq-form" onSubmit={submit}>
      <p className="eyebrow">Inquiry</p>
      <h2 id="inq-title">Tell Us About Your Requirement</h2>
      <p className="inq-sub">Towage, shipyard, offshore or logistics — share a few details and we&rsquo;ll get back with a proposal.</p>
      <div className="inq-grid">
        <label className="fld"><span>Full name *</span><input name="name" required autoComplete="name" data-autofocus /></label>
        <label className="fld"><span>Company</span><input name="company" autoComplete="organization" /></label>
        <label className="fld"><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
        <label className="fld"><span>Phone *</span><input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+()\-\s]{7,}" /></label>
        <label className="fld full"><span>Service required *</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (<option key={s.title}>{s.title}</option>))}
            <option>Project Management Consultancy</option>
            <option>Other</option>
          </select>
        </label>
        <label className="fld full"><span>Message *</span><textarea name="message" rows={4} required placeholder="Vessel type, location, dates, scope…" /></label>
      </div>
      <button type="submit" className="btn btn-primary btn-lg inq-submit"><Send size={18} aria-hidden="true" /> Send Inquiry</button>
    </form>
  );
}
