"use client";
/* 4e. PROVEN TRACK RECORD — towing film as a fixed background, four headline
   numbers, and the Critical Response ledger (13 SOS operations, expandable rows).
   Data copied from the company's existing website. */
import { useState } from "react";
import { Anchor, CalendarDays, Flame, Link as LinkIcon, Plus, TriangleAlert } from "lucide-react";
import LazyVideo from "@/components/LazyVideo";

const STATS = [
  { value: 440.5, decimals: 1, suffix: "K+", label: "Tonnage Delivered Under-Tow" },
  { value: 12, decimals: 0, suffix: "K+", label: "Personnel Transferred" },
  { value: 290, decimals: 0, suffix: "+", label: "Offshore Assets Grounded" },
  { value: 22, decimals: 0, suffix: "+", label: "Dry-Docking Operations" },
];

type Kind = "drift" | "tow" | "fire" | "ground";
const KIND = {
  drift: { Icon: TriangleAlert, label: "Drift / anchor loss" },
  tow: { Icon: LinkIcon, label: "Tow operation" },
  fire: { Icon: Flame, label: "Fire" },
  ground: { Icon: Anchor, label: "Grounding" },
} as const;

const OPS: { vessel: string; imo: string | null; kind: Kind; category: string; criticality: string; year: number }[] = [
  { vessel: "M.V. Fratzis Star", imo: "9301184", kind: "drift", category: "Anchor Lost, Drifting", criticality: "Large Vessel Position Holding + Consultancy till Discharge", year: 2025 },
  { vessel: "M.T. Muru", imo: "4542874", kind: "drift", category: "ME Failure + Anchor Loss", criticality: "Propulsion Failure & Drift + Security Escort into Indian Waters + Consultancy till delivery", year: 2025 },
  { vessel: "M.V. Kelsey-2", imo: "9254214", kind: "tow", category: "Derelict Tow Delivery", criticality: "Unmanned Wreck Tow + P&I Consultancy + Vessel inwarding into Indian Waters", year: 2025 },
  { vessel: "M.V. Saltwind Explorer", imo: "9483243", kind: "drift", category: "Anchor Lost, Drifting", criticality: "Vessel Adrift in Shipping Lane + Standby", year: 2024 },
  { vessel: "M.V. Virono Pride", imo: "9403138", kind: "drift", category: "Anchor Lost, Drifting", criticality: "Critical Drift – Tug Intervention + Standby", year: 2024 },
  { vessel: "M.V. Vishwa Diksha", imo: "9487914", kind: "drift", category: "Anchor Lost, Drifting", criticality: "Anchor Loss, Large Vessel at Risk + Standby, Escort + Under Tow", year: 2024 },
  { vessel: "M.V. Mtide Salvage-1", imo: null, kind: "fire", category: "Blast + Fire", criticality: "Fire Containment (ICG/GMB monitored) + Crew Evacuation + Asset Towed under Live Fire", year: 2022 },
  { vessel: "M.T. Posh Teresa", imo: null, kind: "ground", category: "Grounding", criticality: "High-risk grounding – urgent towage ops", year: 2022 },
  { vessel: "M.T. Varun", imo: null, kind: "fire", category: "Blast + Fire + Crew Rescue", criticality: "Crew Evacuation & Fire Ops", year: 2023 },
  { vessel: "M.V. Symphony", imo: null, kind: "ground", category: "Grounding", criticality: "Grounding – stabilisation required", year: 2023 },
  { vessel: "Cassion Gate", imo: null, kind: "tow", category: "Tow Broken – Mid-Sea Capture", criticality: "Mid-sea capture from local tug operators & controlled tow with delivery", year: 2023 },
  { vessel: "M.V. Infinity", imo: null, kind: "drift", category: "Anchor Lost, Drifting", criticality: "Drifting Vessel, Traffic Risk + Under Tow Delivery + Standby Escort", year: 2024 },
  { vessel: "M.V. Starlet", imo: null, kind: "tow", category: "Tug Malfunction – Tow Rescue", criticality: "Mid-sea Tow Handover from Local Tug Operators", year: 2025 },
];

