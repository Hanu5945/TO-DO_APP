<template>
  <span :class="['badge', `badge-${type}`]">
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default',
      'pending',
      'in-progress',
      'completed',
      'delayed'
    ].includes(value)
  }
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
}

.badge-default {
  background-color: var(--gray-100);
  color: var(--gray-700);
}

.badge-pending {
  background-color: var(--gray-50);
  color: var(--gray-500);
}

.badge-in-progress {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.badge-completed {
  background-color: var(--success-light);
  color: var(--success-dark);
}

.badge-delayed {
  background-color: var(--danger-light);
  color: var(--danger-dark);
}
</style>
