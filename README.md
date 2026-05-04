# 📅 TO-DO_APP - 팀 스케줄 관리 시스템

팀의 업무 일정을 효과적으로 관리하고 협업할 수 있는 웹 기반 스케줄 관리 시스템입니다.

---

## 🚀 빠른 시작

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행 (localhost:5173)
npm run dev

# 3. 테스트 실행 (다른 터미널에서)
npm run test:dev
```

---

## 📖 반드시 먼저 읽어야 할 파일

**새로운 사용자라면:**
1. **[GUIDE_WORKFLOW.md](./GUIDE_WORKFLOW.md)** ⭐ 필독
   - "나는 뭐 하고, AI는 뭐 하는지" 설명
   - 개발 과정 전체 이해

**에이전트/개발자라면:**
2. [CLAUDE.md](./CLAUDE.md) - 프로젝트 실행 가이드
3. [AGENTS.md](./AGENTS.md) - 에이전트 규칙
4. [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) - Git 브랜치 관리
5. [docs/README.md](./docs/README.md) - 상세 문서

---

## 🎯 핵심 정보

### 기술 스택
- **Frontend**: Vue 3 + Vite
- **상태 관리**: Pinia
- **라우팅**: Vue Router
- **테스트**: Puppeteer (E2E)

### 권한 체계
| 역할 | 설명 |
|-----|------|
| **Super Admin** | 팀원 관리, 전체 권한 |
| **Admin** | Task 수정, 팀뷰 접근 |
| **Member** | 기본 기능 (본인 Task만) |

### 테스트 계정
| 역할 | 이메일 | 비밀번호 |
|-----|--------|---------|
| Super Admin | super@wezon.com | asdf1234 |
| Admin | admin@wezon.com | asdf1234 |
| Member | member@wezon.com | asdf1234 |

---

## 📋 프로젝트 구조

```
TO-DO_APP/
├── README.md              # 이 파일 (프로젝트 진입점)
├── CLAUDE.md              # AI 에이전트 가이드
├── AGENTS.md              # 에이전트 규칙
├── GIT_WORKFLOW.md        # Git 브랜치 관리
├── GUIDE_WORKFLOW.md      # 사용자 가이드 ⭐
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── pages/            # 페이지 컴포넌트
│   ├── stores/           # Pinia 상태 관리
│   ├── utils/            # 유틸리티 함수
│   └── styles/           # 전역 스타일
├── docs/
│   ├── README.md         # 상세 문서 네비게이션
│   ├── EXECUTION_PLANS.md # 실행 계획
│   ├── TEST_PROCEDURES.md # 테스트 절차
│   └── features/         # Phase별 명세
└── tests/
    ├── e2e/             # E2E 테스트 스크립트
    ├── fixtures/        # 테스트 데이터
    └── utils/           # 테스트 헬퍼
```

---

## 🧪 테스트 실행

**개발 환경:**
```bash
# 터미널 1
npm run dev

# 터미널 2
npm run test:dev
```

**운영 환경:**
```bash
# 터미널 1
npm run prod

# 터미널 2
npm run test:prod
```

---

## 📞 문서 찾기

| 찾는 것 | 문서 |
|--------|------|
| **개발 과정 이해** | [GUIDE_WORKFLOW.md](./GUIDE_WORKFLOW.md) |
| **프로젝트 전체 목표** | [docs/PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) |
| **기능 명세** | [docs/PRODUCT_SPEC.md](./docs/PRODUCT_SPEC.md) |
| **기술 아키텍처** | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| **UI 디자인** | [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) |
| **구현 계획** | [docs/EXECUTION_PLANS.md](./docs/EXECUTION_PLANS.md) |
| **테스트 방법** | [docs/TEST_PROCEDURES.md](./docs/TEST_PROCEDURES.md) |

---

**준비되셨나요? 👉 [GUIDE_WORKFLOW.md](./GUIDE_WORKFLOW.md)를 읽으세요!**
