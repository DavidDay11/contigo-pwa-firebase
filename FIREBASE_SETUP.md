# 🔥 Contigo — Firebase Setup

Guía rápida para activar Google Login + sync en tiempo real.

---

## 1. Crear proyecto en Firebase

1. Ir a [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Agregar proyecto"** → nombre: `contigo` → continuar (sin Google Analytics si querés)
3. Esperar que se cree el proyecto

---

## 2. Activar Authentication con Google

1. En el menú lateral: **Build → Authentication**
2. Click **"Comenzar"**
3. En la pestaña **Sign-in method** → click **Google**
4. Activar el toggle → elegir tu correo de soporte → **Guardar**

---

## 3. Crear Realtime Database

1. En el menú lateral: **Build → Realtime Database**
2. Click **"Crear base de datos"**
3. Elegir la región más cercana (para Latinoamérica: `us-central1`)
4. En modo de seguridad: elegir **"Comenzar en modo de prueba"** → Siguiente
   > ⚠️ Luego reemplazamos las reglas (paso 5)

---

## 4. Obtener y copiar la configuración

1. Click en el ⚙️ (engranaje) → **Configuración del proyecto**
2. Bajar hasta **"Tus apps"** → click `</>` (Web)
3. Nombre de la app: `contigo-web` → click **"Registrar app"**
4. Copiar el objeto `firebaseConfig` que aparece
5. Abrir el archivo `config.js` y pegar los valores:

```js
const FB_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "contigo-abc.firebaseapp.com",
  databaseURL:       "https://contigo-abc-default-rtdb.firebaseio.com",
  projectId:         "contigo-abc",
  storageBucket:     "contigo-abc.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123...",
};
```

---

## 5. Reglas de seguridad

En **Realtime Database → Reglas**, reemplazar con:

```json
{
  "rules": {
    "couples": {
      "$coupleId": {
        ".read":  "auth != null && data.child('members').child(auth.uid).exists()",
        ".write": "auth != null && (data.child('members').child(auth.uid).exists() || !data.exists())"
      }
    },
    "userCouples": {
      "$uid": {
        ".read":  "auth.uid === $uid",
        ".write": "auth.uid === $uid"
      }
    },
    "invites": {
      ".read":  "auth != null",
      ".write": "auth != null"
    }
  }
}
```

Click **Publicar**.

---

## 6. Agregar dominio de Netlify a Firebase Auth

1. En **Authentication → Settings → Dominios autorizados**
2. Click **"Agregar dominio"**
3. Pegar tu URL de Netlify: `contigo-tuapp.netlify.app`
4. Guardar

> Si usás dominio propio, agregarlo también.

---

## 7. Deploy en Netlify

Subir **toda la carpeta** tal cual a Netlify (drag & drop o GitHub):

```
contigo/
├── index.html
├── config.js       ← con tus datos de Firebase
├── sw.js
├── manifest.json
├── netlify.toml
└── icons/
```

> ℹ️ A diferencia de StockEz, acá el `config.js` **sí debe estar en el repo/deploy**
> porque solo contiene claves públicas de Firebase (no son secretos del servidor).
> Las reglas de seguridad de Firebase se encargan de proteger los datos.

---

## 8. Cómo usar con tu pareja

1. **Vos**: abrís la app → login con Google → **"Crear sala nueva"** → te aparece un código de 6 letras (ej: `XK9F2A`)
2. **Tu pareja**: abre la app → login con Google → **"Unirme con código"** → ingresa `XK9F2A`
3. ¡Listo! Ambos comparten la misma sala en tiempo real 💕

---

## Estructura en Firebase

```
/couples/{coupleId}/
  data/               ← todo el estado compartido (sync automático)
  latido/             ← latidos en tiempo real 💓
  presence/{uid}/     ← online/offline de cada unx
  members/{uid}/      ← info de cada miembro

/userCouples/{uid}    ← coupleId de cada usuario
/invites/{code}       ← códigos de invitación activos
```

---

## Preguntas frecuentes

**¿Es gratis?**
Sí. El plan Spark (gratuito) de Firebase incluye:
- Auth: gratis sin límite
- Realtime DB: 1 GB almacenamiento, 10 GB/mes transferencia
Para dos personas alcanza de sobra.

**¿Las fotos también se sincronizan?**
Las fotos se guardan solo en el dispositivo (localStorage) por ahora.
Para sincronizar fotos se necesita Firebase Storage — se puede agregar en una futura versión.

**¿Qué pasa si estoy sin internet?**
La app funciona offline con los datos guardados localmente. Cuando volvés a conectarte, se sincroniza automáticamente.
