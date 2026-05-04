import fs from 'fs';

const file = 'tests/e2e/phase2-verification.js';
let content = fs.readFileSync(file, 'utf-8');

// 잘못된 설정 제거 및 올바른 설정으로 변경
content = content.replace(
  `const puppeteerExtra = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteerExtra.use(StealthPlugin());
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });`,
  `browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });`
);

fs.writeFileSync(file, content);
console.log('✅ Puppeteer 설정 수정 완료');
