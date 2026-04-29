import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  const userRole = computed(() => user.value?.role || null)

  const isMember = computed(() => user.value?.role === 'MEMBER')

  const isAdmin = computed(() => ['ADMIN', 'SUPER_ADMIN'].includes(user.value?.role))

  const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN')

  // 임시 테스트 계정 데이터
  const testAccounts = {
    'super@wezon.com': {
      id: '1',
      name: '최고관리자',
      email: 'super@wezon.com',
      role: 'SUPER_ADMIN',
      password: '1'
    },
    'admin@wezon.com': {
      id: '2',
      name: '관리자',
      email: 'admin@wezon.com',
      role: 'ADMIN',
      password: '1'
    },
    'member@wezon.com': {
      id: '3',
      name: '일반멤버',
      email: 'member@wezon.com',
      role: 'MEMBER',
      password: '1'
    }
  }

  // Actions
  const login = async (email, password) => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: API 호출 (실제 구현 시)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })

      // 임시: 테스트 계정 검증
      const testAccount = testAccounts[email]

      if (!testAccount || testAccount.password !== password) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다')
      }

      // 테스트 계정으로 로그인
      const response = {
        ok: true,
        json: async () => ({
          token: 'test-token-' + Date.now(),
          user: {
            id: testAccount.id,
            name: testAccount.name,
            email: testAccount.email,
            role: testAccount.role
          }
        })
      }

      if (!response.ok) throw new Error('로그인 실패')

      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return true
    } catch (err) {
      error.value = err.message || '로그인 중 오류가 발생했습니다'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (formData) => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: API 호출 (실제 구현 시)
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      error.value = null
      return true
    } catch (err) {
      error.value = err.message || '회원가입 중 오류가 발생했습니다'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    userRole,
    isMember,
    isAdmin,
    isSuperAdmin,

    // Actions
    login,
    signup,
    logout
  }
})
