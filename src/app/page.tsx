/* ==========================================================================
   MMAL — Home page
   Sections (in order): Navbar · Hero · Trust strip · About · Services ·
   Emergency parallax break · Stats · Fleet slider · Shipyard & Offshore video ·
   Global presence · CTA banner · Footer
   ========================================================================== */
import { ArrowRight, PhoneCall } from "lucide-react";
import Loader from "@/components/Loader";
import Motion from "@/components/Motion";
import Navbar from "@/components/Navbar";
import Overlays from "@/components/Overlays";

import Hero from "@/components/Hero";
import LazyVideo from "@/components/LazyVideo";
import Footer from "@/components/Footer";
import OfficeCards from "@/components/OfficeCards";
import Certifications from "@/components/Certifications";
import TrackRecord from "@/components/TrackRecord";
import Gallery from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { ABOUT_TABS, CLIENTS, COMPANY, MEDIA, OFFICES, TICKER_A, TICKER_B } from "@/data/site";

/* JSON-LD structured data for local SEO */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  alternateName: COMPANY.short,
  slogan: COMPANY.tagline,
  foundingDate: String(COMPANY.founded),
  email: COMPANY.email,
  telephone: COMPANY.phoneDisplay,
  address: { "@type": "PostalAddress", addressLocality: "Bhavnagar", addressRegion: "Gujarat", addressCountry: "IN" },
  hasCredential: "ISO 9001:2015",
};

