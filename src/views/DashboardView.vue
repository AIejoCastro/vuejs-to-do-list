<template>
  <div class="py-8">
    <div class="container">
      <!-- Header con estadísticas -->
      <div class="mb-8">
        <div class="card">
          <div class="flex flex-col gap-4 mb-6">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold mb-2">Mis Tareas</h1>
                <p class="text-sm" style="color: var(--text-secondary);">
                  Gestiona y organiza tus actividades diarias
                </p>
              </div>
              <button class="btn btn-primary btn-lg" @click="showTaskForm = true">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Tarea
              </button>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="stats-grid">
            <div class="stat-card stat-total">
              <div class="stat-icon stat-total">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <div class="stat-number stat-total">{{ tasksStore.tasksCount.total }}</div>
                <div class="stat-label stat-total">Total de Tareas</div>
              </div>
            </div>

            <div class="stat-card stat-pending">
              <div class="stat-icon stat-pending">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="stat-number stat-pending">{{ tasksStore.tasksCount.pending }}</div>
                <div class="stat-label stat-pending">Pendientes</div>
              </div>
            </div>

            <div class="stat-card stat-completed">
              <div class="stat-icon stat-completed">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="stat-number stat-completed">{{ tasksStore.tasksCount.completed }}</div>
                <div class="stat-label stat-completed">Completadas</div>
              </div>
            </div>
          </div>

          <!-- Filtros -->
          <div class="filters">
            <button
              v-for="filterOption in filterOptions"
              :key="filterOption.value"
              @click="tasksStore.setFilter(filterOption.value)"
              class="filter-btn"
              :class="{ active: tasksStore.filter === filterOption.value }"
            >
              <span>{{ filterOption.label }}</span>
              <span class="filter-count">{{ filterOption.count }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de tareas -->
      <TaskList />

      <!-- Modal de formulario de tarea -->
      <div v-if="showTaskForm" class="modal-overlay" @click="handleBackdropClick">
        <div class="modal-content">
          <button class="modal-close" @click="showTaskForm = false">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <TaskForm
            @task-created="handleTaskCreated"
            @cancel="showTaskForm = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskList from '../components/TaskList.vue'
import TaskForm from '../components/TaskForm.vue'

// Store
const tasksStore = useTasksStore()

// State
const showTaskForm = ref(false)

// Computed
const filterOptions = computed(() => [
  {
    value: 'all',
    label: 'Todas',
    count: tasksStore.tasksCount.total
  },
  {
    value: 'pending',
    label: 'Pendientes',
    count: tasksStore.tasksCount.pending
  },
  {
    value: 'completed',
    label: 'Completadas',
    count: tasksStore.tasksCount.completed
  }
])

// Methods
const handleTaskCreated = () => {
  showTaskForm.value = false
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    showTaskForm.value = false
  }
}
</script>
