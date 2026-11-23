import { Fragment, useId } from "react";

// A two-storey pavilion modelled in metres and projected onto a 960 × 650 sheet.
// Both the rendered drawing and the pen-stroke study on the studio page are derived
// from the same boxes, so the line work always lands exactly on the finished image.
type V3 = [x: number, y: number, z: number];
type Range = [number, number];
type Box = { x: Range; y: Range; z: Range };

const origin = [321.5, 284.3];
const unit = { x: [31, 7.5], y: [-12.25, 6.9], z: 30.6 };

function project([x, y, z]: V3) {
  return [
    origin[0] + unit.x[0] * x + unit.y[0] * y,
    origin[1] + unit.x[1] * x + unit.y[1] * y - unit.z * z,
  ];
}
const pt = (p: V3) =>
  project(p)
    .map((n) => Math.round(n * 10) / 10)
    .join(" ");
const poly = (...points: V3[]) => "M" + points.map(pt).join("L") + "Z";
const seg = (a: V3, b: V3) => "M" + pt(a) + "L" + pt(b);
const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let v = from + step; v < to - 1e-6; v += step) out.push(Math.round(v * 1000) / 1000);
  return out;
};

function faces({ x: [x0, x1], y: [y0, y1], z: [z0, z1] }: Box) {
  return {
    top: poly([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]),
    front: poly([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]),
    side: poly([x1, y0, z1], [x1, y1, z1], [x1, y1, z0], [x1, y0, z0]),
  };
}

// Visible edges of a box as one continuous pen path.
function outline({ x: [x0, x1], y: [y0, y1], z: [z0, z1] }: Box) {
  return (
    poly([x0, y0, z1], [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y1, z1]) +
    seg([x0, y1, z1], [x1, y1, z1]) +
    seg([x1, y1, z1], [x1, y0, z1]) +
    seg([x1, y1, z1], [x1, y1, z0])
  );
}

const site: Box = { x: [0, 18], y: [0, 18], z: [-0.2, 0] };
const podium: Box = { x: [1, 15.6], y: [1.3, 13.9], z: [0, 0.25] };
const steps: Box[] = [
  { x: [7.4, 10.2], y: [13.9, 14.3], z: [0, 0.17] },
  { x: [7.4, 10.2], y: [14.3, 14.7], z: [0, 0.085] },
];
const ground: Box = { x: [1.6, 14.8], y: [2, 12], z: [0.25, 2.85] };
const slab: Box = { x: [1, 15.6], y: [1.3, 13.9], z: [2.85, 3.2] };
const stone: Box = { x: [1.6, 2.9], y: [2, 10.6], z: [3.2, 5.6] };
const upper: Box = { x: [2.9, 9.4], y: [2, 10.2], z: [3.2, 5.6] };
const core: Box = { x: [9.4, 10.8], y: [2, 10.6], z: [3.2, 5.6] };
const roof: Box = { x: [0.9, 11.4], y: [1, 12], z: [5.6, 5.9] };
const screen = { x: [2.2, 5.8] as Range, y: 12.25 };

const groundMullions = range(1.6, 14.8, 1.2).filter(
  (x) => x < screen.x[0] - 0.1 || x > screen.x[1] + 0.1,
);
const sideMullions = range(2, 12, 1.25);
const upperMullions = range(2.9, 9.4, 1.3);
const battens = range(screen.x[0] - 0.15, screen.x[1] + 0.15, 0.15);

const guides = [
  ...[1.3, 13.9].map((y) => seg([-3, y, 0], [21, y, 0])),
  ...[1, 15.6].map((x) => seg([x, -3, 0], [x, 21, 0])),
].join("");

/** Pen paths in drawing order, used by the studio page's line animation. */
export const pavilionStudy = [
  guides,
  outline(site),
  outline(podium) + steps.map(outline).join(""),
  outline(ground),
  outline(slab),
  outline(stone) + outline(upper) + outline(core),
  outline(roof),
  [
    ...groundMullions.map((x) => seg([x, ground.y[1], ground.z[0]], [x, ground.y[1], ground.z[1]])),
    ...sideMullions.map((y) => seg([ground.x[1], y, ground.z[0]], [ground.x[1], y, ground.z[1]])),
    ...upperMullions.map((x) => seg([x, upper.y[1], upper.z[0]], [x, upper.y[1], upper.z[1]])),
  ].join(""),
];

const edge = "#665c4e";

function Solid({
  box,
  fill,
  only,
}: {
  box: Box;
  fill: [top: string, front: string, side: string];
  only?: ("top" | "front" | "side")[];
}) {
  const f = faces(box);
  const keys = only ?? (["top", "front", "side"] as const);
  return (
    <>
      {keys.map((k) => (
        <path key={k} d={f[k]} fill={fill[["top", "front", "side"].indexOf(k)]} />
      ))}
    </>
  );
}

