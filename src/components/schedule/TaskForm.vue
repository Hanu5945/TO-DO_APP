<template>
  <div class="modal-overlay" @click.self="onClose">
    <div class="modal">
      <div class="modal-head">
        <h2 class="modal-title">
          {{ isEdit ? 'Task 수정' : 'Task 등록' }}
          <span v-if="isEdit && form.status === 'DELAYED'" class="badge badge-delayed">지연</span>
        </h2>
        <button class="close-btn" @click="onClose">×</button>
      </div>

      <div class="modal-body">
        <!-- 제목 -->
        <div class="field">
          <label class="label">제목 <span class="required">*</span></label>
          <input v-model="form.title" class="input" placeholder="Task 제목 입력" maxlength="100" />
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>

        <!-- 담당자 -->
        <div class="field">
          <label class="label">담당자 <span class="required">*</span></label>
          <div class="assignee-chips">
            <span
              v-for="a in form.assignees"
              :key="a.id"
              class="chip"
            >
              {{ a.name }}
              <button class="chip-remove" @click="removeAssignee(a.id)">×</button>
            </span>
          </div>
          <select class="input select-input" @change="addAssignee($event)">
            <option value="">+ 담당자 추가</option>
            <option
              v-for="u in availableUsers"
              :key="u.id"
              :value="u.id"
            >{{ u.name }}</option>
          </select>
          <span v-if="errors.assignees" class="error">{{ errors.assignees }}</span>
        </div>

        <!-- 시작/종료 일시 -->
        <div class="field-row">
          <div class="field">
            <label class="label">시작 일시</label>
            <input v-model="form.startDateTime" type="datetime-local" class="input" />
          </div>
          <div class="field">
            <label class="label">종료 일시</label>
            <input v-model="form.endDateTime" type="datetime-local" class="input" />
          </div>
        </div>

        <p v-if="isPeriodTask" class="hint">ⓘ 종료일이 다르면 기간 Task로 처리됩니다</p>
        <span v-if="errors.datetime" class="error">{{ errors.datetime }}</span>

        <!-- 메모 -->
        <div class="field">
          <label class="label">메모 <span class="optional">(선택)</span></label>
          <textarea v-model="form.memo" class="input textarea" placeholder="메모 입력" maxlength="500" rows="3" />
        </div>

        <!-- 지연 사유 (수정 모달, 지연 상태일 때) -->
        <div v-if="isEdit && task?.delayReason" class="delay-box">
          <p class="delay-label">⚠ 지연 사유</p>
          <p class="delay-reason">{{ task.delayReason }}</p>
          <p v-if="task.delayRecordedAt" class="delay-date">기록일시: {{ formatDate(task.delayRecordedAt) }}</p>
        </div>

        <!-- 최종 수정자 (수정 모달) -->
        <div v-if="isEdit && task?.updatedBy" class="updater-info">
          최종 수정자: {{ task.updatedBy.name }} · 방금 전
        </div>
      </div>

      <!-- 버튼 -->
      <div class="modal-foot">
        <button class="btn btn-secondary" @click="onClose">취소</button>
        <button v-if="isEdit" class="btn btn-danger" @click="onDelete">삭제</button>
        <button class="btn btn-primary" @click="onSubmit">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  task: { type: Object, default: null }
})

const taskStore = useTaskStore()
const uiStore = useUiStore()
const authStore = useAuthStore()

const isEdit = computed(() => !!props.task)

// 테스트용 팀원 목록 (추후 API 연동)
const allUsers = [
  { id: '1', name: '최고관리자' },
  { id: '2', name: '관리자' },
  { id: '3', name: '일반멤버' }
]

const form = ref({
  title: '',
  assignees: [],
  startDateTime: '',
  endDateTime: '',
  memo: '',
  status: 'PENDING'
})

const errors = ref({ title: '', assignees: '', datetime: '' })

// task prop이 바뀌면 폼 초기화
watch(() => props.task, (t) => {
  if (t) {
    form.value = {
      title: t.title,
      assignees: [...t.assignees],
      startDateTime: t.startDateTime || '',
      endDateTime: t.endDateTime || '',
      memo: t.memo || '',
      status: t.status
    }
  } else {
    form.value = {
      title: '',
      assignees: [{ id: authStore.user.id, name: authStore.user.name }],
      startDateTime: '',
      endDateTime: '',
      memo: '',
      status: 'PENDING'
    }
  }
}, { immediate: true })

