export interface Media {
  src: string;
  alt: string;
  caption?: string;
}
export interface Project {
  slug: string;
  title: string;
  publication: "draft" | "demo" | "published";
  category?: string;
  location?: string;
  year?: number;
  status?: string;
  summary?: string;
  approach?: string;
  solution?: string;
  cover?: Media;
  gallery?: Media[];
  drawings?: Media[];
  renders?: Media[];
  comparison?: { drawing: Media; render: Media };
  scope?: string[];
  seo?: { title?: string; description?: string };
}
