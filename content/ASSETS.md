# Temsilî mimari görseller

## Hero animasyon kareleri

`content/hero-media/` dizinindeki yedi WebP, kullanıcı tarafından sağlanan kavramsal mimari görsellerdir. Ana sayfadaki çizim, model ve render aşamalarında kullanılırlar. Hizalama ve fırça yolları `content/hero-motion.ts` içinde tanımlıdır. Kaynak veya geometri değiştiğinde `node scripts/prepare-hero.mjs` komutu, `public/hero/` içindeki iki boyutu, açılış görselini ve geçiş maskelerini yeniden üretir.

Geliştirme önizlemesindeki dört görsel, bu site için yerleşik OpenAI ImageGen aracıyla üretilmiştir. Görseller herhangi bir GYM Mimarlık projesini, müşterisini veya adresini temsil etmez. Demoda kaynak niteliği görünür biçimde belirtilir. Gerçek portföye geçerken stüdyonun kullanım hakkını doğruladığı proje görselleri eklenir.

| Dosya | İçerik | Önerilen alternatif metin |
| --- | --- | --- |
| `content/demo-media/konut.webp` | Apartman dış cephesi | Ağaçlı bir sokakta açık taş cepheli, balkonlu bir apartman örneği. |
| `content/demo-media/villa.webp` | Villa dış cephesi | Yansıma havuzuna bakan, traverten cepheli iki katlı villa için temsilî görsel. |
| `content/demo-media/interior.webp` | Konut iç mekânı | Gün ışığı alan bir oturma alanı ve taş merdiven için temsilî iç mekân görseli. |
| `content/demo-media/facade.webp` | Ticari yapı dış cephesi | Ağaçlı avluya açılan, tuğla ayaklarla ritimlendirilmiş ticari cephe için temsilî görsel. |

Dört dosya da 1536 × 1024 piksel, 3:2 oranında ve WebP biçimindedir. Depoya alınan dosyalarda üçüncü taraf stok fotoğraf, lisanslı proje fotoğrafı veya kullanıcı tarafından sağlanan referans görselinden alınmış pikseller kullanılmamıştır. Üretim kaynağı OpenAI ImageGen'dir. Geçerli kullanım koşulları hesap türüne ve kullanıldığı hizmete bağlıdır.

## Üretim istemleri

### Villa

> A 3:2 landscape architectural magazine editorial photograph of an original contemporary two-storey villa set into a Mediterranean garden. Shot from across a long slender reflecting pool with dappled olive tree branches framing the left side. Refined interlocking pale travertine cuboid volumes, striking deep cantilever, vertical oak brise soleil, floor-to-ceiling glazing, matte bronze frames, grass and ornamental native planting. Low camera looking slightly upward at the corner, straight architectural verticals, building filling most of frame, soft clear slate-blue sky. Warm late afternoon sunlight, shadows, tactile stone texture, natural editorial film color, ultra-realistic detail, genuinely beautiful architectural composition. The entire hero photo is architecture, no reserved text space, no writing, no people, no logos, no text, no watermarks.

### İç mekân

> Landscape 3:2 architectural editorial photograph, an original quiet contemporary Turkish villa interior, sculptural travertine stair, richly textured lime-washed plaster walls, oak and limestone flooring, low wool-upholstered lounge chairs, huge shadow gap and soft oblique afternoon sunlight across cream stone, glimpse of Mediterranean olive garden through full height window. Architectural Digest quality, calm restrained sophistication and naturally rich material depth. Realistic furniture scale, balanced two point perspective. No text, no watermarks, no people.

### Ticari cephe

> Landscape 3:2 architectural editorial photograph of a beautiful contemporary commercial architecture pavilion, corner view of a 3-storey elongated facade composed of a regular rhythm of thick terracotta brick piers and deep recessed windows, warm afternoon shadows, leafy quiet courtyard at street level, brilliant natural blue sky, crisp precise architectural verticals, magazine-quality filmic exposure, intriguing depth, no people, no signage, no text, no watermarks.

### Apartman dış cephesi

`content/demo-media/konut.webp`, konut projelerini tanıtmak için yerleşik OpenAI ImageGen ile üretilen ek bir temsilî görseldir. Açık taş ve sıva cephesi olan balkonlu bir apartmanı, ağaçlı bir mahalle sokağından gösterir. Önerilen alternatif metin “Ağaçlı bir sokakta, açık taş cepheli ve balkonlu bir apartman örneği.” Kullanımı geliştirme önizlemesiyle sınırlıdır.

> Photorealistic-natural. Landscape 3:2, 1536x1024. Single architectural editorial photograph, real world scale, of an original, attractively designed yet entirely plausible contemporary five-storey apartment building on an ordinary residential street in Turkey's Marmara region. The main building is the clear focus and can be recognized in both horizontal and near-square crops. Ground floor plus four residential floors. Pale limestone and warm white stucco, subtle dark window frames and balcony railings, well-proportioned real balconies deep enough for a small table. The main façade has a legible apartment entry and repeated windows. Realistic street and sidewalk, a couple of mature trees along the curb, neighboring mid-rise apartment façades subtly visible on the sides. Clean but lived-in, urban everyday atmosphere. Street-level three-quarter architectural photograph with corrected straight verticals, 28mm shift lens, afternoon sun revealing warm textured materials, natural clear sky, editorial filmic light balanced with realistic contrast. Show whole roof and ground floor, avoid excessive empty foreground. No text, no logo, no watermark. No resort, no swimming pool, no detached mansion, no high fantasy, no enclosed residential estate.
