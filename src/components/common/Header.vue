<template>
  <header class="header">
    <div class="header-content">
      <!-- 로고/제목 -->
      <div class="header-logo">
        <h1>팀 업무 스케줄러</h1>
      </div>

      <!-- 탭 네비게이션 (PRODUCT_SPEC.md 2.3 준수) -->
      <nav class="header-tabs">
        <!-- 개인뷰: 전체 사용자 표시 -->
        <router-link
          to="/dashboard/personal"
          :class="['tab', { active: currentTab === 'personal' }]"
        >
          개인뷰
        </router-link>

        <!-- 팀뷰: Member는 숨김, Admin+ 만 표시 -->
        <router-link
          v-if="!authStore.isMember"
          to="/dashboard/team"
          :class="['tab', { active: currentTab === 'team' }]"
        >
          팀뷰
        </router-link>

        <!-- 달력뷰: 전체 사용자 표시 -->
        <router-link
          to="/dashboard/calendar"
          :class="['tab', { active: currentTab === 'calendar' }]"
        >
          달력뷰
        </router-link>
      </nav>

      <!-- 사용자 정보 영역 -->
      <div class="header-user">
        <!-- 아바타 -->
        <Avatar
          :name="authStore.user?.name || '?'"
          :role="getRoleStyle(authStore.userRole)"
        />

        <!-- 사용자 이름 -->
        <span class="user-name">{{ authStore.user?.name }}</span>

        <!-- 로그아웃 버튼 -->
        <button class="logout-btn" @click="handleLogout" title="로그아웃">
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Avatar from '@/components/common/Avatar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 현재 활성 탭
const currentTab = computed(() => {
  if (route.path.includes('personal')) return 'personal'
  if (route.path.includes('team')) return 'team'
  if (route.path.includes('calendar')) return 'calendar'
  return ''
})

// 역할에 따른 아바타 스타일
const getRoleStyle = (role) => {
  const roleMap = {
    MEMBER: 'member',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super-admin'
  }
  return roleMap[role] || 'member'
}

// 로그아웃
const handleLogout = () => {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 56px; /* NoticeBar 높이 */
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xl);
}

/* 로고/제목 */
.header-logo {
  flex-shrink: 0;
}

.header-logo h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-900);
  line-height: 1;
}

/* 탭 네비게이션 */
.header-tabs {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.tab {
  padding: 8px 0;
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-500);
  cursor: pointer;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
}

.tab:hover {
  color: var(--gray-700);
}

.tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

/* 사용자 정보 영역 */
.header-user {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.user-name {
  font-size: 12px;
  color: var(--gray-700);
  font-weight: 500;
  min-width: 60px;
  text-align: right;
}

.logout-btn {
  padding: 4px 10px;
  background-color: var(--danger-light);
  color: var(--danger-dark);
  border: 1px solid var(--danger);
  border-radius: var(--radius-md);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.logout-btn:hover {
  background-color: var(--danger);
  color: white;
}

/* 반응형 */
@media (max-width: 768px) {
  .header-content {
    gap: var(--space-md);
    padding: 0 var(--space-md);
  }

  .header-logo h1 {
    font-size: 14px;
  }

  .header-tabs {
    gap: var(--space-md);
  }

  .tab {
    font-size: 11px;
  }

  .user-name {
    display: none;
  }

  .logout-btn {
    font-size: 9px;
    padding: 3px 8px;
  }
}

@media (max-width: 640px) {
  .header-content {
    flex-wrap: wrap;
    height: auto;
    padding: var(--space-md);
    gap: var(--space-sm);
  }

  .header-logo h1 {
    font-size: 13px;
    width: 100%;
    order: 1;
  }

  .header-tabs {
    width: 100%;
    order: 2;
  }

  .header-user {
    width: 100%;
    order: 3;
    justify-content: flex-end;
  }
}
</style>
