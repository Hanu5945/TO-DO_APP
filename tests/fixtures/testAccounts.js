/**
 * 테스트 계정 데이터
 * authStore.js의 testAccounts와 동일하게 정의
 */

export const testAccounts = {
  member: {
    email: 'member@wezon.com',
    password: '1',
    role: 'MEMBER',
    name: '일반멤버',
    id: '3'
  },
  admin: {
    email: 'admin@wezon.com',
    password: '1',
    role: 'ADMIN',
    name: '관리자',
    id: '2'
  },
  superAdmin: {
    email: 'super@wezon.com',
    password: '1',
    role: 'SUPER_ADMIN',
    name: '최고관리자',
    id: '1'
  }
};

export default testAccounts;
