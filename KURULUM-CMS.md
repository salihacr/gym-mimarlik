# Yönetim Paneli ve Cloudflare Kurulumu

Site artık tamamen statik. `npm run build` komutu bütün siteyi `out/` klasörüne yazar.
İçerik `content/` altındaki JSON dosyalarında durur ve `/admin/` adresindeki
Sveltia CMS paneliyle düzenlenir. Panelde yapılan her kayıt GitHub'a bir commit olarak gider,
Cloudflare Pages de siteyi 1-2 dakika içinde yeniden yayınlar.

| Ne | Nerede |
|---|---|
| Projeler (her proje bir dosya, dosya adı = adres) | `content/projeler/*.json` |
| Hizmetler, stüdyo, süreç, proje türleri | `content/site/*.json` |
| Panelden yüklenen görseller (WebP'ye çevrilir) | `public/uploads/` |
| Panel ayarları | `public/admin/config.yml` |
| İletişim formu API'si | `functions/api/iletisim.ts` (Cloudflare Pages Function) |

## 1. Cloudflare Pages projesi

1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → `salihacr/gym-mimarlik`.
2. Build ayarları:
   - Production branch: `master`
   - Build command: `npm run build`
   - Build output directory: `out`
3. **Settings → Variables and Secrets** (değerlerin listesi `.env.example` dosyasında):
   - `NODE_VERSION` = `22.18.0`
   - `SITE_URL` = `https://alan-adiniz.com`
   - `STUDIO_EMAIL`, `STUDIO_PHONE`, `STUDIO_WHATSAPP`
   - `PRIVACY_NOTICE_URL`, `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_TOKEN` (secret olarak ekleyin)
   - İsteğe bağlı: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`
     (Cloudflare → Turnstile → Add widget, alan adınızı ekleyin)
4. **Custom domains** bölümünden alan adınızı bağlayın.

`functions/` klasörünü Cloudflare otomatik algılar, `/api/iletisim` ayrıca bir ayar gerektirmez.

## 2. GitHub girişi için Worker (bir kerelik, ücretsiz)

1. https://github.com/sveltia/sveltia-cms-auth sayfasındaki **Deploy to Cloudflare** butonuyla
   Worker'ı kurun. Size `https://sveltia-cms-auth.<hesap>.workers.dev` gibi bir adres verilir.
2. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - Homepage URL: `https://alan-adiniz.com`
   - Authorization callback URL: `https://sveltia-cms-auth.<hesap>.workers.dev/callback`
   - Kaydettikten sonra **Generate a new client secret** butonuna basın.
3. Worker'ın **Settings → Variables and Secrets** bölümüne şunları ekleyin:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET` (Encrypt seçili olsun)
   - `ALLOWED_DOMAINS` = `alan-adiniz.com, gym-mimarlik.pages.dev`
4. `public/admin/config.yml` içindeki `base_url` satırını Worker adresinizle değiştirip push edin.

## 3. Mimarın erişimi

1. Mimar arkadaşınız için bir GitHub hesabı açın ve **iki adımlı doğrulamayı (2FA)** etkinleştirin.
2. Repo → **Settings → Collaborators → Add people** ile ona **Write** yetkisi verin.
3. `master` branch'ine push'u engelleyen bir kural koymayın. Kural varsa panel salt okunur olur.
4. Mimar `https://alan-adiniz.com/admin/` adresinden "Sign In with GitHub" butonuna basarak girer.

## Yerelde deneme

`npm run dev` komutunu çalıştırın, Chrome veya Edge'de `http://localhost:3000/admin/index.html`
adresini açın ve **Work with Local Repository** seçeneğiyle proje klasörünü seçin.
Değişiklikler doğrudan diskteki JSON dosyalarına yazılır, GitHub'a bir şey gitmez.

## Notlar

- Bir proje ancak **Yayın durumu: Yayında** seçilirse sitede görünür. "Tamamlandı" durumundaki
  projeler ana sayfada öne çıkar.
- Hizmetlerin **Bağlantı kimliği** (örneğin `tasarim`), `/hizmetler#tasarim` bağlantısında ve
  iletişim formunda kullanılır. Mevcut hizmetlerde bu kimliği değiştirmeyin.
- Demo projeler yalnızca `npm run dev` sırasında görünür, canlı sitede görünmez.
- İletişim formundaki deneme sınırı, Workers'ta her örnek için ayrı tutulduğu için yaklaşık bir
  sınırdır. Spam için Turnstile kullanın. Gerekirse Cloudflare'de `/api/iletisim` için bir
  Rate Limiting kuralı da ekleyebilirsiniz (ücretsiz planda 1 kural var).

## Geçici yayın: GitHub Pages

`.github/workflows/pages.yml` iş akışı, `master` branch'ine yapılan her push'ta siteyi
`https://salihacr.github.io/gym-mimarlik/` adresine yayınlar.

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. İsterseniz **Settings → Secrets and variables → Actions → Variables** bölümüne
   `STUDIO_EMAIL`, `STUDIO_PHONE` ve `STUDIO_WHATSAPP` değerlerini ekleyin.

Bu önizlemede:
- Demo projeler görünür ve sayfalar `noindex` olarak işaretlenir.
- GitHub Pages fonksiyon çalıştıramadığı için iletişim formu gönderim yapmaz, sadece özet dosyası indirir.
- Panel (`/gym-mimarlik/admin/`) GitHub girişi için yine 2. adımdaki Worker'a ihtiyaç duyar.
  `ALLOWED_DOMAINS` değerine `salihacr.github.io` adresini de ekleyin.

Cloudflare'e geçerken iş akışını kapatın (ya da dosyayı silin). Cloudflare build'inde
`NEXT_PUBLIC_BASE_PATH` ve `SHOW_DEMO` değişkenlerini tanımlamayın.
