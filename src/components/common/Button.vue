<template>
  <button :class="['btn', `btn-${type}`]" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.btn {
  padding: 8px 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.btn-secondary {
  background-color: white;
  color: var(--gray-500);
  border: 1px solid var(--gray-200);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--gray-50);
}

.btn-danger {
  background-color: var(--danger-light);
  color: var(--danger);
  border: 1px solid #FCA5A5;
}

.btn-danger:hover:not(:disabled) {
  background-color: #FEE2E2;
}
</style>
