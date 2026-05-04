# 📋 GIT_WORKFLOW.md - Git 브랜치 관리 전략

## 개요

이 프로젝트는 **Git Flow** 브랜치 전략을 사용합니다.

```
feature (개발)
    ↓ merge
develop (테스트)
    ↓ merge
main (프로덕션)
```

---

## 브랜치 역할

### main 브랜치
- **목적**: 테스트 완료된 프로덕션 코드
- **특징**: 
  - develop에서 테스트 완료 후에만 병합(merge)
  - 배포 가능한 상태만 유지
  - 직접 커밋 금지 (develop에서만 병합)
- **보호**: 병합 시 모든 테스트 통과 필수

### develop 브랜치
- **목적**: 테스트 중인 개발 코드
- **특징**:
  - feature 브랜치에서 개발 후 병합
  - 자동 테스트 스크립트 실행
  - 테스트 완료 후 main으로 병합
- **초기 상태**: main과 동일한 코드로 시작

### feature 브랜치
- **목적**: 새로운 기능/Phase 개발
- **명명 규칙**: `feature/phase-X.X.X-description`
- **예시**: 
  - `feature/phase-2.3-tab-navigation`
  - `feature/phase-2.4-personal-view`
- **생성 위치**: develop 브랜치에서 생성
- **삭제**: merge 후 자동 삭제 또는 수동 삭제

---

## 작업 흐름 (Workflow)

### ⭐ AI 에이전트 개발 워크플로우 (하네스 엔지니어링)

```
1️⃣ feature 브랜치 확인 및 개발
2️⃣ 코드 작성 완료
3️⃣ feature 브랜치에서 자동 테스트 실행
   ├─ ✅ 테스트 통과 → 4️⃣ develop과 merge
   └─ ❌ 테스트 실패 → 사용자에게 보고 → 오류 분석 → 수정 → 재테스트
4️⃣ develop에 merge 완료
5️⃣ 사용자에게 "merge 완료" 보고
```

---

### Phase 개발 시작

**1️⃣ feature 브랜치 위치 확인 및 생성**

```bash
# develop 브랜치에서 최신 코드 확인
git checkout develop
git pull origin develop

# feature 브랜치 생성
git checkout -b feature/phase-X.X.X-description

# 현재 브랜치 확인 (feature 브랜치여야 함)
git branch
# 출력: * feature/phase-X.X.X-description
```

**2️⃣ feature 브랜치에서 코드 개발**

```bash
# 코드 작성
# (에디터에서 파일 수정)

# 변경사항 확인
git status

# 커밋
git add .
git commit -m "Phase X.X.X: 기능 설명"

# feature 브랜치를 GitHub에 push
git push -u origin feature/phase-X.X.X-description
```

---

### Phase 테스트 (feature 브랜치에서)

**3️⃣ 자동 테스트 실행**

```bash
# 개발 환경 테스트
npm run dev        # 터미널 1에서 실행
npm run test:dev   # 터미널 2에서 실행

# 또는 운영 환경 테스트
npm run prod       # 터미널 1에서 실행
npm run test:prod  # 터미널 2에서 실행
```

---

### Phase 테스트 결과 처리

#### ✅ 테스트 성공 시 (feature 브랜치에서)

```bash
# AI 에이전트가 develop에 merge
git checkout develop
git merge feature/phase-X.X.X-description
git push origin develop

# AI가 사용자에게 보고:
# ✅ Phase 2.4 개발 완료
# ✅ 모든 테스트 통과
# ✅ develop과 merge 완료
# ✅ feature 브랜치 삭제 (선택)
```

#### ❌ 테스트 실패 시 (feature 브랜치 유지)

```bash
# 현재 브랜치: feature/phase-X.X.X-description
git branch
# 출력: * feature/phase-X.X.X-description

# AI가 사용자에게 보고:
# ❌ Phase 2.4 테스트 실패
# ❌ develop과 merge하지 않음
# 테스트 실패 상세:
# - [실패 항목 1] ...
# - [실패 항목 2] ...

# 사용자가 오류 분석 후 AI에게 지시:
# "xxx 때문에 실패합니다. 수정해주세요"

# AI가 feature 브랜치에서 문제 수정:
git add .
git commit -m "Phase X.X.X-fix: 오류 수정"
git push origin feature/phase-X.X.X-description

# AI가 재테스트 실행 및 결과 보고
# (성공 시 develop 병합, 실패 시 다시 보고)
```

---

### Phase 완료 및 배포 (develop → main)

**✅ develop 테스트 완료 후**

```bash
# main으로 이동
git checkout main

# develop을 main에 병합
git merge develop

# main에 push
git push origin main

# feature 브랜치 삭제
git branch -d feature/phase-X.X.X-description
git push origin --delete feature/phase-X.X.X-description

# AI가 사용자에게 보고:
# ✅ Phase 2.4 배포 완료
# ✅ main 브랜치에 반영됨
```

---

## 커밋 메시지 규칙

**형식:**
```
Phase X.X.X: 기능 설명
```

**예시:**
```
Phase 2.3: 탭 네비게이션 구현 - 개인/팀/달력 탭 추가
Phase 2.4: 메인 화면 구현 - Personal Daily View
Phase 2.3-fix: 새로고침 시 상태 유지 문제 해결
```

**규칙:**
- 첫 글자는 대문자
- 최대 72자 이내
- Phase 번호 포함
- 기능 설명은 간결하게

---

## 테스트 절차

### Phase 개발 중 테스트 (feature 브랜치에서)

**⭐ AI 에이전트가 자동으로 수행:**

