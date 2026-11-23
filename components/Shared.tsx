import Link from "next/link";
import { Icon } from "./Graphics";
import { Brand } from "./Header";
import { services, studio, stages } from "@/content/studio";
import { approvedNotice, siteUrl } from "@/lib/site";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <i aria-hidden="true" />
      {children}
    </div>
  );
}
export function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={secondary ? "text-action" : "button"} href={href}>
      {children}
      <Icon name={secondary ? "diagonal" : "arrow"} size={17} />
    </Link>
  );
}
export function Crumbs({ items }: { items: [string, string][] }) {
  const trail: [string, string][] = [["/", "Ana Sayfa"], ...items];
  return (
    <>
      <nav aria-label="İçerik yolu" className="crumbs wrap">
        {trail.map(([href, label], i) => (
          <span key={href}>
            {i > 0 && <b aria-hidden="true">/</b>}
            {i === trail.length - 1 ? (
              <span aria-current="page">{label}</span>
            ) : (
              <Link href={href}>{label}</Link>
            )}
          </span>
        ))}
      </nav>
      {siteUrl && (
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map(([url, name], i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
              item: siteUrl + url,
            })),
          }}
        />
      )}
    </>
  );
}
export function JsonLd({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}
function contactValues() {
  return {
    phone: process.env.STUDIO_PHONE,
    email: process.env.STUDIO_EMAIL,
    whatsapp: process.env.STUDIO_WHATSAPP?.replace(/\D/g, ""),
  };
}
export function ContactCTA() {
  const { email, whatsapp } = contactValues();
  const mapQuery = process.env.STUDIO_MAP_QUERY;
  const mapEmbed = mapQuery
    ? "https://www.google.com/maps?q=" + encodeURIComponent(mapQuery) + "&output=embed"
    : undefined;
  const mapLink = mapQuery
    ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapQuery)
    : undefined;
  return (
    <section className="contact-call" aria-labelledby="iletisim-cagri">
      <div className="wrap contact-grid">
        <div className="contact-main" data-reveal>
          <div className="contact-intro">
            <Eyebrow>İLETİŞİM</Eyebrow>
            <h2 id="iletisim-cagri">
              Projenizi birlikte <em>konuşalım.</em>
            </h2>
          </div>
          <p>
            Konut, villa ve ofis projeleriniz için ilk görüşmeden 3D görselleştirmeye kadar birlikte
            çalışıyoruz. Telefonla arayabilir ya da formu doldurarak proje bilgilerinizi bize
            iletebilirsiniz.
          </p>
          <ol className="contact-steps" aria-label="Çalışma süreci">
            {stages.map(([title], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {title}
              </li>
            ))}
          </ol>
          {(email || whatsapp) && (
          <dl className="contact-details">
            {whatsapp && (
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={"https://wa.me/" + whatsapp} rel="noopener noreferrer">
                    Mesaj gönderin
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={"mailto:" + email}>{email}</a>
                </dd>
              </div>
            )}
          </dl>
          )}
          <div className="contact-actions">
            <Action href="/iletisim">Projenizi konuşalım</Action>
            <Link className="text-action" href="/iletisim#form">
              Formu doldurun
            </Link>
          </div>
        </div>
        {mapEmbed && mapLink && (
          <figure className="contact-map" data-reveal>
            <iframe
              title="GYM Mimarlık & 3D Studio konumu"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <figcaption>
              <a href={mapLink} rel="noopener noreferrer">
                Haritada aç
              </a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  const { phone, email, whatsapp } = contactValues();
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Konut, villa ve ofis projeleri için mimari tasarım, projelendirme ve 3D görselleştirme.</p>
        </div>
        <div className="footer-columns">
          <section className="footer-col" aria-labelledby="footer-hizmetler">
            <h3 id="footer-hizmetler">Hizmetler</h3>
            <nav aria-label="Hizmet bağlantıları">
              {services.slice(0, 3).map((service) => (
                <Link key={service.id} href={"/hizmetler#" + service.id}>
                  {service.name}
                </Link>
              ))}
            </nav>
          </section>
          <section className="footer-col" aria-labelledby="footer-iletisim">
            <h3 id="footer-iletisim">İletişim</h3>
            {phone && (
              <a className="footer-phone" href={"tel:" + phone.replace(/[^\d+]/g, "")}>
                {phone}
              </a>
            )}
            <div className="footer-links">
              {email && <a href={"mailto:" + email}>{email}</a>}
              {whatsapp && (
                <a href={"https://wa.me/" + whatsapp} rel="noopener noreferrer">
                  WhatsApp ile yazın
                </a>
              )}
            </div>
            <p className="footer-address">
              Nenehatun, Fatih Cd. No:100 D:1A, 41700 Darıca/Kocaeli
            </p>
          </section>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {studio.name}
        </span>
        {approvedNotice && (
          <a href={approvedNotice} rel="noopener noreferrer">
            Gizlilik ve KVKK aydınlatma metni
          </a>
        )}
        <a href="#">Başa dön</a>
      </div>
    </footer>
  );
}
