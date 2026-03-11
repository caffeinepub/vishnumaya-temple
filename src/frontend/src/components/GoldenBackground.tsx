export default function GoldenBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          {/* Golden gradient */}
          <radialGradient id="goldenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cornerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB800" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
          </radialGradient>
          {/* Mandala petal shape */}
          <path
            id="petal"
            d="M0,-40 C12,-20 12,20 0,40 C-12,20 -12,-20 0,-40Z"
          />
          {/* Lotus petal */}
          <path
            id="lotus-petal"
            d="M0,-30 C8,-15 8,0 0,10 C-8,0 -8,-15 0,-30Z"
          />
        </defs>

        {/* === CENTRAL MANDALA === */}
        <g
          transform="translate(720,450)"
          style={{
            transformOrigin: "720px 450px",
            animation: "spin-slow 40s linear infinite",
          }}
          opacity="0.09"
        >
          {/* Outer ring of petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (angle) => (
              <use
                key={angle}
                href="#petal"
                fill="#D4AF37"
                transform={`rotate(${angle}) translate(0,-90)`}
              />
            ),
          )}
          {/* Middle ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <use
              key={`m${angle}`}
              href="#petal"
              fill="#FFB800"
              transform={`rotate(${angle}) translate(0,-60) scale(0.8)`}
            />
          ))}
          {/* Inner circle */}
          <circle r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle r="18" fill="none" stroke="#C9962C" strokeWidth="1" />
          <circle r="8" fill="#D4AF37" opacity="0.6" />
          {/* Decorative cross lines */}
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={`cl${angle}`}
              x1="-110"
              y1="0"
              x2="110"
              y2="0"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.5"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* === SECONDARY MANDALA (counter-rotating) === */}
        <g
          transform="translate(720,450)"
          style={{
            transformOrigin: "720px 450px",
            animation: "spin-slow-reverse 60s linear infinite",
          }}
          opacity="0.06"
        >
          {[
            0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
            300, 320, 340,
          ].map((angle) => (
            <use
              key={`o${angle}`}
              href="#petal"
              fill="#C9962C"
              transform={`rotate(${angle}) translate(0,-140) scale(0.7)`}
            />
          ))}
          <circle r="45" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <circle
            r="110"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeDasharray="8 6"
          />
          <circle
            r="140"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </g>

        {/* === CORNER ORNAMENTS — TOP LEFT === */}
        <g transform="translate(0,0)" opacity="0.12">
          <circle cx="0" cy="0" r="120" fill="url(#cornerGlow)" />
          {/* Corner lotus */}
          <g
            transform="translate(60,60)"
            style={{ animation: "float-pulse 5s ease-in-out infinite" }}
          >
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <use
                key={a}
                href="#lotus-petal"
                fill="#D4AF37"
                transform={`rotate(${a}) scale(1.2)`}
              />
            ))}
            <circle r="7" fill="#FFB800" />
          </g>
          {/* Corner bracket lines */}
          <path
            d="M0,100 L0,10 Q0,0 10,0 L100,0"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <path
            d="M0,80 L0,20 Q0,10 10,10 L80,10"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          {/* Decorative dots */}
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={`tl${p}`}
              cx={p}
              cy="0"
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={`tll${p}`}
              cx="0"
              cy={p}
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
        </g>

        {/* === CORNER ORNAMENTS — TOP RIGHT === */}
        <g transform="translate(1440,0) scale(-1,1)" opacity="0.12">
          <circle cx="0" cy="0" r="120" fill="url(#cornerGlow)" />
          <g
            transform="translate(60,60)"
            style={{ animation: "float-pulse 5s ease-in-out infinite 1s" }}
          >
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <use
                key={a}
                href="#lotus-petal"
                fill="#D4AF37"
                transform={`rotate(${a}) scale(1.2)`}
              />
            ))}
            <circle r="7" fill="#FFB800" />
          </g>
          <path
            d="M0,100 L0,10 Q0,0 10,0 L100,0"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <path
            d="M0,80 L0,20 Q0,10 10,10 L80,10"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={p}
              cx={p}
              cy="0"
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={`r${p}`}
              cx="0"
              cy={p}
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
        </g>

        {/* === CORNER ORNAMENTS — BOTTOM LEFT === */}
        <g transform="translate(0,900) scale(1,-1)" opacity="0.12">
          <circle cx="0" cy="0" r="120" fill="url(#cornerGlow)" />
          <g
            transform="translate(60,60)"
            style={{ animation: "float-pulse 5s ease-in-out infinite 2s" }}
          >
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <use
                key={a}
                href="#lotus-petal"
                fill="#D4AF37"
                transform={`rotate(${a}) scale(1.2)`}
              />
            ))}
            <circle r="7" fill="#FFB800" />
          </g>
          <path
            d="M0,100 L0,10 Q0,0 10,0 L100,0"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <path
            d="M0,80 L0,20 Q0,10 10,10 L80,10"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={p}
              cx={p}
              cy="0"
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={`l${p}`}
              cx="0"
              cy={p}
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
        </g>

        {/* === CORNER ORNAMENTS — BOTTOM RIGHT === */}
        <g transform="translate(1440,900) scale(-1,-1)" opacity="0.12">
          <circle cx="0" cy="0" r="120" fill="url(#cornerGlow)" />
          <g
            transform="translate(60,60)"
            style={{ animation: "float-pulse 5s ease-in-out infinite 3s" }}
          >
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <use
                key={a}
                href="#lotus-petal"
                fill="#D4AF37"
                transform={`rotate(${a}) scale(1.2)`}
              />
            ))}
            <circle r="7" fill="#FFB800" />
          </g>
          <path
            d="M0,100 L0,10 Q0,0 10,0 L100,0"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <path
            d="M0,80 L0,20 Q0,10 10,10 L80,10"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={p}
              cx={p}
              cy="0"
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
          {[20, 40, 60, 80].map((p) => (
            <circle
              key={`br${p}`}
              cx="0"
              cy={p}
              r="1.5"
              fill="#D4AF37"
              opacity="0.7"
            />
          ))}
        </g>

        {/* === SIDE BORDER DECORATIONS — LEFT === */}
        <g opacity="0.08">
          {/* Vertical vine line */}
          <path
            d="M20,100 C30,200 10,300 20,400 C30,500 10,600 20,700 C30,800 20,850 20,900"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            style={{ animation: "shimmer-gold 4s ease-in-out infinite" }}
          />
          {/* Small lotus blooms along left edge */}
          {[180, 360, 540, 720].map((y, i) => (
            <g
              key={y}
              transform={`translate(20,${y})`}
              style={{
                animation: `float-pulse 4s ease-in-out infinite ${i * 0.8}s`,
              }}
            >
              {[0, 72, 144, 216, 288].map((a) => (
                <use
                  key={a}
                  href="#lotus-petal"
                  fill="#D4AF37"
                  transform={`rotate(${a}) scale(0.7)`}
                />
              ))}
              <circle r="4" fill="#FFB800" />
            </g>
          ))}
        </g>

        {/* === SIDE BORDER DECORATIONS — RIGHT === */}
        <g opacity="0.08">
          <path
            d="M1420,100 C1410,200 1430,300 1420,400 C1410,500 1430,600 1420,700 C1410,800 1420,850 1420,900"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            style={{ animation: "shimmer-gold 4s ease-in-out infinite 2s" }}
          />
          {[180, 360, 540, 720].map((y, i) => (
            <g
              key={y}
              transform={`translate(1420,${y})`}
              style={{
                animation: `float-pulse 4s ease-in-out infinite ${i * 0.8 + 0.4}s`,
              }}
            >
              {[0, 72, 144, 216, 288].map((a) => (
                <use
                  key={a}
                  href="#lotus-petal"
                  fill="#D4AF37"
                  transform={`rotate(${a}) scale(0.7)`}
                />
              ))}
              <circle r="4" fill="#FFB800" />
            </g>
          ))}
        </g>

        {/* === TOP & BOTTOM BORDER LINES === */}
        <g opacity="0.1">
          {/* Top border */}
          <path
            d="M100,8 C300,4 600,12 720,8 C840,4 1140,12 1340,8"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            style={{ animation: "shimmer-gold 5s ease-in-out infinite" }}
          />
          <path
            d="M100,16 C300,12 600,20 720,16 C840,12 1140,20 1340,16"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.5"
          />
          {/* Bottom border */}
          <path
            d="M100,892 C300,888 600,896 720,892 C840,888 1140,896 1340,892"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            style={{ animation: "shimmer-gold 5s ease-in-out infinite 2.5s" }}
          />
          <path
            d="M100,884 C300,880 600,888 720,884 C840,880 1140,888 1340,884"
            fill="none"
            stroke="#C9962C"
            strokeWidth="0.5"
          />
        </g>

        {/* === SCATTERED LOTUS MOTIFS === */}
        {/* Mid-left lotus */}
        <g
          transform="translate(200,270)"
          opacity="0.07"
          style={{ animation: "drift 10s ease-in-out infinite" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <use
              key={a}
              href="#petal"
              fill="#D4AF37"
              transform={`rotate(${a}) translate(0,-38) scale(0.9)`}
            />
          ))}
          <circle r="10" fill="none" stroke="#FFB800" strokeWidth="1" />
          <circle r="4" fill="#D4AF37" />
        </g>
        {/* Mid-right lotus */}
        <g
          transform="translate(1240,630)"
          opacity="0.07"
          style={{ animation: "drift 12s ease-in-out infinite 3s" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <use
              key={a}
              href="#petal"
              fill="#D4AF37"
              transform={`rotate(${a}) translate(0,-38) scale(0.9)`}
            />
          ))}
          <circle r="10" fill="none" stroke="#FFB800" strokeWidth="1" />
          <circle r="4" fill="#D4AF37" />
        </g>
        {/* Top-center ornament */}
        <g
          transform="translate(720,60)"
          opacity="0.09"
          style={{ animation: "float-pulse 6s ease-in-out infinite" }}
        >
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <use
              key={a}
              href="#lotus-petal"
              fill="#D4AF37"
              transform={`rotate(${a}) scale(1.5)`}
            />
          ))}
          <circle r="6" fill="#FFB800" />
          {/* Diamond shape */}
          <path
            d="M0,-20 L12,0 L0,20 L-12,0Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
        </g>
        {/* Bottom-center ornament */}
        <g
          transform="translate(720,840)"
          opacity="0.09"
          style={{ animation: "float-pulse 6s ease-in-out infinite 3s" }}
        >
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <use
              key={a}
              href="#lotus-petal"
              fill="#D4AF37"
              transform={`rotate(${a}) scale(1.5)`}
            />
          ))}
          <circle r="6" fill="#FFB800" />
          <path
            d="M0,-20 L12,0 L0,20 L-12,0Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
        </g>

        {/* === CENTRAL GLOW === */}
        <ellipse
          cx="720"
          cy="450"
          rx="400"
          ry="300"
          fill="url(#goldenGlow)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
