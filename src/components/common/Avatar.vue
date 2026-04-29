<template>
  <div :class="['avatar', `avatar-${role}`]" :title="name">
    {{ initial }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'member',
    validator: (value) => ['member', 'admin', 'super-admin'].includes(value)
  }
})

const initial = computed(() => {
  return props.name ? props.name.charAt(0).toUpperCase() : '?'
})
</script>

<style scoped>
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}

.avatar-member {
  background-color: #D1FAE5;
  color: #065F46;
}

.avatar-admin {
  background-color: #FEF3C7;
  color: #92400E;
}

.avatar-super-admin {
  background-color: var(--admin-light);
  color: #6D28D9;
}
</style>