export default function TrackRecord() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="track-record" className="trk" aria-labelledby="trk-title">
      <div className="trk-media" aria-hidden="true">
        <LazyVideo src="/media/towing.mp4" poster="/media/towing-poster.jpg" className="trk-video" />
      </div>
      <div className="trk-overlay" aria-hidden="true" />

      <div className="container trk-inner">
        {/* Headline numbers */}
        <div className="trk-head">
          <p className="eyebrow light" data-reveal>Proven Track Record</p>
          <ul className="trk-stats">
            {STATS.map((s) => (
              <li key={s.label} data-stagger>
                <p className="trk-num"><span data-count={s.value} data-decimals={s.decimals || undefined}>{s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals })}</span>{s.suffix}</p>
                <p className="trk-label">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical response ledger */}
        <div className="trk-ledger">
          <p className="eyebrow light" data-reveal>Critical Response Track Records</p>
          <h2 id="trk-title" className="section-title light" data-reveal>Seamless Solutions, Crafted for the Sea</h2>

          <div className="trk-table" role="table" aria-label="Critical response operations">
            <div className="trk-row trk-th" role="row">
              <span role="columnheader">Vessel</span>
              <span role="columnheader">Category</span>
              <span role="columnheader">Criticality – SOS Emergency</span>
              <span role="columnheader">Year</span>
              <span role="columnheader" className="sr-only">Details</span>
            </div>
            {OPS.map((o, i) => {
              const { Icon, label } = KIND[o.kind];
              const isOpen = open === i;
              return (
                <div key={o.vessel} className={`trk-item k-${o.kind}${isOpen ? " is-open" : ""}`} data-stagger>
                  <div className="trk-row" role="row">
                    <span role="cell" className="trk-vessel">
                      <i className="trk-ic" title={label}><Icon size={15} aria-hidden="true" /></i>
                      <span><strong>{o.vessel}</strong>{o.imo && <small>IMO {o.imo}</small>}</span>
                    </span>
                    <span role="cell" className="trk-cat">{o.category}</span>
                    <span role="cell" className="trk-crit">{o.criticality}</span>
                    <span role="cell" className="trk-year"><CalendarDays size={14} aria-hidden="true" />{o.year}</span>
                    <span role="cell">
                      <button type="button" className="trk-toggle" aria-expanded={isOpen} aria-controls={`trk-d-${i}`} aria-label={`${isOpen ? "Hide" : "Show"} details for ${o.vessel}`} onClick={() => setOpen(isOpen ? null : i)}>
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </span>
                  </div>
                  <div id={`trk-d-${i}`} className="trk-detail" role="region" aria-label={`${o.vessel} details`}>
                    <div className="trk-detail-in">
                      <dl>
                        <div><dt>IMO</dt><dd>{o.imo ?? "—"}</dd></div>
                        <div><dt>Category</dt><dd>{o.category}</dd></div>
                        <div className="wide"><dt>Criticality – SOS Emergency</dt><dd>{o.criticality}</dd></div>
                        <div><dt>Year</dt><dd>{o.year}</dd></div>
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="trk-note" data-reveal>All SOS calls attended by Maya Marine &amp; Logistics are directly monitored by the Indian Coast Guard (Pipavav &amp; DHQ Gandhinagar), Mercantile Marine Department (Kandla), Directorate General of Shipping (Mumbai), DLRIT DCOM Centre, Gujarat Maritime Board HQ (Gandhinagar), and GMB Bhavnagar. Each operation is executed with utmost safety of crew &amp; assets, with full statutory compliance and under clear directives of all concerned authorities.</p>
        </div>
      </div>
    </section>
  );
}
