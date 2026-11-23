import { metadata as pageMeta } from "@/lib/site";
import { catalog } from "@/lib/catalog";
import { HeroArchitectureAnimation } from "@/components/Hero";
import { Action, ContactCTA } from "@/components/Shared";
import {
  ProjectCollection,
  SelectedProjects,
  Services,
  Studio3D,
  StudioSection,
} from "@/components/Sections";
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
  const featured = (completed.length ? completed : projects.filter((p) => p.publication === "demo")).slice(0, 6);
  const pair = projects.find((p) => p.comparison);
  const rest = projects.filter((p) => !featured.includes(p));
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
        <span data-header-sentinel aria-hidden="true" className="header-sentinel" />
      </section>
      <SelectedProjects featured={featured} hasPublished={completed.length > 0} />
      <ProjectCollection projects={rest} />
      <StudioSection />
      <Studio3D pairSlug={pair?.slug} />
      <ContactCTA />
    </>
  );
}
