# 🚀 Guía de Instalación y Ejecución - Truco Yorugua

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
  - Descarga desde: https://nodejs.org/
  - Verifica con: `node --version`

- **npm** (viene con Node.js)
  - Verifica con: `npm --version`

- **Expo Go** (en tu teléfono móvil)
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
  - iOS: https://apps.apple.com/app/expo-go/id982107779

## Paso 1: Instalar dependencias

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
```

Este comando instalará todas las dependencias necesarias (React Native, Firebase, etc.)

## Paso 2: Configurar Firebase

**IMPORTANTE:** La app no funcionará sin configurar Firebase primero.

1. Sigue la guía completa en el archivo `FIREBASE_SETUP.md`
2. Crea un proyecto en Firebase Console
3. Habilita Authentication y Firestore
4. Copia tu configuración en `src/services/firebase.js`

## Paso 3: Agregar el logo

1. Copia el logo proporcionado (`Lucid_Origin_Disea_un_logo_profesional_minimalista_y_moderno_p_0.jpg`)
2. Renómbralo a `logo.png`
3. Colócalo en la carpeta `assets/`

Para los demás assets (icon.png, splash.png, etc.), puedes:
- Crear versiones del logo en diferentes tamaños
- Usar herramientas online como https://icon.kitchen/
- O comentar temporalmente las referencias en `app.json` para probar

## Paso 4: Iniciar el servidor de desarrollo

En PowerShell, ejecuta:

```powershell
npm start
```

Esto iniciará el servidor de Expo. Verás algo como:

```
› Metro waiting on exp://192.168.1.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

## Paso 5: Ejecutar en tu móvil

### En Android:
1. Abre la app **Expo Go**
2. Toca "Scan QR code"
3. Escanea el código QR que aparece en la terminal

### En iOS:
1. Abre la app **Cámara**
2. Apunta al código QR
3. Toca la notificación que aparece para abrir en Expo Go

### Alternativa - Ejecutar en simulador:

**Android Emulator:**
```powershell
npm run android
```

**iOS Simulator (solo Mac):**
```powershell
npm run ios
```

## Paso 6: Probar la aplicación

1. **Registro:** Crea una cuenta con email y contraseña
2. **Lobby:** Verás la lista de salas (estará vacía al inicio)
3. **Crear sala:** Toca el botón "+" para crear tu primera sala
4. **Invitar amigos:** Comparte el código de la sala con otros jugadores

## Comandos útiles

```powershell
# Iniciar servidor de desarrollo
npm start

# Limpiar caché si hay problemas
npx expo start -c

# Ver logs en tiempo real
npm start -- --clear

# Verificar errores
npm run web  # Abre versión web para debugging
```

## Solución de problemas comunes

### Error: "Module not found"
```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

### Error: "Firebase not configured"
- Verifica que completaste la configuración de Firebase
- Revisa el archivo `src/services/firebase.js`

### Error: "Unable to resolve module"
```powershell
# Limpiar caché de Metro bundler
npx expo start -c
```

### Error en assets (logo.png not found)
- Agrega el logo en la carpeta `assets/`
- O comenta temporalmente las referencias en `app.json`

### No aparece el código QR
- Presiona la tecla `r` para recargar
- Presiona la tecla `c` para limpiar caché y recargar

## Estructura del proyecto

```
truco-yorugua/
├── src/
│   ├── screens/          # Pantallas de la app
│   ├── components/       # Componentes reutilizables
│   ├── logic/           # Lógica del juego de Truco
│   ├── services/        # Servicios de Firebase
│   ├── context/         # Context API (Auth)
│   ├── theme/           # Colores y estilos
│   └── utils/           # Utilidades
├── assets/              # Imágenes y recursos
├── App.js              # Punto de entrada
├── package.json        # Dependencias
└── app.json           # Configuración de Expo
```

## Desarrollo

### Modo de desarrollo rápido

1. Activa "Fast Refresh" para ver cambios instantáneamente
2. Usa `console.log()` para debug
3. Sacude el teléfono para abrir el menú de desarrollo

### Testing con múltiples jugadores

Para probar el juego completo necesitas 4 jugadores:

1. Ejecuta la app en 4 dispositivos diferentes
2. O usa navegadores diferentes en modo incógnito para la versión web
3. O usa el Android Emulator + dispositivo físico

## Despliegue

### Crear build para Android (APK)

```powershell
eas build -p android --profile preview
```

### Crear build para iOS (IPA)

```powershell
eas build -p ios --profile preview
```

*Nota: Requiere cuenta de desarrollador de Apple para iOS*

## Siguientes pasos

1. ✅ Instalar dependencias
2. ✅ Configurar Firebase
3. ✅ Agregar logo
4. ✅ Probar registro y login
5. ✅ Crear primera sala
6. ✅ Invitar amigos a jugar

## Recursos adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de Firebase](https://firebase.google.com/docs)
- [Reglas del Truco Uruguayo](README.md)

## Soporte

Si encuentras algún problema:
1. Revisa esta guía de instalación
2. Consulta `FIREBASE_SETUP.md` para problemas de Firebase
3. Verifica los logs en la terminal
4. Limpia caché con `npx expo start -c`

¡Disfruta jugando al Truco Yorugua! 🎴🇺🇾
