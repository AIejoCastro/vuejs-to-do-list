<template>
  <div class="task-item">
    <div class="task-item-content">
      <!-- Checkbox -->
      <div class="task-checkbox">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle-complete', task.id, task.completed)"
        />
      </div>

      <!-- Task content -->
      <div class="task-details">
        <h3 class="task-title" :class="{ completed: task.completed }">
          {{ task.title }}
        </h3>

        <p v-if="task.description"
           class="task-description"
           :class="{ completed: task.completed }"
        >
          {{ task.description }}
        </p>

        <div class="task-meta">
          <span>Creada: {{ formatDate(task.createdAt) }}</span>
          <span v-if="task.priority"
                class="task-priority"
                :class="task.priority"
          >
            {{ getPriorityLabel(task.priority) }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="task-actions">
        <button class="task-action edit" @click="$emit('edit', task)" title="Editar tarea">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button class="task-action delete" @click="$emit('delete', task.id)" title="Eliminar tarea">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  task: {
    type: Object,
    required: true
  }
})

// Emits
defineEmits(['toggle-complete', 'edit', 'delete'])

// Methods
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPriorityLabel = (priority) => {
  const labels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  }
  return labels[priority] || priority
}
</script>
