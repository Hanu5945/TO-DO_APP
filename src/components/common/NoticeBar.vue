<template>
  <!-- 공지 배너 (PRODUCT_SPEC.md 2.2 준수) -->
  <div v-if="noticeStore.latestNotice" class="notice-bar">
    <div class="notice-content">
      <!-- 공지 아이콘 + 제목 -->
      <div class="notice-info">
        <span class="notice-icon">📢</span>
        <span class="notice-title">{{ noticeStore.latestNotice.title }}</span>
      </div>

      <!-- 공지 메시지 -->
      <div class="notice-message">
        {{ noticeStore.latestNotice.message }}
      </div>

      <!-- 버튼 그룹 -->
      <div class="notice-actions">
        <button class="btn-register" @click="handleRegisterNotice" title="공지 등록">
          + 공지 등록
        </button>
        <button class="btn-close" @click="handleClose" title="닫기">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNoticeStore } from '@/stores/noticeStore'

const noticeStore = useNoticeStore()

// 공지 배너 닫기
const handleClose = () => {
  noticeStore.hideNotice()
}

// 공지 등록 (향후 구현)
const handleRegisterNotice = () => {
  // TODO: 공지 등록 모달 열기
  // uiStore.openModal('notice')
  console.log('공지 등록 모달 열기 (향후 구현)')
}

// 마운트 시 공지 데이터 로드
import { onMounted } from 'vue'

onMounted(async () => {
  await noticeStore.fetchNotices()
})
</script>

<style scoped>
.notice-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--admin); /* 보라색 #7C3AED */
  color: #F5F3FF; /* 밝은 보라 */
  padding: var(--space-lg);
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.notice-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

.notice-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.notice-icon {
  font-size: 16px;
  line-height: 1;
}

.notice-title {
  font-size: 12px;
  font-weight: 700;
  color: #F5F3FF;
}

.notice-message {
  flex: 1;
  font-size: 12px;
  color: #F5F3FF;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.btn-register {
  background: none;
  border: 1px solid #F5F3FF;
  color: #F5F3FF;
  padding: 4px 10px;
  border-radius: var(--radius-md);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-register:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.btn-close {
  background: none;
  border: none;
  color: #F5F3FF;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
  flex-shrink: 0;
}

.btn-close:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

/* 반응형 */
@media (max-width: 768px) {
  .notice-bar {
    padding: var(--space-md);
  }

  .notice-content {
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .notice-message {
    width: 100%;
    white-space: normal;
  }

  .notice-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
