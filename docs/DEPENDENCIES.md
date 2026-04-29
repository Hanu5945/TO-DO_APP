# 📦 의존성 및 라이브러리 (Dependencies)

이 문서는 프로젝트에서 사용하는 모든 라이브러리와 도구를 정의합니다.

---

## 목차

1. [프로덕션 의존성 (dependencies)](#-프로덕션-의존성)
2. [개발 의존성 (devDependencies)](#-개발-의존성)
3. [npm scripts](#-npm-scripts)
4. [설치 방법](#-설치-방법)

---

## 🎯 프로덕션 의존성

**실제 운영 환경에서도 필요한 라이브러리**

### 1. Vue 3 (^3.4.0)
**뭔가요?**
- 사용자 인터페이스(UI) 프레임워크
- HTML, CSS, JavaScript를 합쳐서 웹 화면을 만드는 도구

**왜 사용?**
- 반응형 UI 만들기
- 컴포넌트 기반 개발

**설치:**
```bash
npm install vue@^3.4.0
```

---

### 2. Vue Router (^4.2.0)
**뭔가요?**
- 페이지 이동을 관리하는 도구
- 로그인 페이지 → 대시보드 → 달력 등 이동 처리

**왜 사용?**
- URL 기반 페이지 이동
- 권한별 페이지 접근 제어 (로그인 필수 등)

**설치:**
```bash
npm install vue-router@^4.2.0
```

**설정 파일:**
- `src/router/index.js`

**기본 라우트:**
```
/auth/login          → 로그인
/auth/signup         → 회원가입
/auth/find-email     → 이메일 찾기
/auth/find-password  → 비밀번호 찾기
/dashboard/personal  → 개인 대시보드
/dashboard/team      → 팀 대시보드
/dashboard/calendar  → 달력
```

---

### 3. Pinia (^2.1.0)
**뭔가요?**
- 상태 관리 라이브러리
- 앱 전체에서 공유하는 **데이터를 중앙에서 관리**

**왜 사용?**
- 로그인 정보 (사용자, 권한)
- 공지 정보
- Task 정보

**설치:**
```bash
npm install pinia@^2.1.0
```

**현재 Stores:**
```
src/stores/
├── authStore.js       → 로그인 정보
└── noticeStore.js     → 공지 정보
```

**예시:**
```javascript
// 어디서든 사용 가능
const authStore = useAuthStore();
console.log(authStore.user); // 로그인된 사용자 정보
```

---

## 🛠️ 개발 의존성

**개발할 때만 필요한 도구**

### 1. Vite (^5.0.0)
**뭔가요?**
- 빠른 개발 서버
- 코드를 저장하면 즉시 브라우저에 반영

**왜 사용?**
- 빠른 개발 경험
- Hot Module Replacement (저장 즉시 새로고침 안 함)

**설치:**
```bash
npm install --save-dev vite@^5.0.0
```

**사용:**
```bash
npm run dev      # 개발 서버 시작 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드된 파일 미리보기
```

---

### 2. @vitejs/plugin-vue (^5.0.0)
**뭔가요?**
- Vite에서 Vue 파일(.vue)을 인식하는 플러그인

**왜 사용?**
- `.vue` 파일을 JavaScript로 변환

**설치:**
```bash
npm install --save-dev @vitejs/plugin-vue@^5.0.0
```

**설정 파일:**
- `vite.config.js`

---

### 3. ESLint (설정만)
**뭔가요?**
- 코드 품질 검사 도구
- "이 변수는 사용하지 않아요", "들여쓰기가 틀렸어요" 등 경고

**왜 사용?**
- 코드 일관성 유지
- 버그 예방

**설치:**
VSCode 확장 프로그램으로 설치
- VSCode Extension: ESLint

**설정 파일:**
- `.eslintrc.js`

**사용:**
- VSCode에서 저장하면 자동 검사

---

### 4. Prettier (설정만)
**뭔가요?**
- 코드 포맷팅 도구
- 들여쓰기, 공백, 줄바꿈을 자동으로 정렬

**왜 사용?**
- 모든 개발자의 코드 스타일을 동일하게 유지

**설치:**
VSCode 확장 프로그램으로 설치
- VSCode Extension: Prettier

**설정 파일:**
- `.prettierrc.json`

**사용:**
- VSCode에서 저장하면 자동 포맷팅

---

### 5. Puppeteer (^21.0.0) ⭐
**뭔가요?**
- 브라우저 자동화 도구
- **프로그래밍으로 브라우저를 조종**

**비유:**
```
로봇이 사람처럼:
  1. 브라우저 열기
  2. 웹사이트 접속
  3. 버튼 클릭
  4. 텍스트 입력
  5. 결과 확인
  → 모두 자동으로!
```

**왜 사용?**
- 테스트 자동화
- 스크린샷 자동 캡처
- 렌더링 성능 측정

**설치:**
```bash
npm install --save-dev puppeteer@^21.0.0
```

**주의:**
- Chrome 브라우저를 자동 다운로드 (약 300MB)
- 설치 시간 오래 걸림

**문제 해결:**
```bash
# 방법 1: Chrome 다운로드 스킵
set PUPPETEER_SKIP_DOWNLOAD=true
npm install

# 방법 2: 최신 버전 사용
npm install puppeteer@latest
```

**사용:**
```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173');
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
```

**테스트 파일:**
- `tests/e2e/phase2-verification.js`

---

## 📋 npm scripts

**package.json에 정의된 명령어**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "prod": "vite build && vite preview",
    "test:dev": "node tests/e2e/phase2-verification.js http://localhost:5173",
    "test:prod": "node tests/e2e/phase2-verification.js http://localhost:4173"
  }
}
```

### 개발 관련

| 명령어 | 역할 |
|--------|------|
| `npm run dev` | 개발 서버 시작 (localhost:5173) |
| `npm run build` | 프로덕션 빌드 (dist/ 폴더) |
| `npm run preview` | 빌드된 파일 미리보기 (localhost:4173) |
| `npm run prod` | 빌드 후 미리보기 (build + preview) |

### 테스트 관련

| 명령어 | 역할 |
|--------|------|
| `npm run test:dev` | 개발 환경 자동 테스트 |
| `npm run test:prod` | 운영 환경 자동 테스트 |

---

## 🔧 설치 방법

### 전체 설치

```bash
# 1단계: 프로젝트 디렉토리 이동
cd C:\Users\HANU0312\Desktop\업무\TO-DO_LIST\TO-DO_APP

# 2단계: 모든 라이브러리 설치
npm install
```

### 개별 설치

```bash
# Vue 3
npm install vue@^3.4.0

# Vue Router
npm install vue-router@^4.2.0

# Pinia
npm install pinia@^2.1.0

# 개발 도구
npm install --save-dev vite@^5.0.0
npm install --save-dev @vitejs/plugin-vue@^5.0.0
npm install --save-dev puppeteer@^21.0.0
```

---

## 📊 현재 설치 상태

### ✅ 설치 완료
- [x] Vue 3
- [x] Vue Router
- [x] Pinia
- [x] Vite
- [x] @vitejs/plugin-vue
- [x] ESLint (VSCode 확장)
- [x] Prettier (VSCode 확장)

### ❌ 설치 실패
- [ ] Puppeteer (SSL 인증서 오류)

---

## 🚀 다음 단계

### Puppeteer 설치 해결

**Option 1: 환경 변수로 Chrome 다운로드 스킵**
```bash
set PUPPETEER_SKIP_DOWNLOAD=true
npm install
```

**Option 2: 최신 버전으로 업그레이드**
```bash
# package.json에서 puppeteer 버전 변경
"puppeteer": "^24.15.0"

# 다시 설치
npm install
```

**Option 3: Playwright로 변경** (더 안정적)
```bash
npm install --save-dev playwright@^1.40.0
# tests/e2e/phase2-verification.js 수정 필요
```

---

## 📚 참고 링크

| 라이브러리 | 공식 문서 |
|-----------|---------|
| Vue 3 | https://vuejs.org |
| Vue Router | https://router.vuejs.org |
| Pinia | https://pinia.vuejs.org |
| Vite | https://vitejs.dev |
| Puppeteer | https://pptr.dev |
| ESLint | https://eslint.org |
| Prettier | https://prettier.io |

---

**최종 수정**: 2026년 4월 29일  
**상태**: 완성
