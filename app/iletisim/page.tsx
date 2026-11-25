import { Crumbs, Eyebrow } from "@/components/Shared";
import { ContactForm } from "@/components/ContactForm";
import {
  approvedNotice,
  contactEnabled,
  metadata as pageMeta,
} from "@/lib/site";
import { studio, studioContact } from "@/content/studio";
export const metadata = pageMeta(
  "/iletisim",
  "İletişim ve Proje Görüşmesi",
  "Mimari tasarım, projelendirme veya 3D görselleştirme için ihtiyaçlarınızı ve proje konumunuzu GYM Mimarlık görüşmesine hazırlayın.",
);
export default function Contact() {
  const { email, phone, whatsapp } = studioContact();
  return (
    <>
      <Crumbs items={[["/iletisim", "İletişim"]]} />
      <div className="wrap inner-page contact-layout">
        <div>
          <Eyebrow>İLETİŞİM</Eyebrow>
          <h1>
            Projenizi
            <br />
            <em>konuşalım.</em>
          </h1>
          <p className="lead">
            Arsanız hangi ilçede? Bir apartman, müstakil ev ya da ofis binası mı
            düşünüyorsunuz? İlk görüşme için bunları yazmanız yeterli. Elinizde
            bir plan varsa hangi konuda desteğe ihtiyacınız olduğunu da
            ekleyebilirsiniz.
          </p>
          <div className="contact-area">
            <h2>Hizmet bölgeleri</h2>
            <p>{studio.regions.join(" · ")}</p>
          </div>
          <div className="channels">
            {email && <a href={"mailto:" + email}>{email}</a>}
            {phone && (
              <a href={"tel:" + phone.replace(/[^+\d]/g, "")}>{phone}</a>
            )}
            {whatsapp && /^\d{8,15}$/.test(whatsapp) && (
              <a href={"https://wa.me/" + whatsapp}>WhatsApp ile görüşün</a>
            )}
          </div>
        </div>
        <ContactForm
          enabled={contactEnabled}
          notice={approvedNotice}
        />
      </div>
    </>
  );
}
