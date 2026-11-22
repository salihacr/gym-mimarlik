type IconName =
  | "arrow"
  | "diagonal"
  | "left"
  | "right"
  | "down"
  | "menu"
  | "close"
  | "plus"
  | "pause"
  | "play";
export function Icon({
  name = "arrow",
  size = 18,
}: {
  name?: IconName;
  size?: number;
}) {
  const paths = {
    arrow: "M3 12h17m-7-7 7 7-7 7",
    diagonal: "M5 19 19 5M6 5h13v13",
    left: "m15 5-7 7 7 7",
    right: "m9 5 7 7-7 7",
    down: "M12 2v18m-6-6 6 6 6-6",
    menu: "M2 7h20M2 16h20",
    close: "m4 4 16 16M20 4 4 20",
    plus: "M12 4v16M4 12h16",
    pause: "M8 5v14M16 5v14",
    play: "m9 5 10 7-10 7V5Z",
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
    >
      <path d="M2 44h40M5 43V23l8-5m0 25V13L23 3l9 9v31M17 43V15l6-7v35m4 0V11m6 8 6 5v19M9 42V25m11 18V18m15 8v17" />
    </svg>
  );
}
export function ServiceDrawing({
  kind,
}: {
  kind: "house" | "layers" | "cube" | "plan";
}) {
  return (
    <svg
      className="service-drawing"
      viewBox="0 0 58 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "house" && (
        <>
          <path d="m4 24 24-16 24 14M9 23v21h37V22L28 11 9 24Zm5 18V26l14-10 14 9v16H14Z" />
          <path d="M20 41V28l11-4v17M31 29l7 1v7h-7M4 45h48M3 26l5-3M28 4v5" />
        </>
      )}
      {kind === "layers" && (
        <>
          <path d="m4 19 25-13 25 13-25 13L4 19Zm1 9 8-4m32 0 8 4-24 13L5 28Zm0 8 7-4m34 0 7 4-24 13L5 36Z" />
          <path d="m16 19 13-7 12 7-12 6-13-6Z" strokeWidth=".65" />
        </>
      )}
      {kind === "plan" && (
        <>
          <path d="M6 8h46v37H6zM10 12h38v29H10zM30 12v12m0 9v8M10 28h11m8 0h19" />
          <path d="M21 28v-8a8 8 0 0 1 8 8M3 48h52" strokeWidth=".8" />
        </>
      )}
      {kind === "cube" && (
        <>
          <path d="m7 15 22-12 22 12v24L29 51 7 39V15Zm0 0 22 12 22-12M29 27v24" />
          <path
            d="m15 20 14-8 14 8v15l-14 8-14-8V20Zm0 0 14 8 14-8m-14 8v15"
            strokeWidth=".8"
          />
          <path d="M29 3v9M7 39l8-4m28 0 8 4" strokeDasharray="2 2" />
        </>
      )}
    </svg>
  );
}
