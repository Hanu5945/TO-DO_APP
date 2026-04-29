# 📖 CLAUDE.md - 프로젝트 실행 가이드 (메인 진입점)

이 문서는 **가장 먼저 읽어야 할 메인 진입점**입니다.

이 파일의 목적:
- 에이전트가 이 프로젝트에서 일할 때의 읽기 순서 제시
- 프로젝트 현재 상태 파악
- 구체적인 실행 절차 안내

---

## 📑 목차

1. [핵심 원칙](#-핵심-원칙)
2. [프로젝트 현재 상태](#1-프로젝트-현재-상태)
3. [에이전트 실행 순서](#2-에이전트-실행-순서)
4. [권장 문서 구조](#3-권장-문서-구조)

---

---


## 0. 핵심 원칙

이 프로젝트는 하네스 엔지니어링 방식으로 운영한다.

하네스 엔지니어링이란 AI 에이전트가 무작정 코드를 작성하게 하는 것이 아니라, 에이전트가 안정적으로 일할 수 있도록 다음 요소를 코드베이스 안에 설계하는 것이다.

- 명확한 실행 순서
- 읽어야 할 문서의 우선순위
- 아키텍처 제약
- 코드 작성 규칙
- 검증 절차
- 테스트 기준
- 문서 업데이트 기준
- 실패 시 복구 절차
- 사람이 판단해야 할 에스컬레이션 기준

에이전트는 항상 다음 원칙을 따른다.

1. 먼저 읽고 이해한다.
2. 바로 코딩하지 않는다.
3. 작업 계획을 세운다.
4. 작은 단위로 구현한다.
5. 직접 검증한다. ⭐ **스크립트 기반 자동 테스트로 검증**
6. 변경 내용을 문서에 반영한다.
7. 불확실한 내용은 추측하지 않는다.
8. 기존 구조를 깨지 않는다.
9. 사람의 의도를 코드와 문서에 남긴다.
10. 임시 해결보다 재현 가능한 구조를 우선한다.

---

## 🧪 검증 프로세스 (Verification Process)

**원칙 5: 직접 검증한다**를 구현하기 위한 프로세스:

### 개발 환경 (Development)
```bash
npm run dev        # localhost:5173에서 개발 서버 실행
npm run test:dev   # 자동 테스트 스크립트 실행
```

### 운영 환경 (Production)
```bash
npm run prod       # 빌드 후 localhost:4173에서 운영 서버 실행
npm run test:prod  # 운영 환경 자동 테스트 스크립트 실행
```

### 검증 결과 처리
```
✅ 테스트 통과
└─ 에이전트가 실제 코드에 자동 적용

❌ 테스트 실패
└─ 에이전트가 원인 분석 후 코드 수정
└─ 수정 후 재테스트
```

---

## 1. 프로젝트 현재 상태

현재 프로젝트는 Vite + Vue 기반으로 생성된 초기 프로젝트이다.

에이전트는 다음을 전제로 작업한다.

- 프론트엔드 중심 프로젝트이다.
- Vue 3 기반으로 작성한다.
- Vite 개발 서버를 사용한다.
- TypeScript 사용 여부는 현재 프로젝트 설정을 확인한 뒤 따른다.
- 기존 패키지 매니저는 `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` 중 실제 존재하는 파일을 기준으로 판단한다.
- 불필요한 라이브러리 추가를 금지한다.
- 새 라이브러리 추가 전 반드시 이유를 설명한다.

---

## 2. 에이전트 실행 순서

모든 작업은 아래 순서를 따른다.

### 2.1 Repository Scan

작업 시작 전 반드시 현재 저장소 상태를 확인한다.

확인 항목:

- `package.json`
- `vite.config.*`
- `src/`
- `src/main.*`
- `src/App.vue`
- `src/components/`
- `src/router/` 존재 여부
- `src/stores/` 존재 여부
- `docs/` 존재 여부
- 테스트 도구 존재 여부
- ESLint / Prettier 설정 존재 여부
- TypeScript 설정 존재 여부

이 단계에서는 코드를 수정하지 않는다.

---

### 2.2 Document Reading Order

**이 프로젝트에서의 문서 읽기 순서:**

```
🔺 1단계: CLAUDE.md (지금 읽는 파일)
   └─ 프로젝트 목표, 현재 상태, 실행 규칙 이해

🔺 2단계: AGENTS.md (프로젝트 루트)
   └─ 에이전트의 역할, 기본 규칙, 문서 선택 방법 이해

🔺 3단계: docs/README.md (docs 폴더)
   └─ docs 폴더 내 문서들의 읽기 순서 안내
      ↓
   └─ 아래 순서대로 읽음:
      1. PROJECT_OVERVIEW.md (프로젝트 목표/기능)
      2. PRODUCT_SPEC.md (기능 명세)
      3. ARCHITECTURE.md (기술 구조)
      4. FRONTEND.md (프론트엔드 규칙)
      5. DESIGN_SYSTEM.md (디자인 가이드)
      6. EXECUTION_PLANS.md (구현 계획)
      7. TEST_PROCEDURES.md (테스트 절차) ⭐ 하네스 엔지니어링의 핵심
      8. QUALITY_CHECKLIST.md (검증 기준)
      9. TECH_DEBT.md (기술 부채)
```

문서가 없으면 임의로 작업하지 말고, 필요한 문서 초안을 먼저 생성한다.

단, 사용자가 명확히 “문서 생성 없이 바로 구현”을 요청한 경우에는 최소한의 계획을 먼저 작성한 뒤 구현한다.

---

## 3. 권장 문서 구조

이 프로젝트는 다음 문서 구조를 목표로 한다.

```txt
CLAUDE.md
docs/
├── README.md
├── PROJECT_OVERVIEW.md
├── ARCHITECTURE.md
├── PRODUCT_SPEC.md
├── FRONTEND.md
├── DESIGN_SYSTEM.md
├── EXECUTION_PLANS.md
├── QUALITY_CHECKLIST.md
├── TECH_DEBT.md
├── decisions/
│   └── README.md
├── features/
│   └── README.md
├── generated/
│   └── README.md
└── references/
    └── README.md






    