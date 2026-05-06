# 🚀 실행 계획 (Execution Plans)

## 1. 개발 페이즈 분해

### Phase 1: 기초 구축 (1주일)
**목표**: 프로젝트 초기 설정 및 기본 인증 시스템 구축

#### 1.1 프로젝트 초기화
- [o] Vue 3 + Vite 프로젝트 생성
- [o] Pinia 설치 및 설정 (npm install 완료 ✅ 2026-04-28)
- [o] Vue Router 설정 (npm install 완료 ✅ 2026-04-28)
- [o] ESLint + Prettier 설정 (설정 파일 생성 완료 ✅ 2026-04-28)
- [o] CSS 변수 및 리셋 스타일 작성

**산출물**: 초기 프로젝트 구조 완성 ✅

**진행 방식**:
```
사용자 관점에서의 단계적 실행:

1️⃣ npm install ✅ DONE
   → package.json의 모든 의존성(pinia, vue-router, eslint, prettier) 설치
   → node_modules 폴더 생성

2️⃣ npm run dev ✅ DONE
   → 개발 서버 시작 (localhost:5173)
   → 로그인 페이지 표시

3️⃣ 로그인/회원가입 테스트 ✅ DONE
   → 인증 시스템 동작 확인
   → 라우터 가드 동작 확인
   
4️⃣ 코드 저장 시 자동 포맷팅 ✅ DONE (ESLint + Prettier 적용)
   → VSCode에서 저장하면 자동 정렬
   → 코드 품질 검사 자동 수행
```

**✅ Phase 1.1 완료**: 기본 프로젝트 세팅 완료, 개발 도구 설정 완료

#### 1.2 인증 시스템 (Auth)
- [o] Login 컴포넌트 구현
- [o] SignUp 컴포넌트 구현
- [o] FindCredentials 컴포넌트 구현
- [o] authStore (Pinia) 구현
- [ ] API 연동 (login, signup, findEmail, resetPassword) - 임시 테스트 데이터 사용 중
- [o] JWT 토큰 관리 (localStorage)
- [o] Router Guard 설정 (인증/권한)
- [o] validation.js 유틸리티 (폼 검증)

**산출물**: 완전한 인증 시스템

**✅ 1.2 완료**: 로그인/회원가입/ID찾기 모두 정상 작동, 라우터 가드로 인증 상태 관리

**1.2 테스트 체크리스트** (TEST_PROCEDURES.md 참고)
```
npm run dev 후:
- [ ] 로그인 페이지 보이는가?
- [ ] super@wezon.com / asdf1234 로그인: 성공하는가?
- [ ] 대시보드로 이동하는가?
- [ ] Console에 에러는 없는가?
✅ 완료 / ❌ 실패 시 에러 메시지 보고
```

#### 1.3 공통 컴포넌트
- [o] Button.vue (Primary, Secondary, Danger 타입)
- [o] Badge.vue (상태별 색상)
- [o] Avatar.vue (권한별 색상)
- [o] Modal.vue (기본 레이아웃)
- [o] Input.vue (기본 입력 필드)
- [ ] Textarea.vue
- [ ] Chip.vue

**산출물**: 재사용 가능한 컴포넌트 라이브러리

**✅ 1.3 완료**: 5개 핵심 컴포넌트 완성, DESIGN_SYSTEM.md 준수

---

## ✅ Phase 1 완료 (2026-04-28)

**최종 상태**: 
- ✅ 로그인/회원가입/ID찾기 모두 정상 작동
- ✅ 사용자는 임시 테스트 계정으로 로그인/로그아웃 가능
- ✅ 라우터 가드로 인증되지 않은 사용자 자동 리다이렉트
- ✅ 모든 UI는 DESIGN_SYSTEM.md 준수
- ✅ ESLint + Prettier로 자동 코드 포맷팅 적용

**Phase 1 이후 상태**: 
→ **Phase 2 시작 준비 완료** 🚀

