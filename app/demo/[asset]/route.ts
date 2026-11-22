import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { demoMode } from "@/lib/catalog";
const assets = new Set(["konut.webp", "villa.webp", "interior.webp", "facade.webp"]);
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asset: string }> },
) {
  const { asset } = await params;
  if (!demoMode || !assets.has(asset))
    return new Response(null, { status: 404 });
  const image = await readFile(
    join(process.cwd(), "content/demo-media", asset),
  );
  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "private, max-age=60",
    },
  });
}
