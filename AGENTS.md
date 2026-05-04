# 🤖 AGENTS.md - 에이전트 기본 규칙

## 1. AGENTS.md의 목적

이 파일은 이 프로젝트에서 일하는 **모든 에이전트의 역할과 규칙**을 정의합니다.

---

## 2. 읽기 순서 안내

**에이전트는 반드시 이 순서대로 문서를 읽어야 합니다:**

```
1️⃣  CLAUDE.md (프로젝트 루트)
     └─ 프로젝트 실행 가이드 (메인 진입점)
     └─ 목차를 통해 전체 흐름 파악

2️⃣  AGENTS.md (프로젝트 루트)
     └─ 에이전트의 역할과 규칙 (지금 읽는 파일)

3️⃣  docs/README.md (docs 폴더)
     └─ docs 폴더 내 문서들의 네비게이션
```

---

## 3. 에이전트의 역할

에이전트는 다음을 합니다:
- ✅ 코드 작성 (컴포넌트, 함수, 유틸리티)
- ✅ 구조 설계 (아키텍처, 컴포넌트 관계)
- ✅ 품질 검증 (테스트, 검증)
- ✅ 문서 작성 (코드 주석, 기술 문서)

에이전트는 하지 않습니다:
- ❌ 비즈니스 의사결정
- ❌ 아키텍처 변경 승인
- ❌ 배포 결정
- ❌ 기획안 무시

---

## 4. 기본 규칙

### 4.1 필수 준수 규칙
1. **문서 읽기 의무화**: CLAUDE.md → AGENTS.md → docs/README.md 순서
2. **기획안 절대 준수**: 와이어프레임, 색상, 권한 체계 정확히 따르기
3. **추측 금지**: 불명확하면 질문하기
4. **구조 보존**: 기존 아키텍처 깨지 않기
5. **문서 업데이트**: 변경사항을 문서에 반영하기
6. **요구되지 않은 부분 추가 금지**: 사용자가 명시하지 않은 기능/파일/색상을 절대 추가하지 않기
7. **미흡한 부분은 제안만 하기**: 스스로 판단해서 채워넣지 말고, 사용자에게 먼저 제안하기 (예: "이 부분이 필요할 것 같은데 추가할까요?")
8. **격리 원칙 (Isolation Principle)**: 새로운 기능 추가 시 기존 코드 수정 금지
   - ✅ 새 컴포넌트는 새 파일 생성
   - ✅ 새 함수는 새 유틸리티 파일 생성
   - ✅ 기존 파일 수정은 라우터, store 초기화 등 필수인 경우만
   - ✅ 기존 CSS/HTML은 절대 수정 금지
   - ✅ 회귀 테스트로 기존 기능 영향 없음을 확인

### 4.2 작업 흐름
```
1. 문서 읽기 (CLAUDE.md → AGENTS.md → docs/README.md)
2. 작업 계획 수립
3. 구현
4. 자체 검증
5. 문서 업데이트
```

---

## 5. 상황별 참고 문서

작업 중 **특정 상황**에서는 아래 문서를 우선적으로 참고하세요:

| 상황 | 참고 문서 |
|-----|---------|
| **Git 브랜치 관리** ⭐ | `GIT_WORKFLOW.md` |
| 기능 요구사항 확인 | `docs/PRODUCT_SPEC.md` |
| Vue 컴포넌트 구현 | `docs/FRONTEND.md` |
| UI/스타일 작업 | `docs/DESIGN_SYSTEM.md` |
| 기술 구조 확인 | `docs/ARCHITECTURE.md` |
| 작업 계획 수립 | `docs/EXECUTION_PLANS.md` |
| **테스트 절차 확인** ⭐ | `docs/TEST_PROCEDURES.md` |
| 라이브러리/의존성 확인 | `docs/DEPENDENCIES.md` |
| 완료 전 검증 | `docs/QUALITY_CHECKLIST.md` |
| 기술 부채 기록 | `docs/TECH_DEBT.md` |

---

## 6. 문서 선택 규칙

에이전트는 모든 문서를 항상 전부 읽지 않아도 된다.

단, 아래 규칙은 반드시 따른다.

