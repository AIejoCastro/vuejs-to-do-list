<template>
  <div class="form">
    <h2 class="form-title">
      {{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title -->
      <div class="form-group">
        <label for="title" class="form-label">
          Título *
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="input-field"
          placeholder="Ej: Comprar víveres"
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description" class="form-label">
          Descripción
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="input-field"
          placeholder="Describe tu tarea (opcional)"
        ></textarea>
      </div>

      <!-- Priority -->
      <div class="form-group">
        <label for="priority" class="form-label">
          Prioridad
        </label>
        <select
          id="priority"
          v-model="form.priority"
          class="input-field"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
          Cancelar
        </button>
        <button
          type="submit"
          :disabled="!form.title.trim() || tasksStore.loading"
          class="btn btn-primary"
        >
          <span v-if="tasksStore.loading">
            {{ isEditing ? 'Actualizando...' : 'Creando...' }}
          </span>
          <span v-else>
            {{ isEditing ? 'Actualizar' : 'Crear Tarea' }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'

// Props
const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['task-created', 'task-updated', 'cancel'])

// Store
const tasksStore = useTasksStore()

// State
const form = reactive({
  title: '',
  description: '',
  priority: 'medium'
})

// Computed
const isEditing = computed(() => !!props.task)

// Methods
const handleSubmit = async () => {
  const taskData = {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority
  }

  if (isEditing.value) {
    await tasksStore.updateTask(props.task.id, taskData)
    emit('task-updated')
  } else {
    await tasksStore.addTask(taskData)
    emit('task-created')
  }
}

// Lifecycle
onMounted(() => {
  if (props.task) {
    form.title = props.task.title || ''
    form.description = props.task.description || ''
    form.priority = props.task.priority || 'medium'
  }
})
</script>
