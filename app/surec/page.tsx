import { Crumbs, Eyebrow, ContactCTA } from "@/components/Shared";
import { stages } from "@/content/studio";
import { metadata as pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "/surec",
  "Çalışma Sürecimiz",
  "İlk görüşmeden teslim aşamasına kadar bir mimari çalışmanın nasıl ilerleyebileceğini ve ilk görüşmeye nasıl hazırlanabileceğinizi öğrenin.",
);
export default function Process() {
  return (
    <>
      <Crumbs items={[["/surec", "Çalışma Sürecimiz"]]} />
      <article className="wrap inner-page process-page">
        <div>
          <Eyebrow>ÇALIŞMA SÜRECİMİZ</Eyebrow>
          <h1>
            Birlikte nasıl <em>çalışıyoruz?</em>
          </h1>
          <p className="lead">
            Yeni bir konut projesinde önce ihtiyaçlarınızı dinliyor, sonra ilk
            planı birlikte değerlendiriyoruz. Hazır bir planınız varsa çizim
            veya üç boyutlu modelleme aşamasından da başlayabiliriz.
          </p>
        </div>
        <ol className="stage-list">
          {stages.map(([title, sub, body], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <small>{sub}</small>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
      <ContactCTA />
    </>
  );
}
