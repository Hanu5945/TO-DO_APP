# 🎨 프론트엔드 구조 & 컴포넌트

## 1. 디렉토리 구조

```
src/
├── components/
│   ├── common/
│   │   ├── Header.vue          # 상단바 (탭, 아바타)
│   │   ├── NoticeBar.vue       # 공지 배너
│   │   ├── Modal.vue           # 모달 기본 레이아웃
│   │   └── Alert.vue           # 얼럿 기본 레이아웃
│   │
│   ├── auth/
│   │   ├── LoginForm.vue       # 로그인 폼
│   │   ├── SignUpForm.vue      # 회원가입 폼
│   │   └── CredentialsForm.vue # ID/PW 찾기 폼
│   │
│   ├── dashboard/
│   │   ├── PersonalView.vue    # 개인뷰 메인 화면
│   │   ├── WaitingList.vue     # 대기 목록
│   │   ├── TimeTable.vue       # 시간표
│   │   └── TimeSlot.vue        # 시간 슬롯
│   │
│   ├── calendar/
│   │   ├── CalendarView.vue    # 달력 메인
│   │   ├── PersonalCalendar.vue # 개인 달력
│   │   ├── TeamCalendar.vue    # 팀 달력
│   │   ├── CalendarDay.vue     # 날짜 셀
│   │   ├── TeamFilter.vue      # 팀원 필터 탭
│   │   └── TeamFilterTab.vue   # 필터 탭 아이템
│   │
│   ├── task/
│   │   ├── TaskCard.vue        # Task 카드
│   │   ├── TaskForm.vue        # Task 등록/수정 폼
│   │   ├── TaskDetail.vue      # Task 상세 조회
│   │   ├── TaskDeleteAlert.vue # 삭제 얼럿
│   │   ├── TaskDelayPopup.vue  # 지연 팝업
│   │   └── DelayReasonBox.vue  # 지연 사유 박스
│   │
│   ├── notice/
│   │   ├── NoticeForm.vue      # 공지 등록 폼
│   │   └── NoticeItem.vue      # 공지 아이템
│   │
│   ├── admin/
│   │   ├── AdminPanel.vue      # 관리자 페이지
│   │   ├── TeamList.vue        # 팀원 목록 테이블
│   │   ├── TeamMemberRow.vue   # 팀원 행
│   │   ├── GroupManager.vue    # 그룹 관리
│   │   └── GroupItem.vue       # 그룹 아이템
│   │
│   └── common/
│       ├── Button.vue          # 범용 버튼
│       ├── Badge.vue           # 배지
│       ├── Avatar.vue          # 아바타
│       ├── Chip.vue            # 칩
│       ├── Input.vue           # 입력 필드
│       ├── Select.vue          # 선택 드롭다운
│       └── Textarea.vue        # 텍스트 에어리어
│
├── pages/
│   ├── Auth/
│   │   ├── Login.vue
│   │   ├── SignUp.vue
│   │   └── FindCredentials.vue
│   │
│   ├── Dashboard/
│   │   ├── PersonalViewPage.vue
│   │   ├── CalendarViewPage.vue
│   │   └── AdminPage.vue
│   │
│   └── NotFound.vue
│
├── stores/
│   ├── authStore.ts
│   ├── taskStore.ts
│   ├── noticeStore.ts
│   └── uiStore.ts
│
├── utils/
│   ├── api.ts
│   ├── dateTime.ts
│   ├── auth.ts
│   ├── validation.ts
│   └── formatters.ts
│
├── types/
│   ├── User.ts
│   ├── Task.ts
│   ├── Notice.ts
│   └── Group.ts
│
├── styles/
│   ├── variables.css
│   ├── reset.css
│   └── global.css
│
├── router/
│   └── index.ts
│
├── App.vue
└── main.ts
```

---

## 2. 라우팅 구조

### 라우트 설정
```typescript
// router/index.ts
const routes = [
  // 인증
  { path: '/login', name: 'Login', component: () => import('@/pages/Auth/Login.vue'), meta: { requiresAuth: false } },
  { path: '/signup', name: 'SignUp', component: () => import('@/pages/Auth/SignUp.vue'), meta: { requiresAuth: false } },
  { path: '/find-credentials', name: 'FindCredentials', component: () => import('@/pages/Auth/FindCredentials.vue'), meta: { requiresAuth: false } },
  
  // 대시보드 (인증 필수)
  { 
    path: '/dashboard', 
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'PersonalView', component: () => import('@/pages/Dashboard/PersonalViewPage.vue') },
      { path: 'calendar', name: 'CalendarView', component: () => import('@/pages/Dashboard/CalendarViewPage.vue') },
      { path: 'admin', name: 'AdminPage', component: () => import('@/pages/Dashboard/AdminPage.vue'), meta: { requiresRole: 'SUPER_ADMIN' } },
    ]
  },
  
  // 기본 경로
  { path: '/', redirect: '/dashboard' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFound.vue') }
];
```

