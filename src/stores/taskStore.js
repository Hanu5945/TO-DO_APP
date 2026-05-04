import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref([
    {
      id: 'task-001',
      title: '보고서 초안 작성',
      description: '프로젝트 X 분기 보고서',
      status: 'IN_PROGRESS',
      assignees: ['kim123'],
      startDate: '2026-04-29',
      startTime: '09:00',
      endDate: '2026-04-29',
      endTime: '11:00',
      priority: 'HIGH',
      delayReason: null,
      memo: null,
      createdAt: '2026-04-25T10:30:00Z',
      updatedAt: '2026-04-29T09:00:00Z'
    },
    {
      id: 'task-002',
      title: '코드 리뷰',
      description: 'PR #123 검토',
      status: 'PENDING',
      assignees: ['lee456'],
      startDate: '2026-04-29',
      startTime: null,
      endDate: '2026-04-29',
      endTime: null,
      priority: 'MEDIUM',
      delayReason: null,
      memo: null,
      createdAt: '2026-04-26T14:20:00Z',
      updatedAt: '2026-04-26T14:20:00Z'
    },
    {
      id: 'task-003',
      title: '주간 보고서',
      description: '팀 성과 정리',
      status: 'COMPLETED',
      assignees: ['park789'],
      startDate: '2026-04-28',
      startTime: '14:00',
      endDate: '2026-04-28',
      endTime: '15:30',
      priority: 'MEDIUM',
      delayReason: null,
      memo: null,
      createdAt: '2026-04-27T10:00:00Z',
      updatedAt: '2026-04-28T15:30:00Z'
    }
  ])

  // Getters
  const getTodayTasks = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.value.filter(task => task.startDate === today)
  })

  const getWaitingTasks = computed(() => {
    return tasks.value.filter(task => !task.startTime && task.status !== 'COMPLETED')
  })

  const getScheduledTasks = computed(() => {
    return tasks.value.filter(task => task.startTime)
  })

  const getTasksByStatus = (status) => {
    return tasks.value.filter(task => task.status === status)
  }

  const getTasksByDate = (date) => {
    return tasks.value.filter(task => task.startDate === date)
  }

  // Actions
  const addTask = (task) => {
    tasks.value.push({
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  const updateTask = (id, updates) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const updateTaskStatus = (id, status) => {
    updateTask(id, { status })
  }

  return {
    // State
    tasks,

    // Getters
    getTodayTasks,
    getWaitingTasks,
    getScheduledTasks,
    getTasksByStatus,
    getTasksByDate,

    // Actions
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  }
})