const availableUsers = computed(() =>
  allUsers.filter((u) => !form.value.assignees.find((a) => a.id === u.id))
)

const isPeriodTask = computed(() => {
  if (!form.value.startDateTime || !form.value.endDateTime) return false
  return form.value.startDateTime.slice(0, 10) !== form.value.endDateTime.slice(0, 10)
})

const addAssignee = (e) => {
  const id = e.target.value
  if (!id) return
  const user = allUsers.find((u) => u.id === id)
  if (user) form.value.assignees.push(user)
  e.target.value = ''
}

const removeAssignee = (id) => {
  form.value.assignees = form.value.assignees.filter((a) => a.id !== id)
}

const validate = () => {
  errors.value = { title: '', assignees: '', datetime: '' }
  let ok = true
  if (!form.value.title.trim()) {
    errors.value.title = '제목은 필수입니다'
    ok = false
  }
  if (!form.value.assignees.length) {
    errors.value.assignees = '담당자는 1명 이상 필요합니다'
    ok = false
  }
  if (form.value.startDateTime && form.value.endDateTime) {
    if (form.value.endDateTime <= form.value.startDateTime) {
      errors.value.datetime = '종료 일시는 시작 이후여야 합니다'
      ok = false
    }
  }
  return ok
}

const onSubmit = async () => {
  if (!validate()) return
  const data = {
    title: form.value.title.trim(),
    assignees: form.value.assignees,
    startDateTime: form.value.startDateTime || null,
    endDateTime: form.value.endDateTime || null,
    memo: form.value.memo,
    updatedBy: { id: authStore.user.id, name: authStore.user.name },
    createdBy: props.task?.createdBy || { id: authStore.user.id, name: authStore.user.name }
  }
  if (isEdit.value) {
    await taskStore.updateTask(props.task.id, data)
    uiStore.showNotification('success', 'Task가 수정되었습니다')
  } else {
    await taskStore.createTask(data)
    uiStore.showNotification('success', 'Task가 생성되었습니다')
  }
  uiStore.closeModal()
}

const onDelete = () => {
  uiStore.closeModal()
  uiStore.openModal('delete', props.task)
}

const onClose = () => uiStore.closeModal()

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
  gap: 8px;
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
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid var(--gray-100);
}

.field { display: flex; flex-direction: column; gap: 5px; }

.field-row {
  display: flex;
  gap: 10px;
}
.field-row .field { flex: 1; }

.label {
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-700);
}

.required { color: var(--danger); }
.optional { color: var(--gray-400); font-weight: 400; }

.input {
  padding: 7px 10px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--gray-900);
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.textarea { resize: vertical; font-family: inherit; }

.select-input { cursor: pointer; }

.assignee-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-height: 24px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 500;
}

.chip-remove {
  background: none;
  border: none;
  color: var(--primary-dark);
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  line-height: 1;
}

.error { font-size: 11px; color: var(--danger); }

.hint {
  font-size: 10px;
  color: var(--gray-500);
  margin: 0;
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

.delay-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--danger-dark);
  margin: 0;
}

.delay-reason {
  font-size: 11px;
  color: var(--danger-dark);
  margin: 0;
}

.delay-date {
  font-size: 10px;
  color: var(--danger);
  margin: 0;
}

.updater-info {
  font-size: 10px;
  color: var(--gray-500);
  text-align: right;
}

/* 버튼 */
.btn {
  padding: 7px 14px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover { background: var(--primary-dark); }

.btn-secondary {
  background: white;
  color: var(--gray-500);
  border: 1px solid var(--gray-200);
}

.btn-secondary:hover { background: var(--gray-50); }

.btn-danger {
  background: var(--danger-light);
  color: var(--danger);
  border: 1px solid #FCA5A5;
}

.btn-danger:hover { background: #FEE2E2; }

/* 배지 */
.badge { display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 500; }
.badge-delayed { background: var(--danger-light); color: var(--danger-dark); }
</style>
