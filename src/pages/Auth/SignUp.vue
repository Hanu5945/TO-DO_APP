<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- 제목 -->
      <div class="auth-header">
        <h1 class="auth-title">팀 업무 스케줄러</h1>
        <p class="auth-subtitle">회원가입</p>
      </div>

      <!-- 회원가입 폼 -->
      <form @submit.prevent="handleSignup" class="auth-form">
        <!-- 에러 메시지 (전체 폼 에러) -->
        <div v-if="formError" class="form-error-box">
          {{ formError }}
        </div>

        <!-- 이름 입력 -->
        <Input
          v-model="form.name"
          type="text"
          label="이름"
          placeholder="홍길동"
          required
          :error="errors.name"
          @blur="validateField('name')"
        />

        <!-- 이메일 입력 -->
        <Input
          v-model="form.email"
          type="email"
          label="이메일"
          placeholder="your@email.com"
          required
          :error="errors.email"
          @blur="validateField('email')"
        />

        <!-- 비밀번호 입력 -->
        <Input
          v-model="form.password"
          type="password"
          label="비밀번호"
          placeholder="8자 이상, 영문+숫자 포함"
          required
          :error="errors.password"
          @blur="validateField('password')"
        />

        <!-- 비밀번호 확인 -->
        <Input
          v-model="form.confirmPassword"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          required
          :error="errors.confirmPassword"
          @blur="validateField('confirmPassword')"
        />

        <!-- 직급 선택 -->
        <div class="role-section">
          <label class="role-label">직급 <span class="required">*</span></label>
          <div class="role-options">
            <label class="role-option">
              <input
                type="radio"
                v-model="form.role"
                value="MEMBER"
                @change="errors.role = ''"
              />
              <span>일반</span>
            </label>
            <label class="role-option">
              <input
                type="radio"
                v-model="form.role"
                value="ADMIN"
                @change="errors.role = ''"
              />
              <span>상위 직급</span>
            </label>
          </div>
          <div v-if="errors.role" class="error">{{ errors.role }}</div>
          <p v-if="form.role === 'ADMIN'" class="role-notice">
            상위 직급은 관리자 승인 필요합니다
          </p>
        </div>

        <!-- 가입 신청 버튼 -->
        <Button type="primary" :disabled="isLoading">
          {{ isLoading ? '가입 신청 중...' : '가입 신청' }}
        </Button>
      </form>

      <!-- 하단 링크 -->
      <div class="auth-footer">
        <span class="auth-text">이미 계정이 있으신가요?</span>
        <router-link to="/auth/login" class="auth-link">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import { validateSignupForm } from '@/utils/validation'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'MEMBER'
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const formError = ref(null)
const isLoading = ref(false)

// 개별 필드 검증
const validateField = (fieldName) => {
  const result = validateSignupForm(form)
  errors[fieldName] = result[fieldName] || ''
}

// 전체 폼 검증
const validateForm = () => {
  const result = validateSignupForm(form)
  Object.assign(errors, result)
  return Object.keys(result).length === 0
}

// 회원가입 처리
const handleSignup = async () => {
  formError.value = null

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const success = await authStore.signup({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })

    if (success) {
      // 가입 성공 - 로그인 페이지로 이동
      router.push('/auth/login')
    } else {
      formError.value = authStore.error || '회원가입에 실패했습니다'
    }
  } catch (err) {
    formError.value = err.message || '회원가입 중 오류가 발생했습니다'
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
  margin-bottom: var(--space-3xl);
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

.role-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.role-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-700);
}

.required {
  color: var(--danger);
}

.role-options {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-md);
  background: var(--gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
}

.role-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  font-size: 12px;
  color: var(--gray-700);
}

.role-option input[type='radio'] {
  cursor: pointer;
}

.role-notice {
  margin: 0;
  padding: var(--space-sm) var(--space-md);
  background: var(--warning-light);
  border-radius: var(--radius-md);
  font-size: 11px;
  color: #92400E;
}

.error {
  font-size: 11px;
  color: var(--danger);
}

.auth-footer {
  text-align: center;
  margin-top: var(--space-lg);
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
    margin-bottom: var(--space-2xl);
  }

  .auth-title {
    font-size: 18px;
  }
}
</style>
