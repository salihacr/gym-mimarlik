// Mask guides use a 400 × 225 reference grid. The third coordinate is the
// arrival time along the stroke, expressed as a fraction of the transition.
type Point = [x: number, y: number, arrival: number];
type Stroke = Point[];
type Stage = {
  file: string;
  duration: number;
  registration: [scale: number, offsetX: number, offsetY: number];
  spread: number;
  strokes: Stroke[];
};

export const heroMotion = {
  width: 1672,
  height: 941,
  variants: [720, 1440],
  maskWidth: 224,
  maskHeight: 126,
  openingProgress: 0.11,
  feather: 0.13,
  hold: 2400,
  reset: 1350,
  fps: 30,
  mobileFps: 24,
};

export const stages: Stage[] = [
  {
    file: '01_musteri_karakalem', duration: 1550,
    registration: [0.972, 5, 2], spread: 0.022,
    strokes: [
      [[138, 66, 0], [280, 24, 0.13], [325, 54, 0.21]],
      [[69, 99, 0.13], [171, 70, 0.22], [267, 51, 0.28]],
      [[268, 52, 0.22], [268, 183, 0.46]],
      [[38, 138, 0.27], [260, 118, 0.45], [308, 126, 0.49]],
      [[98, 101, 0.34], [96, 177, 0.48], [320, 185, 0.62]],
      [[25, 184, 0.54], [136, 212, 0.66], [334, 188, 0.75]],
    ],
  },
  {
    file: '02_kaba_mimari_eskiz', duration: 1070,
    registration: [1, 0, 1], spread: 0.017,
    strokes: [
      [[74, 98, 0], [277, 22, 0.32], [333, 65, 0.49]],
      [[42, 136, 0.17], [273, 114, 0.42], [262, 183, 0.56]],
      [[63, 183, 0.38], [314, 185, 0.69]],
    ],
  },
  {
    file: '03_gelismis_eskiz', duration: 1080,
    registration: [1, 0, 0], spread: 0.014,
    strokes: [
      [[272, 48, 0], [264, 183, 0.32], [324, 183, 0.49]],
      [[255, 73, 0.18], [76, 107, 0.53]],
      [[251, 143, 0.33], [50, 183, 0.66]],
    ],
  },
  {
    file: '04_temiz_mimari_cizim', duration: 980,
    registration: [1, 0, 0], spread: 0.012,
    strokes: [
      [[40, 138, 0], [271, 113, 0.33], [279, 24, 0.43]],
      [[64, 181, 0.23], [255, 184, 0.46], [361, 134, 0.63]],
    ],
  },
  {
    file: '05_beyaz_3d_model', duration: 1450,
    registration: [1, 0, 0], spread: 0.013,
    strokes: [
      [[40, 139, 0], [259, 118, 0.23], [266, 53, 0.38]],
      [[44, 180, 0.22], [285, 182, 0.42], [354, 80, 0.57]],
      [[139, 65, 0.33], [280, 23, 0.50], [325, 58, 0.57]],
    ],
  },
  {
    file: '06_malzeme_ve_isik', duration: 1800,
    registration: [1, 0, 0], spread: 0.026,
    strokes: [
      [[337, 43, 0], [347, 178, 0.26]],
      [[279, 53, 0.12], [279, 181, 0.32]],
      [[250, 64, 0.31], [178, 101, 0.46], [115, 163, 0.54]],
      [[45, 192, 0.54], [146, 209, 0.63], [242, 194, 0.70]],
      [[144, 68, 0.66], [280, 33, 0.78], [322, 59, 0.82]],
    ],
  },
  {
    file: '07_nihai_render', duration: 1050,
    registration: [1, 0, 0], spread: 0.013,
    strokes: [
      [[264, 49, 0], [75, 98, 0.3], [50, 177, 0.45]],
      [[259, 119, 0.20], [93, 153, 0.43], [30, 194, 0.57]],
      [[324, 128, 0.40], [312, 181, 0.56], [132, 210, 0.72]],
    ],
  },
];

export function frameUrl(index: number, width: number) {
  return `/hero/${stages[index].file}-${width}.webp`;
}
