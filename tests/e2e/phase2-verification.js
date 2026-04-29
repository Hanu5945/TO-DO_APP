/**
 * Phase 2.1.1-2.1.2 E2E Test
 * NoticeBar + Header Auto Verification
 */

import puppeteer from 'puppeteer';
import {
  login,
  logout,
  takeScreenshot,
  captureConsoleErrors,
  saveTestResults,
  compareColors,
  isVisible,
  getBackgroundColor,
  waitForElement
} from '../utils/testHelpers.js';
import testAccounts from '../fixtures/testAccounts.js';
import expectedValues from '../fixtures/expectedValues.js';

const BASE_URL = process.argv[2] || 'http://localhost:5173';
const IS_PROD = BASE_URL.includes('4173');
const REPORT_FILENAME = IS_PROD ? 'phase2-prod.json' : 'phase2-dev.json';

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
    results.tests.push({
      name: testName,
      status: 'PASSED'
    });
    console.log(`[PASS] ${testName}`);
  } catch (error) {
    results.failed++;
    results.status = 'FAILED';
    results.tests.push({
      name: testName,
      status: 'FAILED',
      error: error.message
    });
    console.error(`[FAIL] ${testName}: ${error.message}`);
  }
}

async function testNoticeBar(page) {
  await runTest(page, 'NoticeBar visibility', async () => {
    const visible = await isVisible(page, '.notice-bar');
    if (!visible) throw new Error('NoticeBar not visible');
  });

  await runTest(page, 'NoticeBar color validation', async () => {
    const color = await getBackgroundColor(page, '.notice-bar');
    if (!compareColors(color, expectedValues.noticeBar.backgroundColor)) {
      throw new Error(`Color mismatch: ${color} vs ${expectedValues.noticeBar.backgroundColor}`);
    }
  });

  await runTest(page, 'NoticeBar message display', async () => {
    const message = await page.$('.notice-message');
    if (!message) throw new Error('Message element not found');
  });

  await runTest(page, 'NoticeBar close button', async () => {
    const closeBtn = await page.$('.btn-close');
    if (!closeBtn) throw new Error('Close button not found');
  });
}

async function testHeaderMember(page) {
  await runTest(page, 'Header visibility (Member)', async () => {
    const visible = await isVisible(page, '.header');
    if (!visible) throw new Error('Header not visible');
  });

  await runTest(page, 'Member - Personal tab', async () => {
    const visible = await isVisible(page, 'a[href*="personal"]');
    if (!visible) throw new Error('Personal tab not visible');
  });

  await runTest(page, 'Member - Team tab hidden', async () => {
    const visible = await isVisible(page, 'a[href*="team"]');
    if (visible) throw new Error('Team tab should be hidden');
  });

  await runTest(page, 'Member - Calendar tab', async () => {
    const visible = await isVisible(page, 'a[href*="calendar"]');
    if (!visible) throw new Error('Calendar tab not visible');
  });

  await runTest(page, 'Member - Username display', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('일반멤버')) throw new Error('Username not found');
  });

  await runTest(page, 'Member - Avatar color', async () => {
    const color = await getBackgroundColor(page, '.avatar');
    if (!compareColors(color, expectedValues.avatar.member.backgroundColor)) {
      throw new Error(`Avatar color mismatch: ${color}`);
    }
  });
}

async function testHeaderAdmin(page) {
  await runTest(page, 'Header visibility (Admin)', async () => {
    const visible = await isVisible(page, '.header');
    if (!visible) throw new Error('Header not visible');
  });

  await runTest(page, 'Admin - Personal tab', async () => {
    const visible = await isVisible(page, 'a[href*="personal"]');
    if (!visible) throw new Error('Personal tab not visible');
  });

  await runTest(page, 'Admin - Team tab', async () => {
    const visible = await isVisible(page, 'a[href*="team"]');
    if (!visible) throw new Error('Team tab not visible');
  });

  await runTest(page, 'Admin - Calendar tab', async () => {
    const visible = await isVisible(page, 'a[href*="calendar"]');
    if (!visible) throw new Error('Calendar tab not visible');
  });

  await runTest(page, 'Admin - Username display', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('관리자')) throw new Error('Username not found');
  });

  await runTest(page, 'Admin - Avatar color', async () => {
    const color = await getBackgroundColor(page, '.avatar');
    if (!compareColors(color, expectedValues.avatar.admin.backgroundColor)) {
      throw new Error(`Avatar color mismatch: ${color}`);
    }
  });
}

