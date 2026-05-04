<template>
  <div class="dashboard-container">
    <!-- 공지 배너 (최상단 고정) -->
    <NoticeBar />

    <!-- 상단바 (Header.vue) -->
    <Header />

    <!-- 메인 콘텐츠 -->
    <div class="dashboard-content">
      <!-- Phase 2.4: Personal Daily View -->
      <div class="personal-view">
        <!-- 왼쪽: 대기 목록 -->
        <WaitingList />

        <!-- 오른쪽: 시간표 -->
        <TimeTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import NoticeBar from '@/components/common/NoticeBar.vue'
import Header from '@/components/common/Header.vue'
import WaitingList from '@/components/dashboard/WaitingList.vue'
import TimeTable from '@/components/dashboard/TimeTable.vue'

const authStore = useAuthStore()
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: var(--gray-50);
}

/* NoticeBar(46px) + Header(56px) = 102px */
.dashboard-content {
  margin-top: 102px;
  padding: var(--space-lg);
  height: calc(100vh - 102px);
  display: flex;
}

.personal-view {
  display: flex;
  gap: var(--space-lg);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 반응형 */
@media (max-width: 768px) {
  .personal-view {
    flex-direction: column;
  }

  .dashboard-content {
    height: auto;
  }
}
</style>
