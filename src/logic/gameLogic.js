/**
 * ========================================================================
 * LÓGICA DEL TRUCO URUGUAYO AUTÉNTICO CON SISTEMA DE MUESTRA
 * ========================================================================
 * 
 * El Truco Uruguayo se diferencia del argentino principalmente por:
 * 1. MUESTRA: Se da vuelta una carta del mazo que determina las "piezas"
 * 2. PIEZAS: Las cartas del mismo número que la muestra se vuelven las más altas
 * 3. ORDEN DINÁMICO: Los valores cambian en cada mano según la muestra
 * 
 * Ejemplo: Si la muestra es un 5:
 * - Los 4 cincos se convierten en las cartas más altas (piezas)
 * - El orden es: 5♠ > 5♣ > 5♥ > 5♦ > 6♠ > 6♣ > 6♥ > 6♦ > ... > 4s
 */

/**
 * Orden de palos de mayor a menor (usado para desempate de cartas del mismo valor)
 */
const SUIT_ORDER = {
  'espadas': 4,  // Espadas es el palo más fuerte
  'bastos': 3,   // Bastos
  'oros': 2,     // Oros
  'copas': 1,    // Copas es el palo más débil
};

/**
 * Valores base de las cartas (1-12, sin 8 y 9)
 * En el truco uruguayo, el orden natural es:
 * 1 > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4
 */
const BASE_CARD_ORDER = [1, 2, 3, 12, 11, 10, 7, 6, 5, 4];


/**
 * Crear baraja española completa (40 cartas)
 */
export const createDeck = () => {
  const suits = ['espadas', 'bastos', 'oros', 'copas'];
  const values = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; // Sin 8 y 9
  const deck = [];

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });

  return deck;
};

/**
 * Mezclar baraja (algoritmo Fisher-Yates)
 */
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Repartir cartas y definir muestra
 * En el truco uruguayo:
 * - Se reparten 3 cartas a cada jugador (total 12 cartas)
 * - Se da vuelta la carta 13 como MUESTRA
 * - Las cartas del mismo número que la muestra se vuelven "piezas" (las más altas)
 * 
 * @returns {Object} - Cartas de cada jugador y la muestra
 */
export const dealCardsWithMuestra = () => {
  const deck = createDeck();
  const shuffled = shuffleDeck(deck);
  
  return {
    player1: shuffled.slice(0, 3),
    player2: shuffled.slice(3, 6),
    player3: shuffled.slice(6, 9),
    player4: shuffled.slice(9, 12),
    muestra: shuffled[12], // La carta 13 es la muestra
  };
};

/**
 * Calcular el valor de una carta según la muestra
 * 
 * En el Truco Uruguayo con muestra:
 * 1. Las 4 cartas del mismo número que la muestra son las PIEZAS (más altas)
 *    - Orden de piezas: Espadas > Bastos > Oros > Copas
 * 
 * 2. Luego siguen las cartas en orden descendente desde la siguiente a la muestra
 *    - Si muestra es 5: las piezas son los 5, luego vienen 6, 7, 10, 11, 12, 1, 2, 3, 4
 * 
 * 3. Dentro de cada valor, el orden de palos es: Espadas > Bastos > Oros > Copas
 * 
 * @param {Object} card - Carta a evaluar
 * @param {Object} muestra - Carta muestra
 * @returns {number} - Valor numérico para comparación (mayor = más fuerte)
 */
export const getCardValueWithMuestra = (card, muestra) => {
  // Las piezas son las cartas del mismo número que la muestra
  const isPieza = card.value === muestra.value;
  
  if (isPieza) {
    // Las piezas son las más altas, ordenadas por palo
    // Valor base 1000 + orden del palo
    return 1000 + SUIT_ORDER[card.suit];
  }
  
  // Para las cartas que no son piezas, calculamos su posición
  // El orden comienza desde el número siguiente a la muestra
  
  // Encontrar la posición de la muestra en el orden base
  const muestraIndex = BASE_CARD_ORDER.indexOf(muestra.value);
  
  // Crear orden rotado: empieza desde el siguiente a la muestra
  const rotatedOrder = [
    ...BASE_CARD_ORDER.slice(muestraIndex + 1),
    ...BASE_CARD_ORDER.slice(0, muestraIndex)
  ];
  
  // Encontrar posición de la carta actual
  const cardPosition = rotatedOrder.indexOf(card.value);
  
  // Calcular valor: posición invertida (mayor índice = menor valor) + palo
  // Multiplicamos por 10 para dar espacio a los palos
  const positionValue = (rotatedOrder.length - cardPosition) * 10;
  
  return positionValue + SUIT_ORDER[card.suit];
};

