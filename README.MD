# GYM Mimarlık & 3D Studio

Türkçe mimarlık stüdyosu sitesi. Next.js App Router, TypeScript ve CSS tasarım değişkenleri kullanır. Animasyonlar CSS ve IntersectionObserver ile çalışır. Fontlar yereldir.

## Çalıştırma

Node.js 22.18 veya üzeri ve npm gerekir. Proje kökünde aşağıdaki komutları çalıştırın.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Geliştirme adresi varsayılan olarak `http://localhost:3000`. Terminalde belirtilen portu kullanın. Üretim için `npm run build` ardından `npm start` çalıştırın. Form ve görsel optimizasyonu için Next.js sunucusu gerekir.

## Sayfalar

| Yol | İşlev |
| --- | --- |
| `/` | Görsel seçki, hizmetler, portföy, stüdyo, süreç, 3D Studio ve iletişim |
| `/projeler` | İçeriğe göre oluşan kategori filtreleri ve boş arşiv görünümü |
| `/projeler/[slug]` | Proje künyesi, yaklaşım, çizimler, galeri, karşılaştırma ve ilgili çalışmalar |
| `/hizmetler` | Hizmet kapsamları, sık karşılaşılan sorular, hizmet seçili iletişim bağlantıları |
| `/studyo` | Kurucu, eğitim bilgisi, bölgesel çalışma alanı ve mimari etüt |
| `/surec` | Kapsama göre şekillenen dört aşamalı örnek süreç |
| `/iletisim` | Yapılandırılabilir gönderim veya cihazda proje özeti hazırlama |

## Proje ekleme

1. Yayın onaylı görselleri `public/projeler/<benzersiz-slug>/` içine koyun. İçerik katmanındaki kaynak adresleri `/projeler/...` ile başlar. Kamuya açık dizine özel belgeler veya onaysız görüntüler eklemeyin.
2. `content/projects.ts` dizisine `content/model.ts` içindeki `Project` tipine uygun kayıt ekleyin. Zorunlu alanlar benzersiz, URL uyumlu `slug`, `title` ve `publication` alanlarıdır. Gerekli izinler alınana kadar `draft` kullanın.
3. `cover`, `gallery`, `drawings` ve `renders` için `src` ve anlamlı Türkçe `alt` metni verin. `caption` isteğe bağlıdır. Dizideki sıra galeri sırasıdır. Karşılaştırma için aynı görüş açısındaki `comparison.drawing` ve `comparison.render` birlikte sağlanır.
4. `category`, `location`, `year`, `status`, `summary`, `approach`, `solution`, `scope` ve `seo` alanlarından yalnızca doğrulanmış olanları girin. Onaylanınca `publication: "published"` seçin ve yeniden derleyin. Ana sayfadaki “Gerçekleşmiş Projeler” seçkisi, yayımlanmış ve `status: "Tamamlandı"` olarak işaretlenmiş ilk üç kaydı dosya sırasıyla gösterir.
5. İçerik kaynağı CMS’e taşınırken `lib/catalog.ts` işlevlerinin sözleşmesini ve yayın filtresini koruyun. Hizmetler, kurucu ve bölgeler `content/studio.ts` dosyasından yönetilir. Geçici marka bileşenleri `components/Header.tsx` ve `components/Graphics.tsx` içindedir.

## Geliştirme ve üretim ayrımı

Geliştirmede `content/demo.ts` içindeki temsilî örnekler görünür. Yerel önizlemede `SHOW_DEMO=false` kullanarak boş arşivi inceleyebilirsiniz. Üretim, bu değişkenin değerinden bağımsız olarak yalnızca yayınlanan gerçek kayıtları seçer. Demo görselleri `public/` dışında tutulur; demo medya ve proje URL’leri üretimde 404 döner. Taslaklar hiçbir listede yer almaz.

## İletişim ve veri işleme

Ortam değerlerini `.env.local` veya dağıtım sağlayıcısının gizli değişken alanında tanımlayın. Yapılandırmayı değiştirdikten sonra yeniden derleyip başlatın.

