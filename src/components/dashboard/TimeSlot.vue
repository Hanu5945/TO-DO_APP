<template>
  <div
    class="time-slot"
    :class="`time-slot--${task.status.toLowerCase()}`"
    @mouseover="showTooltip = task.status === 'DELAYED'"
    @mouseout="showTooltip = false"
  >
    <div class="time-slot__content">
      <div class="time-slot__title">{{ task.title }}</div>
      <div class="time-slot__status-badge" :class="`badge--${task.status.toLowerCase()}`">
        {{ formatStatus(task.status) }}
      </div>
    </div>

    <div v-if="showTooltip && task.delayReason" class="time-slot__tooltip">
      {{ task.delayReason }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  task: {
    type: Object,
    required: true
  }
})

const showTooltip = ref(false)

const formatStatus = (status) => {
  const statusMap = {
    'PENDING': '대기',
    'IN_PROGRESS': '진행중',
    'COMPLETED': '완료',
    'DELAYED': '지연'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.time-slot {
  flex: 1;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 80px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  position: relative;
}

.time-slot:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 상태별 배경색 */
.time-slot--pending {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #6b7280;
}

.time-slot--in_progress {
  background-color: #eff6ff;
  border: 1px solid #93c5fd;
  color: #1d4ed8;
}

.time-slot--completed {
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  color: #15803d;
}

.time-slot--delayed {
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #dc2626;
}

.time-slot__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.time-slot__title {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.time-slot__status-badge {
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  width: fit-content;
}

.badge--pending {
  background-color: #e5e7eb;
  color: #6b7280;
}

.badge--in_progress {
  background-color: #93c5fd;
  color: #1d4ed8;
}

.badge--completed {
  background-color: #86efac;
  color: #15803d;
}

.badge--delayed {
  background-color: #fca5a5;
  color: #dc2626;
}

.time-slot__tooltip {
  position: absolute;
  bottom: -35px;
  left: 0;
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #dc2626;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: normal;
  max-width: 150px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
