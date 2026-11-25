import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Media, Project } from "@/content/model";
import { demoProjects } from "@/content/demo";
import { demoMode } from "./demo";

export { demoMode };

// Each project is one JSON file in content/projeler, written by the CMS at /admin.
// The file name is the URL slug, so renaming a project's title never breaks links.
const dir = join(process.cwd(), "content", "projeler");

function media(value: unknown): Media | undefined {
  if (!value || typeof value !== "object") return undefined;
  const m = value as Partial<Media>;
  if (!m.src) return undefined;
  return { src: m.src, alt: m.alt?.trim() || "", caption: m.caption || undefined };
}
function mediaList(value: unknown) {
  const list = Array.isArray(value) ? value.map(media).filter((m) => m !== undefined) : [];
  return list.length ? list : undefined;
}
function clean(slug: string, raw: Record<string, unknown>): Project {
  const text = (key: string) =>
    typeof raw[key] === "string" && raw[key].trim() ? (raw[key] as string).trim() : undefined;
  const comparison = raw.comparison as { drawing?: unknown; render?: unknown } | undefined;
  const drawing = media(comparison?.drawing), render = media(comparison?.render);
  const seo = raw.seo as { title?: string; description?: string } | undefined;
  const scope = Array.isArray(raw.scope) ? raw.scope.filter((s): s is string => typeof s === "string" && !!s.trim()) : [];
  return {
    slug,
    title: text("title") || slug,
    publication: raw.publication === "published" ? "published" : "draft",
    category: text("category"),
    location: text("location"),
    year: typeof raw.year === "number" ? raw.year : Number(raw.year) || undefined,
    status: text("status"),
    summary: text("summary"),
    approach: text("approach"),
    solution: text("solution"),
    cover: media(raw.cover),
    gallery: mediaList(raw.gallery),
    drawings: mediaList(raw.drawings),
    renders: mediaList(raw.renders),
    comparison: drawing && render ? { drawing, render } : undefined,
    scope: scope.length ? scope : undefined,
    seo: seo?.title || seo?.description ? { title: seo.title || undefined, description: seo.description || undefined } : undefined,
  };
}

let cache: Project[] | undefined;
function readProjects() {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    /* No projects yet. */
  }
  const list = files.map((file) => {
    const raw = JSON.parse(readFileSync(join(dir, file), "utf8"));
    return { order: Number(raw.order) || 0, project: clean(file.replace(/\.json$/, ""), raw) };
  });
  // Lower "order" values come first; ties keep the newest year first.
  list.sort((a, b) => a.order - b.order || (b.project.year || 0) - (a.project.year || 0));
  return (cache = list.map((p) => p.project));
}

export function catalog() {
  const published = readProjects().filter((p) => p.publication === "published");
  return demoMode ? [...published, ...demoProjects] : published;
}
export function getProject(slug: string) {
  return catalog().find((project) => project.slug === slug);
}
