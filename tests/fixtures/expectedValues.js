/**
 * 기대값 정의
 * DESIGN_SYSTEM.md와 와이어프레임 기준
 */

export const expectedValues = {
  // NoticeBar 색상 (#7C3AED - 보라색)
  noticeBar: {
    backgroundColor: 'rgb(124, 58, 237)', // #7C3AED
    textColor: 'rgb(245, 243, 255)', // #F5F3FF
    height: 46,
    visible: true
  },

  // Header 관련
  header: {
    height: 56,
    visible: true
  },

  // 아바타 색상 (역할별)
  avatar: {
    member: {
      backgroundColor: 'rgb(209, 250, 229)', // #D1FAE5 (밝은 초록색)
      color: 'rgb(6, 95, 70)' // #065F46
    },
    admin: {
      backgroundColor: 'rgb(254, 243, 199)', // #FEF3C7 (밝은 노랑)
      color: 'rgb(146, 64, 14)' // #92400E
    },
    superAdmin: {
      backgroundColor: 'rgb(237, 233, 254)', // var(--admin-light) #EDE9FE (밝은 보라색)
      color: 'rgb(109, 40, 217)' // #6D28D9
    }
  },

  // 탭 가시성
  tabs: {
    member: {
      personalView: true,
      teamView: false, // Member는 팀뷰 접근 불가
      calendarView: true
    },
    admin: {
      personalView: true,
      teamView: true,
      calendarView: true
    },
    superAdmin: {
      personalView: true,
      teamView: true,
      calendarView: true
    }
  },

  // 전체 검증 항목
  tests: {
    noticeBarVisibility: 'NoticeBar가 상단에 표시되는가?',
    noticeBarColor: 'NoticeBar 색상이 보라색(#7C3AED)인가?',
    noticeBarMessage: '공지 메시지가 표시되는가?',
    noticeBarClose: '[×] 버튼으로 닫힐 수 있는가?',
    noticeBarSession: '로그아웃 후 다시 로그인해도 닫혀있는가? (세션 내 유지)',
    noticeBarRefresh: 'F5 새로고침 후 다시 나타나는가?',

    headerVisibility: 'Header가 NoticeBar 아래에 표시되는가?',
    headerMemberTabs: 'Member 계정에서 [개인뷰] [달력뷰] 탭만 보이는가?',
    headerMemberTeamViewHidden: 'Member 계정에서 [팀뷰] 탭은 숨겨져 있는가?',
    headerAdminTabs: 'Admin 계정에서 [개인뷰] [팀뷰] [달력뷰] 모두 보이는가?',
    headerSuperAdminTabs: 'SuperAdmin 계정에서 [개인뷰] [팀뷰] [달력뷰] 모두 보이는가?',

    memberAvatarColor: 'Member 아바타가 초록색(#22C55E)인가?',
    adminAvatarColor: 'Admin 아바타가 주황색(#F59E0B)인가?',
    superAdminAvatarColor: 'SuperAdmin 아바타가 보라색(#7C3AED)인가?',

    userNameDisplay: '사용자 이름이 정확히 표시되는가?',
    logoutButton: '[로그아웃] 버튼으로 로그인 페이지로 이동하는가?',
    consoleErrors: 'Console에 빨간 에러가 없는가?'
  }
};

export default expectedValues;
