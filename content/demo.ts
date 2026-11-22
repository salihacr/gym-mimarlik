import type { Project } from "./model";
export const demoProjects: Project[] = [
  {
    slug: "apartman-projesi",
    title: "Apartman projesi",
    category: "Konut",
    publication: "demo",
    summary:
      "Bir konut binasında dairelerin yerleşimi, balkonlar ve sokağa açılan giriş birlikte düşünülür.",
    approach:
      "Kat planına bakarken önce bina girişinden dairenize nasıl ulaştığınızı takip edin. Ardından salonun hangi cepheye baktığını, balkona hangi odadan çıkıldığını ve koridora ne kadar yer ayrıldığını inceleyin. Aynı büyüklükteki iki dairenin kullanımı bu kararlarla değişebilir.",
    cover: {
      src: "/demo/konut.webp",
      caption: "Konut ve apartman",
      alt: "Mahalle içinde, balkonlu bir apartmanı gösteren temsilî dış cephe görseli",
    },
  },
  {
    slug: "bahceli-villa",
    title: "Bahçeli villa",
    category: "Villa",
    publication: "demo",
    summary:
      "Bahçeli bir evde salonun, mutfağın ve terasın birbirine yakınlığı günlük yaşamı kolaylaştırır.",
    approach:
      "Bahçede sık sık yemek yiyen bir aile için mutfaktan terasa kısa bir geçiş önemlidir. Çalışma odası isteyen bir aile içinse evin daha sessiz tarafı değerlendirilebilir. Villa planını hazırlarken önce bu alışkanlıkları konuşuruz.",
    cover: {
      src: "/demo/villa.webp",
      caption: "Villa ve müstakil ev",
      alt: "Salonu geniş camlarla bahçeye açılan iki katlı bir villa örneği",
    },
    gallery: [
      {
        src: "/demo/villa.webp",
        alt: "Bahçeden villanın salonuna ve üst katına bakış",
        caption: "Bahçeden dış cepheye bakış.",
      },
      {
        src: "/demo/interior.webp",
        alt: "Oturma alanı ve merdiveni gösteren bağımsız iç mekân örneği",
        caption: "Bağımsız bir iç mekân örneğinde oturma alanı ve merdiven.",
      },
    ],
  },
  {
    slug: "plaza-ve-ofis",
    title: "Plaza ve ofis binası",
    category: "Plaza / Ofis",
    publication: "demo",
    summary:
      "Birden fazla firmanın kullanacağı bir binada girişler, ortak alanlar ve bölünebilen ofis katları önem kazanır.",
    approach:
      "Ziyaretçinin danışmadan ofise nasıl ulaşacağını plan üzerinde takip ederiz. Aynı katı iki firma kullanacaksa girişlerin, toplantı alanlarının ve ortak ihtiyaçların nasıl ayrılabileceğini değerlendiririz.",
    cover: {
      src: "/demo/facade.webp",
      caption: "Plaza ve ofis",
      alt: "Avluya bakan geniş pencereleri ve tuğla cephe elemanlarıyla bir ofis yapısı örneği",
    },
  },
];
