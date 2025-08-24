<template>
  <div class="modal-overlay" @click="handleBackdropClick">
    <div class="modal-content">
      <!-- Close button -->
      <button @click="$emit('close')" class="modal-close">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Content -->
      <slot />
    </div>
  </div>
</template>

<script setup>
// Emits
const emit = defineEmits(['close'])

// Methods
const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>
