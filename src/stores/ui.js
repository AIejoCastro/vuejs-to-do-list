// src/stores/ui.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // State
  const isDarkMode = ref(false)
  const notifications = ref([])

  // Actions
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value.toString())

    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }

  const loadThemePreference = () => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      isDarkMode.value = savedTheme === 'true'
    } else {
      // Detectar preferencia del sistema
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }

  const showNotification = (message, type = 'info', duration = 4000) => {
    const notification = {
      id: Date.now(),
      message,
      type
    }

    notifications.value.push(notification)

    // Remover notificación automáticamente
    setTimeout(() => {
      removeNotification(notification.id)
    }, duration)
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    // State
    isDarkMode,
    notifications,
    // Actions
    toggleDarkMode,
    loadThemePreference,
    showNotification,
    removeNotification
  }
})
