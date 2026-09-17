import type { Project } from "./data";

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  if (type === "rail") {
    return (
      <div className="project-visual project-rail" aria-hidden="true">
        <svg viewBox="0 0 680 360" role="presentation">
          <path
            className="route route-a"
            d="M22 280 C125 275 120 100 246 122 S382 278 468 190 S555 55 658 68"
          />
          <path className="route route-b" d="M16 94 C112 96 163 244 276 218 S421 78 656 286" />
          <path className="route route-c" d="M75 330 C187 175 319 310 398 186 S543 160 638 25" />
          {[
            [22, 280],
            [147, 169],
            [246, 122],
            [356, 216],
            [468, 190],
            [570, 77],
            [658, 68],
            [111, 122],
            [276, 218],
            [506, 166],
            [75, 330],
            [398, 186],
            [638, 25],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 7 : 4} />
          ))}
        </svg>
        <div className="rail-scan" />
        <span className="visual-caption">DIGITAL TWIN / LIVE ROUTING</span>
      </div>
    );
  }
  if (type === "audio") {
    return (
      <div className="project-visual project-audio" aria-hidden="true">
        <div className="orbit orbit-one">
          <i />
        </div>
        <div className="orbit orbit-two">
          <i />
        </div>
        <div className="audio-core">
          <span>SYNC</span>
        </div>
        <div className="waveform">
          {Array.from({ length: 42 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  "--bar": `${22 + ((i * 31) % 78)}%`,
                  "--delay": `${i * -0.04}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <span className="visual-caption">REAL-TIME / GROUP SESSION</span>
      </div>
    );
  }
  return (
    <div className="project-visual project-ev" aria-hidden="true">
      <div className="ev-map-grid" />
      <svg viewBox="0 0 680 360" role="presentation">
        <path
          className="ev-route"
          d="M65 294 C154 215 164 269 247 190 S395 110 468 150 S558 247 624 68"
        />
        {(
          [
            [65, 294],
            [247, 190],
            [468, 150],
            [624, 68],
          ] as const
        ).map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="16" />
            <path
              d={`M${x - 3} ${y - 8} L${x + 3} ${y - 1} L${x - 2} ${y - 1} L${x + 2} ${y + 8}`}
            />
          </g>
        ))}
      </svg>
      <div className="ev-radar" />
      <span className="visual-caption">CHARGING NETWORK / AVAILABILITY</span>
    </div>
  );
}