### 라우트 가드
```typescript
router.beforeEach((to, from, next) => {
  // 인증 체크
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  }
  // 권한 체크
  else if (to.meta.requiresRole && authStore.userRole !== to.meta.requiresRole) {
    next('/dashboard');
  }
  else {
    next();
  }
});
```

---

## 3. 핵심 컴포넌트 명세

### 3.1 공통 컴포넌트

#### Header.vue
```vue
<template>
  <div class="header">
    <div class="title">팀 업무 스케줄러</div>
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :class="{ active: tab.active }"
        @click="selectTab(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>
    <Avatar :user="currentUser" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore, useRouter } from '@/stores';

const authStore = useAuthStore();
const router = useRouter();

const tabs = [
  { name: 'personal', label: '개인뷰', active: router.currentRoute.name === 'PersonalView' },
  { name: 'team', label: '팀뷰', active: false, hidden: authStore.isMember },
  { name: 'calendar', label: '달력뷰', active: router.currentRoute.name === 'CalendarView' },
];

const selectTab = (name) => {
  if (name === 'personal') router.push('/dashboard');
  else if (name === 'team') router.push('/dashboard');
  else if (name === 'calendar') router.push('/dashboard/calendar');
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
  gap: 8px;
}
.title {
  font-size: 13px;
  font-weight: 600;
  flex: 1;
  color: #111827;
}
.tabs {
  display: flex;
  gap: 0;
}
.tabs button {
  padding: 3px 11px;
  border-radius: 6px;
  font-size: 11px;
  border: none;
  cursor: pointer;
  color: #6b7280;
}
.tabs button.active {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}
</style>
```

#### NoticeBar.vue
```vue
<template>
  <div v-if="!closed" class="notice-bar">
    <span class="icon">📢 공지</span>
    <span class="message">{{ notice.content }}</span>
    <span class="add" @click="openNoticeModal">+ 공지 등록</span>
    <span class="close" @click="close">×</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNoticeStore, useUIStore } from '@/stores';

const noticeStore = useNoticeStore();
const uiStore = useUIStore();
const closed = ref(false);

const notice = computed(() => noticeStore.latestNotice);

const close = () => { closed.value = true; };
const openNoticeModal = () => uiStore.openModal('notice');
</script>

<style scoped>
.notice-bar {
  background: #7c3aed;
  padding: 7px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon, .message { color: #f5f3ff; font-size: 11px; }
.add, .close { color: #c4b5fd; cursor: pointer; font-size: 10px; }
.message { flex: 1; }
</style>
```

### 3.2 Task 관련 컴포넌트

