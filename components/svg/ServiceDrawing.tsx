// Service pictograms drawn on a shared 56 × 48 grid: hidden edges are left out, joints meet exactly.
export type ServiceKind = "house" | "layers" | "cube" | "plan";

export function ServiceDrawing({ kind }: { kind: ServiceKind }) {
  return (
    <svg
      className="service-drawing"
      viewBox="0 0 56 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {kind === "house" && (
        <>
          <path d="M4 22 28 6l24 16M9 18.67V44M47 18.67V44M2 44h52" />
          <path d="M23 44V31h10v13M14 26h6v6h-6zM36 26h6v6h-6zM38 12.67V7h4v8.33" />
        </>
      )}
      {kind === "layers" && (
        <>
          <path d="M6 13 28 2l22 11-22 11Z" />
          <path d="M15 17.5 6 22l22 11 22-11-9-4.5M15 26.5 6 31l22 11 22-11-9-4.5" />
          <path d="M17 13 28 7.5 39 13 28 18.5Z" strokeWidth=".7" />
        </>
      )}
      {kind === "cube" && (
        <>
          <path d="M28 4 46 14v20L28 44 10 34V14ZM10 14l18 10 18-10M28 24v20" />
          <path
            d="M19 9l18 10M37 9 19 19M19 19v20M10 24l18 10M37 19v20M46 24 28 34"
            strokeWidth=".6"
          />
        </>
      )}
      {kind === "plan" && (
        <>
          <path d="M6 5h44v36H6Z" strokeWidth="1.6" />
          <path d="M30 5v13M30 26v15M6 23h8M22 23h8" strokeWidth="1.6" />
          <path d="M22 23v-8a8 8 0 0 0-8 8M30 26h8a8 8 0 0 0-8-8" strokeWidth=".7" />
          <path d="M6 46h44M6 44v4M50 44v4M30 44v4" strokeWidth=".7" />
        </>
      )}
    </svg>
  );
}
