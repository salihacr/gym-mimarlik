import { catalog } from "@/lib/catalog";
import { metadata as pageMeta } from "@/lib/site";
import { projectTypes } from "@/content/studio";
import { Archive } from "@/components/Archive";
import { Crumbs, Eyebrow, ContactCTA } from "@/components/Shared";
import { EmptyProjects } from "@/components/Projects";
export const metadata = pageMeta(
  "/projeler",
  "Proje Arşivi",
  "GYM Mimarlık proje arşivi. Mimari çalışmaların tasarım yaklaşımını, çizimlerini ve görsellerini keşfedin.",
);
export default function Projects() {
  const projects = catalog();
  return (
    <>
      <Crumbs items={[["/projeler", "Projeler"]]} />
      <div className="wrap inner-page">
        <header className="archive-heading">
          <div>
            <Eyebrow>PORTFÖY</Eyebrow>
            <h1>
              Proje <em>arşivi.</em>
            </h1>
          </div>
          <p>
            {projects.some((p) => p.publication === "demo")
              ? "Aşağıdaki temsilî örneklerde apartman, villa ve ofis binası için ele aldığımız tasarım konularını inceleyebilirsiniz."
              : "Konut, villa ve plaza projelerinde kat planından cepheye kadar hangi kararları birlikte alabileceğimizi inceleyin."}
          </p>
        </header>
        {projects.length ? (
          <Archive projects={projects} />
        ) : (
          <EmptyProjects heading="h2" />
        )}
        <section className="project-types">
          <h2>Ne tür bir yapı planlıyorsunuz?</h2>
          <div>
            {projectTypes.map((type) => (
              <article key={type.title}>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
