import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase'
import { useUiStore } from './ui'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userDisplayName = computed(() => user.value?.displayName || user.value?.email)

  // Actions
  const login = async (email, password) => {
    const uiStore = useUiStore()
    loading.value = true
    error.value = null

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user

      uiStore.showNotification('¡Bienvenido de nuevo!', 'success')
      router.push('/dashboard')
    } catch (err) {
      error.value = getErrorMessage(err.code)
      uiStore.showNotification(error.value, 'error')
    } finally {
      loading.value = false
    }
  }

  const register = async (email, password, displayName) => {
    const uiStore = useUiStore()
    loading.value = true
    error.value = null

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Actualizar perfil con nombre de usuario
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }

      user.value = userCredential.user

      uiStore.showNotification('¡Cuenta creada exitosamente!', 'success')
      router.push('/dashboard')
    } catch (err) {
      error.value = getErrorMessage(err.code)
      uiStore.showNotification(error.value, 'error')
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    const uiStore = useUiStore()

    try {
      await signOut(auth)
      user.value = null
      uiStore.showNotification('Sesión cerrada correctamente', 'info')
      router.push('/login')
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      uiStore.showNotification('Error al cerrar sesión', 'error')
    }
  }

  const checkAuthState = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser

      // Redirigir según el estado de autenticación
      if (firebaseUser && router.currentRoute.value.path === '/login') {
        router.push('/dashboard')
      } else if (!firebaseUser && router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/register') {
        router.push('/login')
      }
    })
  }

  // Helper para mensajes de error
  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El email ya está en uso',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'Email inválido'
    }
    return errorMessages[errorCode] || 'Error de autenticación'
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    userDisplayName,
    // Actions
    login,
    register,
    logout,
    checkAuthState
  }
})
