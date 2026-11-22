import { Crumbs, Eyebrow, ContactCTA, Action } from "@/components/Shared";
import { ServiceDrawing } from "@/components/Graphics";
import { services } from "@/content/studio";
import { metadata as pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "/hizmetler",
  "Mimarlık Hizmetleri",
  "Darıca, Gebze ve çevresinde konut tasarımı, proje çizimi, 3D görselleştirme ve mimari danışmanlık hizmetlerimizi inceleyin.",
);
export default function ServicesPage() {
  return (
    <>
      <Crumbs items={[["/hizmetler", "Hizmetler"]]} />
      <div className="wrap inner-page">
        <div className="page-intro">
          <Eyebrow>HİZMETLERİMİZ</Eyebrow>
          <h1>
            Mimarlık <em>hizmetlerimiz</em>
          </h1>
          <p className="lead">
            Arsanız için sıfırdan bir proje hazırlayabilir, elinizdeki planı
            geliştirebilir veya binanızın nasıl görüneceğini üç boyutlu olarak
            gösterebiliriz. Mimarlık ofisleri ve müteahhitler için proje bazında
            danışmanlık da veriyoruz.
          </p>
        </div>
        <div className="service-list">
          {services.map((s) => (
            <section id={s.id} key={s.id}>
              <div>
                <ServiceDrawing kind={s.icon} />
                <h2>{s.name}</h2>
              </div>
              <div>
                <p>{s.detail}</p>
                <details>
                  <summary>{s.question}</summary>
                  <p>{s.answer}</p>
                </details>
                <Action href={"/iletisim?hizmet=" + s.id} secondary>
                  Bu Hizmeti Konuşalım
                </Action>
              </div>
            </section>
          ))}
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
