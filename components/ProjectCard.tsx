import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/model";
import { Icon } from "./svg/Icon";
export function ProjectCard({
  project,
  heading: Heading = "h3",
}: {
  project: Project;
  heading?: "h2" | "h3";
}) {
  const details = [project.category, project.location]
    .filter(Boolean)
    .join(" / ");
  return (
    <Link href={"/projeler/" + project.slug} className="project-card">
      <div className="project-photo">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width:760px) 100vw, 56vw"
          />
        ) : (
          <span className="cover-type">{project.title}</span>
        )}
        {project.publication === "demo" && (
          <span className="demo-tag">Temsilî çalışma · Demo</span>
        )}
      </div>
      <div className="project-info">
        <div>
          {details && <small>{details}</small>}
          <Heading>{project.title}</Heading>
        </div>
        <Icon name="diagonal" size={22} />
      </div>
    </Link>
  );
}
