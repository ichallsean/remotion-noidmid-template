# Panduan Script & Visual @noidmid

## 1. Aturan narasi TTS bahasa Indonesia

- Pakai kalimat pendek, idealnya **10–15 kata** per kalimat.
- Satu kalimat cukup untuk **satu ide**. Jangan menggabungkan dua poin.
- Tutup setiap kalimat dengan tanda baca jelas: `.`, `,`, atau `?`.
- Eja angka dan singkatan agar TTS tidak salah baca:
  - `90%` → `"sembilan puluh persen"`
  - `SSD` → `"es es di"`
  - `RAM` → `"rem"`
  - `CPU` → `"si pi u"`
  - `Ctrl+Shift+Esc` → `"kontrol, shift, eskap"`
- Hindari kata asing yang tidak perlu. Jika terpaksa, beri jeda dan konteks.
- Gunakan kata transisi ringan: **"Jadi"**, **"Nah"**, **"Coba"**, **"Artinya"**.
- Ajukan pertanyaan di awal slide untuk menahan penonton.
- Tutup dengan ajakan konkret: cek, coba, atau simpan.
- Jangan menulis teks visual di narasi secara verbatim. Narasi menjelaskan, teks merangkum.

### Contoh ritme

```text
PC kamu lemot padahal SSD sudah cepat?
Nah, masalahnya bisa jadi bukan di SSD-nya.
Bayangkan PC itu dapur. RAM itu meja kerja.
SSD itu lemari bumbu. CPU itu kokinya.
Kalau meja penuh, koki tetap lambat.
Cek dulu ruang disk sebelum menyalahkan RAM.
```

## 2. Memilih layout

| Layout | Fungsi | Cocok untuk |
| --- | --- | --- |
| `hook-cover` | Cover penuh sejak frame 0 | Judul episode, thumbnail otomatis |
| `analogy-split` | Dua kartu perbandingan A/B | RAM vs SSD, sebab vs akibat |
| `stat-highlight` | Angka besar jadi fokus | Persentase, ukuran, hitungan |
| `spec-card` | Kartu modern bernomor | Spesifikasi, langkah, komponen |
| `cta-outro` | Penutup + badge berdenyut | Ajakan follow, save, cek aplikasi |

Satu episode sebaiknya memakai **kelima layout secara berurutan**:
`hook-cover → analogy-split → stat-highlight → spec-card → cta-outro`.

## 3. Memilih `imageMode`

Semua path gambar relatif terhadap folder `public/` dan dipanggil lewat `staticFile()`.

### `hero-card` (default)

- Gambar besar **460px tinggi** di dalam kartu rounded.
- Efek **slow zoom-in** (Ken Burns) sepanjang slide.
- Pakai untuk gambar utama: ilustrasi PC, dapur, diagram, atau produk.

```json
{
  "image": "episodes/ep-01-dapur-pc/kitchen-hero.svg",
  "imageMode": "hero-card"
}
```

### `backdrop`

- Gambar full-screen dengan **dark gradient overlay** dan **slow pan**.
- Teks tetap di safe zone, jadi gunakan gambar yang tidak terlalu ramai.
- Pakai untuk suasana, latar kontekstual, atau transisi visual.

```json
{
  "image": "episodes/ep-01-dapur-pc/kitchen-backdrop.svg",
  "imageMode": "backdrop"
}
```

### `floating-badge`

- Gambar sedang **220px** dengan neon glow dan gerak mengambang.
- Pakai untuk ikon besar, logo, badge angka, atau stiker produk.

```json
{
  "image": "episodes/ep-01-dapur-pc/storage-badge.svg",
  "imageMode": "floating-badge"
}
```

## 4. Teks, ikon, dan suara

- `titleStyle: "typewriter"` mengetik judul bertahap dengan kursor berkedip. Pakai maksimal **satu slide per episode** agar tidak berlebihan.
- `icon` menerima: `cpu`, `ram`, `ssd`, `gpu`, `zap`, `server`, `wrench`.
- `sfx` menerima: `none`, `whoosh`, `pop`, `type`, `ding`.
- SFX hanya diputar jika file `public/sfx/<sfx>.mp3` benar-benar ada. Default slide adalah `whoosh`.
- Jangan menaruh SFX di semua slide. Beri jeda agar tidak mengganggu narasi.

## 5. Watermark @noidmid

- Default: `watermark: "@noidmid"`.
- `watermarkMode: "intro-outro"` → tampil hanya di `hook-cover` dan `cta-outro`.
- `watermarkMode: "always-bottom"` → tampil di semua slide.
- Posisi portrait: **340px dari bawah** (di atas safe-zone TikTok 320px).
- Posisi landscape: **56px dari bawah**.
- Ukuran 20px, opacity 0.65, font monospace. Jangan ubah menjadi besar.

## 6. Safe zone portrait

- Atas: `220px`
- Bawah: `320px`
- Kanan: `140px`
- Kiri: `140px`

Semua teks dan kartu wajib berada di dalam area ini. Background boleh full-screen.

## 7. Alur produksi singkat

1. Tulis narasi dengan aturan bagian 1.
2. Potong menjadi 5 slide, satu ide per slide.
3. Pilih layout dan `imageMode` yang sesuai.
4. Isi `highlightText` dengan ringkasan paling pendek.
5. Tambahkan `icon`, opsional `titleStyle`, dan SFX jika file tersedia.
6. Render: `fish scripts/render-ep.fish <slug>`.
7. Cek thumbnail frame 0 di `out/<slug>-thumb.png`.
