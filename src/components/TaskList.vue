<template>
  <div class="task-list">
    <!-- Loading state -->
    <div v-if="tasksStore.loading && tasksStore.tasks.length === 0" class="card">
      <div class="skeleton">
        <div class="skeleton-text long"></div>
        <div class="skeleton-text short"></div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="tasksStore.filteredTasks.length === 0" class="card empty-state">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3>{{ getEmptyMessage() }}</h3>
      <p>{{ getEmptySubMessage() }}</p>
    </div>

    <!-- Task list -->
    <template v-else>
      <TaskItem
        v-for="task in tasksStore.filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-complete="handleToggleComplete"
        @edit="handleEditTask"
        @delete="handleDeleteTask"
      />
    </template>

    <!-- Edit task modal -->
    <div v-if="editingTask" class="modal-overlay" @click="handleBackdropClick">
      <div class="modal-content">
        <button class="modal-close" @click="editingTask = null">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <TaskForm
          :task="editingTask"
          @task-updated="handleTaskUpdated"
          @cancel="editingTask = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'

// Store
const tasksStore = useTasksStore()

// State
const editingTask = ref(null)

// Methods
const handleToggleComplete = (taskId, completed) => {
  tasksStore.toggleTaskComplete(taskId, completed)
}

const handleEditTask = (task) => {
  editingTask.value = task
}

const handleDeleteTask = (taskId) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    tasksStore.deleteTask(taskId)
  }
}

const handleTaskUpdated = () => {
  editingTask.value = null
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    editingTask.value = null
  }
}

const getEmptyMessage = () => {
  switch (tasksStore.filter) {
    case 'completed':
      return 'No hay tareas completadas'
    case 'pending':
      return 'No hay tareas pendientes'
    default:
      return 'No hay tareas'
  }
}

const getEmptySubMessage = () => {
  switch (tasksStore.filter) {
    case 'completed':
      return 'Las tareas que completes aparecerán aquí'
    case 'pending':
      return '¡Excelente! Todas tus tareas están completadas'
    default:
      return 'Crea tu primera tarea para comenzar'
  }
}
</script>
