# 📊 기술 부채 & 개선사항 (Tech Debt & Improvements)

## 1. 현재 단계별 기술 부채

### Phase 1-3: MVP 단계 (초기 구현)
이 단계에서는 **빠른 개발**을 우선시하므로 일부 기술적 부채가 축적됩니다.

#### 수용 가능한 부채
- [ ] **API 에러 처리 단순화**: 모든 에러를 일반 메시지로 처리
  - 개선: 에러 타입별 특화된 처리 (401, 403, 404, 500)

- [ ] **타입스크립트 미사용**: JavaScript만 사용
  - 개선: TypeScript 점진적 도입

- [ ] **컴포넌트 테스트 부재**: 수동 테스트만 진행
  - 개선: Vue Test Utils로 단위 테스트 추가

- [ ] **API 응답 검증 부족**: 간단한 null 체크만
  - 개선: Zod/Joi로 스키마 검증

#### 미루기 (할 것)
- [ ] **웹소켓 미지원**: 폴링만 사용
  - Phase 4에서 구현 예정

- [ ] **다국어 지원 미포함**: 한국어만 지원
  - Phase 5에서 i18n 추가 예정

- [ ] **고급 캐싱 전략**: 메모리 캐시만 사용
  - Phase 4에서 IndexedDB 추가 예정

---

## 2. 코드 품질 개선 계획

### 2.1 타입 안정성
**현재 상태**: JavaScript (동적 타입)
**개선 방안**: TypeScript 도입

#### Phase 2.5: TypeScript 마이그레이션
```typescript
// 단계별 도입
1. 새로운 파일은 .ts로 작성
2. 점진적으로 기존 파일 마이그레이션
3. 최종: 전체 .ts 또는 .vue with lang="ts"
```

### 2.2 API 레이어 개선
**현재 상태**: 직접 fetch 호출
**개선 방안**: API 클라이언트 추상화

#### 우선순위: 높음
```typescript
// Before
const response = await fetch('/api/tasks');

// After
const response = await api.tasks.list();
```

### 2.3 에러 처리 표준화
**현재 상태**: 임시 에러 메시지
**개선 방안**: 체계적인 에러 클래스

#### 우선순위: 높음
```typescript
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// 사용
try {
  await api.login(email, password);
} catch (err) {
  if (err instanceof ApiError) {
    if (err.status === 401) {
      // 인증 실패
    }
  }
}
```

---

## 3. 성능 최적화 로드맵

### 3.1 번들 최적화
**현재 상태**: 전체 번들 ~500KB
**목표**: < 300KB

#### 단계별 개선
1. **코드 스플리팅** (Priority: 높음)
   - 라우트별 동적 임포트 (이미 적용)
   - 컴포넌트 동적 임포트 추가

2. **의존성 최소화** (Priority: 중간)
   - 사용하지 않는 라이브러리 제거
   - 경량 라이브러리 대체 검토

3. **Tree Shaking** (Priority: 높음)
   - ESM 형식 라이브러리만 사용
   - Vite 최적화 설정 확인

### 3.2 런타임 성능
**현재 상태**: 초기 로드 3초, 페이지 전환 1초
**목표**: 초기 로드 2초, 페이지 전환 0.5초

#### 단계별 개선
1. **렌더링 최적화**
   - 가상 스크롤링 (큰 리스트)
   - Computed 캐싱 검증
   - Watch 최소화

2. **캐싱 전략**
   - API 응답 캐싱 (IndexedDB)
   - 이미지 캐싱 (Service Worker)

3. **이미지 최적화**
   - WebP 포맷 지원
   - 적응형 이미지 크기

---

## 4. 아키텍처 개선

### 4.1 상태 관리 확장
**현재 상태**: Pinia (기본 사용)
**개선 방안**: 복잡한 상태 관리 패턴 도입

#### Phase 3.5: 고급 상태 관리
```typescript
// 액션 로깅
export const useLoggingPlugin = (store) => {
  store.$subscribe((mutation, state) => {
    console.log(mutation.type, mutation.payload);
  });
};

// 상태 지속성
export const usePersistPlugin = (store) => {
  // localStorage에 자동 저장
};
```

### 4.2 컴포넌트 구조 개선
**현재 상태**: 기본 컴포넌트 구조
**개선 방안**: 고급 패턴 도입

#### Compound Components Pattern
```vue
<!-- 개선 전: Props 많음 -->
<TaskForm :title="task.title" :assignees="task.assignees" ... />

<!-- 개선 후: 조합 패턴 -->
<TaskForm>
  <TaskFormTitle v-model="task.title" />
  <TaskFormAssignees v-model="task.assignees" />
</TaskForm>
```

### 4.3 테스트 인프라
**현재 상태**: 수동 테스트
**개선 방안**: 자동화 테스트 도입

#### Phase 4: 테스트 도입
```javascript
// Unit Tests (Vitest)
describe('dateTime.ts', () => {
  test('formatDate', () => {
    expect(formatDate(new Date())).toBe('...');
  });
});

// Component Tests (Vue Test Utils)
describe('TaskForm.vue', () => {
  test('submit', async () => {
    const wrapper = mount(TaskForm);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});

// E2E Tests (Playwright)
test('create task', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-test="new-task"]');
  // ...
});
```

---

## 5. 기능 확장 계획

### 5.1 Phase 4+: 고급 기능