---

## 🧪 테스트 계정 (임시)

**로그인 테스트용 계정:**

| 역할 | 이메일 | 비밀번호 | 권한 |
|-----|--------|---------|-----|
| 최고관리자 | super@wezon.com | asdf1234 | SUPER_ADMIN |
| 관리자 | admin@wezon.com | asdf1234 | ADMIN |
| 일반멤버 | member@wezon.com | asdf1234 | MEMBER |

**사용 방법:**
1. `npm run dev` 실행
2. 위 이메일과 비밀번호로 로그인
3. 권한별 UI/기능 테스트

**주의**: 이 계정들은 authStore.js의 `testAccounts` 객체에 하드코딩되어 있습니다.
실제 API 연동 시 삭제해야 합니다.

---

## 🧪 자동화 테스트 파일 구조

**프로젝트 루트에 추가 (2026-04-29):**

```
tests/
├── e2e/
│   └── phase2-verification.js    ← Phase 2 E2E 테스트 스크립트
├── fixtures/
│   ├── testAccounts.js           ← 테스트 계정 데이터
│   └── expectedValues.js         ← 기대값 (색상, 메시지 등)
├── utils/
│   └── testHelpers.js            ← 테스트 헬퍼 함수
├── reports/                      ← 테스트 결과 (자동 생성)
│   ├── phase2-dev.json
│   └── phase2-prod.json
└── screenshots/                  ← 테스트 스크린샷 (자동 생성)
```

**package.json scripts 추가:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "prod": "vite build && vite preview",
    "test:dev": "node tests/e2e/phase2-verification.js http://localhost:5173",
    "test:prod": "node tests/e2e/phase2-verification.js http://localhost:4173"
  },
  "devDependencies": {
    "puppeteer": "^21.0.0"
  }
}
```

**테스트 실행 방법:**
```bash
# 개발 환경
npm run dev        # 터미널 1
npm run test:dev   # 터미널 2

# 운영 환경
npm run prod       # 터미널 1
npm run test:prod  # 터미널 2
```

---

## 📋 Pinia/Vue Router 설치 확인 방법

**Phase 2를 시작하기 전에 꼭 확인하세요!**

### 방법 1️⃣: package.json 확인 (가장 쉬움)
```bash
# 에디터에서 열기
cat package.json | grep -A 10 "dependencies"
```

다음이 보여야 합니다:
```json
"dependencies": {
  "vue": "^3.x.x",
  "vue-router": "^4.2.0",
  "pinia": "^2.1.0"
}
```

### 방법 2️⃣: npm list로 확인
```bash
npm list pinia vue-router
```

성공 메시지:
```
├── pinia@2.1.0
└── vue-router@4.2.0
```

### 방법 3️⃣: node_modules 확인 (직접 확인)
```bash
# Linux/Mac
ls node_modules | grep pinia
ls node_modules | grep vue-router

