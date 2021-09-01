import { queryBuilder } from './queryBuilder';
import puppeteer from 'puppeteer';

export const init = async (page: puppeteer.Page) => {
  let query = await queryBuilder();
  await page.setViewport({ width: 1680, height: 920 });
  await page.goto('https://bengans.se');
  await page.focus('#sokterm');
  await page.keyboard.type(query, { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
