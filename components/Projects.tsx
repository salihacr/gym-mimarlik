import { Action, Eyebrow } from "./Shared";
import { PlanDrawing } from "./svg/PlanDrawing";
export { ProjectCard } from "./ProjectCard";
export function EmptyProjects({
  heading: Heading = "h3",
}: {
  heading?: "h2" | "h3";
}) {
  return (
    <div className="empty-projects">
      <div className="empty-drawing">
        <PlanDrawing />
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
