<template>
  <div class="dashboard-container">
    <NoticeBar />
    <Header />

    <div class="dashboard-content">
      <div class="main-layout">
        <!-- 좌측: 대기 목록 -->
        <WaitingList />

        <!-- 우측: 시간표 -->
        <TimeTable />
      </div>
    </div>

    <!-- 모달들 -->
    <TaskForm
      v-if="uiStore.modal.isOpen && (uiStore.modal.type === 'create' || uiStore.modal.type === 'edit')"
      :task="uiStore.modal.task"
    />
    <TaskDetail
      v-if="uiStore.modal.isOpen && uiStore.modal.type === 'detail'"
      :task="uiStore.modal.task"
    />
    <!-- 삭제 확인 얼럿 -->
    <div
      v-if="uiStore.modal.isOpen && uiStore.modal.type === 'delete'"
      class="modal-overlay"
      @click.self="uiStore.closeModal()"
    >
      <div class="delete-alert">
        <div class="alert-icon">!</div>
        <h3 class="alert-title">Task를 삭제하시겠습니까?</h3>
        <div class="alert-task-name">{{ uiStore.modal.task?.title }}</div>
        <p class="alert-warn">삭제 후 복구할 수 없습니다.</p>
        <div class="alert-buttons">
          <button class="btn btn-secondary" @click="uiStore.closeModal()">취소</button>
          <button class="btn btn-delete" @click="confirmDelete">삭제</button>
        </div>
      </div>
    </div>

    <!-- 알림 토스트 -->
    <div v-if="uiStore.notification.isVisible" :class="['toast', `toast-${uiStore.notification.type}`]">
      {{ uiStore.notification.message }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'
import NoticeBar from '@/components/common/NoticeBar.vue'
import Header from '@/components/common/Header.vue'
import WaitingList from '@/components/schedule/WaitingList.vue'
import TimeTable from '@/components/schedule/TimeTable.vue'
import TaskForm from '@/components/schedule/TaskForm.vue'
import TaskDetail from '@/components/schedule/TaskDetail.vue'

const taskStore = useTaskStore()
const uiStore = useUiStore()

onMounted(() => {
  taskStore.fetchTasks()
})

const confirmDelete = async () => {
  const task = uiStore.modal.task
  await taskStore.deleteTask(task.id)
  uiStore.showNotification('success', 'Task가 삭제되었습니다')
  uiStore.closeModal()
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: var(--gray-50);
}

/* NoticeBar(46px) + Header(56px) = 102px */
.dashboard-content {
  padding-top: 102px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  gap: 16px;
  padding: 16px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* 삭제 얼럿 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.delete-alert {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 28px 24px;
  width: 320px;
  max-width: 90vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.alert-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--danger-light);
  color: var(--danger);
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FCA5A5;
}

.alert-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}

.alert-task-name {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
  width: 100%;
  box-sizing: border-box;
}

.alert-warn {
  font-size: 12px;
  color: var(--danger);
  margin: 0;
}

.alert-buttons {
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
}

.btn {
  padding: 8px 20px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
}

.btn-secondary {
  background: white;
  color: var(--gray-500);
  border: 1px solid var(--gray-200);
}
.btn-secondary:hover { background: var(--gray-50); }

.btn-delete {
  background: var(--danger);
  color: white;
}
.btn-delete:hover { background: var(--danger-dark); }

/* 토스트 알림 */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 10px 18px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slide-in 0.25s ease;
}

.toast-success { background: var(--success-light); color: var(--success-dark); border: 1px solid #86EFAC; }
.toast-error { background: var(--danger-light); color: var(--danger-dark); border: 1px solid #FCA5A5; }
.toast-info { background: var(--primary-light); color: var(--primary-dark); border: 1px solid #93C5FD; }

@keyframes slide-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