# Windows (PowerShell)
dir node_modules | findstr pinia
dir node_modules | findstr vue-router
```

폴더가 보이면 설치 완료! ✅

### 방법 4️⃣: 실제 작동 확인 (확실함)
```bash
npm run dev
```

- 에러 없이 시작되면 설치 완료 ✅
- `Cannot find module` 에러 나면 미설치 ❌

---

---

## 🚀 Phase 2 시작

**시작일**: 2026-04-28
**목표**: 메인 화면 및 Task 관리 기본 기능 구현

**Phase 2 구현 순서**:
1. **2.1.1**: NoticeBar.vue (공지 배너) ✅ DONE (2026-04-28)
2. **2.1.2**: Header.vue (상단바 + 탭 네비게이션) ✅ DONE (2026-04-28)
3. **2.1.3**: TimeTable.vue (시간표) ← 다음 구현
4. **2.1.4**: WaitingList.vue (대기 목록)
5. 2.2: Task CRUD 기능
6. 2.3: 상태 관리 (taskStore)

---

### Phase 2: 메인 기능 (1주일)
**목표**: 메인 화면 및 Task 관리 기본 기능 구현

#### 2.1 메인 화면 (Dashboard)
- [o] Header.vue (탭 네비게이션) ✅ 2026-04-28
- [o] NoticeBar.vue (공지 배너) ✅ 2026-04-28
- [o] noticeStore.js (공지 상태 관리) ✅ 2026-04-28
- [o] PersonalView.vue (개인뷰 레이아웃 + NoticeBar + Header 통합) ✅ 2026-04-28
- [o] TeamView.vue (임시 팀뷰 페이지) ✅ 2026-04-28
- [o] CalendarView.vue (임시 달력뷰 페이지) ✅ 2026-04-28
- [o] 라우터 설정 (team, calendar 라우트 추가) ✅ 2026-04-28
- [o] WaitingList.vue (대기 목록) ✅ 2026-05-06
- [o] TimeTable.vue (시간표) ✅ 2026-05-06
- [o] TimeSlot.vue (시간 슬롯) ✅ 2026-05-06

**산출물**: 공지 배너 + 헤더가 포함된 메인 화면, 탭 네비게이션 정상 작동

**2.1.1-2.1.2 구현 완료:**
- ✅ NoticeBar.vue: 상단 고정, 보라색 배경, 공지 메시지 + 버튼
- ✅ noticeStore.js: 공지 상태 관리, 닫기 기능 (세션 내 유지)
- ✅ Header.vue: 제목 + 탭 네비게이션 + 사용자 아바타 + 로그아웃
- ✅ 탭 권한 제어: 팀뷰는 Member 숨김 (Admin+ 만 표시)
- ✅ 라우터: PersonalView, TeamView, CalendarView 연결
- ✅ PersonalView.vue: NoticeBar + Header 통합, 레이아웃 조정

**2.1.1-2.1.2 테스트 체크리스트** (TEST_PROCEDURES.md 참고)
```
npm run dev 후:

### NoticeBar 테스트
- [ ] 상단에 보라색 배너 보이는가?
- [ ] 공지 메시지가 표시되는가?
- [ ] [×] 버튼으로 닫힐 때 사라지는가?
- [ ] 로그아웃 후 다시 로그인해도 닫혀있는가? (세션 내 유지)
- [ ] F5 새로고침하면 다시 나타나는가?

### Header 테스트
#### Member 계정 (member@wezon.com)
- [ ] Header 보이는가? (NoticeBar 아래)
- [ ] [개인뷰] [달력뷰] 탭만 보이는가?
- [ ] [팀뷰] 탭은 안 보이는가? ✅
- [ ] 탭을 클릭하면 페이지 이동하는가?
- [ ] 사용자 이름 "일반멤버" 표시되는가?
- [ ] 아바타가 초록색인가?

#### Admin 계정 (admin@wezon.com)
- [ ] [개인뷰] [팀뷰] [달력뷰] 모두 보이는가?
- [ ] 사용자 이름 "관리자" 표시되는가?
- [ ] 아바타가 주황색인가?

#### SuperAdmin 계정 (super@wezon.com)
- [ ] [개인뷰] [팀뷰] [달력뷰] 모두 보이는가?
- [ ] 사용자 이름 "최고관리자" 표시되는가?
- [ ] 아바타가 보라색인가?

### 공통 확인
- [ ] Console에 빨간 에러 없는가?
- [ ] [로그아웃] 버튼 클릭하면 로그인 페이지로 가는가?

