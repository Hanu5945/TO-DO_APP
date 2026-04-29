/**
 * 폼 검증 유틸리티
 * PRODUCT_SPEC.md의 검증 규칙을 구현
 */

// 이메일 형식 검증
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 비밀번호 검증 (8자 이상, 영문+숫자 포함)
export const validatePassword = (password) => {
  if (password.length < 8) return false
  return /[a-zA-Z]/.test(password) && /[0-9]/.test(password)
}

// 비밀번호 확인 일치 검증
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword && validatePassword(password)
}

// 이메일 중복 체크 (임시 - 실제 구현 시 API 호출)
export const checkEmailDuplicate = async (email) => {
  // TODO: API 호출 구현
  // const response = await fetch('/api/auth/check-email', { method: 'POST', body: JSON.stringify({ email }) })
  return false // 임시: 중복 없음
}

// 로그인 폼 검증
export const validateLoginForm = (formData) => {
  const errors = {}

  if (!formData.email) {
    errors.email = '이메일은 필수입니다'
  } else if (!validateEmail(formData.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요'
  }

  if (!formData.password) {
    errors.password = '비밀번호는 필수입니다'
  }

  return errors
}

// 회원가입 폼 검증
export const validateSignupForm = (formData) => {
  const errors = {}

  if (!formData.name) {
    errors.name = '이름은 필수입니다'
  }

  if (!formData.email) {
    errors.email = '이메일은 필수입니다'
  } else if (!validateEmail(formData.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요'
  }

  if (!formData.password) {
    errors.password = '비밀번호는 필수입니다'
  } else if (!validatePassword(formData.password)) {
    errors.password = '비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다'
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = '비밀번호 확인은 필수입니다'
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다'
  }

  if (!formData.role) {
    errors.role = '직급은 필수입니다'
  }

  return errors
}

// ID 찾기 폼 검증
export const validateFindEmailForm = (formData) => {
  const errors = {}

  if (!formData.name) {
    errors.name = '이름은 필수입니다'
  }

  return errors
}

// PW 찾기 폼 검증
export const validateFindPasswordForm = (formData) => {
  const errors = {}

  if (!formData.email) {
    errors.email = '이메일은 필수입니다'
  } else if (!validateEmail(formData.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요'
  }

  return errors
}

// 이메일 마스킹 (kim***@company.com)
export const maskEmail = (email) => {
  const [name, domain] = email.split('@')
  if (name.length <= 3) {
    return name + '*'.repeat(3) + '@' + domain
  }
  return name.substring(0, 3) + '*'.repeat(name.length - 3) + '@' + domain
}
