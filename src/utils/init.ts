import { spinner } from './spinner';
import chalk from 'chalk';
import puppeteer from 'puppeteer';

export const init = async (page: puppeteer.Page, query: string) => {
  if (!query) {
    spinner.fail();
    console.log(chalk.red("Oops! Looks like you forgot to add what you're looking for 😬"));
    process.exit();
  }
  await page.setViewport({ width: 1680, height: 920 });
  await page.goto('https://bengans.se');
  await page.focus('#sokterm');
  await page.keyboard.type(query, { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
