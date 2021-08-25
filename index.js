import puppeteer from 'puppeteer';
import ora from 'ora';
import chalk from 'chalk';
const spinner = ora(chalk.green('Fetching products...'));

const recordSelector =
  '#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Faktaruta > div.PT_Beskr > a';
const linkSelector =
  '#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Bildruta > a';
const vinylSelector =
  '#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.span_6_of_12';
const resultFoundEmojis = ['🌟', '🙂', '😄', '🤩', '😍', '🎉', '🍻', '✨'];
const noResultEmojis = ['😬', '😭', '🤷', '😞', '😒', '👎', '😾', '😵'];

(async () => {
  try {
    let records = [];
    spinner.start();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1680, height: 920 });
    await page.goto('https://bengans.se');
    await page.focus('#sokterm');
    await page.keyboard.type(process.argv[2], { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // TODO: Make it possible to only show vinyl records as results, perhaps a prompt asking if you're looking for a specific product type?

    // TODO: Combine titles and links and log like `${title} - ${link}`
    const titles = await page.$$eval(recordSelector, (recs) => recs.map((rec) => rec.innerText));
    const links = await page.$$eval(linkSelector, (recs) => recs.map((rec) => rec.href));

    records = [...links, ...titles];

    await browser.close();
    spinner.stop();

    if (records.length <= 0) {
      console.log(
        chalk.red(
          `No products found ${noResultEmojis[Math.floor(Math.random() * noResultEmojis.length)]}`
        )
      );
    } else {
      console.log(
        chalk.green(
          `${
            resultFoundEmojis[Math.floor(Math.random() * resultFoundEmojis.length)]
          } Found these products:`
        )
      );
      records.forEach((record) => {
        console.log(chalk.magentaBright(`${record}`));
      });
    }
  } catch (e) {
    console.error(e);
  }
})();
