export const studio = {
  name: "GYM Mimarlık & 3D Studio",
  founder: "Ramazan YILMAZ",
  experience: "5 yılı aşkın mesleki deneyim",
  biography: [
    "Ramazan YILMAZ, Gebze Teknik Üniversitesi Mimarlık Bölümünden mezun oldu. Mezuniyetinin ardından Rusya’ya gitti ve uluslararası bir proje kapsamında bir gaz tesisinde mimar olarak çalıştı.",
    "Türkiye’ye döndükten sonra kendi ofisi GYM Mimarlık & 3D Studio’yu kurdu. Bugün konut, villa ve ofis projeleri üzerine çalışıyor. Mimarlık ofislerine ve müteahhitlere mimari danışmanlık veriyor, ihtiyaç duydukları projelerin çizimlerini hazırlıyor.",
  ],
  regions: ["Darıca", "Gebze", "Çayırova", "Kocaeli", "İstanbul"],
};
export const navigation = [
  ["/", "Ana Sayfa"],
  ["/projeler", "Projeler"],
  ["/hizmetler", "Hizmetler"],
  ["/studyo", "Stüdyo"],
  ["/surec", "Çalışma Sürecimiz"],
  ["/iletisim", "İletişim"],
] as const;

export const projectTypes = [
  {
    title: "Konut ve apartman",
    description:
      "Daireleri arsaya nasıl yerleştirebiliriz? Bina girişini, merdiveni ve asansörü birlikte çözerken her dairenin aldığı ışığı ve odaların kullanımını inceliyoruz.",
  },
  {
    title: "Villa ve müstakil ev",
    description:
      "Evinizi ailenizin alışkanlıklarına göre planlıyoruz. Kaç odaya ihtiyaç duyduğunuz, mutfaktan bahçeye nasıl çıkmak istediğiniz ve misafirlerinizi nerede ağırladığınız çizime yön veriyor.",
  },
  {
    title: "Plaza ve ofis",
    description:
      "Çalışanların, ziyaretçilerin ve farklı firmaların aynı binayı nasıl kullanacağını ele alıyoruz. Ofis katlarının bölünebilmesi, girişten asansöre ulaşım ve ortak alanlar planın bir parçası.",
  },
] as const;

export const services = [
  {
    id: "tasarim",
    name: "Mimari Tasarım",
    icon: "house",
    intro:
      "Arsanıza ve günlük yaşamınıza uygun bir yerleşim planlıyoruz.",
    detail:
      "Bir apartmanda dairelerin hangi cepheye bakacağını, bir villada salonun bahçeye nereden açılacağını plan üzerinde gösteriyoruz. Ofis projelerinde ise çalışma alanlarını, toplantı odalarını ve ziyaretçi girişini ekibinizin kullanımına göre yerleştiriyoruz.",
    question: "İlk görüşmeye ne getirmeliyim?",
    answer:
      "Varsa arsanızın ölçülerini, imar durumunu ve elinizdeki planları paylaşabilirsiniz. İhtiyaç duyduğunuz oda sayısını ve sizin için önemli olan birkaç konuyu not etmeniz de iyi bir başlangıç olur.",
  },
  {
    id: "projelendirme",
    name: "Mimari Projelendirme",
    icon: "layers",
    intro:
      "Yapınızın kat planlarını, kesitlerini ve cephelerini çiziyoruz.",
    detail:
      "Yerleşime karar verdikten sonra odaların ölçülerini, kapı ve pencere yerlerini, merdivenleri ve katlar arasındaki bağlantıları çizime işliyoruz. Hangi çizimlere ihtiyaç olduğunu ve teslim edilecek dosyaları işe başlarken sizinle belirliyoruz.",
    question: "Elimde bir taslak varsa onun üzerinden çalışabilir miyiz?",
    answer:
      "Evet. Mevcut planı birlikte inceleyip hangi kararların verildiğini, hangi alanların yeniden ele alınacağını ve eksik çizimleri belirleyebiliriz.",
  },
  {
    id: "gorsellestirme",
    name: "3D Görselleştirme",
    icon: "cube",
    intro:
      "Evinizi veya ofisinizi seçtiğiniz malzemelerle üç boyutlu görün.",
    detail:
      "Cephede taş mı yoksa sıva mı kullanacağınıza karar verirken iki seçeneği aynı açıdan görebilirsiniz. İç mekânda ise mobilyaların yerleşimini, pencere boyutlarını ve ışığın odaya nereden girdiğini model üzerinde inceleyebilirsiniz.",
    question: "Sadece üç boyutlu görsel isteyebilir miyim?",
    answer:
      "Evet. Mevcut çizimlerinizi ve görmek istediğiniz alanları paylaşın. İç mekân, dış cephe veya her ikisi için hangi açıların hazırlanacağını birlikte seçelim.",
  },
  {
    id: "danismanlik",
    name: "Mimari Danışmanlık",
    icon: "plan",
    intro:
      "Ofislere ve müteahhitlere tasarım ve çizim desteği veriyoruz.",
    detail:
      "Bir katta farklı daire tiplerinin nasıl yerleşebileceğini ya da bir ofis katının ayrı birimlere nasıl bölünebileceğini mevcut çizimler üzerinden değerlendiriyoruz. Ekibinizin ihtiyaç duyduğu tasarım ve çizim işlerini belirleyip görev paylaşımını netleştiriyoruz.",
    question: "Projenin yalnızca bir aşaması için destek alabilir miyiz?",
    answer:
      "Evet. Üzerinde çalıştığınız çizimleri, çözmek istediğiniz konuyu ve teslim takviminizi paylaşın. Gerekli desteğin kapsamını birlikte belirleyelim.",
  },
] as const;
export const stages = [
  [
    "İlk görüşme",
    "Arsa ve ihtiyaçlar",
    "Arsanızın yerini, ne yapmak istediğinizi ve bütçenizi konuşuyoruz. Elinizde çizim varsa birlikte inceliyor, hangi hizmete ihtiyaç duyduğunuzu belirliyoruz.",
  ],
  [
    "Yerleşim seçenekleri",
    "İlk planlar",
    "Oda düzenini, bina girişini ve ortak alanları ilk plan üzerinde gösteriyoruz. Beğendiğiniz ve değiştirmek istediğiniz yerleri birlikte işaretliyoruz.",
  ],
  [
    "Çizim ve modelleme",
    "Projenin ayrıntıları",
    "Seçtiğiniz planın ölçülerini ve dış görünüşünü netleştiriyoruz. Çalışma kapsamına göre iç mekânı veya cepheyi üç boyutlu olarak da gösteriyoruz.",
  ],
  [
    "Proje teslimi",
    "Çizimler ve dosyalar",
    "Başlangıçta kararlaştırdığımız çizim ve görselleri teslim ediyoruz. Planı sizinle birlikte gözden geçiriyor, dosyalarla ilgili sorularınızı yanıtlıyoruz.",
  ],
] as const;
