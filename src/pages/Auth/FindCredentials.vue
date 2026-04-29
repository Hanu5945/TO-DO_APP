<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- 제목 -->
      <div class="auth-header">
        <h1 class="auth-title">팀 업무 스케줄러</h1>
        <p class="auth-subtitle">ID / 비밀번호 찾기</p>
      </div>

      <!-- 탭 네비게이션 -->
      <div class="tabs">
        <button
          :class="['tab', { active: activeTab === 'email' }]"
          @click="activeTab = 'email'"
        >
          이메일 찾기
        </button>
        <button
          :class="['tab', { active: activeTab === 'password' }]"
          @click="activeTab = 'password'"
        >
          비밀번호 찾기
        </button>
      </div>

      <!-- 이메일 찾기 탭 -->
      <form
        v-if="activeTab === 'email'"
        @submit.prevent="handleFindEmail"
        class="auth-form"
      >
        <!-- 에러 메시지 -->
        <div v-if="errors.findEmail" class="form-error-box">
          {{ errors.findEmail }}
        </div>

        <!-- 성공 메시지 -->
        <div v-if="successMessage.email" class="form-success-box">
          {{ successMessage.email }}
        </div>

        <!-- 이름 입력 -->
        <Input
          v-model="findEmailForm.name"
          type="text"
          label="이름"
          placeholder="홍길동"
          required
          :error="fieldErrors.findEmailName"
          @blur="validateField('findEmailName')"
        />

        <!-- 버튼 -->
        <Button type="primary" :disabled="isLoading">
          {{ isLoading ? '검색 중...' : '이메일 찾기' }}
        </Button>
      </form>

      <!-- 비밀번호 찾기 탭 -->
      <form
        v-if="activeTab === 'password'"
        @submit.prevent="handleFindPassword"
        class="auth-form"
      >
        <!-- 에러 메시지 -->
        <div v-if="errors.findPassword" class="form-error-box">
          {{ errors.findPassword }}
        </div>

        <!-- 성공 메시지 -->
        <div v-if="successMessage.password" class="form-success-box">
          {{ successMessage.password }}
        </div>

        <!-- 이메일 입력 -->
        <Input
          v-model="findPasswordForm.email"
          type="email"
          label="이메일"
          placeholder="your@email.com"
          required
          :error="fieldErrors.findPasswordEmail"
          @blur="validateField('findPasswordEmail')"
        />

        <!-- 안내문 -->
        <p class="help-text">
          가입된 이메일로 임시 비밀번호를 발송해드립니다.
        </p>

        <!-- 버튼 -->
        <Button type="primary" :disabled="isLoading">
          {{ isLoading ? '발송 중...' : '임시 비밀번호 발송' }}
        </Button>
      </form>

      <!-- 하단 링크 -->
      <div class="auth-footer">
        <span class="auth-text">계정이 있으신가요?</span>
        <router-link to="/auth/login" class="auth-link">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import {
  validateFindEmailForm,
  validateFindPasswordForm,
  validateEmail,
  maskEmail
} from '@/utils/validation'

const router = useRouter()

const activeTab = ref('email')

const findEmailForm = reactive({
  name: ''
})

const findPasswordForm = reactive({
  email: ''
})

const errors = reactive({
  findEmail: null,
  findPassword: null
})

const fieldErrors = reactive({
  findEmailName: '',
  findPasswordEmail: ''
})

const successMessage = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)

// 개별 필드 검증
const validateField = (fieldName) => {
  if (fieldName === 'findEmailName') {
    const result = validateFindEmailForm(findEmailForm)
    fieldErrors.findEmailName = result.name || ''
  } else if (fieldName === 'findPasswordEmail') {
    const result = validateFindPasswordForm(findPasswordForm)
    fieldErrors.findPasswordEmail = result.email || ''
  }
}

// 이메일 찾기 처리
const handleFindEmail = async () => {
  errors.findEmail = null
  successMessage.email = ''

  const result = validateFindEmailForm(findEmailForm)
  if (Object.keys(result).length > 0) {
    Object.assign(fieldErrors, { findEmailName: result.name || '' })
    return
  }

  isLoading.value = true

  try {
    // TODO: API 호출 (실제 구현 시)
    // const response = await fetch('/api/auth/find-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: findEmailForm.name })
    // })

    // 임시: 테스트용 데이터
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockEmail = 'kim***@company.com'
    successMessage.email = `가입된 이메일: ${mockEmail}`
  } catch (err) {
    errors.findEmail = err.message || '이메일 검색 중 오류가 발생했습니다'
  } finally {
    isLoading.value = false
  }
}

// 비밀번호 찾기 처리
const handleFindPassword = async () => {
  errors.findPassword = null
  successMessage.password = ''

  const result = validateFindPasswordForm(findPasswordForm)
  if (Object.keys(result).length > 0) {
    Object.assign(fieldErrors, { findPasswordEmail: result.email || '' })
    return
  }

  isLoading.value = true

  try {
    // TODO: API 호출 (실제 구현 시)
    // const response = await fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: findPasswordForm.email })
    // })

    // 임시: 테스트용 데이터
    await new Promise((resolve) => setTimeout(resolve, 500))

    successMessage.password = '임시 비밀번호를 이메일로 발송했습니다'
  } catch (err) {
    errors.findPassword = err.message || '비밀번호 초기화 중 오류가 발생했습니다'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-light) 0%, #ffffff 100%);
  padding: var(--space-lg);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-3xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.auth-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 var(--space-sm) 0;
  line-height: 1.3;
}

.auth-subtitle {
  font-size: 14px;
  color: var(--gray-500);
  margin: 0;
  line-height: 1.5;
}

.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: var(--space-2xl);
}

.tab {
  flex: 1;
  padding: var(--space-md) var(--space-sm);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--gray-700);
}

.tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-error-box {
  background-color: var(--danger-light);
  color: var(--danger-dark);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  font-size: 12px;
  border-left: 3px solid var(--danger);
}

.form-success-box {
  background-color: var(--success-light);
  color: var(--success-dark);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  font-size: 12px;
  border-left: 3px solid var(--success);
}

.help-text {
  margin: 0;
  font-size: 11px;
  color: var(--gray-500);
  line-height: 1.5;
}

.auth-footer {
  text-align: center;
  margin-top: var(--space-xl);
  font-size: 12px;
}

.auth-text {
  color: var(--gray-500);
}

.auth-link {
  margin-left: var(--space-sm);
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* 반응형 */
@media (max-width: 640px) {
  .auth-card {
    padding: var(--space-2xl);
  }

  .auth-header {
    margin-bottom: var(--space-lg);
  }

  .auth-title {
    font-size: 18px;
  }
}
</style>
