# Truco Yorugua - Assets

Este directorio contiene todos los assets de la aplicación.

## Imágenes requeridas:

### Logo
- `logo.png` - Logo principal de Truco Yorugua (recomendado: 512x512px)
- Usar el logo proporcionado: Lucid_Origin_Disea_un_logo_profesional_minimalista_y_moderno_p_0.jpg

### App Icons
- `icon.png` - Ícono de la app (1024x1024px)
- `adaptive-icon.png` - Ícono adaptativo Android (1024x1024px)
- `splash.png` - Pantalla de inicio (1242x2436px)
- `favicon.png` - Favicon para web (32x32px)

## Cómo agregar el logo:

1. Copia el archivo del logo a esta carpeta con el nombre `logo.png`
2. Redimensiona si es necesario a 512x512px para mejor calidad
3. Los demás assets se pueden generar automáticamente o crear manualmente

## Generación automática de assets:

Puedes usar herramientas online como:
- https://icon.kitchen/ - Para generar iconos de app
- https://appicon.co/ - Para crear app icons multiplataforma

O ejecutar:
```bash
npx expo-optimize
```

Para optimizar imágenes existentes.

## Nota:
Si no tienes los assets listos, la app funcionará pero mostrará errores en los archivos de configuración.
Puedes comentar temporalmente las referencias a assets en `app.json` para probar la app sin ellos.
