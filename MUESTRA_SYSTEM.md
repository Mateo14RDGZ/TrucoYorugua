# 🎴 Sistema de MUESTRA - Truco Uruguayo Auténtico

## 🇺🇾 Diferencia Clave con el Truco Argentino

La principal diferencia entre el **Truco Uruguayo** y el **Truco Argentino** es el **sistema de MUESTRA**.

### ❌ Truco Argentino (NO usado en esta app)
- Las cartas tienen valores **FIJOS**
- Siempre: 1 de Espadas > 1 de Bastos > 7 de Espadas > 7 de Oros...
- No cambia entre manos

### ✅ Truco Uruguayo (IMPLEMENTADO en esta app)
- Se da vuelta una carta del mazo: la **MUESTRA**
- Las cartas del mismo número que la muestra se vuelven **PIEZAS**
- Los valores **CAMBIAN en cada mano**
- Es más dinámico y estratégico

---

## 🔄 Cómo Funciona la Muestra

### Paso 1: Repartir Cartas
1. Se reparten **3 cartas** a cada uno de los 4 jugadores (12 cartas en total)
2. La carta número **13 del mazo se da vuelta** → Esta es la **MUESTRA**

### Paso 2: Determinar las Piezas
Las **4 cartas del mismo número** que la muestra se convierten en las **PIEZAS** (cartas más altas).

**Orden de las piezas:**
- Espadas ♠️ (más fuerte)
- Bastos ♣️
- Oros ♦️
- Copas ♥️ (más débil)

### Paso 3: Orden de las Demás Cartas
El resto de las cartas sigue un orden descendente **comenzando desde el número siguiente** a la muestra.

**Orden base natural:**
```
1 > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4
```

Pero se **rota** según la muestra.

---

## 📊 Ejemplos Detallados

### Ejemplo 1: Muestra es el 5 de Copas ♥️

**Piezas (las 4 más altas):**
1. 🏆 5 de Espadas ♠️
2. 🥈 5 de Bastos ♣️
3. 🥉 5 de Oros ♦️
4. 4️⃣ 5 de Copas ♥️

**Orden completo de las 40 cartas:**
```
Rango  | Cartas (de mayor a menor por palo)
-------|------------------------------------------
1      | 5♠ 5♣ 5♦ 5♥  (PIEZAS)
2      | 6♠ 6♣ 6♦ 6♥
3      | 7♠ 7♣ 7♦ 7♥
4      | 10♠ 10♣ 10♦ 10♥ (Sotas)
5      | 11♠ 11♣ 11♦ 11♥ (Caballos)
6      | 12♠ 12♣ 12♦ 12♥ (Reyes)
7      | 1♠ 1♣ 1♦ 1♥ (Ases)
8      | 2♠ 2♣ 2♦ 2♥
9      | 3♠ 3♣ 3♦ 3♥
10     | 4♠ 4♣ 4♦ 4♥ (las más bajas)
```

**En este ejemplo:**
- El 5 de Espadas ♠️ es la carta más fuerte de todas
- Un 6 de Copas ♥️ le gana a un As de Espadas ♠️
- El 4 de Espadas ♠️ es la carta más débil

---

### Ejemplo 2: Muestra es el 1 de Bastos ♣️ (As)

**Piezas (las 4 más altas):**
1. 🏆 1 de Espadas ♠️
2. 🥈 1 de Bastos ♣️
3. 🥉 1 de Oros ♦️
4. 4️⃣ 1 de Copas ♥️

**Orden completo:**
```
Rango  | Cartas
-------|------------------------------------------
1      | 1♠ 1♣ 1♦ 1♥ (PIEZAS)
2      | 2♠ 2♣ 2♦ 2♥
3      | 3♠ 3♣ 3♦ 3♥
4      | 12♠ 12♣ 12♦ 12♥ (Reyes)
5      | 11♠ 11♣ 11♦ 11♥ (Caballos)
6      | 10♠ 10♣ 10♦ 10♥ (Sotas)
7      | 7♠ 7♣ 7♦ 7♥
8      | 6♠ 6♣ 6♦ 6♥
9      | 5♠ 5♣ 5♦ 5♥
10     | 4♠ 4♣ 4♦ 4♥ (las más bajas)
```

---

### Ejemplo 3: Muestra es el 12 de Oros ♦️ (Rey)