- Doğrulanmış kanallar için `STUDIO_EMAIL`, `STUDIO_PHONE` ve uluslararası rakamlardan oluşan `STUDIO_WHATSAPP` tanımlanabilir.
- Canlı gönderim için `CONTACT_WEBHOOK_URL` ve onaylı `PRIVACY_NOTICE_URL` HTTPS adresleri gereklidir. İsteğe bağlı `CONTACT_WEBHOOK_TOKEN`, yalnızca sunucudan Bearer başlığıyla gönderilir.
- Alıcı, JSON POST ile `name`, `email`, `phone`, `service`, `location`, `description` alanlarını alır. Hizmet kimlikleri `tasarim`, `projelendirme`, `gorsellestirme`, `danismanlik`, `belirsiz`. Alıcı talebi kabul ettiğinde 2xx vermelidir. Başarı metni servisin kabulünü bildirir. Hata veya zaman aşımında form alanları korunur.
- Formda istemci ve sunucu doğrulaması, aynı kaynak kontrolü, istek boyutu sınırı, gizli tuzak alanı ve süreç belleğinde 10 dakikada beş kabul denemesi sınırı vardır. Güvenilir bir ters vekil her istekte istemci IP başlığını yeniden yazıyorsa adını `TRUSTED_CLIENT_IP_HEADER` ile verin. Aksi durumda sınır tek sunucu sürecinde ortaktır. Çok sunuculu dağıtımda hız sınırını ortak depoya veya ağ katmanına taşıyın.
- Servis bağlı değilken form verisi tarayıcıda bir TXT dosyasına dönüşür. Uygulama form verisini diske kaydetmez. Harici analiz, reklam veya pazarlama çerezi entegrasyonu yoktur. Canlı platform ve alıcı servisin veri işleme uygulamalarını yayından önce değerlendirin.

## SEO ve yayın

Doğrulanmış `SITE_URL` değerini derlemeden önce belirleyin. Sayfa başlıkları, açıklamalar, Open Graph verileri, canonical, içerik yolları, ProfessionalService ve BreadcrumbList JSON-LD, `/sitemap.xml` ve `/robots.txt` hazırdır. Alan adı tanımlanmayan derleme ve geliştirme önizlemesi indekslemeye kapalıdır. Proje paylaşım görseli için kapak, diğer sayfalarda markaya ait çizimli paylaşım görseli kullanılır.

Tasarım kararları [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), yayın girdileri [CONTENT_REQUIRED.md](CONTENT_REQUIRED.md) ve demo görsellerinin kaynağı [ASSETS.md](content/ASSETS.md) dosyalarındadır.

## Kalite kontrolü

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Gerçek kullanıcı Core Web Vitals hedefleri LCP ≤ 2,5 sn, INP ≤ 200 ms ve CLS ≤ 0,1’dir. Bu hedefler, yayın sonrası 75. yüzdelik dilimde saha verisiyle doğrulanır.

### Teslim kontrolü

- Üretim derlemesi, TypeScript denetimi, ESLint ve iki form doğrulama testi geçti.
- Chromium ile ana sayfa ve altı iç sayfa türü 390, 768, 1024, 1440 ve 1920 px genişliklerde kontrol edildi. Ana sayfa kadrajları ile masaüstü ve mobil iç sayfa görüntüleri incelendi. Tablet başlığı için sütun oranı düzeltildi.
- Mobil menü, Escape ile kapanma ve odağın menü düğmesine dönmesi, içeriğe geç bağlantısı, reduced motion, görsel seçici, kategori filtresi, galeri klavye kontrolleri, hizmetin forma aktarılması ve TXT indirme sınandı.
- Yedi sayfa türünde mobil axe taramasının kapsadığı WCAG A/AA kurallarında ihlal raporlanmadı. Bu otomatik tarama, tam erişilebilirlik sertifikasyonu kapsamına girmez.
- Yerel üretim ana sayfasında Lighthouse 13.6.0 mobil ölçümü performans 100, erişilebilirlik 100, iyi uygulamalar 100, SEO 66 verdi. Ölçülen LCP 1,6 sn, CLS 0. SEO sonucunda doğrulanmış alan adı bekleyen önizlemenin indeksleme engeli etkilidir.
- Üretimde boş arşiv, demo proje ve medya adreslerinin 404 dönmesi ve yapılandırılmamış form servisinin 503 yanıtı doğrulandı.
- İzole test kopyasında yayınlı proje ve taslak ayrımı, canonical, Open Graph, sitemap ve çizim/render sürgüsü sınandı. Yerel HTTPS alıcısı ile başarılı teslim, servis hatasında alanların korunması, geçersiz alanlar, tuzak alanı, bildirim onayı, istek kaynağı ve hız sınırı kontrolleri geçti.
