import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const modal = ref({
    isOpen: false,
    type: null, // 'create' | 'edit' | 'detail' | 'delete'
    task: null
  })

  const notification = ref({
    isVisible: false,
    type: 'success', // 'success' | 'error' | 'info'
    message: ''
  })

  let notifTimer = null

  const openModal = (type, task = null) => {
    modal.value = { isOpen: true, type, task }
  }

  const closeModal = () => {
    modal.value = { isOpen: false, type: null, task: null }
  }

  const showNotification = (type, message) => {
    if (notifTimer) clearTimeout(notifTimer)
    notification.value = { isVisible: true, type, message }
    notifTimer = setTimeout(() => {
      notification.value.isVisible = false
    }, 3000)
  }

  return {
    modal,
    notification,
    openModal,
    closeModal,
    showNotification
  }
})
