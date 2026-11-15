/** Bandeiras nacionais como SVG inline — sem dependência externa. */
const FLAGS = {
  us: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#B22234" />
      {[0,1,2,3,4,5].map(i => <rect key={i} x="0" y={i*40/13*2+40/13} width="60" height={40/13} fill="#fff" />)}
      <rect width="24" height={40*7/13} fill="#3C3B6E" />
      {[0,1,2,3,4,5,6,7,8].map(r => [0,1,2,3,4].map(c => (
        <circle key={`${r}-${c}`} cx={2.4+(c+(r%2===0?0:0.5))*4.8} cy={2.86+r*2.86} r="1.1" fill="#fff" />
      )))}
    </svg>
  ),
  br: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#009C3B" />
      <polygon points="30,3 57,20 30,37 3,20" fill="#FFDF00" />
      <circle cx="30" cy="20" r="10" fill="#002776" />
      <path d="M21,17.5 Q30,24 39,17.5" stroke="#fff" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  es: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#c60b1e" />
      <rect y="10" width="60" height="20" fill="#ffc400" />
    </svg>
  ),
  de: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#000" />
      <rect y="13.3" width="60" height="13.4" fill="#D00" />
      <rect y="26.7" width="60" height="13.3" fill="#FFCE00" />
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#002395" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </svg>
  ),
  it: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#009246" />
      <rect x="40" width="20" height="40" fill="#CE2B37" />
    </svg>
  ),
  jp: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <circle cx="30" cy="20" r="12" fill="#BC002D" />
    </svg>
  )
};

export default function FlagIcon({ code, size = 24, className = '' }) {
  const svg = FLAGS[code];
  if (!svg) return null;
  return (
    <span
      className={'inline-block overflow-hidden rounded-[2px] flex-none ' + className}
      style={{ width: size * 1.5, height: size }}
    >
      {svg}
    </span>
  );
}
