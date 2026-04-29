#!/usr/bin/env node
/**
 * Phase 2.1.1-2.1.2 자동 테스트
 * 개발 서버를 시작하고 자동으로 테스트를 실행합니다
 *
 * 실행: node auto-test.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('='.repeat(60));
console.log('[AUTO-TEST] Phase 2.1.1-2.1.2 자동 테스트 시작');
console.log('='.repeat(60));
console.log('');

// 1. 개발 서버 시작
console.log('[1/3] 개발 서버 시작 중...');
const devServer = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'ignore'
});

// 2. 서버 시작 대기 후 테스트 실행
setTimeout(() => {
  console.log('[2/3] 테스트 실행 중...\n');

  const test = spawn('npm', ['run', 'test:dev'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  test.on('close', (code) => {
    console.log('');
    console.log('[3/3] 개발 서버 종료 중...');

    // 3. 개발 서버 종료
    devServer.kill();

    console.log('');
    console.log('='.repeat(60));
    if (code === 0) {
      console.log('[SUCCESS] 모든 테스트 통과');
    } else {
      console.log('[FAILED] 테스트 실패');
    }
    console.log('='.repeat(60));

    process.exit(code);
  });
}, 6000);

// Ctrl+C 처리
process.on('SIGINT', () => {
  console.log('\n[INTERRUPTED] 테스트 중단됨');
  devServer.kill();
  process.exit(1);
});
