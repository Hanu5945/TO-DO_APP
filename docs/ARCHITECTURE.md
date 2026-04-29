# 🏗️ 시스템 아키텍처

## 기술 스택

### Frontend
| 항목 | 선택 | 이유 |
|-----|------|------|
| 프레임워크 | Vue 3 | 반응형 UI, 빠른 개발 |
| 빌드 도구 | Vite | 초고속 개발 서버, 최적화된 번들 |
| 상태 관리 | Pinia | Vue 3 권장, 간단한 API |
| HTTP 클라이언트 | Fetch API | 표준 API, 의존성 최소화 |
| CSS | Scoped CSS | 컴포넌트 스타일 격리 |
| 라우팅 | Vue Router 4 | 페이지 네비게이션 |

### Backend (외부 API 연동)
- REST API 기반
- JWT 토큰 인증
- CORS 허용 설정

### 배포
| 환경 | 구성 |
|-----|------|
| 개발 | Vite Dev Server (localhost:5173) |
| 빌드 | Vite Build (dist 폴더 생성) |
| 배포 | 정적 파일 호스팅 (Nginx, Apache, S3 등) |

---

## 폴더 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트 (원자 단위)
│   ├── common/         # 공통 컴포넌트
│   │   ├── Header.vue
│   │   ├── NoticeBar.vue
│   │   ├── Modal.vue
│   │   └── Alert.vue
│   ├── forms/          # 폼 관련 컴포넌트
│   │   ├── TaskForm.vue
│   │   ├── LoginForm.vue
│   │   └── SignupForm.vue
│   ├── calendar/       # 달력 관련 컴포넌트
│   │   ├── Calendar.vue
│   │   ├── CalendarDay.vue
│   │   └── CalendarEvent.vue
│   └── schedule/       # 일정표 관련 컴포넌트
│       ├── TimeTable.vue
│       ├── TimeSlot.vue
│       └── TaskCard.vue
│
├── pages/              # 페이지 컴포넌트 (라우트별)
│   ├── Auth/
│   │   ├── Login.vue
│   │   ├── SignUp.vue
│   │   └── FindCredentials.vue
│   ├── Dashboard/
│   │   ├── PersonalView.vue
│   │   ├── CalendarView.vue
│   │   └── TeamView.vue
│   └── Admin/
│       └── AdminPanel.vue
│
├── stores/             # Pinia 상태 관리
│   ├── authStore.ts
│   ├── taskStore.ts
│   ├── noticeStore.ts
│   └── uiStore.ts
│
├── utils/              # 유틸리티 함수
│   ├── api.ts          # API 호출 헬퍼
│   ├── dateTime.ts     # 날짜/시간 처리
│   ├── auth.ts         # 인증 관련
│   └── validation.ts   # 검증 함수
│
├── styles/             # 전역 스타일
│   ├── variables.css   # CSS 변수 (색상, 폰트)
│   ├── reset.css       # Reset 스타일
│   └── global.css      # 전역 스타일
│
├── types/              # TypeScript 타입 정의
│   ├── User.ts
│   ├── Task.ts
│   ├── Notice.ts
│   └── Group.ts
│
├── router/             # Vue Router 설정
│   └── index.ts
│
├── App.vue             # 루트 컴포넌트
└── main.ts             # 애플리케이션 진입점

public/                # 정적 파일
├── favicon.ico
└── index.html
```

---

## 데이터 흐름 (Data Flow)

### 1. 사용자 인증 흐름
```
Login 입력
  ↓
API 호출 (POST /api/auth/login)
  ↓
토큰 발급 (JWT)
  ↓
localStorage에 토큰 저장
  ↓
authStore 업데이트
  ↓
메인 화면으로 리다이렉트
```

### 2. Task 조회 흐름
```
페이지 로드 / 날짜 변경
  ↓
taskStore에서 상태 확인
  ↓
캐시 없으면 API 호출
  ↓
Task 목록 반환
  ↓
taskStore에 저장
  ↓
컴포넌트에서 구독 (watch/computed)
  ↓
UI 렌더링
```

### 3. Task 생성/수정 흐름
```
사용자 입력 → 폼 제출
  ↓
유효성 검사 (validation.ts)
  ↓
API 호출 (POST/PUT /api/tasks)
  ↓
성공 응답 수신
  ↓
taskStore 업데이트
  ↓
UI 새로고침
  ↓
