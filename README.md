# 🎴 Truco Yorugua

Aplicación web progresiva (PWA) del tradicional juego de cartas uruguayo **Truco** con sistema de muestra auténtico.

![Version](https://img.shields.io/badge/version-1.4.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)

## 🎯 Características

- **Sistema de Muestra Auténtico**: Las cartas más altas cambian en cada mano según la carta volteada
- **4 Jugadores**: Juega contra 3 bots inteligentes en equipos de 2v2
- **Reglas Completas**: Truco, Re Truco, Vale Cuatro, Envido
- **Interfaz Uruguaya**: Diseño con los colores de la bandera uruguaya
- **PWA**: Funciona como aplicación web en cualquier dispositivo

## 🎮 Cómo Jugar

### El Sistema de Muestra

En el Truco Uruguayo, la carta #13 (después de repartir 3 a cada jugador) se voltea y determina las **piezas** - las 4 cartas más altas del juego. Por ejemplo:
- Si la muestra es **5♥**, las piezas son: **5♠ > 5♣ > 5♦ > 5♥**
- El resto de cartas siguen un orden dinámico desde el 6 en adelante

### Orden Base de Cartas
1 > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4

### Orden de Palos
Espadas ♠ > Bastos ♣ > Oros ♦ > Copas ♥

### Cantos
- **Truco**: 2 puntos
- **Re Truco**: 3 puntos  
- **Vale Cuatro**: 4 puntos
- **Envido**: 2 puntos (suma de 2 cartas del mismo palo + 20)

### Victoria
El primer equipo en llegar a **30 puntos** gana el juego.

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Mateo14RDGZ/TrucoYorugua.git
cd TrucoYorugua

# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar en modo desarrollo
npm start

# Build para web
npm run build:web
```

## 🌐 Despliegue en Vercel

El proyecto está configurado para desplegarse automáticamente en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. El build se ejecutará automáticamente con `npm run vercel-build`
3. La app estará disponible en tu dominio de Vercel

### Configuración de Vercel

```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "web-build"
}
```

## 📁 Estructura del Proyecto

```
TrucoYorugua1.4/
├── App.js                      # Navegación principal
├── src/
│   └── screens/
│       ├── HomeScreen.js       # Pantalla de inicio
│       ├── GameScreen.js       # Juego completo del Truco
│       └── RulesScreen.js      # Explicación de las reglas
├── vercel.json                 # Configuración de Vercel
├── package.json                # Dependencias
└── README.md                   # Este archivo
```

## 🛠️ Tecnologías

- **Expo SDK 54**: Framework principal
- **React Native 0.81.5**: Desarrollo móvil/web
- **React Native Web**: Renderizado web
- **React Navigation 6**: Navegación entre pantallas
- **React Native Paper**: Componentes UI
- **Expo Linear Gradient**: Gradientes uruguayos
- **React Native Animatable**: Animaciones fluidas

## 📝 Scripts Disponibles

```bash
npm start          # Inicia Expo en modo desarrollo
npm run build:web  # Exporta la app para web (crea dist/)
npm run vercel-build # Build para Vercel (crea web-build/)
```

## 🎨 Colores Uruguayos

```javascript
colors: ['#0038A8', '#74ACDF', '#FFFFFF']  // Azul oscuro, celeste, blanco
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor

**Mateo Rodriguez**
- GitHub: [@Mateo14RDGZ](https://github.com/Mateo14RDGZ)

## 🎉 Agradecimientos

- A todos los jugadores de Truco uruguayo que mantienen viva esta tradición
- A la comunidad de React Native y Expo por las herramientas excepcionales

---

<div align="center">
  <p>🇺🇾 <strong>Hecho en Uruguay</strong> 🇺🇾</p>
  <p><em>¡Que gane el mejor!</em> 🎴</p>
</div>
