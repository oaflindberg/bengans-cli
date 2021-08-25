const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1680, height: 920 });
    await page.goto('https://bengans.se');
    await page.focus('#sokterm');
    await page.keyboard.type(process.argv[2], { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const records = await page.$$eval(
      '#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Faktaruta > div.PT_Beskr > a',
      (recs) =>
        recs.map((rec) => {
          console.log(rec);
          return rec.innerText;
        })
    );

    await browser.close();

    records.forEach((record) => {
      const words = record.split(' ');
      if (
        words[0] == process.argv[2] ||
        words[0].toLowerCase() == process.argv[2] ||
        words[0].toUpperCase() == process.argv[2]
      ) {
        record = words.join(' ');
        console.log(`${record} - hej`);
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
