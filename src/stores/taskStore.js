import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const today = new Date()
const fmt = (d) => d.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"

const pad = (n) => String(n).padStart(2, '0')
const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

// 임시 테스트 데이터
const MOCK_TASKS = [
  {
    id: '1',
    title: '기획서 작성 완료',
    assignees: [{ id: '1', name: '최고관리자' }],
    startDateTime: `${todayStr}T07:00`,
    endDateTime: `${todayStr}T08:30`,
    status: 'COMPLETED',
    memo: '',
    delayReason: null,
    delayRecordedAt: null,
    createdBy: { id: '1', name: '최고관리자' },
    updatedBy: { id: '1', name: '최고관리자' },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '주간 보고서',
    assignees: [{ id: '2', name: '관리자' }],
    startDateTime: `${todayStr}T08:00`,
    endDateTime: `${todayStr}T10:00`,
    status: 'IN_PROGRESS',
    memo: 'v2 API 명세 포함 필요',
    delayReason: null,
    delayRecordedAt: null,
    createdBy: { id: '1', name: '최고관리자' },
    updatedBy: { id: '1', name: '최고관리자' },
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'API 명세 검토',
    assignees: [{ id: '2', name: '관리자' }, { id: '3', name: '일반멤버' }],
    startDateTime: `${todayStr}T08:00`,
    endDateTime: `${todayStr}T10:00`,
    status: 'DELAYED',
    memo: '',
    delayReason: 'v2 API 스펙 변경으로 인해 전면 재작성 필요',
    delayRecordedAt: new Date().toISOString(),
    createdBy: { id: '1', name: '최고관리자' },
    updatedBy: { id: '2', name: '관리자' },
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: '코드 리뷰',
    assignees: [{ id: '1', name: '최고관리자' }],
    startDateTime: null,
    endDateTime: null,
    status: 'PENDING',
    memo: '',
    delayReason: null,
    delayRecordedAt: null,
    createdBy: { id: '1', name: '최고관리자' },
    updatedBy: { id: '1', name: '최고관리자' },
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: '보고서 초안',
    assignees: [{ id: '3', name: '일반멤버' }],
    startDateTime: null,
    endDateTime: null,
    status: 'PENDING',
    memo: '',
    delayReason: null,
    delayRecordedAt: null,
    createdBy: { id: '3', name: '일반멤버' },
    updatedBy: { id: '3', name: '일반멤버' },
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'DB 설계',
    assignees: [{ id: '1', name: '최고관리자' }],
    startDateTime: `${todayStr}T10:00`,
    endDateTime: `${todayStr}T12:00`,
    status: 'IN_PROGRESS',
    memo: '',
    delayReason: null,
    delayRecordedAt: null,
    createdBy: { id: '1', name: '최고관리자' },
    updatedBy: { id: '1', name: '최고관리자' },
    createdAt: new Date().toISOString()
  }
]

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([...MOCK_TASKS])
  const isLoading = ref(false)
  const error = ref(null)
  const currentDate = ref(todayStr)

  // 대기 목록: 시간 미지정 Task
  const waitingTasks = computed(() =>
    tasks.value.filter((t) => !t.startDateTime)
  )

  // 특정 날짜의 시간표 Task
  const tasksByDate = computed(() => {
    return tasks.value.filter((t) => {
      if (!t.startDateTime) return false
      return t.startDateTime.startsWith(currentDate.value)
    })
  })

  const fetchTasks = async (date) => {
    if (date) currentDate.value = date
    isLoading.value = true
    error.value = null
    try {
      await new Promise((r) => setTimeout(r, 100))
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const createTask = async (taskData) => {
    isLoading.value = true
    error.value = null
    try {
      const newTask = {
        id: String(Date.now()),
        ...taskData,
        status: taskData.startDateTime ? 'PENDING' : 'PENDING',
        delayReason: null,
        delayRecordedAt: null,
        createdAt: new Date().toISOString()
      }
      tasks.value.push(newTask)
      return newTask
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const updateTask = async (id, taskData) => {
    isLoading.value = true
    error.value = null
    try {
      const idx = tasks.value.findIndex((t) => t.id === id)
      if (idx !== -1) {
        tasks.value[idx] = { ...tasks.value[idx], ...taskData }
      }
      return tasks.value[idx]
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const deleteTask = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      tasks.value = tasks.value.filter((t) => t.id !== id)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const recordDelay = async (id, reason) => {
    const idx = tasks.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      tasks.value[idx].status = 'DELAYED'
      tasks.value[idx].delayReason = reason
      tasks.value[idx].delayRecordedAt = new Date().toISOString()
    }
  }

  const changeDate = (offset) => {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() + offset)
    currentDate.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  }

  return {
    tasks,
    isLoading,
    error,
    currentDate,
    waitingTasks,
    tasksByDate,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    recordDelay,
    changeDate
  }
})
