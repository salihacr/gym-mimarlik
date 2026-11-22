import { readFile } from "node:fs/promises";
import { join } from "node:path";

const assets = new Set(["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png"]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asset: string }> },
) {
  const { asset } = await params;
  if (!assets.has(asset)) return new Response(null, { status: 404 });

  const image = await readFile(
    join(process.cwd(), "content", "hero-animation", asset),
  );

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
