<template>
  <div class="time-table">
    <div class="time-table__header">
      <button class="time-table__nav-btn" @click="prevDay">◀</button>
      <h2 class="time-table__date">{{ formatDate(currentDate) }}</h2>
      <button class="time-table__nav-btn" @click="nextDay">▶</button>
    </div>

    <div class="time-table__container">
      <div class="time-table__row time-table__row--header">
        <div class="time-table__time-cell">시간</div>
        <div class="time-table__content-cell">일정</div>
      </div>

      <div v-for="hour in hours" :key="hour" class="time-table__row">
        <div class="time-table__time-cell">{{ formatTime(hour) }}</div>
        <div class="time-table__content-cell">
          <div v-if="getTasksForHour(hour).length === 0" class="time-table__empty">
            -
          </div>
          <div v-else class="time-table__tasks">
            <TimeSlot v-for="task in getTasksForHour(hour)" :key="task.id" :task="task" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TimeSlot from './TimeSlot.vue'

const taskStore = useTaskStore()
const currentDate = ref(new Date().toISOString().split('T')[0])

const hours = computed(() => {
  const result = []
  for (let h = 7; h <= 20; h++) {
    result.push(h)
  }
  return result
})

const formatDate = (date) => {
  const d = new Date(date + 'T00:00:00')
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${date} (${days[d.getDay()]})`
}

const formatTime = (hour) => {
  return `${String(hour).padStart(2, '0')}:00`
}

const getTasksForHour = (hour) => {
  const dateStr = currentDate.value
  return taskStore.tasks.filter(task => {
    if (task.startDate !== dateStr || !task.startTime) return false
    const startHour = parseInt(task.startTime.split(':')[0])
    return startHour === hour
  })
}

const prevDay = () => {
  const d = new Date(currentDate.value + 'T00:00:00')
  d.setDate(d.getDate() - 1)
  currentDate.value = d.toISOString().split('T')[0]
}

const nextDay = () => {
  const d = new Date(currentDate.value + 'T00:00:00')
  d.setDate(d.getDate() + 1)
  currentDate.value = d.toISOString().split('T')[0]
}
</script>

<style scoped>
.time-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.time-table__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.time-table__nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #6b7280;
  padding: 0 8px;
}

.time-table__nav-btn:hover {
  color: #1f2937;
}

.time-table__date {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.time-table__container {
  flex: 1;
  overflow-y: auto;
}

.time-table__row {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  min-height: 42px;
}

.time-table__row--header {
  background-color: #f9fafb;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

.time-table__time-cell {
  width: 70px;
  padding: 8px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6b7280;
}

.time-table__content-cell {
  flex: 1;
  padding: 8px;
  display: flex;
  align-items: center;
}

.time-table__empty {
  color: #d1d5db;
  font-size: 12px;
}

.time-table__tasks {
  display: flex;
  gap: 4px;
  width: 100%;
}
</style>
