<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-head">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

defineEmits(['close'])

const close = () => {
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border-bottom: 1px solid var(--gray-100);
}

.modal-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-900);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--gray-700);
}

.modal-body {
  padding: 18px;
}
</style>
