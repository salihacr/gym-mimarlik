import { projects } from "@/content/projects";
import { demoProjects } from "@/content/demo";
export const demoMode =
  process.env.NODE_ENV === "development" && process.env.SHOW_DEMO !== "false";
export function catalog() {
  const published = projects.filter((p) => p.publication === "published");
  return demoMode ? [...published, ...demoProjects] : published;
}
export function getProject(slug: string) {
  return catalog().find((project) => project.slug === slug);
}
