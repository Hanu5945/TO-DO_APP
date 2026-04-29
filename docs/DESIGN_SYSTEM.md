# 🎨 디자인 시스템

## 1. 색상 (Color Palette)

### 기본 색상
```css
/* Primary */
--primary: #3B82F6;        /* 파랑 - 진행중, CTA */
--primary-light: #EFF6FF;  /* 연한 파랑 - 배경 */
--primary-dark: #1D4ED8;   /* 짙은 파랑 - 텍스트 */

/* Success */
--success: #22C55E;        /* 초록 - 완료 */
--success-light: #F0FDF4;  /* 연한 초록 - 배경 */
--success-dark: #15803D;   /* 짙은 초록 - 텍스트 */

/* Danger */
--danger: #EF4444;         /* 빨강 - 지연, 삭제 */
--danger-light: #FEF2F2;   /* 연한 빨강 - 배경 */
--danger-dark: #DC2626;    /* 짙은 빨강 - 텍스트 */

/* Warning */
--warning: #FCD34D;        /* 노랑 - 경고 */
--warning-light: #FEFCE8;  /* 연한 노랑 - 배경 */

/* Gray */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Admin Role */
--admin: #7C3AED;          /* 보라 - 관리자 */
--admin-light: #EDE9FE;    /* 연한 보라 */
--admin-dark: #6D28D9;     /* 짙은 보라 */

/* Role Indicators */
--role-member: #D1FAE5;    /* 초록 배경 - Member */
--role-admin: #FEF3C7;     /* 주황 배경 - Admin */
--role-super-admin: #EDE9FE; /* 보라 배경 - Super Admin */
```

