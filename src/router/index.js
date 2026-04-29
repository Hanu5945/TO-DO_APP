/**
 * Vue Router 설정
 * ARCHITECTURE.md의 API 엔드포인트 구조를 기반으로 라우팅 설정
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// 페이지 컴포넌트 (동적 임포트로 code splitting 활용)
const Login = () => import('@/pages/Auth/Login.vue')
const SignUp = () => import('@/pages/Auth/SignUp.vue')
const FindCredentials = () => import('@/pages/Auth/FindCredentials.vue')

// 대시보드 페이지
const PersonalView = () => import('@/pages/Dashboard/PersonalView.vue')
const TeamView = () => import('@/pages/Dashboard/TeamView.vue')
const CalendarView = () => import('@/pages/Dashboard/CalendarView.vue')
// const AdminPanel = () => import('@/pages/Admin/AdminPanel.vue')

// 라우트 정의
const routes = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore()
      return authStore.isAuthenticated ? '/dashboard/personal' : '/auth/login'
    }
  },

  // 인증 라우트
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresAuth: false }
      },
      {
        path: 'find-email',
        name: 'FindEmail',
        component: FindCredentials,
        props: { tab: 'email' },
        meta: { requiresAuth: false }
      },
      {
        path: 'find-password',
        name: 'FindPassword',
        component: FindCredentials,
        props: { tab: 'password' },
        meta: { requiresAuth: false }
      }
    ]
  },

  // 대시보드 라우트
  {
    path: '/dashboard',
    children: [
      {
        path: 'personal',
        name: 'PersonalView',
        component: PersonalView,
        meta: { requiresAuth: true }
      },
      {
        path: 'team',
        name: 'TeamView',
        component: TeamView,
        meta: { requiresAuth: true, role: ['ADMIN', 'SUPER_ADMIN'] }
      },
      {
        path: 'calendar',
        name: 'CalendarView',
        component: CalendarView,
        meta: { requiresAuth: true }
      }
    ]
  },

  // // 관리자 라우트
  // {
  //   path: '/admin',
  //   children: [
  //     {
  //       path: 'panel',
  //       name: 'AdminPanel',
  //       component: AdminPanel,
  //       meta: { requiresAuth: true, role: ['SUPER_ADMIN'] }
  //     }
  //   ]
  // },

  // 404 라우트
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
  }
]

// 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 라우터 가드 (전역 가드)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  // 인증이 필요한 페이지이고 로그인하지 않은 경우
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
    return
  }

  // 인증되지 않아도 되는 페이지인데 이미 로그인한 경우
  if (!requiresAuth && authStore.isAuthenticated) {
    // 인증 페이지에서 대시보드로 리다이렉트
    if (to.path.startsWith('/auth')) {
      next('/dashboard/personal')
      return
    }
  }

  // 권한 검증 (필요 시)
  const requiredRole = to.meta.role
  if (requiredRole && authStore.isAuthenticated) {
    if (!requiredRole.includes(authStore.userRole)) {
      // 권한 없음 - 접근 불가
      next('/dashboard/personal')
      return
    }
  }

  next()
})

export default router
