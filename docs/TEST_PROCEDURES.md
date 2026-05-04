# 🧪 테스트 절차 (Test Procedures)

## 개요

이 문서는 **각 구현 단계마다 반드시 수행해야 할 검증 절차**를 정의합니다.

하네스 엔지니어링의 원칙:
> **"5. 직접 검증한다."**

---

## 🧬 Vitest를 사용한 컴포넌트 테스트 (권장)

**브라우저 불필요 → Linux 샌드박스에서 직접 실행 가능**

### 환경 요구사항
- Node.js 18+
- npm (기존 설치된 것 사용)

### 테스트 실행

```bash
npm run test
```

**결과:**
- ✅ PASSED: 모든 컴포넌트 테스트 통과
- ❌ FAILED: 실패 로그 확인 후 코드 수정 → 재테스트 (최대 3회)

---

## 📋 테스트 전략

### 전체 테스트 (Comprehensive Test)

**모든 merge 전에는 전체 테스트를 실행합니다.**

```bash
# feature 브랜치에서 새로운 Phase 개발 완료 후
npm run test:dev (또는 npm run test:prod)

# 테스트 범위:
✅ Phase 2.1 (기존 기능 - NoticeBar + Header)
✅ Phase 2.3 (기존 기능 - 탭 네비게이션)
✅ Phase 2.4 (새로운 기능 - Personal Daily View)
```

**통과 조건:**
- 모든 Phase가 ✅ 통과
- 하나라도 ❌ 실패 → merge 금지
- 사용자 승인 후에만 develop 병합

**회귀 테스트의 이점:**
- ✅ 새 기능이 기존 기능을 깨뜨리지 않음 확인
- ✅ 의도하지 않은 버그 조기 발견
- ✅ 코드의 안정성 보장

---

### 격리 원칙 검증 (Isolation Verification)

**새로운 기능은 기존 코드를 건드리지 않고 추가되어야 합니다.**

| 확인 항목 | 검증 방법 |
|----------|---------|
| **새 컴포넌트** | 새로운 .vue 파일인가? (기존 파일 수정 없음) |
| **기존 CSS 보존** | Header.vue, NoticeBar.vue 스타일 변경 없음? |
| **기존 HTML 보존** | 기존 컴포넌트 마크업 변경 없음? |
| **라우터만 변경** | router/index.js에 새로운 라우트만 추가? |
| **Store 격리** | taskStore.js 신규 생성, authStore 건드리지 않음? |
| **회귀 테스트 통과** | Phase 2.1, 2.3이 여전히 ✅ 통과? |

**격리 원칙 위반 예시:**
```javascript
// ❌ 위반: 기존 Header.vue 수정
// src/components/common/Header.vue
<div class="header-new">  <!-- 새로운 클래스 추가 -->
  <!-- 수정됨 -->
</div>

// ✅ 올바른 방식: 새 컴포넌트 생성
// src/components/dashboard/TimeTable.vue (신규 파일)
<div class="time-table">  <!-- 새로운 파일의 새로운 클래스 -->
  <!-- 격리됨 -->
</div>
```

---

## ✅ 테스트 계정 (전체 테스트에서 사용)

| 역할 | 이메일 | 비밀번호 |
|-----|--------|---------|
| 최고관리자 | super@wezon.com | asdf1234 |
| 관리자 | admin@wezon.com | asdf1234 |
| 일반멤버 | member@wezon.com | asdf1234 |

---

## 0️⃣ 자동화 테스트 (권장) ⭐

### 개발 환경에서 테스트

**터미널 1: 개발 서버 시작**
```bash
npm run dev
# "Local: http://localhost:5173" 나타날 때까지 대기
```

**터미널 2: 자동 테스트 실행**
```bash
npm run test:dev
```

**결과:**
- `tests/reports/phase2-dev.json` - 테스트 결과 리포트
- `tests/screenshots/` - 스크린샷 저장

### 운영 환경에서 테스트

**터미널 1: 운영 서버 시작**
```bash
npm run prod
# 빌드 후 "localhost:4173" 에서 실행
```

**터미널 2: 자동 테스트 실행**
```bash
npm run test:prod
```

**결과:**
- `tests/reports/phase2-prod.json` - 테스트 결과 리포트
- `tests/screenshots/` - 스크린샷 저장

### 테스트 결과 해석

**테스트 통과:**
```json
{
  "status": "PASSED",
  "totalTests": 15,
  "passed": 15,
  "failed": 0
}
```
→ 에이전트가 실제 코드에 자동 적용

