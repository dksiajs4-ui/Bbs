# BBS Recorder

## Telefon üzerinden APK'ya çevirme (bilgisayarsız)

1. Bu klasörü GitHub'a yükle (GitHub mobil uygulaması veya github.com üzerinden "Add file → Upload files")
2. GitHub reponu Netlify veya Vercel'e bağla (telefon tarayıcısından da yapılabilir) — sana canlı bir link verecek (örn: `bbs-recorder.netlify.app`)
3. O linki https://www.pwabuilder.com adresine yapıştır
4. "Android" paketini seç, PWABuilder senin için imzalı bir `.apk` / `.aab` üretip indirmeni sağlar

Bu proje zaten PWABuilder'ın istediği `manifest.json`, ikonlar ve service worker (`sw.js`) ile hazır.

## Bilgisayardan kurulum ve test (varsa)

```bash
npm install
npm run dev
```

## Bilgisayardan Capacitor ile APK (alternatif yol)

```bash
npm run build
npx cap add android
npx cap copy android
npx cap sync android
npx cap open android
```

Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
