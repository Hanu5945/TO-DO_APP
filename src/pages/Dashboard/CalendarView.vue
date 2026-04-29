<template>
  <div class="view-container">
    <NoticeBar />
    <Header />
    <div class="content">
      <div class="placeholder-box">
        <h2>📅 달력뷰 구현 중</h2>
        <p>월간 달력 및 Task 시각화 기능이 구현될 예정입니다.</p>
        <p style="font-size: 11px; color: var(--gray-500)">Phase 3에서 구현</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NoticeBar from '@/components/common/NoticeBar.vue'
import Header from '@/components/common/Header.vue'
</script>

<style scoped>
.view-container {
  min-height: 100vh;
  background-color: var(--gray-50);
}

.content {
  margin-top: 102px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--space-xl) var(--space-lg);
}

.placeholder-box {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-3xl);
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.placeholder-box h2 {
  font-size: 18px;
  color: var(--gray-900);
  margin: 0 0 var(--space-md) 0;
}

.placeholder-box p {
  font-size: 12px;
  color: var(--gray-500);
  margin: var(--space-sm) 0;
}
</style>
