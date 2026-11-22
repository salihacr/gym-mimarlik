import Link from "next/link";
import { StudioDrawing } from "./StudioDrawing";
import { services, stages, studio } from "@/content/studio";
import { Icon, ServiceDrawing } from "./Graphics";
import { Action, Eyebrow } from "./Shared";

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
export function StudioSection() {
  return (
    <section className="warm">
      <div className="wrap studio-split" data-reveal>
        <figure className="drawing-panel">
          <StudioDrawing />
        </figure>
        <div>
          <Eyebrow>KURUCU MİMAR</Eyebrow>
          <h2>{studio.founder}</h2>
          <p className="founder-credit">{studio.experience}</p>
          <p>
            Rusya’da uluslararası bir gaz tesisi projesinde mimar olarak çalışan
            Ramazan YILMAZ, Türkiye’ye döndükten sonra GYM Mimarlık &amp; 3D
            Studio’yu kurdu.
          </p>
          <Action href="/studyo" secondary>
            Kurucumuzu tanıyın
          </Action>
        </div>
      </div>
    </section>
  );
}
export function Timeline() {
  return (
    <section className="wrap section-pad" data-reveal>
      <div className="section-heading">
        <div>
          <Eyebrow>ÇALIŞMA SÜRECİMİZ</Eyebrow>
          <h2>
            Projeniz nasıl <em>ilerler?</em>
          </h2>
        </div>
        <Action href="/surec" secondary>
          Süreci İnceleyin
        </Action>
      </div>
      <ol className="timeline">
        {stages.map(([title, , body], i) => (
          <li key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
