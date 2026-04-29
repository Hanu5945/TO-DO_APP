/**
 * 테스트 헬퍼 함수
 * 반복되는 테스트 작업을 간단하게 처리
 */

import fs from 'fs';
import path from 'path';

/**
 * 색상을 RGB로 정규화
 * @param {string} color - CSS 색상 (hex, rgb 등)
 * @returns {string} RGB 형식 문자열
 */
export async function normalizeColor(page, colorString) {
  return await page.evaluate((color) => {
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const computed = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    return computed;
  }, colorString);
}

/**
 * 요소가 보일 때까지 대기
 * @param {Page} page - Puppeteer page
 * @param {string} selector - CSS selector
 * @param {number} timeout - 최대 대기 시간 (ms)
 */
export async function waitForElement(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 요소의 배경색 가져오기
 * @param {Page} page - Puppeteer page
 * @param {string} selector - CSS selector
 * @returns {string} RGB 형식 색상
 */
export async function getBackgroundColor(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    return window.getComputedStyle(element).backgroundColor;
  }, selector);
}

/**
 * 요소가 보이는지 확인
 * @param {Page} page - Puppeteer page
 * @param {string} selector - CSS selector
 * @returns {boolean} 보이면 true
 */
export async function isVisible(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }, selector);
}

/**
 * 로그인 수행
 * @param {Page} page - Puppeteer page
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @param {string} baseUrl - 기본 URL
 */
export async function login(page, email, password, baseUrl) {
  await page.goto(`${baseUrl}/auth/login`, { waitUntil: 'networkidle2' });

  // 이메일 입력
  await page.type('input[type="email"]', email);

  // 비밀번호 입력
  await page.type('input[type="password"]', password);

  // 로그인 버튼 클릭 (form 내의 primary 버튼)
  const loginButton = await page.$('.auth-form button.btn-primary');
  if (!loginButton) {
    throw new Error('로그인 버튼을 찾을 수 없습니다');
  }

  // 버튼 클릭과 네비게이션을 동시에 대기
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
    loginButton.click()
  ]).catch(async (err) => {
    // 네비게이션 타임아웃 시, 대신 대시보드 요소가 나타날 때까지 대기
    if (err.message.includes('Timeout')) {
      console.warn('⚠️  네비게이션 타임아웃, 대시보드 요소 대기 중...');
      await page.waitForSelector('.header, .notice-bar', { timeout: 10000 });
    } else {
      throw err;
    }
  });
}

/**
 * 로그아웃 수행
 * @param {Page} page - Puppeteer page
 */
export async function logout(page) {
  const logoutButton = await page.$('.logout-btn');

  if (!logoutButton) {
    throw new Error('Logout button not found');
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
    logoutButton.click()
  ]).catch(async (err) => {
    if (err.message.includes('Timeout')) {
      await page.goto(`${page.url().split('/dashboard')[0]}/auth/login`, { waitUntil: 'networkidle2' });
    } else {
      throw err;
    }
  });
}

/**
 * 스크린샷 저장
 * @param {Page} page - Puppeteer page
 * @param {string} filename - 파일명
 */
export async function takeScreenshot(page, filename) {
  const screenshotDir = path.join(process.cwd(), 'tests', 'screenshots');

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 날짜/시간 추가 (MMDD.HHMMSS_filename 형식)
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${month}${date}.${hours}${minutes}${seconds}`;
  const filenameWithTimestamp = `${timestamp}_${filename}`;

  const filePath = path.join(screenshotDir, filenameWithTimestamp);
  await page.screenshot({ path: filePath });

  return filePath;
}

/**
 * Console 에러 수집
 * @param {Page} page - Puppeteer page
 * @returns {Array} 에러 메시지 배열
 */
export async function captureConsoleErrors(page) {
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * 테스트 결과 저장
 * @param {string} filename - 파일명
 * @param {Object} results - 테스트 결과
 */
export async function saveTestResults(filename, results) {
  const reportsDir = path.join(process.cwd(), 'tests', 'reports');

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(reportsDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

  return filePath;
}

/**
 * 색상 비교 (RGB 형식)
 * @param {string} actual - 실제 색상
 * @param {string} expected - 기대 색상
 * @returns {boolean} 일치하면 true
 */
export function compareColors(actual, expected) {
  // RGB 형식 정규화 및 비교
  const normalizeRgb = (str) => {
    return str.replace(/\s+/g, '');
  };

  return normalizeRgb(actual) === normalizeRgb(expected);
}

export default {
  normalizeColor,
  waitForElement,
  getBackgroundColor,
  isVisible,
  login,
  logout,
  takeScreenshot,
  captureConsoleErrors,
  saveTestResults,
  compareColors
};