/** The rendered pavilion as a group, for embedding in another SVG of the same viewBox. */
export function PavilionScene() {
  const id = useId();
  const paper = `${id}-paper`;
  const stoneFill = `${id}-stone`;
  const glass = `${id}-glass`;
  return (
    <g>
      <defs>
        <pattern id={paper} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="#b5a691" strokeWidth=".4" opacity=".45" />
        </pattern>
        <pattern id={stoneFill} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#d9cfbd" />
          <path d="M0 8 8 0" stroke="#938776" strokeWidth=".5" />
        </pattern>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d3dcd4" />
          <stop offset="1" stopColor="#aebbb2" />
        </linearGradient>
      </defs>
      <rect width="960" height="650" fill="#f1ede3" />
      <rect width="960" height="650" fill={`url(#${paper})`} />

      <path d={guides} fill="none" stroke="#c5b9a6" strokeWidth=".8" strokeDasharray="6 5" />

      <g stroke={edge} strokeWidth="1.2" strokeLinejoin="round">
        <Solid box={site} fill={["#e7e1d5", "#d6cdbd", "#c6bdab"]} />
        <path
          d={[
            ...range(0, 18, 1.2).map((y) => seg([0, y, 0], [18, y, 0])),
            ...range(0, 18, 1.2).map((x) => seg([x, 0, 0], [x, 18, 0])),
          ].join("")}
          fill="none"
          stroke="#b7aa96"
          strokeWidth=".5"
        />
        <Solid box={podium} fill={["#eee8dc", "#dfd4bf", "#c8bca6"]} />
        {steps.map((b, i) => (
          <Solid key={i} box={b} fill={["#e7dfcf", "#cfc3b0", "#b5a995"]} />
        ))}

        {/* Ground floor: glazed box, mullions, timber screen */}
        <Solid box={ground} fill={["none", `url(#${glass})`, "#879a92"]} only={["front", "side"]} />
        <path
          d={[
            ...groundMullions.map((x) => seg([x, 12, 0.25], [x, 12, 2.85])),
            ...sideMullions.map((y) => seg([14.8, y, 0.25], [14.8, y, 2.85])),
          ].join("")}
          stroke="#514f43"
          strokeWidth="1.4"
        />
        <path
          d={poly(
            [screen.x[0], screen.y, 2.85],
            [screen.x[1], screen.y, 2.85],
            [screen.x[1], screen.y, 0.25],
            [screen.x[0], screen.y, 0.25],
          )}
          fill="#c9b89c"
          opacity=".35"
          stroke="none"
        />
        <path
          d={battens.map((x) => seg([x, screen.y, 0.25], [x, screen.y, 2.85])).join("")}
          stroke="#877357"
          strokeWidth="1.6"
        />
        <Solid box={slab} fill={["#eee8db", "#e0d7c8", "#c6bba9"]} />

        {/* Upper floor: stone wall, recessed glazing, service core */}
        <Solid box={stone} fill={["#e5dccd", `url(#${stoneFill})`, "#d2c7b3"]} />
        <Solid box={upper} fill={["none", `url(#${glass})`, "none"]} only={["front"]} />
        <path
          d={upperMullions.map((x) => seg([x, 10.2, 3.2], [x, 10.2, 5.6])).join("")}
          stroke="#514f43"
          strokeWidth="1.3"
        />
        <Solid box={core} fill={["#e8e2d7", "#d5ccbb", "#c8beaa"]} />
        <Solid box={roof} fill={["#f4efe5", "#e3dacb", "#c5baa7"]} />
      </g>

      {/* Dimensions */}
      <g fill="none" stroke="#a5684e" strokeWidth=".9">
        <path d={seg([1, 19.6, 0], [15.6, 19.6, 0])} />
        {[1, 10.8, 15.6].map((x) => (
          <Fragment key={x}>
            <path d={seg([x, 18.4, 0], [x, 20.4, 0])} />
            <path d={`M${pt([x, 19.6, 0])}m-4 4 8-8`} />
          </Fragment>
        ))}
        <path d={seg([19.6, 13.9, 0], [19.6, 13.9, 5.9])} />
        {[0, 2.85, 5.9].map((z) => (
          <Fragment key={z}>
            <path d={seg([18.8, 13.9, z], [20.4, 13.9, z])} />
            <path d={`M${pt([19.6, 13.9, z])}m-4 4 8-8`} />
          </Fragment>
        ))}
      </g>
    </g>
  );
}

export function PavilionDrawing() {
  return (
    <svg
      className="drawing-fill"
      viewBox="0 0 960 650"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Üst üste oturan hacimleri ve kat ilişkilerini gösteren aksonometrik mimari şema"
    >
      <PavilionScene />
    </svg>
  );
}