```bash
# 현재 위치 확인 (feature 브랜치)
git branch
# 출력: * feature/phase-X.X.X-description

# 개발 서버 시작 (터미널 1)
npm run dev

# 자동 테스트 실행 (터미널 2)
npm run test:dev

# 또는 운영 환경 테스트
npm run prod     # 터미널 1
npm run test:prod # 터미널 2
```

### 테스트 결과 처리

**✅ 테스트 통과 (PASSED):**
```
1. AI가 feature 브랜치에서 테스트 완료 확인
2. develop 브랜치로 이동: git checkout develop
3. develop에 병합: git merge feature/phase-X.X.X-description
4. GitHub에 push: git push origin develop
5. 사용자에게 보고:
   ✅ Phase X.X.X 개발 완료
   ✅ 모든 테스트 통과
   ✅ develop과 병합 완료
```

**❌ 테스트 실패 (FAILED):**
```
1. AI가 feature 브랜치에서 테스트 실패 확인
2. develop과 병합하지 않음 (feature 브랜치 유지)
3. 사용자에게 보고:
   ❌ Phase X.X.X 테스트 실패
   
   실패 항목:
   - [실패 항목 1]: ...
   - [실패 항목 2]: ...

4. 사용자가 오류 분석 후 AI에게 지시:
   "xxx 때문에 실패합니다. 수정해주세요"

5. AI가 feature 브랜치에서 수정:
   git add .
   git commit -m "Phase X.X.X-fix: 오류 수정"
   git push origin feature/phase-X.X.X-description

6. AI가 재테스트 실행 (최대 3회)

7. 통과 시: develop과 병합
   실패 시: 3회 이후 사용자에게 보고
```

---

## 브랜치 확인 명령어

```bash
# 로컬 브랜치 목록
git branch

# 모든 브랜치 (로컬 + 원격)
git branch -a

# 현재 브랜치 상태
git status

# 커밋 히스토리 (그래프)
git log --all --oneline --graph
```

---

## GitHub 연동

### 원격 저장소 설정

```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소 추가 (처음 1회만)
git remote add origin https://github.com/[USERNAME]/TO-DO_APP.git
```

### Push/Pull

```bash
# 브랜치 push
git push -u origin feature/phase-X.X.X-description

# 최신 코드 pull
git pull origin develop

# 모든 브랜치 push
git push origin --all
```

---

## ⭐ AI 에이전트 개발 규칙 (하네스 엔지니어링)

### ❌ **절대 하지 말 것:**
- ❌ main에 직접 커밋
- ❌ feature 브랜치가 아닌 다른 곳에서 개발
- ❌ 테스트 없이 develop에 병합
- ❌ 테스트 실패 상태에서 develop 병합
- ❌ feature 브랜치에서 다른 feature를 개발
- ❌ 새로운 기능 추가 시 기존 코드 수정 (격리 원칙 위반)

### ✅ **필수 실행 순서:**
1. **브랜치 확인**: `git branch` → feature 브랜치인지 확인
2. **코드 개발**: feature 브랜치에서만 진행
3. **테스트 실행**: `npm run test:dev` / `npm run test:prod` 실행 (전체 테스트)
4. **테스트 결과 판단**:
   - ✅ 통과: develop과 merge → 사용자 보고
   - ❌ 실패: merge 금지 → 사용자 보고 → 수정 → 재테스트 (최대 3회)
5. **병합 보고**: develop 병합 완료 후 사용자에게 명확히 보고

### ✅ **격리 원칙 (Isolation Principle):**

**새로운 기능은 기존 코드를 건드리지 않고 추가합니다.**

| 상황 | 규칙 | 예시 |
|------|------|------|
| 새로운 컴포넌트 | 새로운 파일 생성 | Phase 2.4: WaitingList.vue, TimeTable.vue 신규 생성 |
| 새로운 함수/로직 | 새로운 유틸리티 파일 생성 | utils/timeTableHelper.js 신규 생성 |
| 새로운 스타일 | 새로운 CSS 파일 생성 | styles/timeTable.css 신규 생성 |
| 라우터 추가 | router/index.js 수정 가능 | 라우트 정의 추가 (기존 라우트는 수정 금지) |
| Store 초기화 | stores/taskStore.js 신규 생성 | 기존 authStore, noticeStore 건드리지 않음 |
| 기존 파일 수정 | 최소화 (필수인 경우만) | 기존 컴포넌트의 CSS/HTML은 절대 수정 금지 |

**테스트로 격리 확인:**
```bash
npm run test:dev  # 전체 테스트 실행
# Phase 2.1 (기존) ✅ 통과
# Phase 2.3 (기존) ✅ 통과
# Phase 2.4 (신규) ✅ 통과
# → 기존 기능이 깨지지 않았음을 증명
```

**격리 원칙의 이점:**
- ✅ 회귀 버그 위험 최소화
- ✅ 변경 범위가 명확함
- ✅ 코드 리뷰 (향후) 용이
- ✅ 롤백 (문제 발생 시) 간단
- ✅ 기존 기능의 안정성 보장

### ✅ **개발 체크리스트:**
```
개발 시작 전:
[ ] 현재 브랜치가 feature/phase-X.X.X-description 인가?
[ ] develop에서 최신 코드를 pull했는가?

개발 중:
[ ] 의미 있는 단위로 자주 커밋했는가?
[ ] 커밋 메시지에 "Phase X.X.X"를 포함했는가?

개발 완료 후:
[ ] feature 브랜치에서 테스트를 실행했는가?
[ ] 모든 테스트가 통과했는가?
[ ] 통과 시: develop에 merge 완료를 보고했는가?
[ ] 실패 시: 사용자에게 실패 내용을 명확히 보고했는가?
```

---

**최종 수정**: 2026년 4월 29일  
**상태**: 완성 ✅  
**AI 에이전트 개발 워크플로우**: 하네스 엔지니어링 기반