✅ 모두 완료 / ❌ 실패 시 에러 메시지 보고
```

#### 2.2 Task 관리 기본
- [o] TaskForm.vue (등록/수정 공용) ✅ 2026-05-06
- [ ] TaskCard.vue (Task 카드) - WaitingList 내 인라인 처리
- [o] TaskDetail.vue (상세 조회) ✅ 2026-05-06
- [o] taskStore (CRUD 동작) ✅ 2026-05-06
- [ ] API 연동 (GET, POST, PUT, DELETE) - 임시 mock 데이터 사용 중

**산출물**: 완전한 Task CRUD

#### 2.3 상태 관리
- [o] taskStore 완성 ✅ 2026-05-06
- [o] noticeStore 기초 ✅ 2026-04-28
- [o] uiStore (모달, 알림) ✅ 2026-05-06

**산출물**: 전역 상태 관리 구조

---

### Phase 3: 달력 & 고급 기능 (1주일)
**목표**: 달력 뷰 및 고급 Task 기능

#### 3.1 달력 화면
- [ ] CalendarView.vue (메인 레이아웃)
- [ ] PersonalCalendar.vue (개인 달력)
- [ ] TeamCalendar.vue (팀 달력)
- [ ] CalendarDay.vue (날짜 셀)
- [ ] TeamFilter.vue (팀원 필터)
- [ ] 월간 Task 표시 로직

**산출물**: 완전한 달력 뷰

#### 3.2 고급 Task 기능
- [ ] Task 지연 처리 (자동 상태 변경)
- [ ] TaskDelayPopup.vue (지연 팝업)
- [ ] 지연 사유 기록
- [ ] 연장 옵션 (1시간, 하루)
- [ ] TaskDeleteAlert.vue (삭제 얼럿)

**산출물**: 완전한 Task 수명주기 관리

#### 3.3 공지 관리
- [ ] NoticeForm.vue (공지 등록)
- [ ] noticeStore 완성
- [ ] NoticeBar 동작
- [ ] API 연동

**산출물**: 공지 등록 및 표시 기능

---

### Phase 4: 관리자 기능 (1주일)
**목표**: Super Admin 페이지 및 권한 관리

#### 4.1 관리자 페이지
- [ ] AdminPanel.vue (메인 레이아웃)
- [ ] TeamList.vue (팀원 목록 테이블)
- [ ] TeamMemberRow.vue (팀원 행)
- [ ] GroupManager.vue (그룹 관리)
- [ ] GroupItem.vue (그룹 아이템)

**산출물**: Super Admin 페이지

#### 4.2 권한 관리
- [ ] userStore (사용자 관리)
- [ ] groupStore (그룹 관리)
- [ ] API 연동 (사용자, 그룹)
- [ ] 권한 변경 로직
- [ ] 상태 변경 (활성/비활성)

**산출물**: 완전한 권한 관리 시스템

#### 4.3 팀뷰 구현
- [ ] TeamView.vue (팀뷰 메인 화면)
- [ ] Member 권한 제한 처리

**산출물**: 팀뷰 기능

---

### Phase 5: 최적화 & 배포 (1주일)
**목표**: 성능 최적화, 테스트, 배포

#### 5.1 성능 최적화
- [ ] 코드 스플리팅 (라우트별)
- [ ] 번들 크기 분석
- [ ] 이미지 최적화
- [ ] 캐싱 전략 수립
- [ ] 렌더링 성능 최적화

**산출물**: 최적화된 빌드

#### 5.2 테스트
- [ ] 단위 테스트 (유틸리티)
- [ ] 통합 테스트 (컴포넌트)
- [ ] E2E 테스트 (주요 흐름)
- [ ] 브라우저 호환성 테스트

**산출물**: 테스트 커버리지 70% 이상

#### 5.3 배포 준비
- [ ] 환경 설정 (dev, staging, prod)
- [ ] 빌드 최적화
- [ ] 배포 스크립트 작성
- [ ] CI/CD 파이프라인 설정

**산출물**: 배포 가능한 상태

---

## 2. 기능별 구현 순서

### 우선순위 1 (Critical)
```
1. 인증 시스템 (로그인, 회원가입)
2. 메인 화면 (개인뷰 + 시간표)
3. Task CRUD
4. 달력 뷰
```

### 우선순위 2 (High)
```
5. Task 상태 관리 (지연, 완료)
6. 공지 관리
7. 팀뷰 (팀원 필터)
```

### 우선순위 3 (Medium)
```
8. 관리자 페이지
9. 그룹 관리
10. 권한 세분화
```

### 우선순위 4 (Low)
```
11. 성능 최적화
12. 고급 기능 (드래그앤드롭 등)
13. 모바일 반응형 세부 조정
```

---

## 3. 각 화면별 구현 가이드

### 화면 01-03: 인증
**시간**: 3일

1. LoginForm 컴포넌트 개발
   - 이메일, 비밀번호 입력
   - 유효성 검사
   - API 호출
   - 에러 처리

2. SignUpForm 컴포넌트 개발
   - 이름, 이메일, 비밀번호 입력
   - 비밀번호 확인
   - 직급 선택
   - 유효성 검사
   - API 호출

3. FindCredentialsForm
   - 이메일 찾기 탭
   - 비밀번호 찾기 탭

**테스트**:
- [ ] 정상 로그인
- [ ] 잘못된 자격증명
- [ ] 회원가입 정상
- [ ] 중복 이메일
- [ ] 비밀번호 규칙 위반

---

### 화면 04: 메인 화면 (개인뷰)
**시간**: 4일

1. 레이아웃 구성
   - NoticeBar (상단)
   - Header (탭)
   - 좌측: WaitingList
   - 우측: TimeTable

2. WaitingList
   - Task 카드 목록
   - 추가 버튼
   - 드래그 가능 (향후)

3. TimeTable
   - 시간 표시 (07:00~20:00)
   - Task 표시
   - 동시 Task 균등 분할
   - 날짜 이동 (◀ ▶)
   - 지연 사유 호버 툴팁

4. 동작
   - Task 클릭 → 상세 모달
   - 추가 버튼 → 등록 모달
   - 탭 클릭 → 화면 전환

**테스트**:
- [ ] Task 표시 정상
- [ ] 동시 Task 분할
- [ ] 날짜 이동
- [ ] 지연 사유 호버
- [ ] 모달 열기

---

### 화면 05-06: 달력 뷰
**시간**: 4일

1. PersonalCalendar
   - 월간 달력
   - Task 표시
   - 기간 Task 반복
   - 초과 시 "..." 표시
   - 오늘 날짜 강조

2. TeamCalendar
   - 월간 달력 (PersonalCalendar와 동일)
   - 팀원 필터 탭
   - 담당자 이름 포함
   - Member 권한 제한

3. 공통 동작
   - 월 이동 (◀ ▶)
   - 날짜 클릭 → Daily View로 이동

**테스트**:
- [ ] 월간 표시
- [ ] Task 표시
- [ ] 기간 Task 반복
- [ ] 초과 "..." 표시
- [ ] 월 이동
- [ ] 권한 제한 (팀뷰)

---

### 화면 07-09: Task 모달
**시간**: 3일

1. TaskForm (공용)
   - 제목 입력
   - 담당자 다중 선택
   - 시작/종료 일시
   - 메모
   - 기간 Task 안내

2. 등록 모달
   - 위 폼 기본

3. 수정 모달 (Admin+만)
   - 위 폼
   - 지연 사유 표시
   - 최종 수정자 표시
   - 삭제 버튼

4. 상세 모달 (읽기 전용)
   - 모든 필드 비활성
   - 권한 없음 메시지

**테스트**:
- [ ] 등록 정상
- [ ] 수정 정상 (권한)
- [ ] 권한 제한
- [ ] 유효성 검사

---

### 화면 10-12: 팝업/얼럿
**시간**: 2일

1. TaskDeleteAlert
   - Task 명 표시
   - 복구 불가 경고
   - 취소/삭제 버튼

2. TaskDelayPopup
   - Task 명 + 종료 시간 표시
   - 사유 입력 (필수)
   - 연장 옵션 (1시간, 하루)
   - 사유 입력 전 닫기 불가

3. NoticeForm
   - 제목 입력
   - 내용 입력 (선택)
   - 등록 버튼

**테스트**:
- [ ] 삭제 정상
- [ ] 지연 팝업
- [ ] 연장 옵션
- [ ] 공지 등록

---

### 화면 13: Super Admin 페이지
**시간**: 4일

1. TeamList
   - 팀원 목록 테이블
   - 이름, 이메일, 권한, 상태, 관리
   - 권한 변경 (SA > Admin > Member)
   - 상태 변경 (활성/비활성)

2. GroupManager
   - 그룹 목록
   - 그룹 추가/수정/삭제
   - 멤버 할당

3. 공통
   - Member 권한 접근 불가

**테스트**:
- [ ] 팀원 목록 표시
- [ ] 권한 변경
- [ ] 상태 변경
- [ ] 그룹 관리
- [ ] 권한 제한

---

## 4. API 연동 체크리스트

### 인증
- [ ] POST /api/auth/login
- [ ] POST /api/auth/signup
- [ ] POST /api/auth/logout
- [ ] POST /api/auth/refresh-token
- [ ] GET /api/auth/find-email
- [ ] POST /api/auth/reset-password

### Task
- [ ] GET /api/tasks?date=YYYY-MM-DD (필터 포함)
- [ ] GET /api/tasks/:id
- [ ] POST /api/tasks
- [ ] PUT /api/tasks/:id
- [ ] DELETE /api/tasks/:id
- [ ] POST /api/tasks/:id/delay (지연 기록)

### 공지
- [ ] GET /api/notices
- [ ] POST /api/notices
- [ ] DELETE /api/notices/:id (SA만)

### 사용자
- [ ] GET /api/users
- [ ] PUT /api/users/:id/role
- [ ] PUT /api/users/:id/status
- [ ] POST /api/users

### 그룹
- [ ] GET /api/groups
- [ ] POST /api/groups
- [ ] PUT /api/groups/:id
- [ ] DELETE /api/groups/:id
- [ ] POST /api/groups/:id/members
- [ ] DELETE /api/groups/:id/members/:userId

---

## 5. 테스트 계획

### 단위 테스트 (Unit Tests)
```javascript
// 날짜 유틸리티
- formatDate(date)
- getStartOfDay(date)
- getDayOfWeek(date)

