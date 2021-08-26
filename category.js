import puppeteer from 'puppeteer';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
const spinner = ora(chalk.green('Fetching products...'));

const resultFoundEmojis = ['🌟', '🙂', '😄', '🤩', '😍', '🎉', '🍻', '✨'];
const noResultEmojis = ['😬', '😭', '🤷', '😞', '😒', '👎', '😾', '😵'];

const categorySelector =
  '#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div';

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

    const categories = await page.$$eval(categorySelector, (category) =>
      category.map((cat) => {
        const style = window.getComputedStyle(cat);
        if (style.display === 'block') {
          return cat.innerText;
        }
      })
    );

    // spinner.stop();
    // await inquirer.prompt([
    //   {
    //     type: 'list',
    //     name: 'category',
    //     message: 'Do you want to only show a specific product type?',
    //     choices: [
    //       categories.map((category) => {
    //         if (category !== null) {
    //           category;
    //         }
    //       }),
    //     ],
    //   },
    // ]);

    await browser.close();
    spinner.stop();

    if (categories.length <= 0) {
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
      categories.map((category) => {
        if (category !== null) {
          console.log(chalk.magentaBright(category));
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
})();
