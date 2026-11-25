import Image from "next/image";
import { notFound } from "next/navigation";
import { catalog, getProject } from "@/lib/catalog";
import { metadata as pageMeta } from "@/lib/site";
import { Crumbs, Eyebrow, ContactCTA, Action } from "@/components/Shared";
import { ProjectCard } from "@/components/Projects";
import { Gallery, Comparison } from "@/components/Gallery";
import { withBase } from "@/lib/base-path";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return catalog().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return pageMeta(
    "/projeler/" + p.slug,
    p.seo?.title || p.title,
    p.seo?.description || p.summary || p.title,
    p.cover?.src,
  );
}
export default async function Project({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const related = catalog()
    .filter((r) => r.slug !== p.slug)
    .slice(0, 2);
  const facts = [
    ["Kategori", p.category],
    ["Konum", p.location],
    ["Yıl", p.year],
    ["Durum", p.status],
    ["Hizmet kapsamı", p.scope?.join(" · ")],
  ].filter(([, v]) => v);
  return (
    <>
      <Crumbs
        items={[
          ["/projeler", "Projeler"],
          ["/projeler/" + p.slug, p.title],
        ]}
      />
      <article className="wrap inner-page project-detail">
        <Eyebrow>
          {p.publication === "demo" ? "TEMSİLÎ ÇALIŞMA · DEMO" : "PROJE ARŞİVİ"}
        </Eyebrow>
        <h1>{p.title}</h1>
        {p.summary && <p className="lead">{p.summary}</p>}
        {!!facts.length && (
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.cover && (
          <figure className="detail-cover">
            <Image
              src={withBase(p.cover.src)}
              alt={p.cover.alt}
              width={1536}
              height={1024}
              sizes="92vw"
              preload
            />
            {p.cover.caption && <figcaption>{p.cover.caption}</figcaption>}
          </figure>
        )}
        {p.approach && (
          <div className="reading">
            <h2>Tasarım yaklaşımı</h2>
            <p>{p.approach}</p>
          </div>
        )}
        {p.solution && (
          <div className="reading">
            <h2>Mimari çözüm</h2>
            <p>{p.solution}</p>
          </div>
        )}
        {p.gallery?.length ? (
          <Gallery images={p.gallery} title="Görsel galeri" />
        ) : null}
        {p.drawings?.length ? (
          <Gallery images={p.drawings} title="Planlar ve çizimler" />
        ) : null}
        {p.renders?.length ? (
          <Gallery images={p.renders} title="3D görseller" />
        ) : null}
        {p.comparison && <Comparison {...p.comparison} />}
        {related.length > 0 && (
          <section className="gallery-section">
            <h2>Diğer çalışmalar</h2>
            <div className="related">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </section>
        )}
        <Action secondary href="/projeler">
          Proje Arşivine Dön
        </Action>
      </article>
      <ContactCTA />
    </>
  );
}
