import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/model";
import { services, studio } from "@/content/studio";
import { Icon } from "./svg/Icon";
import { PavilionDrawing } from "./svg/Pavilion";
import { PlanDrawing } from "./svg/PlanDrawing";
import { ServiceDrawing } from "./svg/ServiceDrawing";
import { Action, Eyebrow } from "./Shared";
import { ProjectCard } from "./ProjectCard";
import { CompareSlider } from "./CompareSlider";

export function Services() {
  return (
    <nav id="hizmet-alanlari" className="service-grid" aria-label="Hizmetlerimiz">
      {services.map((service) => (
        <Link className="service-link" key={service.id} href={"/hizmetler#" + service.id}>
          <ServiceDrawing kind={service.icon} />
          <div>
            <strong>{service.name}</strong>
            <p>{service.intro}</p>
          </div>
          <Icon name="arrow" size={17} />
        </Link>
      ))}
    </nav>
  );
}

export function SelectedProjects({
  featured,
  hasPublished,
}: {
  featured: Project[];
  hasPublished?: boolean;
}) {
  const demo = featured.some((p) => p.publication === "demo");
  const intro = hasPublished
    ? "Projelerin çizimlerini ve tasarım kararlarını yakından inceleyin."
    : demo
      ? "Bu önizlemede konut, villa ve ofis için temsilî çalışmalar yer alıyor."
      : "Tamamlanan projelere ait fotoğraf ve çizimler yayına hazırlandıkça burada yer alacak.";
  return (
    <section className="selected" aria-labelledby="gerceklesmis-projeler">
      <div className="wrap selected-grid">
        <header className="selected-intro" data-reveal>
          <Eyebrow>SEÇİLİ PROJELER</Eyebrow>
          <h2 id="gerceklesmis-projeler">
            Gerçekleşen <em>tasarımlar</em>
          </h2>
          <p>{intro}</p>
          <Action secondary href="/projeler">
            Tüm projeleri görün
          </Action>
        </header>
        {featured.length ? (
          <ul className="feature-grid">
            {featured.slice(0, 6).map((project) => (
              <li key={project.slug} className="feature-item" data-reveal>
                <FeatureCard project={project} lead={false} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="feature-empty">
            <PlanDrawing fit="contain" />
          </div>
        )}
      </div>
    </section>
  );
}

function FeatureCard({ project, lead }: { project: Project; lead: boolean }) {
  const meta = [project.category, project.location, project.year]
    .filter(Boolean)
    .join(" · ");
  return (
    <Link href={"/projeler/" + project.slug} className="feature-card">
      <figure>
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={lead ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 40vw"}
          />
        ) : (
          <PavilionDrawing />
        )}
        {project.publication === "demo" && (
          <span className="demo-tag">Temsilî çalışma · Demo</span>
        )}
      </figure>
      <div className="feature-caption">
        {meta && <small>{meta}</small>}
        <h3>{project.title}</h3>
        <span className="feature-cta">
          Projeyi inceleyin <Icon name="diagonal" size={16} />
        </span>
      </div>
    </Link>
  );
}

export function ProjectCollection({ projects }: { projects: Project[] }) {
  if (projects.length < 2) return null;
  return (
    <section className="wrap collection" aria-labelledby="koleksiyon" data-reveal>
      <div className="section-heading">
        <div>
          <Eyebrow>PROJE KOLEKSİYONU</Eyebrow>
          <h2 id="koleksiyon">
            Daha fazla <em>çalışma</em>
          </h2>
        </div>
        <Action href="/projeler" secondary>
          Arşivin Tamamı
        </Action>
      </div>
      <div className="collection-grid">
        {projects.slice(0, 5).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

export function StudioSection() {
  const [intro, ...rest] = studio.biography;
  return (
    <section className="founder" aria-labelledby="kurucu-baslik">
      <div className="wrap founder-grid">
        <dl className="founder-facts" data-reveal>
          <div>
            <dt>Deneyim</dt>
            <dd>{studio.experience}</dd>
          </div>
          <div>
            <dt>Eğitim</dt>
            <dd>Gebze Teknik Üniversitesi, Mimarlık Bölümü</dd>
          </div>
          <div>
            <dt>Uluslararası çalışma</dt>
            <dd>Rusya’da bir gaz tesisi projesinde mimar olarak görev</dd>
          </div>
          <div>
            <dt>Odak alanları</dt>
            <dd>Konut, villa ve ofis projeleri; mimarlık ofislerine danışmanlık</dd>
          </div>
        </dl>
        <div className="founder-copy" data-reveal>
          <Eyebrow>KURUCU MİMAR</Eyebrow>
          <h2 id="kurucu-baslik">{studio.founder}</h2>
          <p className="founder-role">{studio.experience}</p>
          <p>{intro}</p>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <Action href="/studyo" secondary>
            Stüdyoyu tanıyın
          </Action>
        </div>
      </div>
    </section>
  );
}

export function Studio3D({ pairSlug }: { pairSlug?: string }) {
  return (
    <section className="studio3d" aria-labelledby="studio3d">
      <div className="wrap studio3d-inner">
        <div className="studio3d-copy" data-reveal>
          <Eyebrow>3D STUDIO</Eyebrow>
          <h2 id="studio3d">
            Çizimden görüntüye, <em>aynı kadrajda.</em>
          </h2>
          <p>
            Mimari çizim, beyaz model ve nihai render aynı kadrajda birbirine
            bağlanır. Karşılaştırmayı kaydırarak her aşamayı ayrı ayrı
            inceleyebilirsiniz.
          </p>
          <p className="demo-note">
            Gösterilen görseller sitenin açılış konseptine ait kavramsal bir
            çalışmadır; tamamlanmış bir projenin çizim eşleşmesi değildir.
          </p>
          <Action secondary href={pairSlug ? "/projeler/" + pairSlug + "#karsilastirma" : "/hizmetler#gorsellestirme"}>
            3D görselleştirme hizmeti
          </Action>
        </div>
        <div data-reveal>
          <CompareSlider
            width={1672}
            height={941}
            befores={[
              { src: "/hero/04_temiz_mimari_cizim-1440.webp", alt: "Yapının temiz mimari çizimi", label: "Mimari çizim" },
            ]}
            after={{ src: "/hero/07_nihai_render-1440.webp", alt: "Aynı yapının nihai render görseli", label: "Nihai render" }}
          />
        </div>
      </div>
    </section>
  );
}
