/**
 * Header 컴포넌트 테스트
 * Phase 2.1.2: 헤더 탭 네비게이션 검증
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Avatar from '@/components/common/Avatar.vue'
import { useAuthStore } from '@/stores/authStore'

// 임시 라우터 생성
const createTestRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/dashboard/personal', component: { template: '<div>personal</div>' } },
      { path: '/dashboard/team', component: { template: '<div>team</div>' } },
      { path: '/dashboard/calendar', component: { template: '<div>calendar</div>' } },
      { path: '/auth/login', component: { template: '<div>login</div>' } }
    ]
  })
}

describe('Header 컴포넌트', () => {
  let router

  beforeEach(() => {
    setActivePinia(createPinia())
    router = createTestRouter()
  })

  it('헤더가 렌더링되어야 한다', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
        components: { Avatar }
      }
    })

    expect(wrapper.find('.header').exists()).toBe(true)
  })

  it('개인뷰 탭이 항상 표시되어야 한다', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
        components: { Avatar }
      }
    })

    const personalTab = wrapper.find('a[href="/dashboard/personal"]')
    expect(personalTab.exists()).toBe(true)
    expect(personalTab.text()).toBe('개인뷰')
  })

  it('달력뷰 탭이 항상 표시되어야 한다', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
        components: { Avatar }
      }
    })

    const calendarTab = wrapper.find('a[href="/dashboard/calendar"]')
    expect(calendarTab.exists()).toBe(true)
    expect(calendarTab.text()).toBe('달력뷰')
  })

  it('Member 계정은 팀뷰 탭이 숨겨져야 한다', async () => {
    const pinia = createPinia()
    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
        components: { Avatar }
      }
    })

    const store = useAuthStore()
    // Member 계정 설정
    store.user = {
      id: '3',
      name: '일반멤버',
      email: 'member@wezon.com',
      role: 'MEMBER'
    }

    await wrapper.vm.$nextTick()

    const teamTab = wrapper.find('a[href="/dashboard/team"]')
    expect(teamTab.exists()).toBe(false)
  })

  it('Admin 계정은 팀뷰 탭이 표시되어야 한다', async () => {
    const pinia = createPinia()
    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
        components: { Avatar }
      }
    })

    const store = useAuthStore()
    // Admin 계정 설정
    store.user = {
      id: '2',
      name: '관리자',
      email: 'admin@wezon.com',
      role: 'ADMIN'
    }

    await wrapper.vm.$nextTick()

    const teamTab = wrapper.find('a[href="/dashboard/team"]')
    expect(teamTab.exists()).toBe(true)
    expect(teamTab.text()).toBe('팀뷰')
  })

  it('사용자 이름이 표시되어야 한다', async () => {
    const pinia = createPinia()
    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
        components: { Avatar }
      }
    })

    const store = useAuthStore()
    store.user = {
      id: '3',
      name: '일반멤버',
      email: 'member@wezon.com',
      role: 'MEMBER'
    }

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.user-name').text()).toBe('일반멤버')
  })

  it('로그아웃 버튼이 존재해야 한다', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
        components: { Avatar }
      }
    })

    expect(wrapper.find('.logout-btn').exists()).toBe(true)
  })

  it('로그아웃 버튼 클릭 시 logout이 호출되어야 한다', async () => {
    const pinia = createPinia()
    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
        components: { Avatar }
      }
    })

    const store = useAuthStore()
    store.user = {
      id: '3',
      name: '일반멤버',
      email: 'member@wezon.com',
      role: 'MEMBER'
    }

    const logoutSpy = vi.spyOn(store, 'logout')

    await wrapper.vm.$nextTick()
    await wrapper.find('.logout-btn').trigger('click')

    expect(logoutSpy).toHaveBeenCalled()
  })
})
