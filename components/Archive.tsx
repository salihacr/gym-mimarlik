"use client";
import { useState } from "react";
import type { Project } from "@/content/model";
import { ProjectCard } from "./ProjectCard";
export function Archive({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("");
  const categories = Array.from(
    new Set(projects.flatMap((p) => (p.category ? [p.category] : []))),
  );
  const shown = projects.filter((p) => !category || p.category === category);
  return (
    <>
      <div className="filters" aria-label="Proje kategorileri" role="group">
        {["", ...categories].map((c) => (
          <button
            aria-pressed={category === c}
            key={c}
            onClick={() => setCategory(c)}
          >
            {c || "Tüm Projeler"}
          </button>
        ))}
      </div>
      <div className="archive-grid" aria-live="polite">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} heading="h2" />
        ))}
      </div>
    </>
  );
}