**테스트 실패:**
```json
{
  "status": "FAILED",
  "totalTests": 15,
  "passed": 12,
  "failed": 3,
  "failures": [
    {
      "test": "Member Header - 팀뷰 탭 숨김",
      "expected": "탭 숨겨짐",
      "actual": "탭 표시됨"
    }
  ]
}
```
→ 에이전트가 실패 원인 분석 후 코드 수정 → 재테스트

---

## 0. 수동 테스트 환경 설정 (필요시)

### 사전 준비
```bash
# 1. 의존성 설치 (한 번만)
npm install

# 2. 개발 서버 시작
npm run dev

# 3. 브라우저 열기
http://localhost:5173
```

### 브라우저 개발자 도구 준비
```
F12 → Console 탭 열기 (에러 확인용)
```

---

## 1. 테스트 체크리스트 작성 방식

### 형식
```markdown
## 테스트: [기능명]

### 필수 확인 사항
- [ ] 항목 1: 어떻게 확인하는가?
- [ ] 항목 2: 어떻게 확인하는가?

### 권한별 확인 (필요시)
#### Member 계정
- [ ] 항목

#### Admin 계정
- [ ] 항목

#### SuperAdmin 계정
- [ ] 항목

### 에러 확인
- [ ] Console에 빨간 에러 없는가?

### 결과
✅ 완료 / ❌ 실패 (실패 시 에러 메시지 복사)
```

---

## 2. 테스트 실행 절차

### Step 1: 테스트 항목 읽기
```
EXECUTION_PLANS.md의 "테스트 체크리스트" 섹션 확인
```

### Step 2: 서버 상태 확인
```bash
npm run dev
# 콘솔에 "Local: http://localhost:5173" 보이면 정상
```

### Step 3: 브라우저 열기
```
http://localhost:5173 접속
F12로 Console 탭 열기
```

### Step 4: 순서대로 테스트
```
각 [ ] 항목을 하나씩 실행하고 체크
에러 발생 시 스크린샷 또는 콘솔 에러 메시지 복사
```

### Step 5: 결과 보고
```
"완료했어요 ✅" 또는 "이런 에러가 났어요 ❌"
```

---

## 3. 에러 리포팅 방법

### Console 에러 복사하기
```
1. F12 열기 → Console 탭
2. 빨간 에러 메시지 우클릭
3. "Copy message" 또는 전체 복사
4. 메시지 공유
```

### 스크린샷 가이드
```
문제가 보일 때 Print Screen → 공유
또는 F12 DevTools 하단에서 "Capture screenshot"
```

### 에러 리포트 예시
```
"Header.vue 테스트 중 이런 에러가 났어요:
Error: Cannot read property 'isMember' of undefined
위치: Header.vue line 45"
```

---

## 4. 테스트 완료 기준

### ✅ 통과 기준
```
- 모든 체크리스트 항목 ✅ 완료
- Console에 에러 없음
- UI가 와이어프레임과 일치
- 모든 권한에서 정상 작동
```

### ❌ 실패 기준
```
- 1개 이상 체크리스트 항목 미완료
- Console에 빨간 에러 존재
- 화면이 깨지거나 안 보임
- 클릭/동작 안 됨
```

---

## 5. 실패 시 복구 절차

### 에러 발생 시
```
1. 에러 메시지 전체 복사
2. 콘솔 스크린샷 찍기
3. "이런 에러가 났어요" 하고 보고
4. 내가 코드 수정
5. 수정 후 브라우저 새로고침 (F5)
6. 같은 테스트 다시 진행
```

### 계속 안 되면
```
1. npm run dev 종료 (Ctrl+C)
2. 다시 npm run dev 실행
3. 브라우저 새로고침 (F5)
4. 테스트 재시작
```

---

## 6. Phase별 테스트 순서

### Phase 1: 인증 시스템
```
1. 로그인 페이지 → 테스트
2. 회원가입 페이지 → 테스트
3. ID/PW 찾기 → 테스트
4. 로그인/로그아웃 → 테스트
```

### Phase 2: 메인 화면
```
1. NoticeBar (공지 배너) → 테스트
2. Header (탭 네비게이션) → 테스트
3. PersonalView/TeamView/CalendarView → 테스트
4. 권한별 탭 표시 → 테스트
```

### Phase 3 이후
```
각 Phase의 테스트 체크리스트 참고
```

---

## 7. 문서 업데이트 기준

### 테스트 완료 후
```
✅ 완료 → EXECUTION_PLANS.md에 [o] 체크, 날짜 기록
❌ 실패 → 내가 수정 → 재테스트
```

### 최종 검증
```
모든 Phase 테스트 완료 → QUALITY_CHECKLIST.md 업데이트
```

---

**중요: 각 구현 단계마다 반드시 이 절차를 따르세요!** 🎯
