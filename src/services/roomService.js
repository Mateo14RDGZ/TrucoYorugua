import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { dealCardsWithMuestra } from '../logic/gameLogic';

/**
 * Obtener todas las salas disponibles
 */
export const getRooms = async () => {
  try {
    const roomsRef = collection(db, 'rooms');
    const q = query(roomsRef, where('status', '==', 'waiting'));
    const snapshot = await getDocs(q);

    const rooms = [];
    snapshot.forEach((doc) => {
      rooms.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return rooms;
  } catch (error) {
    console.error('Error obteniendo salas:', error);
    return [];
  }
};

/**
 * Crear una nueva sala
 */
export const createRoom = async (roomData) => {
  try {
    const roomRef = await addDoc(collection(db, 'rooms'), {
      ...roomData,
      status: 'waiting',
      players: [],
      team1Score: 0,
      team2Score: 0,
      createdAt: serverTimestamp(),
    });

    // Unir al creador automáticamente
    await joinRoom(roomRef.id, roomData.createdBy);

    return { success: true, roomId: roomRef.id };
  } catch (error) {
    console.error('Error creando sala:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Unirse a una sala existente
 */
export const joinRoom = async (roomId, userId) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      return { success: false, error: 'La sala no existe' };
    }

    const roomData = roomSnap.data();

    if (roomData.players.length >= 4) {
      return { success: false, error: 'La sala está llena' };
    }

    // Obtener datos del usuario
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Verificar fichas suficientes
    if (userData.chips < roomData.bet) {
      return { success: false, error: 'No tienes suficientes fichas' };
    }

    // Agregar jugador a la sala
    await updateDoc(roomRef, {
      players: arrayUnion({
        id: userId,
        username: userData.username,
        avatar: userData.avatar,
        chips: userData.chips,
      }),
    });

    // Iniciar partida si hay 4 jugadores
    const updatedRoomSnap = await getDoc(roomRef);
    const updatedRoom = updatedRoomSnap.data();

    if (updatedRoom.players.length === 4) {
      await startGame(roomId);
    }

    return { success: true };
  } catch (error) {
    console.error('Error uniéndose a la sala:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Iniciar partida cuando hay 4 jugadores
 * Reparte las cartas y define la muestra
 */
const startGame = async (roomId) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    
    // Repartir cartas con muestra (auténtico truco uruguayo)
    const dealt = dealCardsWithMuestra();

    await updateDoc(roomRef, {
      status: 'playing',
      currentRound: 1,
      currentPlayer: 0,
      muestra: dealt.muestra, // La carta que determina las piezas
      playerCards: {
        0: dealt.player1,
        1: dealt.player2,
        2: dealt.player3,
        3: dealt.player4,
      },
      playedCards: [],
      handsPlayed: 0,
      startedAt: serverTimestamp(),
    });

    // Inicializar el estado del juego
    const gameRef = await addDoc(collection(db, 'games'), {
      roomId,
      status: 'active',
      currentPlayer: 0,
      round: 1,
      muestra: dealt.muestra,
      createdAt: serverTimestamp(),
    });

    return { success: true, gameId: gameRef.id };
  } catch (error) {
    console.error('Error iniciando partida:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Suscribirse a actualizaciones de una sala
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
