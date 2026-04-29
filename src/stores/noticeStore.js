/**
 * 공지 상태 관리 (Notice Store)
 * PRODUCT_SPEC.md의 공지 배너 명세를 구현
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNoticeStore = defineStore('notice', () => {
  // 상태
  const notices = ref([
    {
      id: 1,
      title: '공지',
      message: '내일 오후 2시 서버 점검 예정입니다',
      createdAt: new Date(),
      createdBy: 'admin'
    }
  ])

  const isHidden = ref(false) // 세션 중 숨김 상태
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const visibleNotices = computed(() => {
    if (isHidden.value) return []
    return notices.value
  })

  const latestNotice = computed(() => {
    return visibleNotices.value[0] || null
  })

  const hasNotice = computed(() => {
    return visibleNotices.value.length > 0
  })

  // Actions
  const fetchNotices = async () => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: API 호출 (실제 구현 시)
      // const response = await fetch('/api/notices')
      // const data = await response.json()
      // notices.value = data

      // 임시: 테스트용 데이터 (위에 이미 설정됨)
      await new Promise((resolve) => setTimeout(resolve, 300))
      isHidden.value = false // 새로운 공지 → 자동 재표시
    } catch (err) {
      error.value = err.message || '공지 조회 중 오류가 발생했습니다'
    } finally {
      isLoading.value = false
    }
  }

  // 공지 배너 닫기 (세션 내 유지)
  const hideNotice = () => {
    isHidden.value = true
  }

  // 공지 배너 다시 표시
  const showNotice = () => {
    isHidden.value = false
  }

  // 공지 추가 (관리자만)
  const addNotice = async (noticeData) => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: API 호출 (실제 구현 시)
      // const response = await fetch('/api/notices', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(noticeData)
      // })
      // const newNotice = await response.json()

      // 임시: 로컬 추가
      const newNotice = {
        id: Math.max(...notices.value.map((n) => n.id), 0) + 1,
        title: noticeData.title,
        message: noticeData.message,
        createdAt: new Date(),
        createdBy: noticeData.createdBy || 'user'
      }
      notices.value.unshift(newNotice)
      isHidden.value = false // 새 공지 → 자동 재표시
    } catch (err) {
      error.value = err.message || '공지 등록 중 오류가 발생했습니다'
    } finally {
      isLoading.value = false
    }
  }

  // 공지 삭제 (Super Admin만)
  const deleteNotice = async (noticeId) => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: API 호출 (실제 구현 시)
      // await fetch(`/api/notices/${noticeId}`, { method: 'DELETE' })

      // 임시: 로컬 삭제
      notices.value = notices.value.filter((n) => n.id !== noticeId)
    } catch (err) {
      error.value = err.message || '공지 삭제 중 오류가 발생했습니다'
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    notices,
    isHidden,
    isLoading,
    error,

    // Getters
    visibleNotices,
    latestNotice,
    hasNotice,

    // Actions
    fetchNotices,
    hideNotice,
    showNotice,
    addNotice,
    deleteNotice
  }
})
