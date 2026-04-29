<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- 제목 -->
      <div class="auth-header">
        <h1 class="auth-title">팀 업무 스케줄러</h1>
        <p class="auth-subtitle">로그인하여 시작하세요</p>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="auth-form">
        <!-- 에러 메시지 (전체 폼 에러) -->
        <div v-if="formError" class="form-error-box">
          {{ formError }}
        </div>

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
          placeholder="8자 이상의 비밀번호"
          required
          :error="errors.password"
          @blur="validateField('password')"
        />

        <!-- 버튼 그룹 -->
        <div class="button-group">
          <Button type="primary" :disabled="isLoading">
            {{ isLoading ? '로그인 중...' : '로그인' }}
          </Button>
          <Button
            type="secondary"
            @click.prevent="goToSignup"
            :disabled="isLoading"
          >
            회원가입
          </Button>
        </div>
      </form>

      <!-- 하단 링크 -->
      <div class="auth-links">
        <router-link to="/auth/find-email" class="auth-link">ID 찾기</router-link>
        <span class="link-divider">|</span>
        <router-link to="/auth/find-password" class="auth-link">
          비밀번호 찾기
        </router-link>
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
import { validateLoginForm } from '@/utils/validation'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const formError = ref(null)
const isLoading = ref(false)

// 개별 필드 검증
const validateField = (fieldName) => {
  const result = validateLoginForm(form)
  errors[fieldName] = result[fieldName] || ''
}

// 전체 폼 검증
const validateForm = () => {
  const result = validateLoginForm(form)
  Object.assign(errors, result)
  return Object.keys(result).length === 0
}

// 로그인 처리
const handleLogin = async () => {
  formError.value = null

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const success = await authStore.login(form.email, form.password)

    if (success) {
      // 로그인 성공 - 메인 화면으로 이동
      router.push('/dashboard/personal')
    } else {
      // 로그인 실패
      formError.value = '이메일 또는 비밀번호가 올바르지 않습니다'
    }
  } catch (err) {
    formError.value = err.message || '로그인 중 오류가 발생했습니다'
  } finally {
    isLoading.value = false
  }
}

// 회원가입 페이지로 이동
const goToSignup = () => {
  router.push('/auth/signup')
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

.button-group {
  display: flex;
  gap: var(--space-md);
}

.button-group :deep(.btn) {
  flex: 1;
}

.auth-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  font-size: 11px;
}

.auth-link {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.link-divider {
  color: var(--gray-300);
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