#### 우선순위 높음
- [ ] **실시간 협업**
  - 웹소켓 기반 Task 동시 편집
  - 사용자 커서 표시
  - 충돌 해결 로직

- [ ] **일정 초대**
  - 외부 인물 초대 링크
  - 달력 공유 설정
  - 초대 수락/거절

#### 우선순위 중간
- [ ] **알림 시스템**
  - 브라우저 푸시 알림
  - 이메일 알림
  - 알림 설정 페이지

- [ ] **ical 연동**
  - Google Calendar 동기화
  - Outlook 연동
  - iCal 다운로드

#### 우선순위 낮음
- [ ] **드래그앤드롭**
  - Task를 시간표에 드래그
  - Task 우선순위 정렬
  - 달력에 드래그로 추가

- [ ] **다국어 지원**
  - Vue i18n 도입
  - 한국어, 영어, 일본어
  - RTL 언어 지원

---

## 6. 보안 개선

### 6.1 현재 보안 수준
- ✅ 비밀번호 규칙 (8자, 영숫자)
- ✅ HTTPS 통신
- ✅ JWT 토큰 기반 인증
- ⚠️ XSS 방지 (부분적)
- ⚠️ CSRF 방지 (미설정)
- ⚠️ 레이트 제한 (미설정)

### 6.2 개선 계획

#### Phase 3: 기본 보안 강화
- [ ] **입력 검증 강화**
  - XSS 방지 검증
  - SQL Injection 방지 (백엔드)
  - CSRF 토큰 추가

- [ ] **비밀번호 정책**
  - 비밀번호 강도 표시
  - 재사용 방지
  - 주기적 변경 알림

#### Phase 4: 고급 보안
- [ ] **2FA (이중 인증)**
  - TOTP 지원
  - SMS 인증
  - 백업 코드

- [ ] **감시 로깅**
  - 로그인 시도 기록
  - 민감한 작업 기록
  - 이상 탐지

---

## 7. 운영 개선

### 7.1 모니터링 & 분석
**현재 상태**: 미설정
**개선 방안**: 모니터링 도입

#### Phase 4: 모니터링 인프라
```typescript
// 에러 모니터링 (Sentry)
import * as Sentry from "@sentry/vue";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: process.env.NODE_ENV,
});

// 성능 모니터링 (Datadog)
import * as datadogRum from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "YOUR_ID",
  clientToken: "YOUR_TOKEN",
});

// 분석 (Google Analytics)
gtag('config', 'GA_MEASUREMENT_ID');
```

### 7.2 DevOps 개선
**현재 상태**: 수동 배포
**개선 방안**: CI/CD 자동화

#### Phase 4: CI/CD 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm run test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

---

## 8. 학습 및 개선 항목

### 8.1 팀 역량 강화
- [ ] Vue 3 고급 패턴 (Composition API 심화)
- [ ] TypeScript 베스트 프랙티스
- [ ] 테스트 작성 능력 (TDD)
- [ ] 성능 최적화 기법

### 8.2 도구 활용
- [ ] Storybook (컴포넌트 카탈로그)
- [ ] Vitest (유닛 테스트)
- [ ] Playwright (E2E 테스트)
- [ ] Lighthouse (성능 분석)

---

## 9. 마이그레이션 계획

### 9.1 점진적 개선
**접근 방식**: Big Bang 피하고 점진적 개선

#### Timeline
```
Week 1: 기초 구축 (JavaScript, 기본 테스트)
     ↓
Week 2-3: 기능 구현 (API 통합, UI)
     ↓
Week 4: 최적화 (성능, 코드 품질)
     ↓
Week 5: 테스트 추가 (자동화)
     ↓
Week 6: 배포 (모니터링 설정)
     ↓
Week 7+: 지속적 개선
```

### 9.2 호환성 유지
- 기존 기능 손상 없음
- 점진적 마이그레이션
- 롤백 계획 수립

---

## 10. 우선순위 매트릭스

### 높은 영향 & 낮은 노력
✅ **즉시 수행**
- [ ] API 에러 처리 표준화
- [ ] ESLint 설정 강화
- [ ] 기본 성능 최적화

### 높은 영향 & 높은 노력
⏱️ **계획하여 수행**
- [ ] TypeScript 마이그레이션
- [ ] 자동화 테스트 도입
- [ ] 웹소켓 실시간 기능

### 낮은 영향 & 낮은 노력
💚 **보너스**
- [ ] 코드 주석 개선
- [ ] 문서 작성
- [ ] 다국어 지원

### 낮은 영향 & 높은 노력
❌ **나중에 검토**
- [ ] 드래그앤드롭
- [ ] 고급 애니메이션
- [ ] 복잡한 전자상거래 기능

---

## 11. 상태 추적

### 진행 상황 갱신 주기
- **월간**: 기술 부채 검토 회의
- **주간**: 개발팀 스탠드업에서 거론
- **일일**: 코드 리뷰 시점에 확인

### 메트릭
- 기술 부채 점수 (SonarQube)
- 테스트 커버리지 (%) 
- 번들 크기 (KB)
- 성능 점수 (Lighthouse)

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안

---

## 다음 단계

1. ✅ 문서 완성
2. ⏳ 팀 리뷰 및 피드백
3. ⏳ 우선순위 조정
4. ⏳ Sprint 계획에 반영
