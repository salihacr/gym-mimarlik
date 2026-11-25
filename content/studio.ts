// Editable copy lives in content/site/*.json and is managed from /admin (Sveltia CMS).
import type { ServiceKind } from "@/components/svg/ServiceDrawing";
import studioData from "./site/studyo.json";
import servicesData from "./site/hizmetler.json";
import stagesData from "./site/surec.json";
import projectTypesData from "./site/proje-turleri.json";

export interface Service {
  id: string;
  name: string;
  icon: ServiceKind;
  intro: string;
  detail: string;
  question: string;
  answer: string;
}

export const studio: {
  name: string;
  founder: string;
  experience: string;
  biography: string[];
  regions: string[];
} = studioData;

export const navigation = [
  ["/", "Ana Sayfa"],
  ["/projeler", "Projeler"],
  ["/hizmetler", "Hizmetler"],
  ["/studyo", "Stüdyo"],
  ["/surec", "Çalışma Sürecimiz"],
  ["/iletisim", "İletişim"],
] as const;

export const projectTypes: { title: string; description: string }[] =
  projectTypesData.items;

export const services = servicesData.items as Service[];

export const stages: [title: string, subtitle: string, body: string][] =
  stagesData.items.map(({ title, subtitle, body }) => [title, subtitle, body]);
