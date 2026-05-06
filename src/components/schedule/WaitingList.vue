<template>
  <div class="waiting-list">
    <div class="waiting-header">
      <span class="waiting-title">대기 목록</span>
      <button class="add-icon-btn" @click="onAdd" title="Task 추가">+</button>
    </div>

    <div class="waiting-tasks">
      <div
        v-for="task in waitingTasks"
        :key="task.id"
        class="task-card"
        @click="onCardClick(task)"
      >
        <p class="task-title">{{ task.title }}</p>
        <p class="task-assignee">담당: {{ assigneeNames(task) }}</p>
      </div>

      <div v-if="waitingTasks.length === 0" class="empty-msg">
        대기 중인 Task 없음
      </div>
    </div>

    <button class="add-task-btn" @click="onAdd">+ Task 추가</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'

const taskStore = useTaskStore()
const uiStore = useUiStore()

const waitingTasks = computed(() => taskStore.waitingTasks)

const assigneeNames = (task) =>
  task.assignees.map((a) => a.name).join(', ')

const onAdd = () => uiStore.openModal('create', null)
const onCardClick = (task) => uiStore.openModal('detail', task)
</script>

<style scoped>
.waiting-list {
  width: 150px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid var(--gray-200);
  padding-right: 12px;
}

.waiting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.waiting-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--gray-900);
}

.add-icon-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--primary);
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}

.add-icon-btn:hover {
  color: var(--primary-dark);
}

.waiting-tasks {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.task-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 8px;
  cursor: pointer;
  transition: box-shadow 0.15s ease;
}

.task-card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-color: var(--gray-300);
}

.task-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 4px 0;
  word-break: break-word;
}

.task-assignee {
  font-size: 10px;
  color: var(--gray-500);
  margin: 0;
}

.empty-msg {
  font-size: 10px;
  color: var(--gray-400);
  text-align: center;
  padding: 12px 0;
}

.add-task-btn {
  width: 100%;
  padding: 8px;
  background: white;
  border: 1px dashed var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 11px;
  color: var(--gray-500);
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;
}

.add-task-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}
</style>
