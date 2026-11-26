/* ==========================================================================
   Maya Marine & Logistics — vector logo (redrawn from the brand mark).
   White tile with a wavy base; the ship's bow is CUT OUT (transparent) via an
   SVG mask, so the background shows through exactly like the original.
   Class hooks (lg-*) are used by the loader animation.
   Replace with the official SVG from the brand team when available.
   ========================================================================== */

type Props = { id: string; variant?: "full" | "mark"; className?: string; title?: string };

/* Bow shapes (cut out of the tile) — tile space 0..580 × 0..470 */
const CUTS = [
  // arch / deck band
  "M45 252 C80 168 150 116 215 106 L365 106 C430 116 500 168 535 252 L506 262 C470 200 420 166 365 160 L215 160 C160 166 110 200 74 262 Z",
  // lower deck wedge — left / right
  "M78 288 L232 252 L232 262 L90 302 Z",
  "M502 288 L348 252 L348 262 L490 302 Z",
  // hull sides — left / right
  "M66 290 C82 324 104 344 138 362 C114 340 98 318 88 292 Z",
  "M514 290 C498 324 476 344 442 362 C466 340 482 318 492 292 Z",
  // stem
  "M281 160 L299 160 L290 402 Z",
];

export default function Logo({ id, variant = "full", className, title = "Maya Marine & Logistics" }: Props) {
  const mask = `${id}-cut`;
  const full = variant === "full";
  return (
    <svg className={className} viewBox={full ? "0 0 640 668" : "0 0 640 480"} role="img" aria-label={title} fill="#fff">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="480">
          <rect width="640" height="480" fill="#fff" />
          <g fill="#000">
            {CUTS.map((d, i) => (<path key={i} d={d} className="lg-cut" />))}
          </g>
          {/* mast & crossbar stay white (drawn back over the band) */}
          <g className="lg-cut" fill="#fff">
            <rect x="286" y="106" width="8" height="54" />
            <rect x="178" y="128" width="224" height="9" rx="4" />
          </g>
        </mask>
      </defs>

      {/* Tile with wavy base */}
      <path className="lg-box" mask={`url(#${mask})`} d="M0 0 H580 V468 C520 446 430 420 320 421 C210 422 110 442 0 436 Z" />
      {/* ® */}
      <g className="lg-reg">
        <circle cx="616" cy="22" r="18" fill="none" stroke="#fff" strokeWidth="4" />
        <text x="616" y="30" textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="Arial, sans-serif">R</text>
      </g>

      {full && (
        <g className="lg-word">
          <g fill="none" stroke="#fff" strokeWidth="24" strokeLinejoin="miter" strokeLinecap="butt">
            <polyline className="lg-letter" points="12,594 12,512 51,566 90,512 90,594" />
            <polyline className="lg-letter" points="166,594 211,510 256,594" />
            <polyline className="lg-letter" points="330,512 375,560 420,512" />
            <line className="lg-letter" x1="375" y1="556" x2="375" y2="594" />
            <polyline className="lg-letter" points="488,594 533,510 578,594" />
          </g>
          <text className="lg-tag" x="0" y="656" textLength="580" lengthAdjust="spacingAndGlyphs" fontSize="44" fontWeight="500" fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', sans-serif">MARINE &amp; LOGISTICS</text>
        </g>
      )}
    </svg>
  );
}
