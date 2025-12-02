# 📋 Lista de Verificación - Truco Yorugua

Usa esta lista para asegurarte de que todo está configurado correctamente.

## ✅ Instalación Básica

- [ ] Node.js instalado (v14+)
- [ ] npm instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Expo Go instalado en tu móvil

## ✅ Configuración de Firebase

- [ ] Proyecto creado en Firebase Console
- [ ] Authentication habilitado (Email/Password)
- [ ] Firestore Database creado
- [ ] Reglas de seguridad configuradas
- [ ] Configuración copiada en `src/services/firebase.js`
- [ ] Variables reemplazadas (sin "TU_API_KEY")

## ✅ Assets

- [ ] Logo agregado en `assets/logo.png`
- [ ] Icon.png creado (opcional)
- [ ] Splash.png creado (opcional)
- [ ] Adaptive-icon.png creado (opcional)

## ✅ Primera Ejecución

- [ ] Servidor de desarrollo iniciado (`npm start`)
- [ ] Código QR visible en la terminal
- [ ] App abierta en Expo Go
- [ ] Sin errores en la consola

## ✅ Funcionalidades Básicas

- [ ] Pantalla de splash se muestra
- [ ] Pantalla de login carga correctamente
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Lobby se muestra después del login

## ✅ Funcionalidades del Juego

- [ ] Crear sala funciona
- [ ] Sala aparece en el lobby
- [ ] Unirse a sala funciona
- [ ] Chat funciona
- [ ] Repartir cartas funciona
- [ ] Jugar cartas funciona
- [ ] Cantos funcionan (truco, envido, etc.)
- [ ] Puntajes se actualizan
- [ ] Partida finaliza correctamente
- [ ] Fichas se distribuyen

## ✅ Testing Multijugador

- [ ] 4 jugadores pueden unirse a una sala
- [ ] Turnos se respetan
- [ ] Todos ven las mismas cartas jugadas
- [ ] Chat funciona entre todos
- [ ] Puntajes se sincronizan

## 🐛 Problemas Comunes

### Si algo no funciona:

1. **Limpiar caché:**
   ```powershell
   npx expo start -c
   ```

2. **Reinstalar dependencias:**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

3. **Verificar Firebase:**
   - Revisa la consola de Firebase
   - Verifica las reglas de seguridad
   - Comprueba la configuración en `firebase.js`

4. **Revisar logs:**
   - Terminal de Expo
   - Consola de Chrome DevTools (sacudir el móvil > Debug)

## 📝 Notas de Desarrollo

### Próximas características a implementar:

- [ ] Modo offline con bots
- [ ] Rankings y estadísticas
- [ ] Torneos
- [ ] Personalización de avatares
- [ ] Sonidos y música
- [ ] Notificaciones push
- [ ] Modo espectador
- [ ] Replay de partidas

### Mejoras de UI/UX:

- [ ] Animaciones más fluidas
- [ ] Tutorial interactivo
- [ ] Tooltips explicativos
- [ ] Tema oscuro
- [ ] Localización (ES/EN/PT)

### Optimizaciones técnicas:

- [ ] Optimizar rendimiento
- [ ] Reducir tamaño de bundle
- [ ] Implementar caching
- [ ] Mejorar manejo de errores
- [ ] Tests unitarios
- [ ] Tests de integración

## 🎯 Ready for Production

Antes de publicar:

- [ ] Todas las funcionalidades probadas
- [ ] Sin errores ni warnings
- [ ] Firebase en modo producción
- [ ] Assets optimizados
- [ ] App icons correctos
- [ ] Splash screen correcto
- [ ] Privacidad y términos definidos
- [ ] Build de Android probado
- [ ] Build de iOS probado (si aplica)

---

**Última actualización:** Noviembre 2025
**Versión:** 1.4.0