// 검증 함수
- validateEmail(email)
- validatePassword(password)
- validateTaskForm(form)
```

### 통합 테스트 (Integration Tests)
```javascript
// 컴포넌트
- TaskForm: 입력 → 저장 → 확인
- TimeTable: 데이터 → 렌더링 확인
- Calendar: 월 이동 → 데이터 로드

// Pinia Stores
- authStore: 로그인 → 토큰 저장
- taskStore: 조회 → 필터 → 업데이트
```

### E2E 테스트 (End-to-End)
```
1. 로그인 → 메인 화면 표시
2. Task 생성 → 시간표 표시
3. 달력 이동 → Task 표시
4. Task 수정 → 변경 사항 반영
5. Task 삭제 → 제거됨
6. 공지 등록 → 배너 표시
```

---

## 6. 배포 체크리스트

### 사전 배포
- [ ] 모든 테스트 통과
- [ ] 번들 크기 확인 (<500KB)
- [ ] 빌드 오류 없음
- [ ] 환경 변수 설정
- [ ] API 엔드포인트 확인

### 배포
- [ ] npm run build
- [ ] dist 폴더 검증
- [ ] 정적 파일 호스팅
- [ ] 도메인 연결
- [ ] HTTPS 설정

### 사후 배포
- [ ] 프로덕션 환경 테스트
- [ ] 모니터링 설정
- [ ] 에러 로깅 설정
- [ ] 사용자 피드백 수집

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안
