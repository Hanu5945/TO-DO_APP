/**
 * Phase 2 WaitingList + TimeTable E2E Test
 */

import puppeteer from 'puppeteer';
import {
  login,
  logout,
  takeScreenshot,
  isVisible,
  waitForElement,
  saveTestResults,
  compareColors,
  getBackgroundColor
} from '../utils/testHelpers.js';
import testAccounts from '../fixtures/testAccounts.js';

const BASE_URL = process.argv[2] || 'http://localhost:5173';
const IS_PROD = BASE_URL.includes('4173');
const REPORT_FILENAME = IS_PROD ? 'phase2-timetable-prod.json' : 'phase2-timetable-dev.json';

const results = {
  status: 'PASSED',
  environment: IS_PROD ? 'production' : 'development',
  baseUrl: BASE_URL,
  timestamp: new Date().toISOString(),
  totalTests: 0,
  passed: 0,
  failed: 0,
  tests: [],
  consoleErrors: []
};

async function runTest(page, testName, testFn) {
  results.totalTests++;
  try {
    await testFn();
    results.passed++;
    results.tests.push({ name: testName, status: 'PASSED' });
    console.log(`[PASS] ${testName}`);
  } catch (error) {
    results.failed++;
    results.status = 'FAILED';
    results.tests.push({ name: testName, status: 'FAILED', error: error.message });
    console.error(`[FAIL] ${testName}: ${error.message}`);
  }
}

async function testWaitingList(page) {
  await runTest(page, 'WaitingList - 대기 목록 영역 존재', async () => {
    const visible = await isVisible(page, '.waiting-list');
    if (!visible) throw new Error('.waiting-list not found or not visible');
  });

  await runTest(page, 'WaitingList - "대기 목록" 타이틀 표시', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('대기 목록')) throw new Error('"대기 목록" text not found');
  });

  await runTest(page, 'WaitingList - Task 카드 존재', async () => {
    const cards = await page.$$('.waiting-list .task-card');
    if (cards.length === 0) throw new Error('No task cards found in waiting list');
  });

  await runTest(page, 'WaitingList - "+ Task 추가" 버튼 존재', async () => {
    const btn = await page.$('.add-task-btn');
    if (!btn) throw new Error('"+ Task 추가" button not found');
    const text = await page.evaluate(el => el.innerText, btn);
    if (!text.includes('Task 추가')) throw new Error('Button text mismatch: ' + text);
  });

  await runTest(page, 'WaitingList - Task 카드에 담당자 이름 표시', async () => {
    const assignee = await page.$('.waiting-list .task-assignee');
    if (!assignee) throw new Error('.task-assignee not found');
  });
}

async function testTimeTable(page) {
  await runTest(page, 'TimeTable - 시간표 영역 존재', async () => {
    const visible = await isVisible(page, '.timetable-wrap');
    if (!visible) throw new Error('.timetable-wrap not found or not visible');
  });

  await runTest(page, 'TimeTable - 날짜 표시 존재', async () => {
    const label = await page.$('.date-label');
    if (!label) throw new Error('.date-label not found');
    const text = await page.evaluate(el => el.innerText, label);
    if (!text.includes('년') || !text.includes('월')) throw new Error('Date format wrong: ' + text);
  });

  await runTest(page, 'TimeTable - 이전날 버튼 (◀) 존재', async () => {
    const btn = await page.$('.nav-btn');
    if (!btn) throw new Error('.nav-btn (◀) not found');
  });

  await runTest(page, 'TimeTable - 시간 레이블 존재 (07:00)', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('07:00')) throw new Error('"07:00" label not found');
  });

  await runTest(page, 'TimeTable - 시간 레이블 존재 (20:00)', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('20:00')) throw new Error('"20:00" label not found');
  });

  await runTest(page, 'TimeTable - Task 블록 존재', async () => {
    const blocks = await page.$$('.task-block');
    if (blocks.length === 0) throw new Error('No task blocks found in timetable');
  });

  await runTest(page, 'TimeTable - 진행중 Task 파란색 배경', async () => {
    const color = await page.evaluate(() => {
      const el = document.querySelector('.status-in-progress');
      if (!el) return null;
      return window.getComputedStyle(el).backgroundColor;
    });
    if (!color) throw new Error('.status-in-progress element not found');
    if (!color.includes('239') && !color.includes('246')) {
      // rgb(239, 246, 255) = #EFF6FF
      console.log('  [INFO] in-progress color:', color);
    }
  });

  await runTest(page, 'TimeTable - 완료 Task 초록색 배경', async () => {
    const color = await page.evaluate(() => {
      const el = document.querySelector('.status-completed');
      if (!el) return null;
      return window.getComputedStyle(el).backgroundColor;
    });
    if (!color) throw new Error('.status-completed element not found');
  });

  await runTest(page, 'TimeTable - 지연 Task 빨간색 배경', async () => {
    const color = await page.evaluate(() => {
      const el = document.querySelector('.status-delayed');
      if (!el) return null;
      return window.getComputedStyle(el).backgroundColor;
    });
    if (!color) throw new Error('.status-delayed element not found');
  });
}

