# 🚀 Cara Deploy ke Vercel

## Persiapan

File yang sudah disiapkan:
- ✅ `vercel.json` - Konfigurasi deployment Vercel
- ✅ `.vercelignore` - File yang diabaikan saat deploy
- ✅ `package.json` - Sudah ada script `start`

## Langkah-langkah Deploy

### 1. Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 2. Deploy via Website (Recommended)

#### Cara Termudah:
1. Push code ke **GitHub**
2. Buka [vercel.com](https://vercel.com)
3. Login dengan GitHub
4. Klik **"Add New Project"**
5. Import repository GitHub Anda
6. Vercel akan auto-detect konfigurasi
7. Klik **Deploy**! 🎉

### 3. Deploy via CLI (Alternative)

Di terminal, jalankan:
```bash
vercel
```

Ikuti instruksi:
- Login ke Vercel
- Set project name
- Deploy otomatis!

## Environment Variables

Jika menggunakan Google Sheets API, tambahkan di Vercel Dashboard:
- `GOOGLE_CREDENTIALS` - JSON credentials
- Environment variables lainnya sesuai kebutuhan

## Catatan Penting

⚠️ **Audio Files**: Folder `audio/` berisi file MP3 yang besar. 
- Vercel punya limit 100MB per deployment
- Jika error, pertimbangkan:
  - Host audio di CDN (seperti Cloudflare R2, AWS S3)
  - Update path di `listlagu.js` ke URL CDN

## Troubleshooting

**Error: Files too large**
→ Pindahkan audio files ke CDN

**Error: Module not found**
→ Pastikan `package.json` lengkap

**API tidak jalan**
→ Cek routes di `vercel.json`

---

✨ Setelah deploy, aplikasi akan accessible di:
`https://your-project.vercel.app`
