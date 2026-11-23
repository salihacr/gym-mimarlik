import { PavilionScene, pavilionStudy } from "./svg/Pavilion";

// The pen study traces the same model edges the finished drawing is built from.
export function StudioDrawing() {
  return (
    <svg
      className="studio-drawing"
      viewBox="0 0 960 650"
      width="960"
      height="650"
      role="img"
      aria-label="İki katlı bir evin zeminden çatıya oluşan mimari çizimi"
    >
      <rect width="960" height="650" fill="#f1ede3" />
      <g
        className="study-lines"
        fill="none"
        stroke="#796752"
        strokeWidth="1.6"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {pavilionStudy.map((d, i) => (
          <path
            key={i}
            pathLength="1"
            d={d}
            stroke={i === 0 ? "#c0ad96" : undefined}
            strokeWidth={i === pavilionStudy.length - 1 ? 1.2 : undefined}
          />
        ))}
      </g>
      <g className="study-finish" aria-hidden="true">
        <PavilionScene />
      </g>
    </svg>
  );
}