/**
 * Comparar dos cartas según la muestra
 * 
 * @param {Object} card1 - Primera carta
 * @param {Object} card2 - Segunda carta
 * @param {Object} muestra - Carta muestra
 * @returns {number} - 1 si card1 gana, -1 si card2 gana, 0 si empatan (parda)
 */
export const compareCards = (card1, card2, muestra) => {
  const value1 = getCardValueWithMuestra(card1, muestra);
  const value2 = getCardValueWithMuestra(card2, muestra);
  
  if (value1 > value2) return 1;
  if (value1 < value2) return -1;
  return 0; // Parda (empate) - no debería ocurrir con 40 cartas diferentes
};

/**
 * Obtener nombre legible de una carta
 */
export const getCardName = (card) => {
  const suitNames = {
    'espadas': '♠️',
    'bastos': '♣️',
    'oros': '♦️',
    'copas': '♥️',
  };
  
  const valueNames = {
    1: 'As',
    2: 'Dos',
    3: 'Tres',
    4: 'Cuatro',
    5: 'Cinco',
    6: 'Seis',
    7: 'Siete',
    10: 'Sota',
    11: 'Caballo',
    12: 'Rey',
  };
  
  return `${valueNames[card.value]} de ${card.suit} ${suitNames[card.suit]}`;
};


/**
 * Evaluar una mano (ronda) jugada
 * @param {Array} playedCards - Array de { playerId, card, team }
 * @param {Object} muestra - Carta muestra
 * @returns {Object} - Ganador de la mano
 */
export const evaluateHand = (playedCards, muestra) => {
  let winner = null;
  let highestCard = null;
  
  playedCards.forEach((play) => {
    if (!highestCard || compareCards(play.card, highestCard.card, muestra) === 1) {
      highestCard = play;
      winner = play;
    }
  });
  
  return winner;
};

/**
 * Calcular puntos de Envido (NO cambia con la muestra)
 * El envido se calcula sumando las dos cartas más altas del mismo palo + 20
 * Si no tiene dos del mismo palo, el envido es la carta más alta del palo
 * Las figuras (10, 11, 12) valen 0 para el envido
 */
export const calculateEnvido = (cards) => {
  const cardsBySuit = {
    espadas: [],
    bastos: [],
    oros: [],
    copas: [],
  };
  
  // Agrupar cartas por palo
  cards.forEach(card => {
    cardsBySuit[card.suit].push(card);
  });
  
  let maxEnvido = 0;
  
  // Calcular envido por cada palo
  Object.keys(cardsBySuit).forEach(suit => {
    const suitCards = cardsBySuit[suit];
    
    if (suitCards.length >= 2) {
      // Ordenar cartas del palo de mayor a menor (para envido)
      const sorted = suitCards.sort((a, b) => {
        const valueA = a.value >= 10 ? 0 : a.value;
        const valueB = b.value >= 10 ? 0 : b.value;
        return valueB - valueA;
      });
      
      // Sumar las dos más altas + 20
      const val1 = sorted[0].value >= 10 ? 0 : sorted[0].value;
      const val2 = sorted[1].value >= 10 ? 0 : sorted[1].value;
      const envido = val1 + val2 + 20;
      
      maxEnvido = Math.max(maxEnvido, envido);
    } else if (suitCards.length === 1) {
      // Solo una carta del palo
      const val = suitCards[0].value >= 10 ? 0 : suitCards[0].value;
      maxEnvido = Math.max(maxEnvido, val);
    }
  });
  
  return maxEnvido;
};

/**
 * Verificar si un jugador tiene Flor
 * La flor es tener las 3 cartas del mismo palo
 */
export const hasFlor = (cards) => {
  if (cards.length !== 3) return false;
  
  const firstSuit = cards[0].suit;
  return cards.every(card => card.suit === firstSuit);
};

