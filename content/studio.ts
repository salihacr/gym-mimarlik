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
  contact?: { phone?: string; email?: string; whatsapp?: string; mapQuery?: string };
} = studioData;

/** Public contact details: edited in /admin (Stüdyo Bilgileri); STUDIO_* env vars still work as a fallback. */
export function studioContact() {
  const c = studio.contact || {};
  const pick = (value: string | undefined, env: string | undefined) =>
    value?.trim() || env?.trim() || undefined;
  return {
    phone: pick(c.phone, process.env.STUDIO_PHONE),
    email: pick(c.email, process.env.STUDIO_EMAIL),
    whatsapp: pick(c.whatsapp, process.env.STUDIO_WHATSAPP)?.replace(/\D/g, "") || undefined,
    mapQuery: pick(c.mapQuery, process.env.STUDIO_MAP_QUERY),
  };
}

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
