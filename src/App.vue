<template>
  <div id="app" :data-theme="isDarkMode ? 'dark' : 'light'">
    <div class="min-h-screen">
      <!-- Navbar -->
      <AppNavbar />

      <!-- Contenido principal -->
      <main class="main-content">
        <router-view />
      </main>

      <!-- Notificaciones -->
      <div class="notifications">
        <div
          v-for="notification in uiStore.notifications"
          :key="notification.id"
          class="notification"
          :class="notification.type"
        >
          <span>{{ notification.message }}</span>
          <button
            @click="uiStore.removeNotification(notification.id)"
            class="notification-close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUiStore } from './stores/ui'
import AppNavbar from './components/AppNavbar.vue'

// Store
const uiStore = useUiStore()

// Computed
const isDarkMode = computed(() => uiStore.isDarkMode)

// Lifecycle
onMounted(() => {
  // Cargar preferencia de tema
  uiStore.loadThemePreference()
})
</script>
