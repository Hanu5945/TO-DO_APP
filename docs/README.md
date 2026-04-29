# 📋 docs 폴더 - 프로젝트 상세 문서

## ⚠️ 이 파일을 읽기 전에

**반드시 먼저 읽어야 할 파일:**
1. `CLAUDE.md` (프로젝트 루트)
2. `AGENTS.md` (프로젝트 루트)

이 파일을 읽고 있다면, 이미 위 두 파일을 읽었어야 합니다. ✅

---

## 개요

이 프로젝트는 팀의 업무 일정을 효과적으로 관리하고 협업할 수 있는 **웹 기반 스케줄 관리 시스템**입니다.

---

## 📖 docs 폴더 내 문서 읽기 순서

**이제 아래 순서대로 문서를 읽으세요:**

### 1단계: 전체 이해
1. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - 프로젝트의 전체 그림 파악
2. **[PRODUCT_SPEC.md](./PRODUCT_SPEC.md)** - 기능 명세 및 요구사항

### 2단계: 기술 설계
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 시스템 아키텍처 및 기술 스택
4. **[FRONTEND.md](./FRONTEND.md)** - 프론트엔드 구조 및 컴포넌트 설계
5. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - 디자인 가이드 및 컬러, 타이포그래피

### 3단계: 실행 및 검증
6. **[EXECUTION_PLANS.md](./EXECUTION_PLANS.md)** - 기능별 구현 계획
7. **⭐ [TEST_PROCEDURES.md](./TEST_PROCEDURES.md)** - 테스트 절차 (하네스 엔지니어링 핵심)
8. **[QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md)** - 품질 검증 기준

### 4단계: 관리
9. **[TECH_DEBT.md](./TECH_DEBT.md)** - 기술 부채 및 개선 사항
10. **[DEPENDENCIES.md](./DEPENDENCIES.md)** - 라이브러리 및 의존성 설명

---

## 🎯 핵심 정보

### 기술 스택
- **Frontend**: Vue 3 + Vite
- **Language**: JavaScript/HTML/CSS
- **HTTP Client**: fetch API
- **상태 관리**: Pinia (필요시)

### 프로젝트 구조
```
src/
├── components/       # 재사용 가능한 컴포넌트
├── pages/           # 페이지 컴포넌트 (뷰)
├── stores/          # Pinia 상태 관리
├── utils/           # 유틸리티 함수
├── styles/          # 전역 스타일
└── App.vue          # 루트 컴포넌트
```

### 권한 체계
- **Super Admin (SA)**: 팀원 관리, 권한 변경, 공지 관리, Task 전체 수정
- **Admin (A)**: Task 수정, 팀뷰 접근, 그룹 관리
- **Member (M)**: 본인 Task만 수정, 기본 기능 사용

---

## 📌 중요 규칙

### 절대 규칙 (반드시 따를 것)
1. **와이어프레임 준수**: 화면 설계는 제공된 와이어프레임을 정확히 따른다
2. **색상 가이드 준수**: 상태별 색상(파랑=진행중, 초록=완료, 빨강=지연, 회색=대기)을 정확히 적용
3. **권한 체계 준수**: 각 화면에서 권한에 따른 UI 변경이 정확해야 함
4. **반응형 설계 필수**: 모바일/태블릿/데스크톱 모두 지원
5. **에러 처리**: 모든 API 호출에 대한 에러 처리 필수

### 코드 작성 원칙
1. 컴포넌트는 단일 책임 원칙 준수
2. Props와 Emits 명확히 정의
3. 상태 관리는 Pinia 사용 (필요시)
4. 유틸리티 함수는 별도 파일로 분리
5. 스타일은 scoped CSS 또는 디자인 시스템 준수

---

## 🚀 빠른 시작

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

---

## 📞 질문이 있을 때

1. **와이어프레임 확인**: `TO-DO_LIST_Wireframe.html`
2. **상세 스펙**: `docs/PRODUCT_SPEC.md`
3. **아키텍처 확인**: `docs/ARCHITECTURE.md`
4. **디자인 시스템**: `docs/DESIGN_SYSTEM.md`

---

**최종 수정**: 2026년 4월 28일  
**상태**: 초안
