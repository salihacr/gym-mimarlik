import Link from "next/link";
import { Icon } from "./Graphics";
import { Brand } from "./Header";
import { navigation, studio } from "@/content/studio";
import { siteUrl } from "@/lib/site";

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
export function ContactCTA() {
  return (
    <section className="contact-call">
      <div className="wrap">
        <div>
          <Eyebrow>İLETİŞİM</Eyebrow>
          <h2>
            Aklınızdaki projeyi <em>konuşalım.</em>
          </h2>
        </div>
        <Action href="/iletisim">İletişime Geçin</Action>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-main">
        <Brand />
        <nav aria-label="Alt gezinme">
          {navigation.slice(1).map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>{studio.name}</span>
        <span>{studio.regions.join(" · ")}</span>
      </div>
    </footer>
  );
}
