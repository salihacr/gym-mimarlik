// Symmetric elevation: a gabled centre block between two lower wings, standing on one ground line.
// app/icon.svg repeats this path for the favicon; keep the two in sync.
export const brandMarkPath =
  "M2 45h36" +
  "M12 45V14l8-9 8 9v31" +
  "M4 45V25l8-5M36 45V25l-8-5" +
  "M16 45V15M20 45V11M24 45V15" +
  "M8 45V28M32 45V28";

export function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      <path d={brandMarkPath} />
    </svg>
  );
}
