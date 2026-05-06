<template>
  <div class="modal-overlay" @click.self="onClose">
    <div class="modal">
      <div class="modal-head">
        <h2 class="modal-title">
          Task 상세
          <span :class="['badge', statusBadge]">{{ statusLabel }}</span>
        </h2>
        <button class="close-btn" @click="onClose">×</button>
      </div>

      <div class="modal-body">
        <div class="field">
          <label class="label">제목</label>
          <input :value="task.title" class="input" disabled />
        </div>

        <div class="field">
          <label class="label">담당자</label>
          <div class="assignee-chips">
            <span v-for="a in task.assignees" :key="a.id" class="chip">{{ a.name }}</span>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="label">시작 일시</label>
            <input :value="task.startDateTime || '미지정'" class="input" disabled />
          </div>
          <div class="field">
            <label class="label">종료 일시</label>
            <input :value="task.endDateTime || '미지정'" class="input" disabled />
          </div>
        </div>

        <div v-if="task.memo" class="field">
          <label class="label">메모</label>
          <textarea :value="task.memo" class="input textarea" disabled rows="3" />
        </div>

        <div v-if="task.delayReason" class="delay-box">
          <p class="delay-label">⚠ 지연 사유</p>
          <p class="delay-reason">{{ task.delayReason }}</p>
          <p v-if="task.delayRecordedAt" class="delay-date">기록일시: {{ formatDate(task.delayRecordedAt) }}</p>
        </div>

        <p class="read-only-notice">수정은 상위 직급만 가능합니다</p>
      </div>

      <div class="modal-foot">
        <button class="btn btn-secondary" @click="onClose">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'

const props = defineProps({
  task: { type: Object, required: true }
})

const uiStore = useUiStore()
const onClose = () => uiStore.closeModal()

const statusLabel = computed(() => {
  const map = { PENDING: '대기', IN_PROGRESS: '진행중', COMPLETED: '완료', DELAYED: '지연' }
  return map[props.task.status] || ''
})

const statusBadge = computed(() => {
  const map = {
    PENDING: 'badge-pending',
    IN_PROGRESS: 'badge-in-progress',
    COMPLETED: 'badge-completed',
    DELAYED: 'badge-delayed'
  }
  return map[props.task.status] || ''
})

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  width: 420px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--gray-100);
}

.modal-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-900);
  display: flex;
  align-items: center;
  gap: 6px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover { color: var(--gray-700); }

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  padding: 12px 18px;
  border-top: 1px solid var(--gray-100);
}

.field { display: flex; flex-direction: column; gap: 5px; }

.field-row { display: flex; gap: 10px; }
.field-row .field { flex: 1; }

.label { font-size: 11px; font-weight: 600; color: var(--gray-700); }

.input {
  padding: 7px 10px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--gray-500);
  background: var(--gray-50);
  cursor: not-allowed;
}

.textarea { resize: none; font-family: inherit; }

.assignee-chips { display: flex; flex-wrap: wrap; gap: 5px; }

.chip {
  display: inline-block;
  background: var(--gray-100);
  color: var(--gray-700);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 500;
}

.delay-box {
  background: var(--danger-light);
  border: 1px solid #FCA5A5;
  border-radius: var(--radius-md);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delay-label { font-size: 11px; font-weight: 700; color: var(--danger-dark); margin: 0; }
.delay-reason { font-size: 11px; color: var(--danger-dark); margin: 0; }
.delay-date { font-size: 10px; color: var(--danger); margin: 0; }

.read-only-notice {
  font-size: 10px;
  color: var(--gray-400);
  text-align: center;
  margin: 0;
}

.btn {
  padding: 7px 14px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--gray-200);
  background: white;
  color: var(--gray-500);
  transition: all 0.15s;
}
.btn:hover { background: var(--gray-50); }

.badge { display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 500; }
.badge-pending { background: var(--gray-50); color: var(--gray-500); }
.badge-in-progress { background: var(--primary-light); color: var(--primary-dark); }
.badge-completed { background: var(--success-light); color: var(--success-dark); }
.badge-delayed { background: var(--danger-light); color: var(--danger-dark); }
</style>
