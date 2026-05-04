/**
 * NoticeBar 컴포넌트 테스트
 * Phase 2.1.1: 공지 배너 검증
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NoticeBar from '@/components/common/NoticeBar.vue'
import { useNoticeStore } from '@/stores/noticeStore'

describe('NoticeBar 컴포넌트', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('공지가 있을 때 렌더링되어야 한다', async () => {
    const wrapper = mount(NoticeBar, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    expect(wrapper.find('.notice-bar').exists()).toBe(true)
  })

  it('공지 메시지가 표시되어야 한다', async () => {
    const wrapper = mount(NoticeBar, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    const message = wrapper.find('.notice-message').text()
    expect(message).toBe('내일 오후 2시 서버 점검 예정입니다')
  })

  it('닫기 버튼이 존재해야 한다', async () => {
    const wrapper = mount(NoticeBar, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    expect(wrapper.find('.btn-close').exists()).toBe(true)
  })

  it('닫기 버튼 클릭 시 공지가 숨겨진다', async () => {
    const pinia = createPinia()
    const wrapper = mount(NoticeBar, {
      global: {
        plugins: [pinia]
      }
    })

    await flushPromises()

    const store = useNoticeStore()
    expect(store.latestNotice).not.toBeNull()

    // 닫기 버튼 클릭
    await wrapper.find('.btn-close').trigger('click')

    expect(store.isHidden).toBe(true)
    expect(wrapper.find('.notice-bar').exists()).toBe(false)
  })

  it('공지가 없을 때 렌더링되지 않는다', async () => {
    const pinia = createPinia()
    const wrapper = mount(NoticeBar, {
      global: {
        plugins: [pinia]
      }
    })

    await flushPromises()

    const store = useNoticeStore()
    store.hideNotice()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.notice-bar').exists()).toBe(false)
  })
})
