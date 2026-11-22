import { Crumbs, Eyebrow, ContactCTA, Action } from "@/components/Shared";
import { StudioDrawing } from "@/components/StudioDrawing";
import { studio } from "@/content/studio";
import { metadata as pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "/studyo",
  "Kurucu Mimar Ramazan YILMAZ",
  "Ramazan YILMAZ’ın Gebze Teknik Üniversitesinden Rusya’daki gaz tesisi projesine, ardından Türkiye’de kurduğu GYM Mimarlık & 3D Studio’ya uzanan meslek hikâyesi.",
);
export default function Studio() {
  return (
    <>
      <Crumbs items={[["/studyo", "Stüdyo"]]} />
      <article className="wrap inner-page">
        <header className="studio-editorial" data-reveal>
          <div>
            <Eyebrow>KURUCU MİMAR</Eyebrow>
            <h1>
              Ramazan
              <br />
              <em>YILMAZ</em>
            </h1>
            <p className="lead">GYM Mimarlık &amp; 3D Studio’nun kurucusu.</p>
            <p className="founder-credit">{studio.experience}</p>
          </div>
          <figure>
            <StudioDrawing />
            <figcaption>İki katlı bir evin mimari çizimi.</figcaption>
          </figure>
        </header>
        <section className="founder-row">
          <div>
            <Eyebrow>MESLEK HİKÂYESİ</Eyebrow>
            <h2>
              Gebze’den Rusya’ya,
              <br />
              oradan kendi ofisine.
            </h2>
          </div>
          <div>
            {studio.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="founder-row">
          <div>
            <Eyebrow>OFİSTE BUGÜN</Eyebrow>
            <h2>Kimlerle çalışıyoruz?</h2>
          </div>
          <div>
            <h3>Ev ve arsa sahipleri</h3>
            <p>
              Arsanıza bir apartman ya da aileniz için müstakil bir ev
              yaptırmayı düşünüyorsanız ilk görüşmede yerleşim seçeneklerini
              konuşuyoruz. Oda sayısı, balkon, otopark ve bahçe gibi
              önceliklerinizi birlikte belirliyoruz.
            </p>
            <h3>Mimarlık ofisleri ve müteahhitler</h3>
            <p>
              Ekibinizin elinde bir ön proje varsa çizimleri birlikte
              inceliyoruz. Kat planlarını geliştirme, proje çizimi veya
              müşteriye sunulacak üç boyutlu görseller için ihtiyaç duyduğunuz
              aşamada çalışmaya katılıyoruz.
            </p>
            <Action href="/hizmetler#danismanlik" secondary>
              Danışmanlık hizmetini inceleyin
            </Action>
          </div>
        </section>
      </article>
      <ContactCTA />
    </>
  );
}
