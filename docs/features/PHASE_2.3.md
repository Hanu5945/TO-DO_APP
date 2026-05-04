# 🎯 Phase 2.3 - 탭 네비게이션 (Tab Navigation)

## 개요

**목표**: 사용자 권한에 따라 대시보드 탭을 표시하고, 탭 클릭 시 해당 뷰로 이동하는 기능 구현

**상태**: ✅ 완료 (새로고침 상태 유지 문제 해결)

---

## 기능 명세

### 탭 목록

| 탭 | 표시 대상 | 경로 | 설명 |
|----|----------|------|------|
| 개인뷰 | 전체 (Member/Admin/SuperAdmin) | `/dashboard/personal` | 개인의 일일 스케줄 |
| 팀뷰 | Admin, SuperAdmin만 표시 (Member는 숨김) | `/dashboard/team` | 팀원 전체의 스케줄 |
| 달력뷰 | 전체 (Member/Admin/SuperAdmin) | `/dashboard/calendar` | 월간 달력 보기 |

### 탭 스타일

**비활성 상태**
```
색상: var(--gray-500) (#6B7280)
테두리: 투명
전환: 0.2s ease
```

**활성 상태**
```
색상: var(--primary) (#3B82F6)
테두리: 하단 2px 파란색
```

**호버 상태**
```
색상: var(--gray-700) (#374151)
```

### 권한 체계

```
MEMBER
├─ 개인뷰 ✓
├─ 팀뷰 ✗ (숨김)
└─ 달력뷰 ✓

ADMIN
├─ 개인뷰 ✓
├─ 팀뷰 ✓
└─ 달력뷰 ✓

SUPER_ADMIN
├─ 개인뷰 ✓
├─ 팀뷰 ✓
└─ 달력뷰 ✓
```

---

## 구현 체크리스트

### 컴포넌트 (Header.vue)

- [x] `router-link` 사용 (Vue Router 기반 네비게이션)
- [x] `useRoute()` hook으로 현재 경로 감지
- [x] `currentTab` computed로 활성 탭 판단
- [x] `v-if="!authStore.isMember"` 조건으로 팀뷰 숨김
- [x] CSS 클래스 바인딩 (`:class="{active: ...}"`)

### 상태 관리 (authStore.js)

- [x] `useAuthStore()`로 사용자 권한 조회
- [x] `isMember` computed 속성으로 Member 판정
- [x] localStorage 복원 추가 (새로고침 시 상태 유지)
  ```javascript
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  ```

### 라우터 (router/index.js)

- [x] `/dashboard/personal` 라우트
- [x] `/dashboard/team` 라우트
- [x] `/dashboard/calendar` 라우트
- [x] 권한 검증 (라우터 가드)

### 테스트 (tests/e2e/phase2-verification.js)

- [x] Member 계정: 팀뷰 숨김 확인
- [x] Admin 계정: 팀뷰 표시 확인
- [x] SuperAdmin 계정: 팀뷰 표시 확인
- [x] 활성 탭 색상 검증

---

## 파일 구조

```
src/
├── components/common/
│   └── Header.vue          # 탭 네비게이션 UI
├── router/
│   └── index.js            # 라우트 정의 + 가드
├── stores/
│   └── authStore.js        # 권한 관리
└── pages/
    ├── Dashboard/
    │   ├── PersonalView.vue
    │   ├── TeamView.vue
    │   └── CalendarView.vue

tests/
└── e2e/
    └── phase2-verification.js  # 탭 네비게이션 테스트
```

---

## 해결된 문제

### 문제: 새로고침 시 사용자 정보 초기화

**원인**:
```javascript
// 잘못된 코드
const user = ref(null)  // 항상 null로 초기화
const token = ref(localStorage.getItem('token') || null)  // token만 복원
```

**해결**:
```javascript
// 수정된 코드
const user = ref(JSON.parse(localStorage.getItem('user')) || null)  // user 복원
const token = ref(localStorage.getItem('token') || null)
```

**결과**: 새로고침 후에도 사용자 정보 유지 ✅

---

## 테스트 결과

### 개발 환경 (localhost:5173)
```
✅ Member 계정
   - 개인뷰: 보임
   - 팀뷰: 숨김 (v-if 조건)
   - 달력뷰: 보임
   - 새로고침: 상태 유지

✅ Admin 계정
   - 개인뷰: 보임
   - 팀뷰: 보임
   - 달력뷰: 보임
   - 새로고침: 상태 유지

✅ SuperAdmin 계정
   - 개인뷰: 보임
   - 팀뷰: 보임
   - 달력뷰: 보임
   - 새로고침: 상태 유지
```

### 운영 환경 (localhost:4173)
```
✅ 모든 계정 통과
```

---

## 다음 Phase

**Phase 2.4: 메인 화면 - Personal Daily View**
- 대기 목록 (Waiting List)
- 시간표 (Time Table)
- Task 상태 색상

---

**최종 수정**: 2026년 4월 29일  
**상태**: 완성 ✅