/**
 * Calcular puntos de Flor
 * Similar al envido pero con las 3 cartas (figuras valen 0)
 */
export const calculateFlor = (cards) => {
  if (!hasFlor(cards)) return 0;
  
  let total = 20;
  cards.forEach(card => {
    const val = card.value >= 10 ? 0 : card.value;
    total += val;
  });
  
  return total;
};

/**
 * Evaluar una ronda completa (3 manos)
 * En el truco se juega al "mejor de 3"
 * - Ganar 2 manos = ganar la ronda
 * - Parda (empate) no se cuenta
 * - Ganar 1ra mano y pardar las otras 2 = gana quien ganó la 1ra
 */
export const evaluateRound = (hands, muestra) => {
  // hands es un array de 3 elementos, cada uno con las 4 cartas jugadas
  let team1Wins = 0;
  let team2Wins = 0;
  let firstWinner = null;
  
  hands.forEach((hand, index) => {
    const winner = evaluateHand(hand, muestra);
    
    if (winner) {
      if (index === 0) {
        firstWinner = winner.team;
      }
      
      if (winner.team === 'team1') {
        team1Wins++;
      } else {
        team2Wins++;
      }
    }
  });
  
  // Determinar ganador
  if (team1Wins > team2Wins) {
    return { winner: 'team1', points: 1 };
  } else if (team2Wins > team1Wins) {
    return { winner: 'team2', points: 1 };
  } else {
    // Empate en manos ganadas - gana quien ganó la primera
    return { winner: firstWinner, points: 1 };
  }
};

/**
 * Verificar si hay un ganador de la partida
 */
export const checkWinner = (team1Score, team2Score, maxPoints) => {
  if (team1Score >= maxPoints) return 'team1';
  if (team2Score >= maxPoints) return 'team2';
  return null;
};

/**
 * Puntos según los cantos (igual que en truco argentino)
 */
export const CALL_POINTS = {
  envido: 2,
  realEnvido: 3,
  faltaEnvido: 0, // Se calcula según lo que falta
  truco: 2,
  retruco: 3,
  valeCuatro: 4,
  flor: 3,
  contraflor: 4,
  contraflorAlResto: 0, // Se calcula según lo que falta
};

/**
 * Validar si un canto es válido en el momento actual
 */
export const validateCall = (gameState, callType) => {
  const { currentCall, round, handsPlayed } = gameState;
  
  // Envido solo se puede cantar antes de jugar la segunda carta
  if (['envido', 'realEnvido', 'faltaEnvido'].includes(callType)) {
    return handsPlayed === 0;
  }
  
  // Truco se puede cantar en cualquier momento
  if (callType === 'truco') {
    return !currentCall || !currentCall.startsWith('truco');
  }
  
  // Retruco solo después de truco
  if (callType === 'retruco') {
    return currentCall === 'truco';
  }
  
  // Vale cuatro solo después de retruco
  if (callType === 'valeCuatro') {
    return currentCall === 'retruco';
  }
  
  return true;
};

/**
 * Ejemplo de uso y testing
 */
export const testMuestraSystem = () => {
  const deal = dealCardsWithMuestra();
  
  console.log('=== TRUCO URUGUAYO - SISTEMA DE MUESTRA ===');
  console.log('Muestra:', getCardName(deal.muestra));
  console.log('\nPiezas (cartas más altas):');
  
  // Mostrar las 4 piezas en orden
  const suits = ['espadas', 'bastos', 'oros', 'copas'];
  suits.forEach(suit => {
    const pieza = { suit, value: deal.muestra.value };
    console.log(`  ${getCardName(pieza)} - Valor: ${getCardValueWithMuestra(pieza, deal.muestra)}`);
  });
  
  console.log('\nCartas del Jugador 1:');
  deal.player1.forEach(card => {
    console.log(`  ${getCardName(card)} - Valor: ${getCardValueWithMuestra(card, deal.muestra)}`);
  });
  
  return deal;
};

export default {
  createDeck,
  shuffleDeck,
  dealCardsWithMuestra,
  compareCards,
  evaluateHand,
  calculateEnvido,
  hasFlor,
  calculateFlor,
  evaluateRound,
  checkWinner,
  validateCall,
  getCardValueWithMuestra,
  getCardName,
  testMuestraSystem,
  CALL_POINTS,
};
