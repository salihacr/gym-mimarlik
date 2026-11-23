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
  {
    slug: "mustakil-konut",
    title: "Müstakil konut",
    category: "Konut",
    publication: "demo",
    summary:
      "Tek ailenin kullanacağı müstakil bir evde giriş, mutfak ve oturma alanı günlük düzeni belirler.",
    approach:
      "Arsanın güneş alan tarafını ve komşu yapılara bakan cepheleri birlikte değerlendiririz. Mutfak ile oturma alanının ilişkisi, yatak odalarının sessiz tarafa yerleşimi ve giriş holünün sadeliği plan üzerinde netleşir.",
    cover: {
      src: "/demo/interior.webp",
      caption: "Müstakil konut",
      alt: "Açık planlı oturma ve yemek alanını gösteren temsilî iç mekân görseli",
    },
  },
  {
    slug: "konut-kompleksi",
    title: "Konut kompleksi giriş bloğu",
    category: "Konut",
    publication: "demo",
    summary:
      "Birden fazla blok içeren bir sitede ortak girişlerin, yaya dolaşımının ve otoparkın birlikte düşünülmesi gerekir.",
    approach:
      "Yaya ile araç dolaşımını ayırmak, blok girişlerini ortak bahçeden okunur hâle getirmek ve her dairenin ışık aldığı cepheleri kontrol etmek planın ana kararlarıdır. Giriş bloğunun ölçekli çizimleri bu kararları netleştirir.",
    cover: {
      src: "/demo/konut.webp",
      caption: "Konut kompleksi",
      alt: "Birden fazla bloktan oluşan konut yapısının temsilî dış görseli",
    },
  },
  {
    slug: "ofis-kat-planlama",
    title: "Ofis katı planlaması",
    category: "Plaza / Ofis",
    publication: "demo",
    summary:
      "Bir ofis katında çalışma masaları, toplantı odaları ve ortak alanlar kullanıcıların yürüyüş yoluna göre yerleşir.",
    approach:
      "Katın ana girişinden toplantı odalarına ve dinlenme alanına kadar olan yolu plan üzerinde takip ederiz. Bölünebilen alanların hangi noktalarda kapanacağı ve doğal ışığın masalara nasıl ulaşacağı, düzenin son hâlini belirler.",
    cover: {
      src: "/demo/facade.webp",
      caption: "Ofis katı",
      alt: "Geniş pencereli ofis binasının temsilî cephe görseli",
    },
  },
];
