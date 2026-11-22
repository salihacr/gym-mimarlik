// The linework follows the corners of the same axonometric study used for the final image.
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
        strokeWidth="1.7"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          d="m75 427 313-177m-145 7 688 167M44 370l687 167m-77 21 302-170"
          stroke="#c0ad96"
        />
        <path
          pathLength="1"
          d="m101 409 221-125 558 135-221 125z M101 409v6l558 135 221-125v-6"
        />
        <path
          pathLength="1"
          d="m181 381 452 110 156-88-452-109z M223 371v-79l409 99 122-69v80l-122 68z M632 391v79"
        />
        <path
          pathLength="1"
          d="m181 291 155-87 455 110-155 87z M181 291v10l455 111 155-88v-10"
        />
        <path
          pathLength="1"
          d="m241 272 285 69 104-59v-73l-285-69-104 59z M241 199l285 69 104-59m-104 59v73"
        />
        <path
          pathLength="1"
          d="m202 195 135-76 325 79-135 76z M202 195v9l325 79 135-76v-9"
        />
        <path
          pathLength="1"
          d="m277 208 0 73m43-63v72m42-63v73m43-63v73m43-63v73m43-63v73m-151-13v72m52-59v72m53-59v72m53-59v72m52-59v72m52-59v72"
          strokeWidth="1.3"
        />
      </g>
      <image
        className="study-finish"
        href="/drawings/pavilion.svg"
        width="960"
        height="650"
      />
    </svg>
  );
}