성공 알림 표시
```

---

## API 엔드포인트 구조

### 인증 (Auth)
```
POST   /api/auth/login                 # 로그인
POST   /api/auth/signup                # 회원가입
POST   /api/auth/logout                # 로그아웃
POST   /api/auth/refresh-token         # 토큰 갱신
GET    /api/auth/find-email            # ID(이메일) 찾기
POST   /api/auth/reset-password        # 임시 비밀번호 발송
```

### Task 관리 (Tasks)
```
GET    /api/tasks                      # Task 목록 조회 (필터: 날짜, 상태)
GET    /api/tasks/:id                  # Task 상세 조회
POST   /api/tasks                      # Task 생성
PUT    /api/tasks/:id                  # Task 수정
DELETE /api/tasks/:id                  # Task 삭제
PUT    /api/tasks/:id/status           # Task 상태 변경
POST   /api/tasks/:id/delay            # Task 지연 기록
```

### 공지 (Notices)
```
GET    /api/notices                    # 공지 목록
POST   /api/notices                    # 공지 등록
DELETE /api/notices/:id                # 공지 삭제 (SA만)
```

### 사용자 (Users)
```
GET    /api/users                      # 팀원 목록 (SA/Admin)
GET    /api/users/:id                  # 사용자 정보
PUT    /api/users/:id/role             # 권한 변경 (SA만)
PUT    /api/users/:id/status           # 상태 변경 (SA만)
POST   /api/users                      # 팀원 추가 (SA만)
```

### 그룹 (Groups)
```
GET    /api/groups                     # 그룹 목록
POST   /api/groups                     # 그룹 생성
PUT    /api/groups/:id                 # 그룹 수정
DELETE /api/groups/:id                 # 그룹 삭제
POST   /api/groups/:id/members         # 멤버 추가
DELETE /api/groups/:id/members/:userId # 멤버 제거
```

---

## 상태 관리 (Pinia Stores)

### authStore
```javascript
// 상태
state: {
  user: User | null,
  token: string | null,
  isLoading: boolean,
  error: string | null,
}

// Getters
getters: {
  isAuthenticated,
  userRole,
  hasPermission(role),
}

// Actions
actions: {
  login(email, password),
  signup(userData),
  logout(),
  refreshToken(),
}
```

### taskStore
```javascript
// 상태
state: {
  tasks: Task[],
  filteredTasks: Task[],
  selectedTask: Task | null,
  isLoading: boolean,
  error: string | null,
  currentFilter: {
    date: Date,
    status: string,
  }
}

// Getters
getters: {
  tasksByDate(date),
  tasksByStatus(status),
  delayedTasks,
}

// Actions
actions: {
  fetchTasks(date),
  createTask(taskData),
  updateTask(id, taskData),
  deleteTask(id),
  recordDelay(id, reason),
}
```

### noticeStore
```javascript
// 상태
state: {
  notices: Notice[],
  isLoading: boolean,
}

// Actions
actions: {
  fetchNotices(),
  createNotice(data),
  deleteNotice(id),
}
```

### uiStore
```javascript
// 상태
state: {
  modal: {
    isOpen: boolean,
    type: 'task' | 'notice' | 'delete' | 'delay',
    data: any,
  },
  notification: {
    type: 'success' | 'error' | 'info',
    message: string,
  }
}

// Actions
actions: {
  openModal(type, data),
  closeModal(),
  showNotification(type, message),
}
```

---

## 컴포넌트 계층 구조

### Pages (최상위)
- App 라우트와 직접 연결
- 전체 페이지 레이아웃 관리
- 스토어 구독 및 데이터 페칭

### Layout Components
- Header, Sidebar, Footer
- 공통 레이아웃 구성

### Feature Components
- 기능별 주요 컴포넌트
- TaskForm, Calendar, TimeTable 등
- 자체 로직 포함

### Presentational Components
- 데이터 표시만 담당
- Props 받아서 렌더링
- 재사용 가능

### Atomic Components
- 버튼, 입력, 배지 등
- 최소 단위
- 높은 재사용성

---

## 인증 및 보안

### 토큰 기반 인증 (JWT)
```
1. 로그인 → accessToken + refreshToken 발급
2. API 요청 시 Authorization 헤더에 accessToken 포함
3. 토큰 만료 → refreshToken으로 새 accessToken 발급
4. localStorage에 토큰 저장
```

### CSRF 방지
- SameSite 쿠키 정책
- 토큰 기반 요청

### 권한 검증
- Router Guard: 페이지 접근 권한 확인
- API Guard: 백엔드에서 권한 재검증
- UI Guard: 권한 없는 버튼/메뉴 숨김

---

## 에러 처리 전략

### API 에러
```javascript
// 공통 에러 처리
try {
  const response = await fetch('/api/...');
  if (!response.ok) {
    const error = await response.json();
    // 토큰 만료
    if (response.status === 401) {
      // 로그아웃 + 로그인 페이지
    }
    // 권한 부족
    if (response.status === 403) {
      // 접근 불가 메시지
    }
    throw error;
  }
} catch (err) {
  // 사용자에게 표시
  uiStore.showNotification('error', err.message);
}
```

### 사용자 입력 에러
```javascript
// 폼 유효성 검사
const errors = validateTaskForm(data);
if (errors.length > 0) {
  // 각 필드 에러 표시
}
```

---

## 성능 최적화

### 번들 최적화
- Code Splitting: 라우트별 동적 임포트
- Tree Shaking: 사용하지 않는 코드 제거

### 렌더링 최적화
- v-if/v-show 적절한 사용
- Computed Properties 캐싱
- 가상 스크롤링 (긴 리스트)

### 캐싱
- Pinia 스토어에 데이터 캐싱
- 네트워크 요청 최소화

### 이미지 최적화
- WebP 포맷 지원
- 적절한 크기 제공

---

## 빌드 및 배포

### 개발 환경
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
# dist 폴더에 최적화된 파일 생성
```

### 배포 대상
- 정적 호스팅 (AWS S3, Netlify, Vercel 등)
- 웹 서버 (Nginx, Apache)
- CDN 연동

---

## 브라우저 지원

| 브라우저 | 버전 |
|---------|------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile (iOS Safari) | 14+ |
| Mobile (Chrome) | 90+ |

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안
