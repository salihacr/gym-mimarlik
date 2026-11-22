// Run from the repository root after changing the sources or registration guides.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { heroMotion as scene, stages } from "../content/hero-motion.ts";

const output = "public/hero";
await mkdir(output, { recursive: true });
const { maskWidth, maskHeight } = scene;
const atlas = Buffer.alloc(maskWidth * maskHeight * stages.length);

function arrival(x, y, strokes, spread) {
  let earliest = Infinity;
  for (const stroke of strokes) {
    for (let i = 1; i < stroke.length; i++) {
      const [ax, ay, start] = stroke[i - 1];
      const [bx, by, end] = stroke[i];
      const dx = bx - ax, dy = by - ay;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
      const distance = Math.hypot(x - ax - t * dx, y - ay - t * dy);
      earliest = Math.min(earliest, start + t * (end - start) + distance * spread);
    }
  }
  // Compress distant paper into the tail without an abrupt cut at the edges.
  return earliest < 0.75 ? earliest : 1 - 0.25 * Math.exp(-4 * (earliest - 0.75));
}

for (const [index, stage] of stages.entries()) {
  for (let y = 0; y < maskHeight; y++) {
    for (let x = 0; x < maskWidth; x++) {
      const time = arrival((x + 0.5) * 400 / maskWidth, (y + 0.5) * 225 / maskHeight, stage.strokes, stage.spread);
      atlas[(index * maskHeight + y) * maskWidth + x] = Math.round(time * 255);
    }
  }

  for (const width of scene.variants) {
    const height = Math.round(width * scene.height / scene.width);
    const [scale, dx, dy] = stage.registration;
    const w = Math.round(width * scale), h = Math.round(height * scale);
    const left = Math.round(dx * width / 400), top = Math.round(dy * height / 225);
    const resized = await sharp(`content/hero-media/${stage.file}.webp`).resize(w, h, { fit: "fill" }).png().toBuffer();
    const padded = await sharp(resized).extend({
      left: Math.max(0, left), top: Math.max(0, top),
      right: Math.max(0, width - left - w), bottom: Math.max(0, height - top - h),
      extendWith: "copy",
    }).png().toBuffer();
    await sharp(padded).extract({ left: Math.max(0, -left), top: Math.max(0, -top), width, height })
      .webp({ quality: 86 }).toFile(`${output}/${stage.file}-${width}.webp`);
  }
}

await sharp(atlas, { raw: { width: maskWidth, height: maskHeight * stages.length, channels: 1 } })
  .toColourspace("b-w").png().toFile(`${output}/reveal.png`);

// The server-rendered poster is the same sparse roof stroke used at playback time.
const width = scene.variants[0];
const height = Math.round(width * scene.height / scene.width);
const alpha = Buffer.from(atlas.subarray(0, maskWidth * maskHeight));
for (let i = 0; i < alpha.length; i++) {
  const t = Math.max(0, Math.min(1, (scene.openingProgress - alpha[i] / 255 * (1 - scene.feather)) / scene.feather));
  alpha[i] = Math.round(255 * t * t * (3 - 2 * t));
}
const opacity = await sharp(alpha, { raw: { width: maskWidth, height: maskHeight, channels: 1 } })
  .resize(width, height).greyscale().raw().toBuffer();
await sharp(`${output}/${stages[0].file}-${width}.webp`).joinChannel(opacity, { raw: { width, height, channels: 1 } })
  .webp({ quality: 90 }).toFile(`${output}/opening.webp`);