1. 모든 작업은 `AGENTS.md`와 `docs/README.md`를 먼저 읽는다.
2. ⭐ **브랜치 작업 전에는 `GIT_WORKFLOW.md`를 읽는다** (feature → develop → main 흐름 준수)
3. 기능 구현 전에는 `docs/PRODUCT_SPEC.md`와 관련 `docs/features/` 문서를 읽는다.
4. Vue 코드 수정 전에는 `docs/FRONTEND.md`를 읽는다.
5. UI 수정 전에는 `docs/DESIGN_SYSTEM.md`를 읽는다.
6. 폴더 구조나 의존성 변경 전에는 `docs/ARCHITECTURE.md`를 읽는다.
7. 작업 계획이 필요한 경우 `docs/EXECUTION_PLANS.md`에 기록한다.
8. ⭐ **각 Phase 구현 후에는 `docs/TEST_PROCEDURES.md` 기준으로 테스트 절차를 정의해야 한다.**
9. ⭐ **테스트는 자동화 스크립트로 진행한다** (Puppeteer/Playwright 기반)
10. ⭐ **테스트가 완료되고 사용자 승인 후에만 실제 코드에 적용한다.** (하네스 엔지니어링 원칙 5: 직접 검증)
11. 완료 전에는 `docs/QUALITY_CHECKLIST.md` 기준으로 검증한다.
12. 임시 구현이 생기면 `docs/TECH_DEBT.md`에 반드시 기록한다.
13. 기술 선택이나 구조 변경이 있으면 `docs/decisions/`에 ADR 형태로 기록한다.
14. 문서 내용과 실제 코드가 다르면, 바로 수정하지 말고 불일치 사실을 먼저 보고한다.

---

## 7. 📝 문서 추가 시 규칙 (Document Addition Rules)

**새로운 MD 파일을 생성하면, 반드시 아래 3개 파일을 함께 업데이트해야 합니다.**

### 규칙
문서를 추가할 때마다:

```
1️⃣ 새 .md 파일 생성
   └─ 예: docs/NEW_DOCUMENT.md

2️⃣ CLAUDE.md 업데이트
   └─ "2.2 Document Reading Order" 섹션에 읽기 순서 추가
   └─ 해당 문서의 목적을 명확히 기술

3️⃣ AGENTS.md 업데이트
   └─ "5. 상황별 참고 문서" 테이블에 행 추가
   └─ "6. 문서 선택 규칙" 섹션에 해당 문서 참고 시점 추가

4️⃣ docs/README.md 업데이트
   └─ 문서 목록에 새 파일 추가
   └─ 읽기 순서 설명 업데이트
```

### 예시
**TEST_PROCEDURES.md 추가 시:**

**CLAUDE.md에 추가:**
```
7. TEST_PROCEDURES.md (테스트 절차) ⭐ 하네스 엔지니어링의 핵심
```

**AGENTS.md에 추가:**
```
| **테스트 절차 확인** ⭐ | `docs/TEST_PROCEDURES.md` |
```

```
7. ⭐ **각 Phase 구현 후에는 `docs/TEST_PROCEDURES.md` 기준으로 테스트 절차를 정의해야 한다.**
8. ⭐ **테스트가 완료되지 않으면 다음 단계로 진행할 수 없다.**
```

**docs/README.md에 추가:**
```
## 문서 읽기 순서
...
7. TEST_PROCEDURES.md - 각 Phase별 테스트 방법
```

### 목적
- 문서 추가 시 진입점(CLAUDE.md, AGENTS.md)을 자동으로 갱신
- 에이전트가 새 문서를 발견할 수 있도록 경로 제시
- 문서 관리의 일관성 유지
- 하네스 엔지니어링의 구조적 완성도 향상

---

## 8. 🧪 테스트 프로세스 (Test Process)

### 개발 환경 vs 운영 환경

**개발 환경 (Development):**
```bash
npm run dev        # 소스코드 직접 실행 (localhost:5173)
npm run test:dev   # 자동 테스트 스크립트
```

**운영 환경 (Production):**
```bash
npm run prod       # 빌드 후 최적화된 코드 실행 (localhost:4173)
npm run test:prod  # 운영 환경 자동 테스트 스크립트
```

### 테스트 스크립트 구조

```
tests/
├── e2e/
│   └── phase2-verification.js    # Phase 2 E2E 테스트
├── fixtures/
│   ├── testAccounts.js           # 테스트 계정 데이터
│   └── expectedValues.js         # 기대값 (색상, 메시지 등)
└── utils/
    └── testHelpers.js            # 테스트 헬퍼 함수
```

### 테스트 실행 프로세스

```
1️⃣ 에이전트가 테스트 스크립트 작성
2️⃣ npm run test:dev 또는 npm run test:prod 실행
3️⃣ 자동 테스트 완료
4️⃣ 결과 리포트 생성 및 제시
5️⃣ 사용자 승인 대기
   ├─ ✅ "적용해" → 실제 코드에 자동 적용
   └─ ❌ "수정해" → 코드 수정 후 재테스트
```

### 테스트 결과 처리

**통과한 경우:**
- 모든 체크리스트 항목 ✅
- Console 에러 없음
- UI가 와이어프레임 준수

**실패한 경우:**
- 문제 항목 분석
- 근본 원인 파악
- 코드 수정
- 재테스트