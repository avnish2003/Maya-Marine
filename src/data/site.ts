/* ==========================================================================
   MMAL — Site content & media
   All copy, contact details and media URLs live here so they can be swapped
   for the company's real assets without touching any component.
   Items marked [PLACEHOLDER] must be replaced before going live.
   ========================================================================== */

/* ---------- Media helpers (Pexels CDN, royalty-free) ---------- */
const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const MEDIA = {
  // Company intro film (self-hosted in /public/media) — replace with a 1080p/4K export when available
  heroVideo: "/media/maya-intro-2025.mp4",
  heroPoster: "/media/hero-poster.jpg",
  storyVideo: "/media/maya-intro-2025.mp4",
  shipyardVideo: "https://videos.pexels.com/video-files/11887094/11887094-hd_1920_1080_25fps.mp4",
  shipyardPoster: px(7069098, 1920),
  emergencyBg: "/media/emergency-bg.webp", // company photo — M.T MAYA-22 (fixed background, §6)
  aboutMain: px(7069098, 1000),
  aboutSecondary: px(25286613, 800),
  ogImage: px(3309498, 1200),
};

/* ---------- Company ---------- */
export const COMPANY = {
  name: "Maya Marine & Logistics",
  short: "MMAL",
  tagline: "We assist ships to their last port.",
  phoneDisplay: "+91 70699 17626",
  phoneHref: "tel:+917069917626",
  email: "info@mayamarine.in",
  founded: 2015,
  copyrightYear: 2026, // update yearly (static so the page can be fully prerendered)
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#our-services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Shipyard", href: "#shipyard" },
  { label: "Offshore", href: "#offshore" },
  { label: "Contact", href: "#contact" },
];

/* ---------- Services ticker (two crossing bands under the hero) ---------- */
export const TICKER_A = ["Offshore Engineering", "Shipbuilding", "Emergency Marine Support", "Naval Refits", "Dry Dock Services", "ISO Certified"];
export const TICKER_B = ["Harbour Assistance", "Marine Logistics", "24/7 Marine Operations", "Coastal Towage", "Vessel Engineering", "Towage Operations"];

/* ---------- About tabs ---------- */
export const ABOUT_TABS = [
  { id: "about", label: "About Us", text: "Welcome to Maya Marine & Logistics, where innovation meets maritime excellence. As Gujarat’s leading startup in the shipbuilding and towage services industry, we take pride in our commitment to delivering cutting-edge solutions that navigate the seas of tomorrow." },
  { id: "journey", label: "Our Journey", text: "Founded with a vision to redefine maritime standards, Maya stands as a symbol of reliability and proficiency in shipbuilding and towage services. With decades of experience and a commitment to maritime excellence, we’ve become a trusted industry name." },
];

/* ---------- Clients (logos in /public/clients, white on transparent) ---------- */
export const CLIENTS = [
  { name: "Essar", src: "/clients/client-2.png" },
  { name: "Indian Coast Guard", src: "/clients/client-20.png", tall: true },
  { name: "ONGC", src: "/clients/client-16.png", tall: true },
  { name: "Larsen & Toubro", src: "/clients/client-14.png" },
  { name: "Gujarat Maritime Board", src: "/clients/client-44.png", tall: true },
  { name: "McDermott", src: "/clients/client-11.png" },
  { name: "J M Baxi — The Port Specialist", src: "/clients/client-12.png", tall: true },
  { name: "EXG", src: "/clients/client-13.png" },
  { name: "Seros", src: "/clients/client-8.png" },
  { name: "Priya Blue", src: "/clients/client-5.png" },
] as const;

