/**
 * Utilidades generales para la aplicación
 */

/**
 * Formatear número de fichas
 */
export const formatChips = (chips) => {
  if (chips >= 1000000) {
    return `${(chips / 1000000).toFixed(1)}M`;
  }
  if (chips >= 1000) {
    return `${(chips / 1000).toFixed(1)}K`;
  }
  return chips.toString();
};

/**
 * Formatear fecha
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-UY', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formatear hora
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-UY', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validar email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Generar ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Obtener color del equipo
 */
export const getTeamColor = (teamIndex) => {
  return teamIndex === 0 ? '#0038A8' : '#FCD116';
};

/**
 * Obtener emoji del avatar
 */
export const getAvatarEmoji = (avatarId) => {
  const avatars = {
    avatar1: '🧉',
    avatar2: '⚽',
    avatar3: '🎸',
    avatar4: '🏖️',
    avatar5: '🎭',
    avatar6: '🌞',
    avatar7: '🎪',
    avatar8: '🎨',
  };
  return avatars[avatarId] || '👤';
};

/**
 * Obtener nombre del canto en español
 */
export const getCallName = (callType) => {
  const names = {
    envido: 'Envido',
    realEnvido: 'Real Envido',
    faltaEnvido: 'Falta Envido',
    truco: 'Truco',
    retruco: 'Retruco',
    valeCuatro: 'Vale Cuatro',
    flor: 'Flor',
    contraflor: 'Contraflor',
    contraflorAlResto: 'Contraflor al Resto',
    mazo: 'Me voy al mazo',
  };
  return names[callType] || callType;
};

/**
 * Mezclar array (Fisher-Yates)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Esperar un tiempo determinado
 */
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default {
  formatChips,
  formatDate,
  formatTime,
  validateEmail,
  generateId,
  getTeamColor,
  getAvatarEmoji,
  getCallName,
  shuffleArray,
  wait,
};
