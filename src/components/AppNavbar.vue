<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <div class="navbar-brand">
          <div class="navbar-logo">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 class="navbar-title">Gestor de Tareas</h1>
            <p class="navbar-subtitle">Organiza tu día</p>
          </div>
        </div>

        <!-- Controles -->
        <div class="navbar-controls">
          <!-- Estadísticas rápidas -->
          <div class="navbar-stats">
            <div class="navbar-stat">
              <div class="navbar-stat-number navbar-stat-pending">{{ tasksStore.tasksCount.pending }}</div>
              <div class="navbar-stat-label">Pendientes</div>
            </div>
            <div class="navbar-stat">
              <div class="navbar-stat-number navbar-stat-completed">{{ tasksStore.tasksCount.completed }}</div>
              <div class="navbar-stat-label">Completadas</div>
            </div>
          </div>

          <!-- Toggle tema -->
          <button class="theme-toggle" @click="uiStore.toggleDarkMode" title="Cambiar tema">
            <svg v-if="uiStore.isDarkMode" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useTasksStore } from '../stores/tasks'
import { useUiStore } from '../stores/ui'

// Stores
const tasksStore = useTasksStore()
const uiStore = useUiStore()
</script>
