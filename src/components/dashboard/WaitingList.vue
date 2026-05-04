<template>
  <div class="waiting-list">
    <div class="waiting-list__header">
      <h3 class="waiting-list__title">대기 목록</h3>
      <button class="waiting-list__add-btn" @click="openAddModal">
        <span class="waiting-list__add-icon">+</span>
      </button>
    </div>

    <div class="waiting-list__content">
      <div v-if="waitingTasks.length === 0" class="waiting-list__empty">
        대기 중인 Task가 없습니다
      </div>

      <div v-else class="waiting-list__tasks">
        <div v-for="task in waitingTasks" :key="task.id" class="task-card">
          <div class="task-card__title">{{ task.title }}</div>
          <div class="task-card__assignee">담당: {{ formatAssignee(task.assignees) }}</div>
        </div>
      </div>

      <button class="waiting-list__add-task-btn">
        <span class="waiting-list__add-task-icon">+</span>
        Task 추가
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const waitingTasks = computed(() => taskStore.getWaitingTasks)

const formatAssignee = (assignees) => {
  if (!assignees || assignees.length === 0) return '없음'
  return assignees[0].substring(0, 3) + 'OO'
}

const openAddModal = () => {
  // Task 등록 모달 열기 (Phase 4.1)
  console.log('Task 추가 모달 열기')
}
</script>

<style scoped>
.waiting-list {
  width: 150px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.waiting-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.waiting-list__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.waiting-list__add-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #6b7280;
}

.waiting-list__content {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
}

.waiting-list__empty {
  padding: 20px 12px;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
}

.waiting-list__tasks {
  padding: 8px;
}

.task-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.task-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-card__title {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card__assignee {
  font-size: 10px;
  color: #6b7280;
}

.waiting-list__add-task-btn {
  width: calc(100% - 16px);
  margin: 8px;
  padding: 8px;
  border: 1px dashed #d1d5db;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
  transition: all 0.2s ease;
}

.waiting-list__add-task-btn:hover {
  border-color: #9ca3af;
  color: #4b5563;
}

.waiting-list__add-task-icon {
  font-size: 14px;
}
</style>
