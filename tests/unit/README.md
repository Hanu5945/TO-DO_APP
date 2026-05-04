# 단위 테스트 (Unit Tests)

## 개요
Vitest를 사용한 Vue 컴포넌트 단위 테스트입니다.

---

## 📁 파일 구조

```
tests/unit/
├── README.md           # 이 파일
├── NoticeBar.spec.js   # NoticeBar 컴포넌트 테스트
├── Header.spec.js      # Header 컴포넌트 테스트
└── ...
```

---

## 🧪 테스트 실행

### 모든 테스트 실행
```bash
npm run test
```

### UI 모드로 테스트 실행 (시각화)
```bash
npm run test:ui
```

### 특정 파일 테스트
```bash
npm run test NoticeBar.spec.js
```

### 커버리지 확인
```bash
npm run test -- --coverage
```

---

## 📝 테스트 작성 방식

### 기본 구조
```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '@/components/path/Component.vue'

describe('Component 이름', () => {
  beforeEach(() => {
    // 테스트 전 초기화
  })

  it('테스트 항목 설명', () => {
    // 테스트 코드
    expect(실제값).toBe(예상값)
  })
})
```

### 컴포넌트 마운트
```javascript
const wrapper = mount(Component, {
  global: {
    plugins: [createPinia(), router],
    components: { ChildComponent }
  }
})
```

### 비동기 처리
```javascript
import { flushPromises } from '@vue/test-utils'

await flushPromises()  // Promise 완료 대기
```

---

## ✅ 테스트 범위

### Phase 2.1.1-2.1.2

#### NoticeBar 테스트
- ✅ 공지가 있을 때 렌더링
- ✅ 공지 메시지 표시
- ✅ 닫기 버튼 존재
- ✅ 닫기 버튼 클릭 시 숨김
- ✅ 공지 없을 때 미렌더링

#### Header 테스트
- ✅ 헤더 렌더링
- ✅ 개인뷰 탭 표시 (모든 계정)
- ✅ 달력뷰 탭 표시 (모든 계정)
- ✅ 팀뷰 탭 (Member는 숨김, Admin+ 표시)
- ✅ 사용자명 표시
- ✅ 로그아웃 버튼 존재
- ✅ 로그아웃 버튼 클릭 동작

---

## 🔧 주요 API

### describe & it
```javascript
describe('테스트 그룹', () => {
  it('개별 테스트', () => {
    // 테스트 코드
  })
})
```

### expect (단언)
```javascript
expect(value).toBe(expected)        // 정확히 일치
expect(value).toEqual(expected)     // 값 일치
expect(value).toContain(item)       // 포함
expect(value).toBeTruthy()          // true
expect(fn).toHaveBeenCalled()       // 함수 호출됨
expect(element.exists()).toBe(true) // 요소 존재
```

### 비동기
```javascript
await wrapper.vm.$nextTick()        // 다음 DOM 업데이트 대기
await flushPromises()               // 모든 Promise 완료 대기
```

---

## 📊 테스트 커버리지

목표: **80% 이상**

현재 커버리지:
```bash
npm run test -- --coverage
```

---

## 🚀 다음 Phase 테스트

### Phase 2.3: 탭 네비게이션
- PersonalView 테스트
- TeamView 테스트
- CalendarView 테스트

### Phase 2.4: Personal Daily View
- WaitingList 테스트
- TimeTable 테스트
- TimeSlot 테스트

---

## 💡 팁

### 1. 테스트 먼저 작성 (TDD)
- 기능 구현 전 테스트 작성
- 기능이 테스트를 만족하는지 확인

### 2. 명확한 테스트명
```javascript
// ❌ 나쁜 예
it('works', () => {})

// ✅ 좋은 예
it('Member 계정에서 팀뷰 탭이 숨겨져야 한다', () => {})
```

### 3. Arrange-Act-Assert 패턴
```javascript
// Arrange (준비)
const wrapper = mount(Component)

// Act (실행)
await wrapper.find('.button').trigger('click')

// Assert (검증)
expect(wrapper.find('.result').text()).toBe('success')
```

---

**마지막 업데이트**: 2026-05-04
