import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Enviar mensaje al chat
 */
export const sendMessage = async (roomId, userId, username, text) => {
  try {
    const messagesRef = collection(db, 'rooms', roomId, 'messages');

    await addDoc(messagesRef, {
      userId,
      username,
      text,
      timestamp: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Suscribirse a mensajes del chat
 */
export const subscribeToChat = (roomId, callback) => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(50));

  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString(),
      });
    });
    callback(messages);
  });
};
