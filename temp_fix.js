import fs from 'fs';

const file = 'tests/e2e/phase2-verification.js';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  `browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });`,
  `browser = await puppeteer.launch({
      product: 'firefox',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });`
);

fs.writeFileSync(file, content);
console.log('✅ Firefox로 변경됨');
