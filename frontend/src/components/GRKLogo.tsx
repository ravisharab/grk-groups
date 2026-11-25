
import { Link } from 'react-router-dom';

type GRKLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function GRKLogo({
  compact = false,
  className = '',
}: GRKLogoProps) {
  return (
    <Link
      to="/"
      aria-label="GRK Groups home"
      className={`group inline-flex items-center gap-3 no-underline ${className}`}
    >
      {/* Skyscraper Logo */}
      <div
        className="
          relative flex h-14 w-14 shrink-0
          items-center justify-center
          rounded-2xl
          border border-amber-400/60
          bg-[#0b1d3a]
          shadow-lg shadow-amber-500/20
          transition-all duration-300
          group-hover:scale-105
          group-hover:border-amber-300
          group-hover:shadow-amber-400/40
        "
      >
        <svg
          viewBox="0 0 64 64"
          width="44"
          height="44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="grkBuildingGold"
              x1="0"
              y1="0"
              x2="64"
              y2="64"
            >
              <stop offset="0%" stopColor="#FFF1A8" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Main Skyscraper */}
          <path
            d="M19 53V14L34 7V53"
            stroke="url(#grkBuildingGold)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Secondary Building */}
          <path
            d="M34 20L49 25V53"
            stroke="#FBBF24"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Main Building Windows */}
          <g fill="#FDE68A">
            <rect x="24" y="17" width="4" height="5" rx="1" />
            <rect x="24" y="27" width="4" height="5" rx="1" />
            <rect x="24" y="37" width="4" height="5" rx="1" />

            <rect x="38" y="29" width="4" height="5" rx="1" />
            <rect x="38" y="39" width="4" height="5" rx="1" />
          </g>

          {/* Building Base */}
          <path
            d="M10 54H54"
            stroke="#FBBF24"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Blue Architectural Accent */}
          <path
            d="M8 57C20 50 44 50 56 57"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* GRK Groups Branding */}
      {!compact && (
        <div className="flex flex-col leading-none">
          {/* GRK Letters */}
          <span
            className="
              text-2xl font-black
              tracking-wide text-white
              drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]
              transition-all duration-300 ease-in-out
              group-hover:text-amber-300
              group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]
            "
          >
            GRK
          </span>

          {/* GROUPS Text */}
          <span
            className="
              mt-1 text-[11px]
              font-extrabold uppercase
              tracking-[0.3em]
              text-amber-300
              transition-colors duration-300
              group-hover:text-amber-200
            "
          >
            GROUPS
          </span>
        </div>
      )}
    </Link>
  );
}
