# 🎴 Truco Yorugua

<div align="center">

![Truco Yorugua Logo](assets/logo-placeholder.txt)

**La mejor app para jugar al Truco Uruguayo online 🇺🇾**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange.svg)](https://firebase.google.com/)

[Características](#-características) • [Instalación](#-instalación-rápida) • [Tecnologías](#-tecnologías) • [Reglas](#-reglas-del-truco-uruguayo) • [Documentación](#-documentación)

</div>

---

## 🚀 Características

### 🎮 Juego Completo
- ✅ **Truco Uruguayo auténtico** - Implementación fiel del reglamento
- 🎴 **Baraja española** - 40 cartas con valores correctos
- 👥 **Multijugador 2v2** - Juega con amigos o desconocidos
- 🔄 **Tiempo real** - Sincronización instantánea con Firebase
- 🏆 **Sistema de puntos** - Partidas de 10, 20, 30, 40 o 50 puntos

### 💰 Sistema de Fichas
- 💵 **Fichas virtuales** - Empieza con 1000 fichas gratis
- � **Apuestas** - Elige cuánto apostar por partida
- 📊 **Estadísticas** - Rastrea tus victorias y derrotas

### 🎨 Interfaz Moderna
- 🇺🇾 **Colores uruguayos** - Azul, blanco y amarillo
- ✨ **Animaciones fluidas** - Experiencia visual atractiva
- 📱 **Diseño responsive** - Funciona en todos los tamaños de pantalla
- 🌙 **UI profesional** - Basada en Material Design

### 🏠 Salas y Lobby
- 🚪 **Crear salas** - Personaliza nombre, puntos y apuesta
- 👀 **Ver salas disponibles** - Lista en tiempo real
- 🔒 **Salas privadas** - Juega solo con amigos
- 💬 **Chat integrado** - Comunícate con tu equipo

## �️ Tecnologías

### Frontend
- **React Native 0.74** - Framework móvil multiplataforma
- **Expo 51.0** - Toolchain y servicios
- **React Navigation 6** - Navegación entre pantallas
- **React Native Paper 5** - Componentes UI Material Design
- **Expo Linear Gradient** - Gradientes modernos
- **React Native Animatable** - Animaciones predefinidas

### Backend
- **Firebase Authentication** - Gestión de usuarios
- **Cloud Firestore** - Base de datos en tiempo real
- **Firebase Realtime Sync** - Sincronización instantánea

### Herramientas
- **Expo Go** - Testing en dispositivos reales
- **Metro Bundler** - Empaquetado de JavaScript

## ⚡ Instalación Rápida

### Método 1: Script Automático (PowerShell)

```powershell
# Ejecutar script de inicio
.\start.ps1
```

### Método 2: Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Firebase (ver FIREBASE_SETUP.md)
# Editar src/services/firebase.js con tu configuración

# 3. Agregar logo
# Copiar logo.png a la carpeta assets/

# 4. Iniciar servidor
npm start

# 5. Escanear QR con Expo Go
```

📖 **Documentación completa:** Ver [INSTALLATION.md](INSTALLATION.md)

## 📖 Reglas del Truco Uruguayo

El Truco Uruguayo es un juego de cartas tradicional que se juega con **baraja española de 40 cartas** en equipos de **2 vs 2**.

### 🎯 Objetivo
Ser el primer equipo en alcanzar los puntos acordados (10, 20, 30, 40 o 50).

### � Sistema de MUESTRA (Diferencia clave con el truco argentino)

**La característica más importante del Truco Uruguayo es la MUESTRA:**

1. **Después de repartir** las 3 cartas a cada jugador, se **da vuelta la carta siguiente del mazo**
2. Esta carta es la **MUESTRA** y determina cuáles son las **PIEZAS**
3. **Las PIEZAS** son las 4 cartas del mismo número que la muestra y se convierten en las **cartas más altas**

**Ejemplo:**
```
Si la MUESTRA es el 5 de Copas ♥️
Entonces las PIEZAS son:
  1. 5 de Espadas ♠️  (la más alta)
  2. 5 de Bastos ♣️
  3. 5 de Oros ♦️
  4. 5 de Copas ♥️
```

### 🃏 Jerarquía de Cartas (CAMBIA en cada mano según la muestra)

**Orden de las Piezas (siempre las más altas):**
- Espadas ♠️ > Bastos ♣️ > Oros ♦️ > Copas ♥️

**Luego siguen las demás cartas en orden descendente:**

Si la muestra es un **5**, el orden completo es:
1. 🔴 **Piezas:** 5♠️ > 5♣️ > 5♦️ > 5♥️
2. 6♠️ > 6♣️ > 6♦️ > 6♥️
3. 7♠️ > 7♣️ > 7♦️ > 7♥️
4. 10♠️ > 10♣️ > 10♦️ > 10♥️ (Sotas)
5. 11♠️ > 11♣️ > 11♦️ > 11♥️ (Caballos)
6. 12♠️ > 12♣️ > 12♦️ > 12♥️ (Reyes)
7. 1♠️ > 1♣️ > 1♦️ > 1♥️ (Ases)
8. 2♠️ > 2♣️ > 2♦️ > 2♥️
9. 3♠️ > 3♣️ > 3♦️ > 3♥️
10. 4♠️ > 4♣️ > 4♦️ > 4♥️ (las más bajas)

**El orden base natural es:** 1 > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4

Pero **se rota** comenzando desde el número siguiente a la muestra.

### 🎲 Cantos y Puntos

#### Envido
- **Envido:** 2 puntos
- **Real Envido:** 3 puntos
- **Falta Envido:** Lo que le falta al equipo perdedor para ganar

#### Truco
- **Truco:** 2 puntos
- **Retruco:** 3 puntos
- **Vale Cuatro:** 4 puntos

#### Flor
- **Flor:** 3 puntos (tener 3 cartas del mismo palo)
- **Contraflor:** 4 puntos
- **Contraflor al resto:** Puntos restantes

### 🎮 Mecánica del Juego

1. Se reparten **3 cartas** a cada jugador
2. Se juega al **mejor de 3 manos**
3. El equipo que gana **2 de 3 manos** gana la ronda
4. **Parda** = empate (no se cuenta)
5. Primer equipo en llegar a los puntos acordados **gana**

## 📁 Estructura del Proyecto

```
truco-yorugua/
├── src/
│   ├── screens/         # 7 pantallas principales
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── LobbyScreen.js
│   │   ├── CreateRoomScreen.js
│   │   ├── GameScreen.js
│   │   └── ResultsScreen.js
│   ├── components/      # Componentes reutilizables
│   │   ├── AvatarSelector.js
│   │   ├── Card.js
│   │   ├── GameTable.js
│   │   ├── PlayerHand.js
│   │   ├── GameActions.js
│   │   ├── ChatPanel.js
│   │   └── PlayedCard.js
│   ├── logic/          # Lógica del Truco
│   │   └── gameLogic.js
│   ├── services/       # Firebase y servicios
│   │   ├── firebase.js
│   │   ├── roomService.js
│   │   ├── gameService.js
│   │   └── chatService.js
│   ├── context/        # Estado global
│   │   └── AuthContext.js
│   ├── theme/          # Estilos y colores
│   │   └── theme.js
│   └── utils/          # Utilidades
│       ├── helpers.js
│       └── constants.js
├── assets/             # Imágenes y recursos
│   └── logo.png
├── App.js             # Punto de entrada
├── package.json       # Dependencias
└── app.json          # Configuración Expo
```

## 📚 Documentación

- 📖 [Guía de Instalación](INSTALLATION.md) - Instrucciones paso a paso
- 🔥 [Configuración de Firebase](FIREBASE_SETUP.md) - Setup completo
- ✅ [Lista de Verificación](CHECKLIST.md) - Checklist de desarrollo
- 🎨 [Assets README](assets/README.md) - Información sobre recursos

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## � Reportar Bugs

Si encuentras un bug, por favor [abre un issue](../../issues) con:
- Descripción del problema
- Pasos para reproducir
- Capturas de pantalla (si aplica)
- Versión del dispositivo/OS

## 📞 Soporte

¿Necesitas ayuda?
- 📖 Consulta la [documentación](INSTALLATION.md)
- 🐛 Reporta [bugs e issues](../../issues)
- 💬 Únete a nuestra comunidad (próximamente)

## 👥 Créditos

**Desarrollado con ❤️ para la comunidad uruguaya de Truco 🇺🇾**

- Diseño del logo: Proporcionado por el usuario
- Framework: React Native & Expo
- Backend: Firebase
- Inspiración: El auténtico Truco Uruguayo

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**¡Que gane el mejor equipo! 🏆**

Hecho con 🧉 en Uruguay

</div>
