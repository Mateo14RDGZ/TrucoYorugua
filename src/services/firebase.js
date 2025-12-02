import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase - Truco Yorugua
const firebaseConfig = {
  apiKey: "AIzaSyA6WIKvpOclmPAsiSThF3Vn8o31466yx4Y",
  authDomain: "trucoyorugua1-4.firebaseapp.com",
  projectId: "trucoyorugua1-4",
  storageBucket: "trucoyorugua1-4.firebasestorage.app",
  messagingSenderId: "140454276608",
  appId: "1:140454276608:web:a30eb03c2d92f77ac832e5",
  measurementId: "G-LVCDFHKNG5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
