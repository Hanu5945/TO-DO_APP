<template>
  <div class="dashboard-container">
    <!-- 공지 배너 (최상단 고정) -->
    <NoticeBar />

    <!-- 상단바 (Header.vue) -->
    <Header />

    <!-- 메인 콘텐츠 -->
    <div class="dashboard-content">
      <div class="welcome-box">
        <h2>환영합니다!</h2>
        <p>{{ authStore.user?.name }}님, Phase 2 개발이 진행 중입니다.</p>

        <div class="user-info">
          <p><strong>이메일:</strong> {{ authStore.user?.email }}</p>
          <p><strong>권한:</strong> {{ getRoleLabel(authStore.userRole) }}</p>
          <p><strong>인증 상태:</strong> {{ authStore.isAuthenticated ? '인증됨' : '미인증' }}</p>
        </div>

        <div class="next-steps">
          <h3>🚀 Phase 2 진행 상황:</h3>
          <ul>
            <li>✅ 공지 배너 (NoticeBar) - 완료!</li>
            <li>🔄 상단바 (Header) - 다음 구현</li>
            <li>⏳ 시간표 (TimeTable) - 예정</li>
            <li>⏳ 대기 목록 (WaitingList) - 예정</li>
            <li>⏳ Task 관리 - 예정</li>
            <li>⏳ 달력뷰, 팀뷰 - 예정</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import NoticeBar from '@/components/common/NoticeBar.vue'
import Header from '@/components/common/Header.vue'

const authStore = useAuthStore()

const getRoleLabel = (role) => {
  const roleMap = {
    MEMBER: '일반',
    ADMIN: '관리자',
    SUPER_ADMIN: '슈퍼관리자'
  }
  return roleMap[role] || '알 수 없음'
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: var(--gray-50);
}

/* NoticeBar(46px) + Header(56px) = 102px */
.dashboard-content {
  max-width: 800px;
  margin: 102px auto var(--space-xl);
  padding: 0 var(--space-lg);
}

.welcome-box {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.welcome-box h2 {
  font-size: 18px;
  color: var(--gray-900);
  margin: 0 0 var(--space-md) 0;
}

.welcome-box p {
  font-size: 12px;
  color: var(--gray-500);
  margin: 0 0 var(--space-lg) 0;
}

.user-info {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin: var(--space-lg) 0;
}

.user-info p {
  font-size: 11px;
  color: var(--gray-700);
  margin: var(--space-sm) 0;
}

.user-info strong {
  color: var(--gray-900);
  font-weight: 600;
}

.next-steps {
  margin-top: var(--space-2xl);
}

.next-steps h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 var(--space-md) 0;
}

.next-steps ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.next-steps li {
  font-size: 12px;
  color: var(--gray-700);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--gray-100);
}

.next-steps li:last-child {
  border-bottom: none;
}

/* 반응형 */
@media (max-width: 640px) {
  .dashboard-header {
    margin-top: 60px;
  }
}
</style>
