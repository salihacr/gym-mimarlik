import { useId } from "react";

// Schematic ground-floor plan at 40 px = 1 m. Every wall sits on a structural axis
// (A–D, 1–3); openings are cut out of continuous walls so door leaves always match their gaps.
const ink = "#5a594e";
const line = "#88816f";
const accent = "#ac7458";
const floor = "#f8f5ed";

const ax = [60, 280, 460, 600];
const ay = [70, 190, 330];

// [x, y, length, vertical]
const windows: [number, number, number, boolean][] = [
  [110, 70, 120, false],
  [320, 70, 100, false],
  [510, 70, 50, false],
  [60, 110, 90, true],
  [600, 220, 80, true],
  [300, 330, 60, false],
];

// Cut-outs in walls: [x, y, w, h]
const openings: [number, number, number, number][] = [
  [276, 198, 8, 38], // living → dining
  [300, 186, 38, 8], // dining → bedroom
  [456, 120, 8, 36], // bedroom → bath
  [412, 326, 38, 8], // entrance
  [456, 210, 8, 100], // open kitchen
];

function Chair({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-9" y="-9" width="18" height="18" rx="2" fill="#f3efe6" stroke="#8e836d" />
    </g>
  );
}

export function PlanDrawing({ fit = "cover" }: { fit?: "cover" | "contain" }) {
  const id = useId();
  const grid = `${id}-grid`;
  const deck = `${id}-deck`;
  return (
    <svg
      className="drawing-fill"
      viewBox="0 0 800 480"
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
      role="img"
      aria-label="Kapı açılımları, mobilya yerleşimi ve ölçü çizgilerini gösteren şematik kat planı"
    >
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="#a79a85" strokeWidth=".45" />
        </pattern>
        <pattern id={deck} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0v10" stroke="#9d927f" strokeWidth=".8" />
        </pattern>
      </defs>
      <rect width="800" height="480" fill="#eeeae0" />
      <rect width="800" height="480" fill={`url(#${grid})`} />
      <g transform="translate(95 65)">
        {/* Structural axes with grid bubbles */}
        <g fill="none" stroke="#a79a85" strokeWidth=".8" strokeDasharray="10 4 2 4">
          {ax.map((x) => (
            <path key={x} d={`M${x} 6V360`} />
          ))}
          {ay.map((y) => (
            <path key={y} d={`M-6 ${y}H640`} />
          ))}
        </g>
        <g fill={floor} stroke="#a79a85" strokeWidth=".8">
          {ax.map((x) => (
            <circle key={x} cx={x} cy="-4" r="10" />
          ))}
          {ay.map((y) => (
            <circle key={y} cx="-16" cy={y} r="10" />
          ))}
        </g>
        <g fill="#8a7d68" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="10" textAnchor="middle">
          {ax.map((x, i) => (
            <text key={x} x={x} y="-0.5">
              {"ABCD"[i]}
            </text>
          ))}
          {ay.map((y, i) => (
            <text key={y} x="-16" y={y + 3.5}>
              {i + 1}
            </text>
          ))}
        </g>

        {/* Floor, terrace */}
        <path d="M60 70h540v260H280v-90H60Z" fill={floor} />
        <rect x="60" y="240" width="220" height="90" fill={`url(#${deck})`} stroke={line} />

        {/* Walls */}
        <path
          d="M60 240V70h540v260H280V70M60 240h220M280 190h180M460 70v260M460 170h140"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <g fill={floor}>
          {openings.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
          ))}
        </g>
        {/* Sliding door to the terrace */}
        <rect x="100" y="236" width="120" height="8" fill={floor} />
        <path d="M100 238.5h64M156 241.5h64" stroke={line} strokeWidth="1.25" />

        {/* Windows */}
        <g fill={floor} stroke={line} strokeWidth="1">
          {windows.map(([x, y, l, v]) =>
            v ? (
              <path key={`${x}-${y}`} d={`M${x - 3} ${y}h6v${l}h-6ZM${x} ${y}v${l}`} />
            ) : (
              <path key={`${x}-${y}`} d={`M${x} ${y - 3}h${l}v6h-${l}ZM${x} ${y}h${l}`} />
            ),
          )}
        </g>

        {/* Door leaves and swings */}
        <g fill="none" stroke={line} strokeWidth="1.25">
          <path d="M280 236h38M318 236a38 38 0 0 0-38-38" />
          <path d="M300 190v-38M300 152a38 38 0 0 1 38 38" />
          <path d="M460 156h36M496 156a36 36 0 0 0-36-36" />
          <path d="M450 330v-38M450 292a38 38 0 0 0-38 38" />
        </g>

        {/* Furniture */}
        <g fill="none" stroke={line} strokeWidth="1.25">
          {/* living: sofa, coffee table */}
          <rect x="76" y="106" width="34" height="110" rx="3" />
          <path d="M86 110v102M86 143h-6M86 179h-6" />
          <rect x="138" y="128" width="50" height="66" rx="4" />
          {/* bedroom: bed with pillows, bedside tables */}
          <rect x="326" y="82" width="98" height="84" />
          <rect x="334" y="88" width="38" height="14" rx="3" />
          <rect x="378" y="88" width="38" height="14" rx="3" />
          <path d="M326 112h98" />
          <rect x="304" y="82" width="18" height="18" />
          <rect x="428" y="82" width="18" height="18" />
          {/* dining table */}
          <rect x="330" y="236" width="90" height="50" rx="3" />
          {/* bath: tub, basin, wc */}
          <rect x="520" y="78" width="74" height="34" rx="4" />
          <rect x="526" y="84" width="62" height="22" rx="8" />
          <rect x="508" y="152" width="32" height="12" rx="2" />
          <rect x="576" y="130" width="18" height="12" />
          <ellipse cx="585" cy="153" rx="8" ry="11" />
          {/* kitchen counter with sink and hob */}
          <rect x="570" y="178" width="24" height="146" />
          <rect x="574" y="208" width="16" height="26" rx="3" />
          <circle cx="582" cy="270" r="5" />
          <circle cx="582" cy="290" r="5" />
        </g>
        <Chair x={355} y={225} />
        <Chair x={395} y={225} />
        <Chair x={355} y={297} />
        <Chair x={395} y={297} />

        {/* Dimension chains */}
        <g fill="none" stroke={accent} strokeWidth=".85">
          <path d="M60 46h540M30 70v260" />
          {ax.map((x) => (
            <path key={x} d={`M${x} 38v16M${x - 4} 50l8-8`} />
          ))}
          {ay.map((y) => (
            <path key={y} d={`M22 ${y}h16M26 ${y + 4}l8-8`} />
          ))}
        </g>
        <g fill={accent} fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="10" textAnchor="middle">
          {ax.slice(1).map((x, i) => (
            <text key={x} x={(x + ax[i]) / 2} y="41">
              {((x - ax[i]) / 40).toFixed(2)}
            </text>
          ))}
          {ay.slice(1).map((y, i) => (
            <text
              key={y}
              x="25"
              y={(y + ay[i]) / 2}
              transform={`rotate(-90 25 ${(y + ay[i]) / 2})`}
            >
              {((y - ay[i]) / 40).toFixed(2)}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}
