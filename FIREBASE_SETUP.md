# 🔥 Configuración de Firebase para Truco Yorugua

## Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombre del proyecto: "Truco Yorugua" (o el que prefieras)
4. Acepta los términos y crea el proyecto

## Paso 2: Configurar Authentication

1. En el menú lateral, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Habilita "Email/Password" como método de inicio de sesión
4. Guarda los cambios

## Paso 3: Configurar Firestore Database

1. En el menú lateral, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige la ubicación más cercana (ej: southamerica-east1 para Uruguay)
5. Haz clic en "Habilitar"

### Reglas de seguridad (recomendadas para producción):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regla para usuarios
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Regla para salas
    match /rooms/{roomId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        request.auth.uid in resource.data.players[].id;
      allow delete: if request.auth.uid == resource.data.createdBy;
      
      // Mensajes dentro de las salas
      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
    }
    
    // Regla para partidas
    match /games/{gameId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Paso 4: Obtener configuración de Firebase

1. En la consola de Firebase, haz clic en el ícono de engranaje ⚙️
2. Selecciona "Configuración del proyecto"
3. Desplázate hacia abajo hasta "Tus aplicaciones"
4. Haz clic en el ícono `</>` (Web)
5. Registra tu app con un nombre (ej: "Truco Yorugua Web")
6. Copia la configuración que aparece

## Paso 5: Agregar configuración a la app

1. Abre el archivo `src/services/firebase.js`
2. Reemplaza el objeto `firebaseConfig` con tu configuración:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Paso 6: Estructura de la base de datos

Firebase creará automáticamente estas colecciones cuando uses la app:

### Colección: `users`
```
users/{userId}
  - username: string
  - avatar: string
  - chips: number
  - gamesPlayed: number
  - gamesWon: number
  - createdAt: timestamp
```

### Colección: `rooms`
```
rooms/{roomId}
  - name: string
  - maxPoints: number
  - bet: number
  - createdBy: string
  - players: array
  - team1Score: number
  - team2Score: number
  - status: string
  - currentPlayer: number
  - muestra: object              # ⭐ CARTA MUESTRA (define las piezas)
    - suit: string               # espadas, bastos, oros, copas
    - value: number              # 1-12 (sin 8 y 9)
  - playerCards: object          # Cartas de cada jugador
    - 0: array                   # 3 cartas del jugador 1
    - 1: array                   # 3 cartas del jugador 2
    - 2: array                   # 3 cartas del jugador 3
    - 3: array                   # 3 cartas del jugador 4
  - playedCards: array
  - currentCall: string
  - handsPlayed: number
  - createdAt: timestamp
  
  Subcolección: messages/{messageId}
    - userId: string
    - username: string
    - text: string
    - timestamp: timestamp
```

### Colección: `games`
```
games/{gameId}
  - roomId: string
  - status: string
  - currentPlayer: number
  - round: number
  - createdAt: timestamp
```

## Paso 7: Índices compuestos (opcional)

Si Firebase te solicita crear índices, sigue los enlaces que aparezcan en los errores o crea estos índices manualmente:

1. Ve a Firestore Database > Índices
2. Crea estos índices compuestos:
   - Colección: `rooms`
     - Campos: `status` (Ascending), `createdAt` (Descending)

## Paso 8: Verificar configuración

1. Ejecuta la app: `npm start`
2. Intenta registrarte con un email de prueba
3. Ve a la consola de Firebase y verifica que:
   - Aparezca el usuario en Authentication
   - Se haya creado su documento en Firestore > users

## ¡Listo! 🎉

Tu app ahora está conectada a Firebase y lista para funcionar.

## Solución de problemas

### Error: "Firebase not configured"
- Verifica que copiaste correctamente la configuración en `src/services/firebase.js`

### Error: "Permission denied"
- Verifica que las reglas de Firestore permitan la operación
- Para desarrollo, usa las reglas en "modo de prueba"

### Error: "Network request failed"
- Verifica tu conexión a internet
- Asegúrate de que Firebase esté habilitado para tu proyecto

## Recursos adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Guía de Firestore](https://firebase.google.com/docs/firestore)
- [Firebase con React Native](https://rnfirebase.io/)
