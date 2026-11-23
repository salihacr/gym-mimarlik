// Interface icons share one 24-unit grid, a 1.5 stroke and an optical centre of (12, 12).
const paths = {
  arrow: "M4 12h16M14 6l6 6-6 6",
  diagonal: "M6.5 17.5 17.5 6.5M8 6.5h9.5V16",
  left: "M15 5 8 12l7 7",
  right: "M9 5l7 7-7 7",
  down: "M12 4v16M6 14l6 6 6-6",
  menu: "M3 8.5h18M3 15.5h18",
  close: "M5.5 5.5l13 13M18.5 5.5l-13 13",
  plus: "M12 4.5v15M4.5 12h15",
  pause: "M9 5.5v13M15 5.5v13",
  play: "M8 5.5v13L18 12Z",
  compare: "M9 7l-5 5 5 5M15 7l5 5-5 5",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name = "arrow",
  size = 18,
}: {
  name?: IconName;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      <path d={paths[name]} />
    </svg>
  );
}