#### TaskForm.vue (등록/수정 공용)
```vue
<template>
  <Modal>
    <div class="modal-head">
      <h2>{{ isEdit ? 'Task 수정' : 'Task 등록' }}</h2>
      <div v-if="isEdit" class="badges">
        <Badge v-if="task.status === 'DELAYED'" type="danger">지연</Badge>
        <Badge v-if="isHigherRole" type="warning">상위 직급</Badge>
      </div>
    </div>
    
    <form @submit.prevent="submit">
      <!-- 제목 -->
      <div class="form-group">
        <label>제목 <span class="required">*</span></label>
        <Input v-model="form.title" required />
      </div>
      
      <!-- 담당자 -->
      <div class="form-group">
        <label>담당자 <span class="required">*</span> <small>(여러 명 추가 가능)</small></label>
        <div class="assignees">
          <Chip v-for="user in form.assignees" :key="user.id">
            {{ user.name }} <span class="close" @click="removeAssignee(user.id)">×</span>
          </Chip>
        </div>
        <Select placeholder="+ 담당자 추가" @select="addAssignee" />
      </div>
      
      <!-- 시작/종료 일시 -->
      <div class="form-row">
        <div class="form-group flex-1">
          <label>시작 일시 <span class="required">*</span></label>
          <Input v-model="form.startDateTime" type="datetime-local" required />
        </div>
        <div class="form-group flex-1">
          <label>종료 일시 <span class="required">*</span></label>
          <Input v-model="form.endDateTime" type="datetime-local" required />
        </div>
      </div>
      
      <!-- 정보 박스 -->
      <InfoBox v-if="isRangeTask">
        종료일이 시작일과 다르면 기간 Task로 처리됩니다 (달력에 기간 내 날짜마다 표출)
      </InfoBox>
      
      <!-- 메모 -->
      <div class="form-group">
        <label>메모</label>
        <Textarea v-model="form.memo" />
      </div>
      
      <!-- 지연 사유 (수정 시만) -->
      <div v-if="isEdit && task.status === 'DELAYED'" class="delay-box">
        <div class="delay-header">⚠ 지연 사유</div>
        <p>{{ task.delayReason }}</p>
        <small>기록일시: {{ formatDateTime(task.delayRecordedAt) }}</small>
      </div>
      
      <!-- 최종 수정자 (수정 시만) -->
      <div v-if="isEdit" class="warn-box">
        <small>최종 수정자</small>
        <p>{{ task.updatedBy.name }} ({{ task.updatedBy.role }}) · {{ relativeTime(task.updatedAt) }}</p>
      </div>
      
      <!-- 버튼 -->
      <div class="form-actions">
        <Button type="secondary" @click="cancel">취소</Button>
        <Button v-if="isEdit" type="danger" @click="delete">삭제</Button>
        <Button type="primary" @click="submit">{{ isEdit ? '저장' : '저장' }}</Button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTaskStore, useUIStore } from '@/stores';

const props = defineProps({
  task: Object, // 수정 시만 전달
});

const taskStore = useTaskStore();
const uiStore = useUIStore();

const form = ref({
  title: props.task?.title || '',
  assignees: props.task?.assignees || [],
  startDateTime: props.task?.startDateTime || '',
  endDateTime: props.task?.endDateTime || '',
  memo: props.task?.memo || '',
});

const isEdit = computed(() => !!props.task);
const isRangeTask = computed(() => {
  const start = new Date(form.value.startDateTime);
  const end = new Date(form.value.endDateTime);
  return start.toDateString() !== end.toDateString();
});

const submit = async () => {
  try {
    if (isEdit.value) {
      await taskStore.updateTask(props.task.id, form.value);
    } else {
      await taskStore.createTask(form.value);
    }
    uiStore.closeModal();
    uiStore.showNotification('success', isEdit.value ? 'Task가 수정되었습니다' : 'Task가 생성되었습니다');
  } catch (err) {
    uiStore.showNotification('error', err.message);
  }
};

const cancel = () => uiStore.closeModal();
const removeAssignee = (userId) => {
  form.value.assignees = form.value.assignees.filter(u => u.id !== userId);
};
const addAssignee = (user) => {
  if (!form.value.assignees.find(u => u.id === user.id)) {
    form.value.assignees.push(user);
  }
};
</script>

<style scoped>
.form-group { margin-bottom: 10px; }
.form-group label { display: block; font-size: 12px; font-weight: 500; margin-bottom: 4px; }
.required { color: #ef4444; }
.form-row { display: flex; gap: 8px; }
.flex-1 { flex: 1; }
</style>
```

