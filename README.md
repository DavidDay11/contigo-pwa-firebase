# 💕 Contigo — PWA para parejas a distancia

App web progresiva (PWA) para mantenerse cerca aunque estén lejos.

## 📁 Estructura del proyecto

```
contigo/
├── index.html          ← App completa (1 archivo)
├── sw.js               ← Service Worker (offline + notificaciones)
├── manifest.json       ← Configuración PWA
├── netlify.toml        ← Headers y redirects para Netlify
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png     ← Usada en apple-touch-icon
    ├── icon-384.png
    ├── icon-512.png
    └── icon-maskable.png
```

## 🚀 Deploy en Netlify (igual que StockEz)

### Opción 1 — Drag & Drop (más rápido)
1. Andá a [app.netlify.com](https://app.netlify.com)
2. Arrastrá **toda la carpeta** `contigo/` al panel de Netlify
3. ¡Listo! Te da una URL tipo `contigo-xyz.netlify.app`
4. Podés cambiarle el nombre en Site Settings → Site name

### Opción 2 — Desde GitHub
1. Subí la carpeta a un repo GitHub
2. En Netlify: **Add new site → Import from Git**
3. Elegí el repo, rama `main`, directorio de publicación: `.` (raíz)
4. Build command: (vacío, no necesita build)
5. Deploy

### Renombrar
En Netlify → Site settings → Site name → `contigo` o el nombre que quieras.

## 📱 Instalar en el celular

### Android (Chrome)
- Abrí la URL → aparece el banner "Instalá Contigo"
- O: menú ⋮ → "Agregar a pantalla de inicio"

### iPhone (Safari)
- Abrí la URL en Safari
- Tocá el botón compartir → "Agregar a pantalla de inicio"

## ✨ Features incluidas

| Feature | Estado |
|--------|--------|
| 🏠 Panel principal con estadísticas | ✅ |
| ⏰ Relojes duales con zonas horarias | ✅ |
| 💓 Botón "mandar un latido" | ✅ |
| 🌙 Estado de ánimo del día | ✅ |
| ✨ Frase romántica diaria | ✅ |
| 📺 Lista de series/pelis/animes | ✅ |
| ❓ Preguntas íntimas (17 cartas) | ✅ |
| ⚖️ ¿Preferirías? (12 dilemas) | ✅ |
| 🎲 Verdad o Dato | ✅ |
| 🎡 Ruleta de actividades | ✅ |
| 🏆 Retos en videollamada | ✅ |
| 🧠 Trivia de pareja | ✅ |
| 🎨 Adivina el dibujo | ✅ |
| 📋 Bucket list compartida | ✅ |
| 💌 Notas de amor | ✅ |
| ⏰ Mensajes programados | ✅ |
| 🔔 Recordatorios de fechas | ✅ |
| 📸 Galería de recuerdos | ✅ |
| 🎁 Lista de deseos | ✅ |
| 💳 Métodos de pago/envío | ✅ |
| 📵 Modo offline completo | ✅ |
| 🔔 Notificaciones push | ✅ |
| 📲 Instalable como app nativa | ✅ |
| 💾 Guardado local (localStorage) | ✅ |

## 🔧 Personalización

Todo el estado se guarda en `localStorage` con la clave `contigo_v2`.
Para conectar dos dispositivos reales, el próximo paso sería agregar
Firebase Realtime Database (igual que StockEz) para sincronizar datos
entre los dos miembros de la pareja.

## 📦 Sin dependencias externas

- Solo Google Fonts (Cormorant Garamond + Nunito)
- Sin frameworks, sin npm, sin build tools
- Funciona offline después de la primera carga
