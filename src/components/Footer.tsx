/* ==========================================================================
   14. FOOTER
   ① Brand row: official logo + social icons
   ② Offices strip: five offices in a divided row (no boxes)
   ③ Legal bar: copyright, protection & trademark, policies, back to top
   ④ Oversized outline wordmark
   ========================================================================== */
import { ArrowUpRight } from "lucide-react";
import Flag from "@/components/Flag";
import { BackToTop } from "@/components/FooterActions";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/Icon";
import { COMPANY, FOOTER_OFFICES, LEGAL, SOCIALS } from "@/data/site";

const SOCIAL_ICONS = { LinkedIn: LinkedInIcon, X: XIcon, Instagram: InstagramIcon, Facebook: FacebookIcon, YouTube: YouTubeIcon };
const COUNTRY = { in: "India", uk: "United Kingdom", ae: "UAE" } as const;
const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="ft-glow" aria-hidden="true" />

      {/* ① Brand row: logo + social icons */}
      <div className="container ft-brandbar">
        <a href="#home" className="ft-logo" aria-label="Maya Marine & Logistics — back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/maya-logo-white.png" alt="Maya Marine & Logistics" width={490} height={493} loading="lazy" decoding="async" />
        </a>
        <div className="ft-about">
          <p>Maya Marine is industry experienced Ship builders, Tug &amp; Barge, charterers, project management consultants and naval architects aiming to provide bespoke marine solutions under a single roof.</p>
        </div>
        <ul className="ft-social" aria-label="Social media">
          {SOCIALS.map((s) => { const Ic = SOCIAL_ICONS[s.name]; return (<li key={s.name}><a href={s.href} aria-label={s.name} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}><Ic size={17} /></a></li>); })}
        </ul>
      </div>

      {/* ② Offices strip */}
      <section className="container ft-offices-wrap" aria-labelledby="ft-offices-title">
        <div className="ft-offices-head">
          <h3 id="ft-offices-title" className="ft-h">Our Offices</h3>
          <p className="fo-intro">Five offices across three countries, one accountable team.</p>
          <p className="fo-legend">India <i aria-hidden="true" /> United Kingdom <i aria-hidden="true" /> UAE</p>
        </div>
        <div className="ft-offices">
          {FOOTER_OFFICES.map((o) => (
            <address className="ft-office" key={o.title} data-stagger>
              <p className="fo-country"><span className="fo-flag"><Flag code={o.flag} /></span>{COUNTRY[o.flag]}</p>
              <p className="fo-city">{o.title.replace(" Office", "")}</p>
              <p className="fo-addr">{o.address}</p>
              <div className="fo-links">
                {o.phone && <a href={tel(o.phone)}>{o.phone}</a>}
                <a href={`mailto:${o.email}`}>{o.email}</a>
              </div>
            </address>
          ))}
        </div>
      </section>

      {/* ③ Legal bar */}
      <div className="container ft-bottom">
        <div className="ft-legal">
          <p className="ft-copy">&copy; {COMPANY.copyrightYear} Maya Marine And Logistics. All Rights Reserved.</p>
          <p>{LEGAL.protect.text} <a href="https://www.protectmywork.com" target="_blank" rel="noopener noreferrer">ProtectMyWork.com <ArrowUpRight size={12} aria-hidden="true" /></a> · Ref. {LEGAL.protect.ref} · Trademark Reg. No. {LEGAL.trademark.number} ({LEGAL.trademark.date})</p>
        </div>
        <div className="ft-links">
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
          <BackToTop />
        </div>
      </div>

      {/* ④ Oversized wordmark */}
      <p className="ft-word" aria-hidden="true">MAYA MARINE</p>
    </footer>
  );
}
