import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUiStore } from './ui'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([
  ])
  const loading = ref(false)
  const filter = ref('all') // 'all', 'completed', 'pending'

  // Getters
  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'completed':
        return tasks.value.filter(task => task.completed)
      case 'pending':
        return tasks.value.filter(task => !task.completed)
      default:
        return tasks.value
    }
  })

  const tasksCount = computed(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter(task => task.completed).length,
    pending: tasks.value.filter(task => !task.completed).length
  }))

  // Actions
  const addTask = async (taskData) => {
    const uiStore = useUiStore()

    try {
      loading.value = true

      const newTask = {
        id: Date.now().toString(), // ID simple para local
        ...taskData,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      tasks.value.unshift(newTask) // Agregar al inicio
      uiStore.showNotification('Tarea creada correctamente', 'success')
    } catch (error) {
      console.error('Error adding task:', error)
      uiStore.showNotification('Error al crear la tarea', 'error')
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (taskId, updates) => {
    const uiStore = useUiStore()

    try {
      loading.value = true

      const taskIndex = tasks.value.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = {
          ...tasks.value[taskIndex],
          ...updates,
          updatedAt: new Date()
        }

        // Si se está marcando como completada, mostrar notificación especial
        if (updates.completed === true) {
          uiStore.showNotification('¡Tarea completada! 🎉', 'success')
        } else {
          uiStore.showNotification('Tarea actualizada', 'success')
        }
      }
    } catch (error) {
      console.error('Error updating task:', error)
      uiStore.showNotification('Error al actualizar la tarea', 'error')
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (taskId) => {
    const uiStore = useUiStore()

    try {
      loading.value = true

      const taskIndex = tasks.value.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        tasks.value.splice(taskIndex, 1)
        uiStore.showNotification('Tarea eliminada', 'info')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      uiStore.showNotification('Error al eliminar la tarea', 'error')
    } finally {
      loading.value = false
    }
  }

  const toggleTaskComplete = async (taskId, completed) => {
    await updateTask(taskId, { completed: !completed })
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  return {
    // State
    tasks,
    loading,
    filter,
    // Getters
    filteredTasks,
    tasksCount,
    // Actions
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setFilter
  }
})