### 사용 규칙
1. **파랑 (#3B82F6)**
   - 진행 중인 Task
   - Primary 버튼
   - 활성 탭
   - 링크 텍스트

2. **초록 (#22C55E)**
   - 완료된 Task
   - 활성 상태 배지

3. **빨강 (#EF4444)**
   - 지연된 Task
   - 삭제 버튼
   - 에러 메시지

4. **보라 (#7C3AED)**
   - 공지 배너
   - 관리자 기능
   - Super Admin 아바타

5. **회색 (Gray)**
   - 대기 Task
   - 비활성 요소
   - 구분선

---

## 2. 타이포그래피 (Typography)

### 폰트 스택
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', sans-serif;
```

### 글꼴 크기 및 굵기
| 용도 | 크기 | 굵기 | 라인높이 |
|-----|------|------|---------|
| 페이지 제목 (h1) | 22px | 700 | 1.3 |
| 섹션 제목 (h2) | 18px | 700 | 1.3 |
| 소제목 (h3) | 15px | 700 | 1.3 |
| 화면 제목 | 14px | 700 | 1.3 |
| 본문 텍스트 | 12px | 400 | 1.5 |
| 작은 텍스트 | 11px | 400 | 1.5 |
| 극소 텍스트 | 10px | 500 | 1.4 |
| 극소 텍스트 | 9px | 600 | 1.4 |

### 색상별 글꼴
```css
/* 메인 텍스트 */
color: #111827; /* --gray-900 */

/* 보조 텍스트 */
color: #6B7280; /* --gray-500 */

/* 비활성 텍스트 */
color: #9CA3AF; /* --gray-400 */

/* 링크 텍스트 */
color: #3B82F6; /* --primary */

/* 에러 텍스트 */
color: #DC2626; /* --danger-dark */
```

---

## 3. 间距 (Spacing)

### 기본 단위
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 20px;
--space-2xl: 24px;
--space-3xl: 32px;
--space-4xl: 40px;
--space-5xl: 56px;
```

### 사용 예시
- **패딩**: form-group: 10px / 컴포넌트 내부: 8-12px
- **마진**: 섹션 간격: 16px / 요소 간격: 8px
- **갭**: flex 간격: 8px / 그리드 간격: 2px

---

## 4. 보더 & 라운딩 (Borders & Border Radius)

### 보더 스타일
```css
/* 기본 보더 */
border: 1px solid #E5E7EB;

/* 약한 보더 */
border: 1px solid #F3F4F6;

/* 강조 보더 (포커스) */
border: 1px solid #3B82F6;

/* 에러 보더 */
border: 1px solid #FCA5A5;

/* 왼쪽만 보더 (상태 표시) */
border-left: 3px solid #3B82F6;
```

### 라운딩 (Border Radius)
```css
--radius-sm: 4px;    /* 작은 요소 (아이콘, 배지) */
--radius-md: 6px;    /* 중간 요소 (버튼, 입력) */
--radius-lg: 8px;    /* 큰 요소 (카드, 모달) */
--radius-xl: 10px;   /* 특대 요소 (테이블) */
--radius-full: 50%;  /* 아바타, 원형 배지 */
```

---

## 5. 그림자 (Shadows)

```css
/* 없음 */
box-shadow: none;

/* 약한 그림자 (하드웨어) */
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

/* 중간 그림자 (드롭다운, 카드) */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

/* 강한 그림자 (모달) */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

/* 포커스 그림자 */
box-shadow: 0 0 0 3px #EFF6FF, 0 0 0 4px #3B82F6;
```

---

## 6. 컴포넌트 스타일 가이드

### 버튼
```css
/* Primary (주요 액션) */
.btn-primary {
  background: #3B82F6;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.btn-primary:hover { background: #2563EB; }
.btn-primary:active { background: #1D4ED8; }

/* Secondary (보조 액션) */
.btn-secondary {
  background: white;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-secondary:hover { background: #F9FAFB; }

/* Danger (삭제/위험) */
.btn-danger {
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-danger:hover { background: #FEE2E2; }

/* Delete (삭제 확정) */
.btn-delete {
  background: #FEF2F2;
  color: #DC2626;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
```

### 입력 필드
```css
/* 기본 */
input, textarea {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 7px 11px;
  font-size: 12px;
  color: #1F2937;
  background: white;
}

/* 포커스 */
input:focus, textarea:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px #EFF6FF;
}

/* 비활성 */
input:disabled {
  background: #F9FAFB;
  color: #6B7280;
  cursor: not-allowed;
}

/* 에러 */
input.error {
  border-color: #FCA5A5;
  background: #FEF2F2;
}
```

### 배지 (Badge)
```css
/* 상태 배지 */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
}

.badge-pending { background: #F9FAFB; color: #6B7280; }
.badge-in-progress { background: #EFF6FF; color: #1D4ED8; }
.badge-completed { background: #F0FDF4; color: #15803D; }
.badge-delayed { background: #FEF2F2; color: #DC2626; }

/* 권한 배지 */
.badge-sa { background: #EDE9FE; color: #6D28D9; border: 1px solid #DDD6FE; }
.badge-admin { background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; }
.badge-member { background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB; }
```

### 칩 (Chip)
```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 11px;
  color: #374151;
}

.chip .close {
  color: #9CA3AF;
  cursor: pointer;
  font-size: 13px;
}
```

### 모달
```css
.modal {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border-bottom: 1px solid #F3F4F6;
}

.modal-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.modal-pad {
  padding: 18px;
}
```

---

## 7. 상태별 색상 매핑

### Task 상태
| 상태 | 색상 | 배경색 | 텍스트색 | 사용 사례 |
|-----|------|-------|---------|---------|
| PENDING | 회색 | #F9FAFB | #6B7280 | 아직 시작하지 않음 |
| IN_PROGRESS | 파랑 | #EFF6FF | #1D4ED8 | 진행 중 |
| COMPLETED | 초록 | #F0FDF4 | #15803D | 완료됨 |
| DELAYED | 빨강 | #FEF2F2 | #DC2626 | 지연됨 |

### 권한
| 권한 | 색상 | 아바타 | 배지 |
|-----|------|-------|------|
| SUPER_ADMIN | 보라 | #EDE9FE bg | "슈" |
| ADMIN | 주황 | #FEF3C7 bg | "관" |
| MEMBER | 초록 | #D1FAE5 bg | "M" |

### 사용자 상태
| 상태 | 색상 | 배경색 |
|-----|------|-------|
| ACTIVE | 초록 | #D1FAE5 |
| INACTIVE | 빨강 | #FEE2E2 |

---

## 8. 반응형 디자인 브레이크포인트

```css
/* Mobile (xs) */
@media (max-width: 640px) {
  font-size: 12px; /* 본문 크기 유지 */
  padding: 8px;    /* 컴팩트 패딩 */
  gap: 6px;        /* 줄어든 갭 */
}

/* Tablet (sm) */
@media (min-width: 641px) and (max-width: 1024px) {
  font-size: 12px;
  padding: 12px;
  gap: 8px;
}

/* Desktop (lg) */
@media (min-width: 1025px) {
  font-size: 12px;
  padding: 16px;
  gap: 8px;
}
```

---

## 9. CSS 변수 정의 (variables.css)

```css
:root {
  /* Colors */
  --primary: #3B82F6;
  --primary-light: #EFF6FF;
  --primary-dark: #1D4ED8;
  --success: #22C55E;
  --success-light: #F0FDF4;
  --danger: #EF4444;
  --danger-light: #FEF2F2;
  --warning: #FCD34D;
  --admin: #7C3AED;
  --admin-light: #EDE9FE;
  
  /* Gray Scale */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Typography */
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 12px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 10px;
  --radius-full: 50%;
  
  /* Shadows */
  --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

---

## 10. 접근성 (Accessibility)

### 색상 대비
- **WCAG AA 준수**: 최소 4.5:1 (텍스트), 3:1 (UI)
- **예**: 검정 텍스트(#111827) on 흰색 배경(#FFFFFF) = 16.5:1

### 포커스 상태
```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 아이콘 대안 텍스트
- 모든 아이콘에 `aria-label` 또는 `title` 속성 추가
- 예: `<button aria-label="이전 날짜">◀</button>`

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안
