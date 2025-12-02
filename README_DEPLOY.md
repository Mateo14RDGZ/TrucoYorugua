# 🚀 Guía de Deploy a Vercel - Truco Yorugua PWA

## ✅ Configuración Completada

Tu app ya está lista para deploy con:
- ✅ Expo SDK 54 con Metro Bundler
- ✅ React Native Web configurado
- ✅ Build optimizado para producción
- ✅ Vercel.json configurado
- ✅ PWA con manifest.json

---

## 📋 Pasos para Deploy

### 1. Probar Build Local (Opcional)

```bash
# Build para web
npm run build:web

# Debería crear carpeta dist/ con los archivos estáticos
# Luego renombrar a web-build para Vercel
```

### 2. Crear Repositorio en GitHub

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "feat: Truco Yorugua PWA ready for deploy"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/truco-yorugua.git
git branch -M main
git push -u origin main
```

### 3. Deploy en Vercel

#### Opción A: Desde la Web de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub: `truco-yorugua`
4. Vercel detectará automáticamente la configuración
5. **NO cambies nada**, los settings ya están en `vercel.json`
6. Haz clic en "Deploy"
7. Espera 2-3 minutos
8. ¡Tu app estará en: `https://truco-yorugua.vercel.app`!

#### Opción B: Desde la CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 5. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a:
- Project Settings > Environment Variables

Agrega las siguientes variables (si tienes):
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

**Nota:** La configuración de Firebase ya está hardcodeada en `src/services/firebase.js`, así que esto es opcional.

---

## ✅ Verificación Post-Deploy

Después del deploy, verifica que:

1. ✅ La página carga correctamente
2. ✅ Las imágenes se muestran
3. ✅ Firebase conecta correctamente
4. ✅ La autenticación funciona
5. ✅ Se puede crear y unirse a salas
6. ✅ El chat funciona en tiempo real
7. ✅ El juego funciona correctamente

---

## 📱 PWA - Instalación en Móvil

Una vez desplegado, los usuarios pueden:

1. Abrir la web en el navegador del celular
2. Ver el mensaje "Agregar a pantalla de inicio"
3. Instalar como app nativa
4. Usar sin conexión (gracias al Service Worker)

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local web
npm run web

# Build para web
npm run build:web

# Limpiar y rebuild
rm -rf dist .expo node_modules/.cache
npm run build:web

# Ver logs de Vercel
vercel logs
```

---

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm run build:web` localmente para ver el error exacto

### Error: "Module not found"
- Asegúrate de que `react-native-web` y `react-dom` estén instalados
- Ejecuta `npm install`

### La app no carga en móvil
- Verifica que la URL sea HTTPS (Vercel lo hace automáticamente)
- Revisa la consola del navegador para errores

### Firebase no conecta
- Verifica que las reglas de Firestore permitan acceso web
- Verifica que el dominio de Vercel esté en la lista blanca de Firebase

---

## 📊 Características de la PWA

✅ **Responsive Design** - Se adapta a cualquier pantalla  
✅ **Offline Support** - Funciona sin conexión (caché)  
✅ **Instalable** - Se puede agregar a la pantalla de inicio  
✅ **Rápida** - Optimizada con Metro bundler  
✅ **Segura** - HTTPS por defecto con Vercel  
✅ **SEO Friendly** - Meta tags configurados  

---

## 🎯 Next Steps

Después del primer deploy:

1. Configura dominio personalizado (opcional)
2. Configura analytics (Google Analytics, etc.)
3. Prueba en múltiples dispositivos
4. Comparte la URL con amigos para probar multiplayer

---

## 📝 Notas Importantes

- **Vercel es gratis** para proyectos personales
- Los deploys son **automáticos** cada vez que hagas push a main
- Vercel genera **preview URLs** para cada branch
- La configuración de PWA está en `app.json` y `public/manifest.json`

---

**¡Tu app de Truco Yorugua está lista para el mundo! 🇺🇾🎴**
