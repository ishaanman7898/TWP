const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function main(){
  const file = process.argv[2] || path.resolve(__dirname, 'links.json');
  if (!fs.existsSync(file)) {
    console.error('Provide a JSON file with an array of VE buy-button URLs. Example:');
    console.error('["https://portal.veinternational.org/buybuttons/us019814/btn/fall-bundle-sef3/"]');
    process.exit(1);
  }
  const links = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(links) || links.length===0){
    console.error('links.json must be a non-empty array of URLs');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const url of links) {
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(1600);
  }

  console.log('Opening final cart');
  await page.goto('https://portal.veinternational.org/buybuttons/us019814/cart/', { waitUntil: 'load', timeout: 60000 });
  await sleep(2000);

  await browser.close();
}

main().catch(err=>{ console.error(err); process.exit(1); });