**Piezas (las 4 más altas):**
1. 🏆 12 de Espadas ♠️ (Rey)
2. 🥈 12 de Bastos ♣️ (Rey)
3. 🥉 12 de Oros ♦️ (Rey)
4. 4️⃣ 12 de Copas ♥️ (Rey)

**Orden completo:**
```
Rango  | Cartas
-------|------------------------------------------
1      | 12♠ 12♣ 12♦ 12♥ (PIEZAS - Reyes)
2      | 1♠ 1♣ 1♦ 1♥ (Ases)
3      | 2♠ 2♣ 2♦ 2♥
4      | 3♠ 3♣ 3♦ 3♥
5      | 11♠ 11♣ 11♦ 11♥ (Caballos)
6      | 10♠ 10♣ 10♦ 10♥ (Sotas)
7      | 7♠ 7♣ 7♦ 7♥
8      | 6♠ 6♣ 6♦ 6♥
9      | 5♠ 5♣ 5♦ 5♥
10     | 4♠ 4♣ 4♦ 4♥ (las más bajas)
```

---

## 💡 Estrategia y Táctica

### Ventajas del Sistema de Muestra

1. **Cada mano es diferente** - No hay jugadas memorísticas
2. **Mayor emoción** - Una carta "mala" puede volverse la mejor
3. **Más estrategia** - Hay que adaptarse a cada muestra
4. **Sorpresas constantes** - Los 4s pueden ser piezas!

### Consejos de Juego

1. **Mira la muestra primero** - Antes de evaluar tu mano
2. **Las piezas son oro** - Si tienes una pieza, úsala bien
3. **Calcula el envido rápido** - No cambia con la muestra
4. **Adapta tu estrategia** - Cada muestra requiere un plan diferente

---

## 🎮 En la Aplicación

### Cómo se Muestra

1. Al iniciar la partida, verás un componente **"Muestra"** en la parte superior
2. La carta se muestra con una animación
3. Se indica qué cartas son las **piezas**
4. Se muestra el **orden de palos**: ♠️ > ♣️ > ♦️ > ♥️

### Cómo se Calcula

La aplicación usa la función `getCardValueWithMuestra()` que:
1. Detecta si una carta es pieza
2. Calcula el orden rotado desde la muestra
3. Asigna valores numéricos para comparación
4. Las piezas siempre tienen valor > 1000

---

## 🧪 Probar el Sistema

Puedes probar la lógica de la muestra ejecutando:

```javascript
import { testMuestraSystem } from './src/logic/gameLogic';

// Esto generará una mano aleatoria y mostrará:
// - La muestra
// - Las 4 piezas en orden
// - Las cartas de un jugador con sus valores
testMuestraSystem();
```

---

## 📝 Notas Técnicas

### Implementación en el Código

**Archivo:** `src/logic/gameLogic.js`

**Funciones principales:**
- `dealCardsWithMuestra()` - Reparte cartas y define muestra
- `getCardValueWithMuestra(card, muestra)` - Calcula valor dinámico
- `compareCards(card1, card2, muestra)` - Compara dos cartas

**Constantes:**
- `BASE_CARD_ORDER` - Orden natural: [1, 2, 3, 12, 11, 10, 7, 6, 5, 4]
- `SUIT_ORDER` - Espadas=4, Bastos=3, Oros=2, Copas=1

### Base de Datos (Firestore)

La muestra se guarda en la colección `rooms`:

```javascript
{
  muestra: {
    suit: 'espadas',  // o 'bastos', 'oros', 'copas'
    value: 5          // 1-12 (sin 8 y 9)
  }
}
```

---

## ❓ Preguntas Frecuentes

**P: ¿La muestra cuenta como carta jugable?**
R: No, la muestra solo define las piezas, no se juega.

**P: ¿Cambia la muestra durante la partida?**
R: Sí, en cada nueva mano se reparte y se define una nueva muestra.

**P: ¿El envido cambia con la muestra?**
R: No, el cálculo del envido es siempre igual (figuras valen 0).

**P: ¿Qué pasa si la muestra es un 8 o 9?**
R: Imposible, la baraja española no tiene 8s ni 9s.

**P: ¿Puede haber empate (parda)?**
R: Teóricamente no, porque todas las cartas tienen valores únicos considerando palo y número.

---

## 🏆 ¡A Jugar!

Ahora que entiendes el sistema de muestra del Truco Uruguayo auténtico, ¡estás listo para jugar!

Recuerda: **La muestra lo cambia todo** 🎴🇺🇾