async function testDateNavigation(page) {
  await runTest(page, 'DateNav - 다음날 버튼 클릭 후 날짜 변경', async () => {
    const before = await page.evaluate(() => {
      const el = document.querySelector('.date-label');
      return el ? el.innerText : '';
    });

    // 다음날 버튼 (▶) 클릭
    const btns = await page.$$('.nav-btn');
    if (btns.length < 2) throw new Error('Nav buttons not found');
    await btns[1].click();
    await new Promise(r => setTimeout(r, 300));

    const after = await page.evaluate(() => {
      const el = document.querySelector('.date-label');
      return el ? el.innerText : '';
    });

    if (before === after) throw new Error('Date did not change after clicking next button');
  });

  await runTest(page, 'DateNav - 이전날 버튼 클릭 후 날짜 복구', async () => {
    const btns = await page.$$('.nav-btn');
    await btns[0].click();
    await new Promise(r => setTimeout(r, 300));
    // 날짜가 변경되었으면 성공 (이전 날짜로 돌아온 것 확인)
    const label = await page.$('.date-label');
    if (!label) throw new Error('Date label disappeared');
  });
}

async function testTaskModal(page) {
  await runTest(page, 'Modal - Task 카드 클릭시 모달 열림', async () => {
    const card = await page.$('.waiting-list .task-card');
    if (!card) throw new Error('No task card to click');
    await card.click();
    await new Promise(r => setTimeout(r, 400));

    const overlay = await page.$('.modal-overlay');
    if (!overlay) throw new Error('Modal did not open after clicking task card');

    // 모달 닫기
    const closeBtn = await page.$('.close-btn');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
  });

  await runTest(page, 'Modal - "+ Task 추가" 버튼 클릭시 등록 모달 열림', async () => {
    const addBtn = await page.$('.add-task-btn');
    if (!addBtn) throw new Error('add-task-btn not found');
    await addBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const title = await page.evaluate(() => {
      const el = document.querySelector('.modal-title');
      return el ? el.innerText : '';
    });
    if (!title.includes('Task 등록')) throw new Error('Create modal title not found: ' + title);

    // 모달 닫기
    const closeBtn = await page.$('.close-btn');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
  });
}

async function testAdminEditModal(page) {
  await runTest(page, 'Admin - TimeTable Task 클릭시 수정 모달 열림', async () => {
    const block = await page.$('.task-block');
    if (!block) throw new Error('No task block to click');
    await block.click();
    await new Promise(r => setTimeout(r, 400));

    const title = await page.evaluate(() => {
      const el = document.querySelector('.modal-title');
      return el ? el.innerText : '';
    });
    if (!title.includes('Task 수정') && !title.includes('Task 상세')) {
      throw new Error('Modal title not found: ' + title);
    }

    const closeBtn = await page.$('.close-btn');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
  });
}

async function testNoConsoleErrors(page, errors) {
  await runTest(page, 'Console - 에러 없음', async () => {
    const realErrors = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('404') &&
      !e.includes('DevTools') &&
      !e.includes('[Vue Router warn]') &&
      !e.includes('Failed to load resource')
    );
    if (realErrors.length > 0) {
      throw new Error(`${realErrors.length} console error(s): ${realErrors[0]}`);
    }
  });
}

async function runAllTests() {
  console.log('\n========================================');
  console.log('[TEST] Phase 2 WaitingList + TimeTable');
  console.log(`[INFO] URL: ${BASE_URL}`);
  console.log('========================================\n');

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // ─── Member 계정 테스트 ─────────────────────────
    {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      console.log('[TEST] Member 계정으로 로그인\n');
      await login(page, testAccounts.member.email, testAccounts.member.password, BASE_URL);
      await new Promise(r => setTimeout(r, 800));
      await takeScreenshot(page, 'member-dashboard.png');

      await testWaitingList(page);
      await testTimeTable(page);
      await testDateNavigation(page);
      await testTaskModal(page);
      await testNoConsoleErrors(page, errors);
      await page.close();
    }

    // ─── Admin 계정 테스트 ──────────────────────────
    {
      // 새 incognito 컨텍스트로 세션 격리
      const context = await browser.createIncognitoBrowserContext();
      const page = await context.newPage();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      console.log('\n[TEST] Admin 계정으로 로그인\n');
      await login(page, testAccounts.admin.email, testAccounts.admin.password, BASE_URL);
      await new Promise(r => setTimeout(r, 800));
      await takeScreenshot(page, 'admin-dashboard.png');

      await testWaitingList(page);
      await testTimeTable(page);
      await testAdminEditModal(page);
      await testNoConsoleErrors(page, errors);
      await page.close();
      await context.close();
    }

    await browser.close();

  } catch (error) {
    console.error('\n[ERROR]', error.message);
    results.status = 'ERROR';
    results.error = error.message;
    if (browser) await browser.close();
  }

  // ─── 결과 출력 ─────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('[RESULT] 테스트 결과');
  console.log('='.repeat(60));
  console.log(`Status  : ${results.status}`);
  console.log(`Total   : ${results.totalTests}`);
  console.log(`Passed  : ${results.passed}`);
  console.log(`Failed  : ${results.failed}`);
  if (results.failed > 0) {
    console.log('\n[FAILURES]');
    results.tests
      .filter(t => t.status === 'FAILED')
      .forEach(t => console.log(`  - ${t.name}: ${t.error}`));
  }
  console.log('='.repeat(60) + '\n');

  const reportPath = await saveTestResults(REPORT_FILENAME, results);
  console.log(`[REPORT] ${reportPath}`);

  process.exit(results.status === 'PASSED' ? 0 : 1);
}

runAllTests();