/* ---------- Services ---------- */
export const SERVICES = [
  { title: "Harbour & Coastal Towage", icon: "anchor", img: px(3309498, 800), alt: "Aerial view of two tugboats escorting a bulk carrier at sea", desc: "Berthing, unberthing and coastal tows handled by experienced masters and powerful tugs." },
  { title: "Emergency Marine Support", icon: "lifebuoy", img: px(25286613, 800), alt: "Tugboats moored alongside a red-hulled cargo ship at dusk", desc: "Round-the-clock salvage assistance, firefighting and emergency towing along the coast." },
  { title: "Barge & Tug Support", icon: "waves", img: px(5167549, 800), alt: "Aerial view of a tugboat towing a flat-top barge across green water", desc: "Tug-and-barge spreads for heavy-lift, project cargo and inshore construction works." },
  { title: "Shipbuilding & Dry Dock", icon: "wrench", img: px(7069098, 800), alt: "Engineer in a white hard hat looking up at a ship's bow in dry dock", desc: "New builds, hull repairs, blasting and painting in our Gujarat dry dock facilities." },
  { title: "Naval Refits", icon: "shield", img: px(8904552, 800), alt: "Grey naval warship moored at a stone quay", desc: "Mid-life upgrades, systems integration and refits delivered to defence standards." },
  { title: "Offshore & Subsea Engineering", icon: "factory", img: px(10391701, 800), alt: "Diver swimming beside a wreck on the sea floor", desc: "Inspection, maintenance and repair for offshore assets, pipelines and subsea structures." },
  { title: "Private Chartering", icon: "sailboat", img: px(9408818, 800), alt: "White motor yacht anchored in turquoise water seen from above", desc: "Vessel charters for crew transfer, survey work and private voyages on demand." },
  { title: "Marine Logistics", icon: "container", img: px(28438290, 800), alt: "Gantry crane spreader loading shipping containers onto a vessel", desc: "Port agency, cargo handling and end-to-end marine logistics with project management consultancy." },
] as const;

/* ---------- Stats (counters) ---------- */
export const STATS = [
  { value: 1200, suffix: "+", label: "Vessels Assisted" }, // [PLACEHOLDER] confirm figure
  { value: 350, suffix: "+", label: "Projects Delivered" }, // [PLACEHOLDER] confirm figure
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "", label: "Global Offices" },
];

/* ---------- Fleet & capabilities ---------- */
export const FLEET = [
  { type: "ASD Harbour Tug", img: px(3309498, 1200), alt: "Aerial view of tugboats escorting a bulk carrier", specs: [["Bollard Pull", "60 t"], ["Length", "32 m"], ["Speed", "12 kn"]] },
  { type: "Coastal Towing Tug", img: px(25286613, 1200), alt: "Line of tugboats moored beside a cargo ship at dusk", specs: [["Bollard Pull", "45 t"], ["Length", "30 m"], ["Range", "1,500 nm"]] },
  { type: "Flat-Top Cargo Barge", img: px(5167549, 1200), alt: "Tugboat towing a flat-top barge loaded with equipment", specs: [["Deck Cargo", "3,000 t"], ["Length", "76 m"], ["Beam", "22 m"]] },
  { type: "Dry Dock Facility", img: px(7069098, 1200), alt: "Ship in dry dock with an engineer inspecting the bow", specs: [["Max Vessel", "120 m"], ["Lift", "8,000 t"], ["Cranes", "2 × 40 t"]] },
  { type: "Offshore Support", img: px(16830015, 1200), alt: "Offshore oil platform and support vessel on calm blue sea", specs: [["Bollard Pull", "80 t"], ["Length", "60 m"], ["DP Class", "DP2"]] },
] as const; // [PLACEHOLDER] all specs are indicative — replace with real fleet data

/* ---------- Offices ---------- */
// x / y are in the world-map viewBox (lon -20..120, lat 66..-4, 10 units per degree)
const toXY = (lat: number, lon: number) => ({ x: (lon + 20) * 10, y: (66 - lat) * 10 });

export const OFFICES = [
  { city: "Bhavnagar", country: "Gujarat, India", role: "Execution Office", ...toXY(21.76, 72.15), address: "Office No. 201/202/203, First Floor, Panch Kalyan Complex, Kalanala Road, Bhavnagar – 364001" },
  { city: "Ghogha", country: "Gujarat, India", role: "Shipyard Division", ...toXY(21.68, 72.28), address: "Plot No. 9, Opp. Ghogha Ro-Ro Ferry Terminal Gate, Ghogha, Bhavnagar – 364110" },
  { city: "Ahmedabad", country: "Gujarat, India", role: "Corporate Office", ...toXY(23.02, 72.57), address: "[Street address], Ahmedabad, Gujarat 380001" },
  { city: "Dubai", country: "UAE", role: "Middle East Office", ...toXY(25.2, 55.27), address: "[Street address], Dubai, UAE" },
  { city: "London", country: "United Kingdom", role: "Europe Office", ...toXY(51.51, -0.13), address: "[Street address], London, UK" },
];