/* Our Services — three core divisions (images from the company site) */
const CORE = [
  { n: "01", title: "Towage", sub: "Harbour & Coastal", desc: "Berthing, coastal tows, salvage and round-the-clock emergency response with our own tug fleet.", icon: "anchor", href: "#our-services", img: "/media/svc-towage.webp", alt: "Maya Marine tug towing an offshore drilling rig at sea" },
  { n: "02", title: "Shipyard", sub: "Ghogha, Bhavnagar, Gujarat", desc: "New builds, dry docking, hull repairs and naval refits at our own yard on the Gulf of Khambhat.", icon: "ship", href: "#shipyard", img: "/media/svc-shipbuild.webp", alt: "Vessels beached for repair at the Maya Marine yard in Ghogha, Gujarat" },
  { n: "03", title: "Offshore", sub: "Offshore & Subsea Engineering", desc: "Offshore support, subsea engineering and project management consultancy for energy operators.", icon: "waves", href: "#offshore", img: "/media/svc-pmc.webp", alt: "Maya Marine crew member alongside a BW Offshore vessel" },
] as const;

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="skip-link">Skip to content</a>
      <Loader />
      <Motion />
      <Navbar />
      <Overlays />

      <main id="main">
        {/* 2. HERO */}
        <Hero />

        {/* 3. SERVICES STRIP — one calm, continuous line of capabilities */}
        <section id="trust" className="ticker" aria-label="Our capabilities">
          <p className="sr-only">{[...TICKER_A, ...TICKER_B].join(", ")}</p>
          <div className="tk-track" aria-hidden="true">
            {[0, 1].map((dup) => (
              <ul className="tk-group" key={dup}>
                {[...TICKER_A, ...TICKER_B].map((t) => (<li key={t}><span className="tk-name">{t}</span></li>))}
              </ul>
            ))}
          </div>
        </section>

        {/* 4. ABOUT + CLIENTS — one section over a fixed company photo
            (background-attachment:fixed on desktop, position:fixed fallback on touch) */}
        <section id="about" className="ac" data-bg={MEDIA.emergencyBg} aria-labelledby="about-title">
          <div className="ac-overlay" aria-hidden="true" />
          <div className="container ac-inner">
            <div className="ac-about">
              <div className="ac-head">
                <p className="eyebrow light" data-reveal>Who We Are</p>
                <h2 id="about-title" className="section-title light" data-reveal>Where Innovation Meets Maritime Excellence</h2>
              </div>
              <div className="ac-text">
                {ABOUT_TABS.map((t) => (
                  <div key={t.id} className="ac-block" data-reveal>
                    <h3 className="ac-label">{t.label}</h3>
                    <p>{t.text}</p>
                  </div>
                ))}
                <div data-reveal><a href="#our-services" className="btn btn-light" data-magnetic>Discover What We Do <ArrowRight size={18} aria-hidden="true" /></a></div>
              </div>
            </div>

            <div id="clients" className="ac-clients">
              <div className="clients-head">
                <div>
                  <p className="eyebrow light" data-reveal>Our Clients</p>
                  <h3 className="section-title light ac-clients-title" data-reveal>Trusted By India&rsquo;s Maritime Leaders</h3>
                </div>
              </div>
              {/* Client logos — two rows scrolling in opposite directions (pause on hover) */}
              <div className="cl-rows" data-reveal>
                {[CLIENTS.slice(0, 5), CLIENTS.slice(5)].map((row, r) => (
                  <div key={r} className={r === 1 ? "cl-marquee is-reverse" : "cl-marquee"}>
                    <div className="cl-track">
                      {[0, 1].map((dup) => (
                        <ul className="cl-group" key={dup} aria-hidden={dup === 1 ? true : undefined}>
                          {[...row, ...row].map((c, k) => (
                            <li key={c.name + k} className="client">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={c.src} alt={dup === 1 || k >= row.length ? "" : c.name + " logo"} loading="lazy" decoding="async" className={"tall" in c && c.tall ? "is-tall" : undefined} />
                              <span className="client-name">{c.name}</span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4c. RECOGNITION — Forbes India × D Globalist, DGEMS Select 200 */}
        <section id="recognition" className="rec" aria-labelledby="rec-title">
          <div className="rec-glow" aria-hidden="true" />
          <div className="container rec-grid">
            <div className="rec-copy">
              <p className="rec-tags" data-reveal><span>Forbes India</span><i aria-hidden="true" /><span>D Globalist</span></p>
              <h2 id="rec-title" className="rec-title" data-reveal>Select 200</h2>
              <p className="rec-sub" data-reveal>Entrepreneur Recognition 2025</p>
              <p className="rec-text" data-reveal>Our Managing Director, Er. YashdeepSinh Gohil, has been recognised in the Forbes India &times; D Globalist DGEMS Select 200, honouring outstanding young entrepreneurs shaping the future of Indian business.</p>
              <dl className="rec-facts" data-reveal>
                <div><dt>Company</dt><dd>Maya Marine &amp; Logistics</dd></div>
                <div><dt>HQ</dt><dd>India</dd></div>
                <div><dt>Industry</dt><dd>Manufacturing</dd></div>
                <div><dt>Edition</dt><dd>DGEMS 2025</dd></div>
              </dl>
              <div className="rec-badge-row" data-reveal>
                <div className="dgems" role="img" aria-label="DGEMS 2025 Select 200, D Globalist Entrepreneur Mobility Summit">
                  <span className="dg-s" aria-hidden="true"><b>S</b><b>2</b><b>0</b><b>0</b></span>
                  <span className="dg-main" aria-hidden="true">
                    <span className="dg-title">DGEMS</span>
                    <span className="dg-row"><span className="dg-year">2025</span><span className="dg-name">D Globalist<br />Entrepreneur<br />Mobility Summit</span></span>
                  </span>
                </div>
                <p className="rec-badge-txt">DGEMS 2025 &bull; Companies with Global Business Potential</p>
              </div>
            </div>
            <a className="rec-card" href="/media/forbes-select-200.webp" target="_blank" rel="noopener" data-reveal aria-label="Open the Forbes India DGEMS Select 200 recognition (full size)">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/forbes-select-200.webp" alt="Forbes India and D Globalist DGEMS Select 200 recognition for Yashdeep Singh M. Gohil, Maya Marine &amp; Logistics" width={1600} height={2264} loading="lazy" decoding="async" />
            </a>
          </div>
        </section>

        {/* 4d. ISO CERTIFICATIONS */}
        <Certifications />

        {/* 4e. PROVEN TRACK RECORD */}
        <TrackRecord />

        {/* 4e2. OUR SERVICES — three core divisions over a fixed company photo */}
        <section id="our-services" className="core" data-bg={MEDIA.emergencyBg} aria-labelledby="core-title">
          <div className="core-overlay" aria-hidden="true" />
          <div className="container core-inner">
            <div className="core-head">
              <div>
                <p className="eyebrow light" data-reveal>Our Services</p>
                <h2 id="core-title" className="section-title light" data-reveal>Navigating Waters, Crafting Vessels of Distinction</h2>
              </div>
              <div className="core-aside" data-reveal>
                <p>Three divisions, one accountable team: from the first line ashore to the final tow at sea.</p>
                <a href="#our-services" className="core-all">All services <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="core-grid">
              {CORE.map((c) => (
                <a key={c.title} href={c.href} className="core-card" data-stagger aria-label={c.title + ": " + c.sub + " (view more)"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.alt} loading="lazy" decoding="async" width={840} height={630} />
                  <span className="core-shade" aria-hidden="true" />
                  <span className="core-top"><span className="core-ic"><Icon name={c.icon} size={22} /></span><span className="core-n">{c.n}</span></span>
                  <span className="core-body">
                    <strong className="core-title">{c.title}</strong>
                    <span className="core-sub">{c.sub}</span>
                    <span className="core-reveal"><span className="core-reveal-in"><span className="core-desc">{c.desc}</span><span className="core-more">View More <ArrowRight size={16} aria-hidden="true" /></span></span></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FIXED / PARALLAX IMAGE BREAK — background-attachment:fixed on desktop,
            position:fixed pseudo-element fallback on iOS/touch (see CSS) */}
        <section className="break" data-bg={MEDIA.emergencyBg} aria-labelledby="break-title">
          <div className="break-overlay" aria-hidden="true" />
          <div className="container break-inner">
            <p className="eyebrow light" data-reveal><span className="live-dot" aria-hidden="true" />Always on standby</p>
            <h2 id="break-title" className="break-title" data-reveal>24/7 Emergency Marine Support</h2>
            <p className="break-sub" data-reveal>Salvage, firefighting, emergency towing and pollution response, mobilised within hours along India&rsquo;s west coast.</p>
            <div data-reveal><a href={COMPANY.phoneHref} className="btn btn-primary btn-lg" data-magnetic><PhoneCall size={18} aria-hidden="true" /> Call {COMPANY.phoneDisplay}</a></div>
          </div>
        </section>

        {/* 4f. GALLERY */}
        <Gallery />

                {/* 9. SHIPYARD & OFFSHORE — fixed background video (same clip technique as §6) */}
        <section id="shipyard" className="showcase" aria-labelledby="showcase-title">
          <div className="showcase-media" aria-hidden="true">
            <LazyVideo src={MEDIA.shipyardVideo} poster={MEDIA.shipyardPoster} className="showcase-video" />
          </div>
          <div className="showcase-overlay" aria-hidden="true" />
          <div className="container showcase-inner">
            <p className="eyebrow light" data-reveal>Shipyard &amp; Offshore</p>
            <h2 id="showcase-title" className="showcase-title" data-reveal>Engineering Strength, Above And Below The Waterline</h2>
            <div className="showcase-cols">
              <div className="showcase-card glass" data-stagger>
                <h3>Shipyard &amp; Dry Dock</h3>
                <p>Shipbuilding, hull and machinery repairs, blasting, coating and naval refits at our Gujarat yard, delivered to class and defence standards.</p>
              </div>
              <div id="offshore" className="showcase-card glass" data-stagger>
                <h3>Offshore &amp; Subsea</h3>
                <p>Platform support, IMR campaigns, diving and ROV services, and project management consultancy for offshore energy operators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. GLOBAL PRESENCE */}
        <section className="section presence" aria-labelledby="presence-title">
          <div className="container">
            <div className="section-head center-head">
              <p className="eyebrow center" data-reveal>Global Presence</p>
              <h2 id="presence-title" className="section-title center" data-reveal>From Gujarat To The World</h2>
            </div>
            <div className="map" data-reveal>
              <svg viewBox="0 0 1400 700" role="img" aria-label="Map showing MMAL offices in Bhavnagar, Ghogha, Ahmedabad, Dubai and London">
                <image href="/media/world-map.svg" x="0" y="0" width="1400" height="700" preserveAspectRatio="none" />
                {/* Routes from head office */}
                <path className="map-route" d={`M${OFFICES[0].x} ${OFFICES[0].y} Q ${(OFFICES[0].x + OFFICES[3].x) / 2} ${OFFICES[3].y - 90} ${OFFICES[3].x} ${OFFICES[3].y}`} />
                <path className="map-route" d={`M${OFFICES[0].x} ${OFFICES[0].y} Q ${(OFFICES[0].x + OFFICES[4].x) / 2} ${OFFICES[4].y - 160} ${OFFICES[4].x} ${OFFICES[4].y}`} />
                {OFFICES.map((o, i) => (
                  <g key={o.city} className="pin" style={{ "--d": `${i * 0.4}s` } as React.CSSProperties}>
                    <circle cx={o.x} cy={o.y} r="18" className="pin-pulse" />
                    <circle cx={o.x} cy={o.y} r="7" className="pin-core" />
                  </g>
                ))}
                <text x={OFFICES[2].x + 18} y={OFFICES[2].y - 22} className="pin-label">Gujarat HQ</text>
                <text x={OFFICES[2].x + 18} y={OFFICES[2].y - 2} className="pin-label sm">Bhavnagar · Ghogha · Ahmedabad</text>
                <text x={OFFICES[3].x - 16} y={OFFICES[3].y + 40} className="pin-label" textAnchor="end">Dubai</text>
                <text x={OFFICES[4].x + 18} y={OFFICES[4].y - 14} className="pin-label">London</text>
              </svg>
            </div>
            <OfficeCards />
          </div>
        </section>

        {/* 13. CTA BANNER */}
        <section className="cta" aria-labelledby="cta-title">
          <div className="container">
            <div className="cta-box">
              <div className="cta-waves" aria-hidden="true" />
              <h2 id="cta-title" className="cta-title" data-reveal>Ready To Move Your Next Project?</h2>
              <p data-reveal>Tell us about your vessel, cargo or offshore scope. Our team replies within one business day.</p>
              <div data-reveal><button type="button" data-open="inquiry" aria-haspopup="dialog" className="btn btn-light btn-lg" data-magnetic>Request a Quote <ArrowRight size={18} aria-hidden="true" /></button></div>
            </div>
          </div>
        </section>
      </main>

      {/* 14. FOOTER */}
      <Footer />
    </>
  );
}

