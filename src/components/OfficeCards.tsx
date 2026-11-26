"use client";
/* Office cards under the Global Presence map — flag, city, role. */
import Flag from "@/components/Flag";
import { OFFICES } from "@/data/site";

const flagOf = (country: string) => (country.includes("UAE") ? "ae" : country.includes("Kingdom") ? "uk" : "in") as "ae" | "uk" | "in";

export default function OfficeCards() {
  return (
    <div className="offices">
      {OFFICES.map((o) => {
        return (
          <article className="office" key={o.city} data-stagger>
            <div className="office-top">
              <span className="office-flag"><Flag code={flagOf(o.country)} /></span>
              <span className="office-cty">{o.country}</span>
            </div>
            <h3>{o.city}</h3>
            <span className="office-role">{o.role}</span>
          </article>
        );
      })}
    </div>
  );
}