/* ---------- Group companies (Contact drawer) ---------- */
export const GROUP = [
  {
    name: "Maya Marine & Logistics",
    tag: "Towage & Shipyard",
    entries: [
      { kind: "office", label: "Bhavnagar", note: "Execution Office" },
      { kind: "address", text: "Office No. 201/202/203, First Floor, Panch Kalyan Complex, Kalanala Road, Bhavnagar – 364001" },
      { kind: "phone", text: "+91 70699 17626", href: "tel:+917069917626" },
      { kind: "email", text: "info@mayamarine.in", href: "mailto:info@mayamarine.in" },
      { kind: "office", label: "Ghogha", note: "Shipyard Division" },
      { kind: "address", text: "Plot No. 9, Opp. Ghogha Ro-Ro Ferry Terminal Gate, Ghogha, Bhavnagar – 364110" },
    ],
  },
  // [PLACEHOLDER] add addresses / phones for Maya Aggregate Co. and Maya Travels & Cargo
  { name: "MayaOCM", tag: "Maya Oceancraft Maritime L.L.C.", entries: [{ kind: "office", label: "Dubai", note: "UAE Office" }, { kind: "address", text: "Dubai, UAE" }, { kind: "email", text: "info@mayamarineandlogistics.com", href: "mailto:info@mayamarineandlogistics.com" }] },
  { name: "Maya Marine Alliance UK LTD", tag: "UK Office", entries: [{ kind: "office", label: "London", note: "UK Office" }, { kind: "address", text: "20-22 Wenlock Road, London N1 7GU" }, { kind: "phone", text: "+44 7388 175068", href: "tel:+447388175068" }, { kind: "email", text: "info@mayamarineandlogistics.com", href: "mailto:info@mayamarineandlogistics.com" }] },
  { name: "Maya Aggregate Co.", tag: "Aggregates & Supply", entries: [{ kind: "email", text: "info@mayamarine.in", href: "mailto:info@mayamarine.in" }] },
  { name: "Maya Travels & Cargo", tag: "Travel & Cargo", entries: [{ kind: "email", text: "info@mayamarine.in", href: "mailto:info@mayamarine.in" }] },
] as const;

/* ---------- Footer offices ---------- */
export const FOOTER_OFFICES = [
  { flag: "in", title: "Bhavnagar Office", division: "Execution Office", address: "Office No. 201/202/203, First Floor, Panch Kalyan Complex, Kalanala Road, Bhavnagar, Gujarat – 364001", phone: "+91 70699 17626", email: "info@mayamarine.in" },
  { flag: "in", title: "Ahmedabad Office", division: "Offshore Execution & Project Engineering Division", address: "Times Square Arcade, 101 & 102, Opp. Ram Baug, Thaltej Shilaj Road, Ahmedabad, Gujarat", phone: "+91 75676 17626", email: "info.ahm@mayamarine.in" },
  { flag: "in", title: "Ghogha Office", division: "Shipyard Division", address: "Plot No. 9, Opp. Ghogha Ro-Ro Ferry Terminal Gate, Ghogha, Bhavnagar – 364110, Gujarat, India", phone: "+91 70699 17626", email: "info@mayamarine.in" },
  { flag: "uk", title: "UK Office", division: "Maya Marine Alliance UK LTD", address: "20-22 Wenlock Road, London N1 7GU", phone: "+44 7388 175068", email: "info@mayamarineandlogistics.com" },
  { flag: "ae", title: "UAE Office", division: "MayaOCM — Maya Oceancraft Maritime L.L.C.", address: "Dubai, UAE", phone: null, email: "info@mayamarineandlogistics.com" },
] as const;

export const LEGAL = {
  copyright: "© Copyright Maya Marine And Logistics. All Rights Reserved.",
  protect: { text: "Copyright Protected with", site: "www.ProtectMyWork.com", ref: "11001210922S009" },
  trademark: { number: "5462536", date: "25th May, 2022" },
};

export const SOCIALS = [
  { name: "LinkedIn", href: "#" }, // [PLACEHOLDER] real profile URLs
  { name: "X", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "YouTube", href: "#" },
] as const;

