<template>
  <div
    class="task-block"
    :class="statusClass"
    :style="blockStyle"
    @click="$emit('click', task)"
  >
    <div class="task-block-inner">
      <span class="task-name">{{ task.title }}</span>
      <span class="task-badge">{{ statusLabel }}</span>
    </div>

    <!-- 지연 사유 툴팁 -->
    <div v-if="task.status === 'DELAYED' && task.delayReason" class="delay-tooltip">
      {{ task.delayReason }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
  startHour: { type: Number, required: true }, // 시간표 시작 시각 (7)
  slotIndex: { type: Number, required: true },  // 이 Task의 열 순서
  totalSlots: { type: Number, required: true }, // 같은 시간대 Task 수
  hourHeight: { type: Number, default: 42 }
})

defineEmits(['click'])

const toMinutes = (dateTimeStr) => {
  const [, time] = dateTimeStr.split('T')
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const startMin = computed(() => toMinutes(props.task.startDateTime))
const endMin = computed(() => toMinutes(props.task.endDateTime))

const blockStyle = computed(() => {
  const baseMin = props.startHour * 60
  const top = ((startMin.value - baseMin) / 60) * props.hourHeight
  const height = Math.max(((endMin.value - startMin.value) / 60) * props.hourHeight, 20)
  const width = 100 / props.totalSlots
  const left = (props.slotIndex / props.totalSlots) * 100

  return {
    position: 'absolute',
    top: `${top}px`,
    height: `${height}px`,
    width: `calc(${width}% - 3px)`,
    left: `${left}%`
  }
})

const statusClass = computed(() => {
  const map = {
    PENDING: 'status-pending',
    IN_PROGRESS: 'status-in-progress',
    COMPLETED: 'status-completed',
    DELAYED: 'status-delayed'
  }
  return map[props.task.status] || 'status-pending'
})

const statusLabel = computed(() => {
  const map = {
    PENDING: '대기',
    IN_PROGRESS: '진행중',
    COMPLETED: '완료',
    DELAYED: '지연'
  }
  return map[props.task.status] || ''
})
</script>

<style scoped>
.task-block {
  border-radius: 4px;
  padding: 3px 5px;
  cursor: pointer;
  overflow: hidden;
  transition: filter 0.15s ease;
  border-left: 3px solid transparent;
  box-sizing: border-box;
}

.task-block:hover {
  filter: brightness(0.95);
}

.task-block-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  overflow: hidden;
}

.task-name {
  font-size: 10px;
  font-weight: 600;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-badge {
  font-size: 9px;
  font-weight: 500;
}

/* 상태별 색상 */
.status-pending {
  background-color: #F9FAFB;
  color: #6B7280;
  border-left-color: #9CA3AF;
}

.status-in-progress {
  background-color: #EFF6FF;
  color: #1D4ED8;
  border-left-color: #3B82F6;
}

.status-completed {
  background-color: #F0FDF4;
  color: #15803D;
  border-left-color: #22C55E;
}

.status-delayed {
  background-color: #FEF2F2;
  color: #DC2626;
  border-left-color: #EF4444;
}

/* 지연 사유 툴팁 */
.delay-tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 10px;
  color: #DC2626;
  white-space: normal;
  max-width: 180px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.task-block:hover .delay-tooltip {
  display: block;
}
</style>
