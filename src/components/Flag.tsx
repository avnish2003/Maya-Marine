/* Simple inline flags (no external requests): India, United Kingdom, UAE */
export default function Flag({ code }: { code: "in" | "uk" | "ae" }) {
  if (code === "in")
    return (
      <svg viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="13.34" fill="#FF9933" />
        <rect y="13.33" width="60" height="13.34" fill="#fff" />
        <rect y="26.66" width="60" height="13.34" fill="#138808" />
        <circle cx="30" cy="20" r="5.2" fill="none" stroke="#000080" strokeWidth="1.1" />
        <circle cx="30" cy="20" r="1.1" fill="#000080" />
        <g stroke="#000080" strokeWidth=".5">
          {Array.from({ length: 12 }, (_, i) => (<line key={i} x1="30" y1="15" x2="30" y2="25" transform={`rotate(${i * 15} 30 20)`} />))}
        </g>
      </svg>
    );
  if (code === "ae")
    return (
      <svg viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="13.34" fill="#00732F" />
        <rect y="13.33" width="60" height="13.34" fill="#fff" />
        <rect y="26.66" width="60" height="13.34" fill="#000" />
        <rect width="16" height="40" fill="#FF0000" />
      </svg>
    );
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id="uk-s"><path d="M0 0v30h60V0z" /></clipPath>
      <clipPath id="uk-t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
