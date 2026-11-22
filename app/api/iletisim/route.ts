import { parseInquiry } from "@/lib/inquiry";
import { contactEnabled, siteUrl } from "@/lib/site";

const attempts = new Map<string, { start: number; count: number }>();
const windowMs = 10 * 60_000;
const maxBytes = 24_576;
function rateLimited(key: string) {
  const now = Date.now();
  for (const [k, v] of attempts)
    if (now - v.start >= windowMs) attempts.delete(k);
  const bucket = attempts.get(key) || { start: now, count: 0 };
  bucket.count++;
  attempts.set(key, bucket);
  return bucket.count > 5;
}
export async function POST(req: Request) {
  if (!contactEnabled)
    return Response.json(
      { error: "Gönderim servisi henüz açık değil." },
      { status: 503 },
    );
  if (req.headers.get("origin") !== (siteUrl || new URL(req.url).origin))
    return new Response(null, { status: 403 });
  if (!req.headers.get("content-type")?.startsWith("application/json"))
    return new Response(null, { status: 415 });
  if (Number(req.headers.get("content-length")) > maxBytes)
    return new Response(null, { status: 413 });
  const reader = req.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > maxBytes) {
        await reader.cancel();
        return new Response(null, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return new Response(null, { status: 400 });
  }
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return new Response(null, { status: 400 });
  }
  const inquiry = parseInquiry(body);
  if (!inquiry || body.website || body.noticeRead !== true)
    return Response.json({ error: "Alanları kontrol edin." }, { status: 422 });
  // Set only when the reverse proxy overwrites this header for every client.
  const ipHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  const key = (ipHeader && req.headers.get(ipHeader)) || "shared";
  if (rateLimited(key))
    return Response.json(
      { error: "Çok sayıda deneme yapıldı. Daha sonra tekrar deneyin." },
      { status: 429 },
    );
  try {
    const token = process.env.CONTACT_WEBHOOK_TOKEN;
    const r = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
      cache: "no-store",
    });
    if (r.ok) return Response.json({ accepted: true });
  } catch {
    /* Never log visitor details or upstream credentials. */
  }
  return Response.json(
    { error: "Servisten teslim onayı alınamadı." },
    { status: 502 },
  );
}
