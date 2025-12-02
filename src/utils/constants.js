/**
 * Constantes de la aplicación
 */

// Configuración del juego
export const GAME_CONFIG = {
  INITIAL_CHIPS: 1000,
  MIN_BET: 10,
  MAX_BET: 500,
  POINT_OPTIONS: [10, 20, 30, 40, 50],
  BET_OPTIONS: [10, 50, 100, 250, 500],
  MAX_PLAYERS: 4,
  CARDS_PER_PLAYER: 3,
};

// Estados del juego
export const GAME_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished',
  CANCELLED: 'cancelled',
};

// Tipos de cantos
export const CALL_TYPES = {
  ENVIDO: 'envido',
  REAL_ENVIDO: 'realEnvido',
  FALTA_ENVIDO: 'faltaEnvido',
  TRUCO: 'truco',
  RETRUCO: 'retruco',
  VALE_CUATRO: 'valeCuatro',
  FLOR: 'flor',
  CONTRAFLOR: 'contraflor',
  CONTRAFLOR_AL_RESTO: 'contraflorAlResto',
  MAZO: 'mazo',
};

// Respuestas a cantos
export const CALL_RESPONSES = {
  ACCEPT: 'accept',
  REJECT: 'reject',
  RAISE: 'raise',
};

// Palos de la baraja
export const SUITS = {
  ESPADAS: 'espadas',
  BASTOS: 'bastos',
  OROS: 'oros',
  COPAS: 'copas',
};

// Mensajes predefinidos del chat
export const CHAT_MESSAGES = [
  '¡Buena jugada!',
  '¡Vamos equipo!',
  'Buena suerte',
  '¡Truco!',
  '¡Envido!',
  'Bien jugado',
];

// Duración de animaciones (ms)
export const ANIMATION_DURATION = {
  SHORT: 300,
  MEDIUM: 600,
  LONG: 1000,
};

// Colores de los equipos
export const TEAM_COLORS = {
  TEAM1: '#0038A8',
  TEAM2: '#FCD116',
};

export default {
  GAME_CONFIG,
  GAME_STATUS,
  CALL_TYPES,
  CALL_RESPONSES,
  SUITS,
  CHAT_MESSAGES,
  ANIMATION_DURATION,
  TEAM_COLORS,
};
