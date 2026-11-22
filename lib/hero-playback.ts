import { heroMotion as scene, stages } from "@/content/hero-motion";

const last = stages.length - 1;
const resetStart = stages.reduce((total, stage) => total + stage.duration, 0) + scene.hold;
const firstCycle = resetStart + scene.reset;

// After the first pass the reverse mask has already restored the full pencil drawing.
export function heroFrameAt(elapsed: number) {
  let time = elapsed < firstCycle ? elapsed
    : stages[0].duration + (elapsed - firstCycle) % (firstCycle - stages[0].duration);
  for (const [index, stage] of stages.entries()) {
    if (time < stage.duration) {
      const start = index === 0 ? scene.openingProgress : 0;
      return { from: index - 1, to: index, guide: index, progress: start + (1 - start) * time / stage.duration, wait: 0 };
    }
    time -= stage.duration;
  }
  if (time < scene.hold) {
    return { from: last, to: last, guide: last, progress: 1, wait: scene.hold - time };
  }
  // Retract the finished render along the pencil paths, leaving graphite underneath.
  return { from: 0, to: last, guide: 0, progress: 1 - (time - scene.hold) / scene.reset, wait: 0 };
}

export async function decodeHeroImage(src: string) {
  const image = new Image();
  image.src = src;
  await image.decode();
  return image;
}

export function createHeroPainter(canvas: HTMLCanvasElement, frames: HTMLImageElement[], atlas: HTMLImageElement) {
  const { maskWidth, maskHeight, feather } = scene;
  const layer = document.createElement("canvas");
  const mask = document.createElement("canvas");
  mask.width = maskWidth;
  mask.height = atlas.naturalHeight;
  const output = canvas.getContext("2d");
  const paint = layer.getContext("2d");
  const brush = mask.getContext("2d", { willReadFrequently: true });
  if (!output || !paint || !brush) throw new Error("Canvas 2D kullanılamıyor.");

  brush.drawImage(atlas, 0, 0);
  const guides = frames.map((_, i) => {
    const rgba = brush.getImageData(0, i * maskHeight, maskWidth, maskHeight).data;
    return Uint8Array.from({ length: maskWidth * maskHeight }, (_, p) => rgba[4 * p]);
  });
  mask.height = maskHeight;
  const alpha = brush.createImageData(maskWidth, maskHeight);
  const ramp = new Uint8ClampedArray(256);

  return (frame: ReturnType<typeof heroFrameAt>) => {
    const { width, height } = canvas;
    if (layer.width !== width || layer.height !== height) {
      layer.width = width;
      layer.height = height;
    }
    if (frame.from < 0) output.clearRect(0, 0, width, height);
    else output.drawImage(frames[frame.from], 0, 0, width, height);
    if (frame.from === frame.to) return;

    for (let i = 0; i < 256; i++) {
      const t = Math.max(0, Math.min(1, (frame.progress - i / 255 * (1 - feather)) / feather));
      ramp[i] = 255 * t * t * (3 - 2 * t);
    }
    const guide = guides[frame.guide];
    for (let i = 0; i < guide.length; i++) alpha.data[4 * i + 3] = ramp[guide[i]];
    brush.putImageData(alpha, 0, 0);

    paint.globalCompositeOperation = "source-over";
    paint.drawImage(frames[frame.to], 0, 0, width, height);
    paint.globalCompositeOperation = "destination-in";
    paint.drawImage(mask, 0, 0, width, height);
    output.drawImage(layer, 0, 0);
  };
}
