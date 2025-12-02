import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { dealCardsWithMuestra, evaluateRound, checkWinner } from '../logic/gameLogic';

/**
 * Jugar una carta
 */
export const playCard = async (roomId, userId, card) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      return { success: false, error: 'Sala no encontrada' };
    }

    const roomData = roomSnap.data();

    // Verificar que es el turno del jugador
    const currentPlayerIndex = roomData.currentPlayer || 0;
    const currentPlayer = roomData.players[currentPlayerIndex];

    if (currentPlayer.id !== userId) {
      return { success: false, error: 'No es tu turno' };
    }

    // Agregar carta jugada
    const playedCards = roomData.playedCards || [];
    playedCards.push({
      playerId: userId,
      card,
      timestamp: new Date().toISOString(),
    });

    // Siguiente jugador
    const nextPlayer = (currentPlayerIndex + 1) % 4;

    await updateDoc(roomRef, {
      playedCards,
      currentPlayer: nextPlayer,
      lastUpdate: serverTimestamp(),
    });

    // Si todos jugaron, evaluar ronda
    if (playedCards.length === 4) {
      await evaluateCurrentRound(roomId);
    }

    return { success: true };
  } catch (error) {
    console.error('Error jugando carta:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Hacer un canto (truco, envido, etc.)
 */
export const makeCall = async (roomId, userId, callType) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      return { success: false, error: 'Sala no encontrada' };
    }

    const roomData = roomSnap.data();

    // Validar que el jugador puede hacer este canto
    const canMakeCall = validateCall(roomData, userId, callType);

    if (!canMakeCall) {
      return { success: false, error: 'No puedes hacer este canto ahora' };
    }

    await updateDoc(roomRef, {
      currentCall: callType,
      callBy: userId,
      callStatus: 'pending',
      lastUpdate: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error haciendo canto:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Responder a un canto
 */
export const respondToCall = async (roomId, userId, response) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);

    await updateDoc(roomRef, {
      callResponse: response,
      callStatus: 'resolved',
      lastUpdate: serverTimestamp(),
    });

    // Si aceptan, continuar juego
    // Si rechazan, otorgar puntos

    return { success: true };
  } catch (error) {
    console.error('Error respondiendo canto:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Evaluar la ronda actual
 */
const evaluateCurrentRound = async (roomId) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();

    const result = evaluateRound(roomData.playedCards);

    // Actualizar puntajes
    const team1Score = roomData.team1Score + (result.winner === 'team1' ? result.points : 0);
    const team2Score = roomData.team2Score + (result.winner === 'team2' ? result.points : 0);

    await updateDoc(roomRef, {
      team1Score,
      team2Score,
      playedCards: [],
      round: (roomData.round || 1) + 1,
      lastUpdate: serverTimestamp(),
    });

    // Verificar si hay ganador
    const winner = checkWinner(team1Score, team2Score, roomData.maxPoints);

    if (winner) {
      await endGame(roomId, winner);
    }

    return { success: true };
  } catch (error) {
    console.error('Error evaluando ronda:', error);
    return { success: false };
  }
};

/**
 * Finalizar partida
 */
const endGame = async (roomId, winner) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();

    await updateDoc(roomRef, {
      status: 'finished',
      winner,
      finishedAt: serverTimestamp(),
    });

    // Distribuir fichas
    await distributeChips(roomData, winner);

    return { success: true };
  } catch (error) {
    console.error('Error finalizando partida:', error);
    return { success: false };
  }
};

/**
 * Distribuir fichas a ganadores
 */
const distributeChips = async (roomData, winner) => {
  const { players, bet } = roomData;

  // Ganadores obtienen el doble de la apuesta
  // Perdedores pierden su apuesta

  for (const player of players) {
    const userRef = doc(db, 'users', player.id);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const playerTeam = players.indexOf(player) % 2 === 0 ? 'team1' : 'team2';
    const isWinner = playerTeam === winner;

    const chipsChange = isWinner ? bet : -bet;
    const newChips = userData.chips + chipsChange;

    await updateDoc(userRef, {
      chips: Math.max(0, newChips),
      gamesPlayed: userData.gamesPlayed + 1,
      gamesWon: isWinner ? userData.gamesWon + 1 : userData.gamesWon,
    });
  }
};

/**
 * Validar si un canto es válido
 */
const validateCall = (roomData, userId, callType) => {
  // Implementar lógica de validación según reglas del truco
  // Por ahora, permitir todos los cantos
  return true;
};

/**
 * Suscribirse a actualizaciones de la partida
 */
export const subscribeToRoom = (roomId, callback) => {
  const roomRef = doc(db, 'rooms', roomId);

  return onSnapshot(roomRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data(),
      });
    }
  });
};
