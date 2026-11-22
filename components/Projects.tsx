import Image from "next/image";
import { Action, Eyebrow } from "./Shared";
export const drawing = {
  src: "/drawings/pavilion.svg",
  alt: "Üst üste oturan hacimleri ve kat ilişkilerini gösteren aksonometrik mimari şema",
};
export { ProjectCard } from "./ProjectCard";
export function EmptyProjects({
  heading: Heading = "h3",
}: {
  heading?: "h2" | "h3";
}) {
  return (
    <div className="empty-projects">
      <div className="empty-drawing">
        <Image
          src="/drawings/plan.svg"
          alt="Kapı açılımları, mobilya yerleşimi ve ölçü çizgilerini gösteren şematik kat planı"
          fill
          sizes="(max-width:760px) 100vw, 50vw"
        />
      </div>
      <div>
        <Eyebrow>PROJE ARŞİVİ</Eyebrow>
        <Heading>Portföy hazırlanıyor.</Heading>
        <p>
          Projelerimizin fotoğraf ve çizimlerini yayına hazırlıyoruz. Arsanız
          için bir apartman, bahçeli bir ev ya da ofis binası düşünüyorsanız ilk
          görüşmede nereden başlayabileceğimizi öğrenebilirsiniz.
        </p>
        <Action href="/surec" secondary>
          Çalışma Sürecimiz
        </Action>
      </div>
    </div>
  );
}
