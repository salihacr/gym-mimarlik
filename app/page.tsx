import { metadata as pageMeta } from "@/lib/site";
import { catalog } from "@/lib/catalog";
import { HeroArchitectureAnimation } from "@/components/Hero";
import { Action, Eyebrow, ContactCTA } from "@/components/Shared";
import { Services, StudioSection, Timeline } from "@/components/Sections";
import { ProjectCard } from "@/components/Projects";
import { Icon } from "@/components/Graphics";
import Link from "next/link";
export const metadata = pageMeta(
  "/",
  "Konut, Villa ve Plaza Projeleri",
  "Darıca, Gebze, Çayırova, Kocaeli ve İstanbul’da konut, villa ve plaza projeleri için mimari tasarım, projelendirme ve 3D görselleştirme hizmetleri.",
);
export default function Home() {
  const projects = catalog();
  const completed = projects.filter((project) =>
    project.publication === "published" &&
    project.status?.trim().toLocaleLowerCase("tr") === "tamamlandı"
  );
  const featured = (completed.length ? completed : projects.filter((p) => p.publication === "demo")).slice(0, 3);
  const pair = projects.find((p) => p.comparison);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>
            <span>Birlikte</span>{" "}<em>tasarlayalım.</em>
          </h1>
          <p>
            İster bir ev ister bir ofis binası olsun, önce nasıl bir yer
            istediğinizi konuşuyoruz. Ardından planını çiziyor, nasıl
            görüneceğini üç boyutlu olarak gösteriyoruz.
          </p>
          <div className="hero-actions">
            <Action href="/iletisim">Projenizi Konuşalım</Action>
            <Action secondary href="/hizmetler">
              Hizmetleri İnceleyin
            </Action>
          </div>
        </div>
        <HeroArchitectureAnimation />
        <Services />
      </section>
      <section className="wrap project-showcase" aria-labelledby="gerceklesmis-projeler">
        <div className="showcase-intro">
          <h2 id="gerceklesmis-projeler">Gerçekleşmiş <em>Projeler</em></h2>
          <p>{completed.length
            ? "Projelerin çizimlerini ve tasarım kararlarını yakından inceleyin."
            : featured.length
              ? "Bu önizlemede konut, villa ve ofis için temsilî çalışmalar yer alıyor."
              : "Tamamlanan projelere ait fotoğraf ve çizimler yayına hazırlandıkça burada yer alacak."}</p>
          <Action secondary href="/projeler">
            Tüm Projeleri Gör
          </Action>
        </div>
        {featured.length ? (
          <div className="featured-grid">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="showcase-plan" aria-hidden="true" />
        )}
      </section>
      <StudioSection />
      <Timeline />
      <section className="render-section">
        <div className="wrap render-inner">
          <Eyebrow>3D STUDIO</Eyebrow>
          <div>
            <h2>
              Evinizi yapılmadan <em>görün.</em>
            </h2>
            <p>
              Salon penceresinden bahçe görünecek mi? Açık renk bir cephe
              binanızda nasıl duracak? Üç boyutlu modelde evinizi içeriden ve
              dışarıdan görebilir, karar vermeden önce farklı seçenekleri
              karşılaştırabilirsiniz.
            </p>
            <Link
              className="text-action"
              href={
                pair
                  ? "/projeler/" + pair.slug + "#karsilastirma"
                  : "/hizmetler#gorsellestirme"
              }
            >
              {pair
                ? "Çizim ve Render Karşılaştırması"
                : "3D Görselleştirme Hizmeti"}
              <Icon name="diagonal" />
            </Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
