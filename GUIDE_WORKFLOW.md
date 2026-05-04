# 📖 GUIDE_WORKFLOW.md - 개발 워크플로우 가이드

새로운 사용자를 위한 **"당신이 뭐 하고, AI가 뭐 하는지"** 설명서입니다.

---

## 📋 이 문서를 읽기 전에

### ✅ 선행사항 (Prerequisites)

다음이 **반드시 준비되어야 합니다:**

1. **Node.js 설치** - `node -v` 로 확인
2. **npm install 완료** - `npm install` 실행 완료
3. **package.json 확인** - npm run 스크립트 있는지 확인
   ```json
   "scripts": {
     "dev": "vite",
     "test:dev": "node tests/e2e/phase2-verification.js http://localhost:5173"
   }
   ```
4. **Git 설치** - git 명령어 사용 가능

### 🎓 알아야 할 것 (Important Concepts)

**이 프로젝트의 핵심 원칙:**

| 원칙 | 의미 | 예시 |
|------|------|------|
| **전체 테스트** | 매번 모든 Phase를 테스트함 | Phase 2.1 + 2.3 + 2.4 모두 테스트 |
| **격리 원칙** | 새 기능은 새 파일에만 추가 | TimeTable.vue는 새 파일 생성 (기존 파일 수정 X) |
| **자동 테스트** | AI가 자동으로 npm run test:dev 실행 | npm run dev가 이미 실행 중이면 test 자동 시작 |
| **사용자 승인** | 테스트 통과만으로 merge 불가능 | AI가 "좋습니다" 기다림 → 당신이 "좋아" 라고 해야 merge |

### 📦 Git 브랜치 구조 (이해해야 할 것)

이 프로젝트는 **Git Flow 전략**을 사용합니다.

```
main (배포용)
  ↑
  | (테스트 통과 후 merge)
  ↓
develop (개발용)
  ↑
  | (테스트 통과 후 merge)
  ↓
feature/phase-2.4-... (당신의 기능 개발)
```

**각 브랜치의 역할:**

| 브랜치 | 목적 | 누가 사용 | 언제 |
|--------|------|---------|------|
| **main** | 배포 가능한 완성 코드 | 운영팀 | 모든 테스트 통과 후 |
| **develop** | 개발 중인 코드 | AI | 새 feature 테스트 후 |
| **feature/phase-X.X.X** | 새 기능 개발 | AI | 당신이 요청한 기능 개발 |

**브랜치 흐름:**
```
1. AI가 feature 브랜치 생성 (develop에서)
   git checkout -b feature/phase-2.4-personal-view

2. AI가 feature 브랜치에서 코드 작성
   npm run test:dev (feature 브랜치에서 테스트)

3. 테스트 통과 후 develop으로 merge
   git merge feature/phase-2.4-personal-view

4. 당신이 승인하면 main으로도 merge
   git merge develop
```

**당신이 알아야 할 것:**
- 현재 작업은 **feature 브랜치**에서 진행
- feature에서 테스트 후 develop으로 merge
- 당신이 최종 승인하면 main으로도 merge
- 브랜치 전환은 **AI가 자동으로** 함

---

## 📋 전체 플로우

```
1️⃣ 당신: "이 기능 만들어줘"
           ↓
2️⃣ AI:    코드 작성 (새 파일)
           ↓
3️⃣ AI:    자동 테스트 실행 (npm run test:dev)
           ↓
4️⃣ AI:    결과 리포트 보고
           ↓
5️⃣ 당신:  "좋아" 또는 "이 부분 수정해" 판단
           ↓
6️⃣ AI:    merge 또는 수정 후 재테스트
```

---

## 🎯 각 단계별 정확한 역할

### Step 1️⃣: 당신이 하는 것 - 요청하기
```
당신의 지시: "Phase 2.4 구현해줘 - 왼쪽에 대기 목록, 오른쪽에 시간표"
```
- 무엇을 만들고 싶은지 명확하게 말함
- 기획서나 와이어프레임 참조

### Step 2️⃣: AI가 하는 것 - 개발하기
```
AI의 작업:
- 새로운 .vue 파일 생성 (WaitingList.vue, TimeTable.vue 등)
- 기존 파일은 절대 수정 안 함
- 필요시 라우터나 store만 최소 수정
```

### Step 3️⃣: AI가 하는 것 - 자동 테스트 실행

**필수 조건:** npm run dev가 터미널 1에서 실행 중이어야 함
```bash
# 터미널 1 (당신이 먼저 실행하면 좋음)
npm run dev
# → localhost:5173 실행 (계속 실행 상태 유지)

# 터미널 2 (AI가 자동 실행)
npm run test:dev
# → 전체 테스트 실행 (Phase 2.1 + 2.3 + 2.4)
# → 결과 리포트 생성
```

### Step 4️⃣: AI가 하는 것 - 결과 보고
```
✅ 테스트 결과:
- Phase 2.1 (기존) ✅ 통과
- Phase 2.3 (기존) ✅ 통과
- Phase 2.4 (새것) ✅ 통과

merge 준비 완료 - 당신의 지시 대기 중
```

또는

```
❌ 테스트 결과:
- Phase 2.4 TimeTable - 시간 렌더링 실패

문제 수정 대기 중
```

### Step 5️⃣: 당신이 하는 것 - 판단하기

**테스트 통과 시:**
```
당신: "좋아, merge 진행해"
AI:  "develop에 merge 완료되었습니다"
```

**테스트 실패 시:**
```
당신: "TimeTable에서 시간이 안 맞네. 이 부분 수정해"
AI:  "알겠습니다. 수정 후 다시 테스트 하겠습니다"
     → 수정 → 재테스트 → 결과 다시 보고
```

**최대 3회 시도 가능:**
- 1번째 실패 → 수정 → 재테스트
- 2번째 실패 → 수정 → 재테스트
- 3번째 실패 → "3번 시도했지만 해결 못 했습니다" 보고

---

## ⚡ 실제 명령어 흐름

```bash
# 당신 - 터미널 1 (개발 서버 실행)
npm run dev
# → localhost:5173 실행 (계속 켜두기)

# AI - 자동으로 진행
# 1. 코드 작성
# 2. npm run test:dev 자동 실행
# 3. 결과 보고

# 당신 - 결과 확인 후
"좋아, merge해"

# AI - 자동으로 진행
git checkout develop
git merge feature/phase-2.4
git push origin develop
```

---

## ❓ 자주 묻는 것

**Q1: npm run dev는 항상 켜두나요?**
- 네, 계속 켜두세요
- AI가 npm run test:dev를 실행할 때 이미 localhost:5173이 실행 중이어야 함

**Q2: 테스트는 누가 합니까?**
- 새로운 코드가 생성되면 AI가 자동으로 합니다 (npm run test:dev)
- 기존 기능도 함께 확인 (회귀 테스트)

**Q3: merge는 누가 합니까?**
- 당신이 "좋아"라고 한 후 AI가 합니다
- 테스트 통과 = 자동 merge 아님 (당신의 최종 승인 필요)

---

**준비 되셨나요?** 😊

