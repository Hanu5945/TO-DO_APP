import fs from 'fs';

const file = 'tests/e2e/phase2-verification.js';
let content = fs.readFileSync(file, 'utf-8');

// Chrome 자동 탐색을 위한 설정으로 변경
content = content.replace(
  `browser = await puppeteer.launch({
      product: 'firefox',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });`,
  `const puppeteerExtra = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteerExtra.use(StealthPlugin());
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });`
);

fs.writeFileSync(file, content);
console.log('✅ Puppeteer 설정 수정됨');
