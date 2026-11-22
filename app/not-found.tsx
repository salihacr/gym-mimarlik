import { Action, Eyebrow } from "@/components/Shared";
export default function NotFound() {
  return (
    <section className="wrap inner-page">
      <Eyebrow>404</Eyebrow>
      <h1>Sayfa bulunamadı.</h1>
      <p>Aradığınız sayfa taşınmış veya henüz yayına alınmamış olabilir.</p>
      <Action href="/">Ana Sayfaya Dön</Action>
    </section>
  );
}
