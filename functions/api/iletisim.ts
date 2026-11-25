// Cloudflare Pages Function: POST /api/iletisim
// Replaces the former Next.js route handler so the site itself can stay static.
// Runtime variables are set in Cloudflare Pages → Settings → Variables and Secrets.
import { parseInquiry } from "../../lib/inquiry";

interface Env {
  SITE_URL?: string;
  PRIVACY_NOTICE_URL?: string;
  CONTACT_WEBHOOK_URL?: string;
  CONTACT_WEBHOOK_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
}
type Context = { request: Request; env: Env };

const maxBytes = 24_576;
const windowMs = 10 * 60_000;
// Best effort only: each Worker isolate keeps its own counters. Pair it with
// Turnstile and, if needed, a Cloudflare rate limiting rule on /api/iletisim.
const attempts = new Map<string, { start: number; count: number }>();
function rateLimited(key: string) {
  const now = Date.now();
  for (const [k, v] of attempts) if (now - v.start >= windowMs) attempts.delete(k);
  const bucket = attempts.get(key) || { start: now, count: 0 };
  bucket.count++;
  attempts.set(key, bucket);
  return bucket.count > 5;
}
const json = (body: unknown, status = 200) => Response.json(body, { status });

async function turnstileOk(secret: string, token: unknown, ip: string | null) {
  if (typeof token !== "string" || !token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    return ((await r.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

export async function onRequestPost({ request, env }: Context) {
  const enabled =
    env.PRIVACY_NOTICE_URL?.startsWith("https://") &&
    env.CONTACT_WEBHOOK_URL?.startsWith("https://");
  if (!enabled) return json({ error: "Gönderim servisi henüz açık değil." }, 503);

  const origin = env.SITE_URL ? new URL(env.SITE_URL).origin : new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return new Response(null, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return new Response(null, { status: 415 });
  if (Number(request.headers.get("content-length")) > maxBytes)
    return new Response(null, { status: 413 });

  const raw = await request.arrayBuffer().catch(() => null);
  if (!raw) return new Response(null, { status: 400 });
  if (raw.byteLength > maxBytes) return new Response(null, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return new Response(null, { status: 400 });
  }

  const inquiry = parseInquiry(body);
  if (!inquiry || body.website || body.noticeRead !== true)
    return json({ error: "Alanları kontrol edin." }, 422);

  // Cloudflare sets this header itself, so it can be trusted here.
  const ip = request.headers.get("cf-connecting-ip");
  if (rateLimited(ip || "shared"))
    return json({ error: "Çok sayıda deneme yapıldı. Daha sonra tekrar deneyin." }, 429);

  if (env.TURNSTILE_SECRET_KEY && !(await turnstileOk(env.TURNSTILE_SECRET_KEY, body.turnstileToken, ip)))
    return json({ error: "Güvenlik doğrulaması başarısız." }, 422);

  try {
    const token = env.CONTACT_WEBHOOK_TOKEN;
    const r = await fetch(env.CONTACT_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (r.ok) return json({ accepted: true });
  } catch {
    /* Never log visitor details or upstream credentials. */
  }
  return json({ error: "Servisten teslim onayı alınamadı." }, 502);
}
