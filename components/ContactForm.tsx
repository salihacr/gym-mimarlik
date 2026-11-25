"use client";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import Script from "next/script";
import { services } from "@/content/studio";
import { parseInquiry } from "@/lib/inquiry";
import { Icon } from "./svg/Icon";
// Optional Cloudflare Turnstile spam check; set the site key at build time.
const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

export function ContactForm({
  enabled,
  notice,
}: {
  enabled: boolean;
  notice?: string;
}) {
  const ready = useSyncExternalStore(subscribe, onClient, onServer);
  const serviceRef = useRef<HTMLSelectElement>(null);
  // The page is static, so the ?hizmet= preselection is read in the browser.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("hizmet");
    if (serviceRef.current && services.some((s) => s.id === wanted))
      serviceRef.current.value = wanted!;
  }, []);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const input = parseInquiry(fields);
    if (!input) {
      setMessage(
        "Lütfen alanları kontrol edin. Telefon girdiyseniz alan koduyla birlikte yazın.",
      );
      return;
    }
    if (!enabled) {
      const text = [
        "Proje görüşme özeti",
        input.name,
        input.email,
        input.phone,
        services.find((s) => s.id === input.service)?.name ||
          "Birlikte belirleyelim",
        input.location,
        "",
        input.description,
      ]
        .filter(Boolean)
        .join("\n");
      const url = URL.createObjectURL(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "proje-gorusme-ozeti.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      setMessage(
        "Özet dosyanız indirmeye hazırlandı. Bilgileriniz cihazınızda kaldı.",
      );
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          website: fields.website,
          noticeRead: fields.noticeRead === "on",
          turnstileToken: fields["cf-turnstile-response"],
        }),
      });
      if (r.ok && (await r.json()).accepted === true) {
        setMessage("Proje talebiniz alındı.");
        form.reset();
        (window as { turnstile?: { reset: () => void } }).turnstile?.reset();
      } else
        setMessage(
          r.status === 429
            ? "Deneme sınırına ulaşıldı. Lütfen daha sonra tekrar deneyin."
            : "Teslim onayı alınamadı. Bilgileriniz formda korunuyor.",
        );
    } catch {
      setMessage("Bağlantı kurulamadı. Bilgileriniz formda korunuyor.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form id="form" className="contact-form" method="post" onSubmit={submit}>
      <noscript>Formu kullanabilmek için JavaScript’i etkinleştirin.</noscript>
      <h2>{enabled ? "Projenizi anlatın." : "Proje özeti hazırlayın."}</h2>
      {!enabled && (
        <p className="form-note">
          Görüşme öncesi notlarınızı bu formdan dosya olarak indirebilirsiniz.
          Şu anda çevrimiçi gönderim kapalı.
        </p>
      )}
      <fieldset className="fields" disabled={busy}>
        <legend className="sr-only">Proje bilgileri</legend>
        <label>
          Ad Soyad
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          E-posta
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
        <label>
          Telefon <small>(isteğe bağlı)</small>
          <input type="tel" name="phone" autoComplete="tel" maxLength={25} />
        </label>
        <label>
          Hangi hizmete ihtiyacınız var?
          <select ref={serviceRef} name="service" defaultValue="" required>
            <option value="" disabled>
              Hizmet seçin
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
            <option value="belirsiz">Birlikte belirleyelim</option>
          </select>
        </label>
        <label className="full">
          Proje Konumu
          <input
            name="location"
            placeholder="İl veya ilçe"
            maxLength={150}
            required
          />
        </label>
        <label className="full">
          Açıklama
          <textarea
            name="description"
            minLength={10}
            maxLength={3000}
            rows={4}
            placeholder="Örneğin, Gebze’deki arsamıza bir apartman yaptırmak istiyoruz. Kat planları için desteğe ihtiyacımız var."
            required
          />
        </label>
      </fieldset>
      <div className="honeypot" inert aria-hidden="true">
        <label>
          Web sitesi
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      {enabled && turnstileKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={turnstileKey}
            data-language="tr"
          />
        </>
      )}
      {enabled && notice && (
        <label className="check-label">
          <input type="checkbox" name="noticeRead" required />
          <span>
            <a href={notice} target="_blank" rel="noopener noreferrer">
              Aydınlatma metnini
            </a>{" "}
            okudum.
          </span>
        </label>
      )}
      <button className="button" disabled={!ready || busy}>
        {busy
          ? "Gönderiliyor…"
          : enabled
            ? "Talebi Gönder"
            : "Proje Özetini İndir"}
        <Icon name={enabled ? "arrow" : "down"} />
      </button>
      <p className="form-status" role="status">
        {message}
      </p>
    </form>
  );
}