#### TimeTable.vue
```vue
<template>
  <div class="time-table">
    <div class="date-header">
      <span @click="previousDay" class="nav">◀</span>
      <span>{{ formatDate(currentDate) }}</span>
      <span @click="nextDay" class="nav">▶</span>
    </div>
    
    <div class="table">
      <div class="time-column">
        <div v-for="hour in hours" :key="hour" class="time-slot">
          {{ hour }}:00
        </div>
      </div>
      
      <div class="events">
        <div 
          v-for="task in tasksOfDay" 
          :key="task.id" 
          :class="['event', task.status.toLowerCase()]"
          :style="getEventStyle(task)"
          @click="openTaskDetail(task)"
          @mouseenter="showDelayReason(task)"
          @mouseleave="hideDelayReason"
        >
          {{ task.title }} <Badge :type="task.status">{{ task.statusLabel }}</Badge>
          
          <!-- 지연 사유 호버 -->
          <div v-if="hoveredTask?.id === task.id && task.delayReason" class="delay-tooltip">
            {{ task.delayReason }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTaskStore, useUIStore } from '@/stores';

const taskStore = useTaskStore();
const uiStore = useUIStore();

const currentDate = ref(new Date());
const hoveredTask = ref(null);
const hours = Array.from({ length: 14 }, (_, i) => 7 + i); // 07:00 - 20:00

const tasksOfDay = computed(() => {
  return taskStore.getTasksByDate(currentDate.value);
});

const getEventStyle = (task) => {
  const start = new Date(task.startDateTime);
  const end = new Date(task.endDateTime);
  const startHour = start.getHours();
  const startMinute = start.getMinutes();
  const durationMinutes = (end - start) / (1000 * 60);
  
  const top = (startHour - 7) * 42 + (startMinute / 60) * 42;
  const height = (durationMinutes / 60) * 42;
  
  // 같은 시간 다중 Task 처리
  const concurrentTasks = tasksOfDay.value.filter(t => {
    const ts = new Date(t.startDateTime);
    return ts.getHours() === startHour;
  });
  const index = concurrentTasks.findIndex(t => t.id === task.id);
  const width = 100 / concurrentTasks.length;
  
  return {
    top: `${top}px`,
    height: `${height}px`,
    left: `${width * index}%`,
    width: `${width}%`,
  };
};

const previousDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 1);
};

const nextDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 1);
};

const openTaskDetail = (task) => {
  uiStore.openModal('taskDetail', task);
};

const showDelayReason = (task) => {
  hoveredTask.value = task;
};

const hideDelayReason = () => {
  hoveredTask.value = null;
};
</script>

<style scoped>
.time-table { flex: 1; }
.date-header { padding: 6px 12px; display: flex; align-items: center; gap: 8px; }
.nav { color: #9ca3af; cursor: pointer; }
.table { display: flex; flex: 1; overflow: hidden; }
.time-column { width: 38px; border-right: 1px solid #f3f4f6; }
.time-slot { height: 42px; padding: 2px 4px; font-size: 9px; color: #d1d5db; border-bottom: 1px solid #f3f4f6; }
.events { flex: 1; position: relative; }
.event { position: absolute; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 9px; }
.event.pending { background: #f9fafb; color: #6b7280; border-left: 3px solid #9ca3af; }
.event.in_progress { background: #eff6ff; color: #1d4ed8; border-left: 3px solid #3b82f6; }
.event.completed { background: #f0fdf4; color: #15803d; border-left: 3px solid #22c55e; }
.event.delayed { background: #fef2f2; color: #dc2626; border-left: 3px solid #ef4444; }
.delay-tooltip { background: #fff; border: 1px solid #fca5a5; border-radius: 4px; padding: 4px; margin-top: 2px; font-size: 9px; }
</style>
```

---

## 4. 상태 관리 (Pinia)

### authStore.ts
```typescript
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role,
    isMember: (state) => state.user?.role === 'MEMBER',
    isAdmin: (state) => ['ADMIN', 'SUPER_ADMIN'].includes(state.user?.role),
    isSuperAdmin: (state) => state.user?.role === 'SUPER_ADMIN',
  },

  actions: {
    async login(email, password) {
      try {
        this.isLoading = true;
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) throw new Error('로그인 실패');
        
        const { token, user } = await response.json();
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});
```

---

## 5. 유틸리티 함수

### dateTime.ts
```typescript
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

export const formatDateTime = (datetime) => {
  return datetime.toLocaleString('ko-KR');
};

export const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getDayOfWeek = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};
```

### validation.ts
```typescript
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8 && /[a-z]/i.test(password) && /\d/.test(password);
};

export const validateTaskForm = (form) => {
  const errors = [];
  if (!form.title) errors.push('제목은 필수입니다');
  if (!form.assignees?.length) errors.push('담당자는 최소 1명 필요합니다');
  if (!form.startDateTime) errors.push('시작 일시는 필수입니다');
  if (!form.endDateTime) errors.push('종료 일시는 필수입니다');
  if (new Date(form.startDateTime) >= new Date(form.endDateTime)) {
    errors.push('종료 일시는 시작 일시보다 늦어야 합니다');
  }
  return errors;
};
```

---

## 6. 반응형 디자인

### 브레이크포인트
```css
/* Mobile */
@media (max-width: 640px) {
  /* 세로 레이아웃 */
  .time-table { flex-direction: column; }
  .form { width: 100%; }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* 조정된 패딩 */
  .modal { max-width: 90%; }
}

/* Desktop */
@media (min-width: 1025px) {
  /* 기본 레이아웃 */
}
```

---

## 7. 성능 최적화

### 코드 스플리팅
```typescript
// router/index.ts에서 동적 임포트
component: () => import('@/pages/Dashboard/PersonalViewPage.vue')
```

### 가상 스크롤 (긴 리스트)
```vue
<RecycleScroller
  v-slot="{ item }"
  :items="tasks"
  :item-size="50"
  class="tasks-list"
>
  <TaskCard :task="item" />
</RecycleScroller>
```

### Computed 캐싱
```javascript
const filteredTasks = computed(() => {
  // 자동 캐시 처리
  return taskStore.tasks.filter(t => t.date === currentDate.value);
});
```

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안
