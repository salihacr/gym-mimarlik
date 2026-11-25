import servicesData from "../content/site/hizmetler.json" with { type: "json" };

// Service ids come from the CMS-managed list; "belirsiz" lets visitors leave it open.
export const serviceOptions: readonly string[] = [
  ...servicesData.items.map((s) => s.id),
  "belirsiz",
];
export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  description: string;
}
export function parseInquiry(input: unknown): Inquiry | null {
  if (!input || typeof input !== "object") return null;
  const fields = input as Record<string, unknown>;
  const read = (key: string) =>
    typeof fields[key] === "string" ? fields[key].trim() : "";
  const data = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    service: read("service"),
    location: read("location"),
    description: read("description"),
  };
  if (
    data.name.length < 2 ||
    data.name.length > 100 ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    return null;
  if (
    data.phone &&
    (!/^[+()\d .-]{7,25}$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 7)
  )
    return null;
  if (
    !serviceOptions.some((s) => s === data.service) ||
    !data.location ||
    data.location.length > 150 ||
    data.description.length < 10 ||
    data.description.length > 3000
  )
    return null;
  return data;
}