async function testHeaderSuperAdmin(page) {
  await runTest(page, 'Header visibility (SuperAdmin)', async () => {
    const visible = await isVisible(page, '.header');
    if (!visible) throw new Error('Header not visible');
  });

  await runTest(page, 'SuperAdmin - Personal tab', async () => {
    const visible = await isVisible(page, 'a[href*="personal"]');
    if (!visible) throw new Error('Personal tab not visible');
  });

  await runTest(page, 'SuperAdmin - Team tab', async () => {
    const visible = await isVisible(page, 'a[href*="team"]');
    if (!visible) throw new Error('Team tab not visible');
  });

  await runTest(page, 'SuperAdmin - Calendar tab', async () => {
    const visible = await isVisible(page, 'a[href*="calendar"]');
    if (!visible) throw new Error('Calendar tab not visible');
  });

  await runTest(page, 'SuperAdmin - Username display', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('최고관리자')) throw new Error('Username not found');
  });

  await runTest(page, 'SuperAdmin - Avatar color', async () => {
    const color = await getBackgroundColor(page, '.avatar');
    if (!compareColors(color, expectedValues.avatar.superAdmin.backgroundColor)) {
      throw new Error(`Avatar color mismatch: ${color}`);
    }
  });
}

async function testConsoleErrors(page, errors) {
  await runTest(page, 'No console errors', async () => {
    if (errors.length > 0) {
      throw new Error(`${errors.length} console errors found`);
    }
  });
}

async function runAllTests() {
  console.log('\n[TEST] Phase 2.1.1-2.1.2 Auto Test Start');
  console.log(`[INFO] Environment: ${IS_PROD ? 'production' : 'development'}`);
  console.log(`[INFO] URL: ${BASE_URL}\n`);

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const errors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const errorMsg = msg.text();
        errors.push(errorMsg);
        console.log(`[CONSOLE_ERROR] ${errorMsg}`);
      }
    });

    console.log('[TEST] Member Account Test Start\n');
    try {
      await login(page, testAccounts.member.email, testAccounts.member.password, BASE_URL);
      await takeScreenshot(page, 'member-header.png');
    } catch (loginError) {
      console.error('[ERROR] Member login failed:', loginError.message);
      await takeScreenshot(page, 'member-login-error.png');
      throw loginError;
    }
    await testNoticeBar(page);
    await testHeaderMember(page);
    errors.length = 0;

    console.log('\n[TEST] Admin Account Test Start\n');
    try {
      await logout(page);
      await login(page, testAccounts.admin.email, testAccounts.admin.password, BASE_URL);
      await takeScreenshot(page, 'admin-header.png');
    } catch (loginError) {
      console.error('[ERROR] Admin login failed:', loginError.message);
      await takeScreenshot(page, 'admin-login-error.png');
      throw loginError;
    }
    await testNoticeBar(page);
    await testHeaderAdmin(page);
    await testConsoleErrors(page, errors);
    errors.length = 0;

    console.log('\n[TEST] SuperAdmin Account Test Start\n');
    try {
      await logout(page);
      await login(page, testAccounts.superAdmin.email, testAccounts.superAdmin.password, BASE_URL);
      await takeScreenshot(page, 'superadmin-header.png');
    } catch (loginError) {
      console.error('[ERROR] SuperAdmin login failed:', loginError.message);
      await takeScreenshot(page, 'superadmin-login-error.png');
      throw loginError;
    }
    await testNoticeBar(page);
    await testHeaderSuperAdmin(page);
    await testConsoleErrors(page, errors);

    await browser.close();
  } catch (error) {
    console.error('\n[ERROR] Test error:', error.message);
    results.status = 'ERROR';
    results.error = error.message;

    if (browser) {
      await browser.close();
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('[RESULT] Test Summary');
  console.log('='.repeat(60));
  console.log(`Status: ${results.status}`);
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log('='.repeat(60) + '\n');

  const reportPath = await saveTestResults(REPORT_FILENAME, results);
  console.log(`[REPORT] ${reportPath}`);
  console.log(`[SCREENSHOT] tests/screenshots/\n`);

  process.exit(results.status === 'PASSED' ? 0 : 1);
}

runAllTests();
