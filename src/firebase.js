import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar servicios
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
