import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer, JsonLd } from "@/components/Shared";
import { Reveal } from "@/components/Reveal";
import { services, studio } from "@/content/studio";
import { siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: studio.name, template: "%s | " + studio.name },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <a className="skip" href="#icerik">
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Reveal />
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: studio.name,
            url: siteUrl,
            founder: {
              "@type": "Person",
              name: studio.founder,
              jobTitle: "Mimar",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Gebze Teknik Üniversitesi",
              },
            },
            areaServed: studio.regions,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Mimarlık hizmetleri",
              itemListElement: services.map(({ name }) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
              })),
            },
          }}
        />
      </body>
    </html>
  );
}
