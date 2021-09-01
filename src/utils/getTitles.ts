import { recordSelector } from '../constants';
import puppeteer from 'puppeteer';

export const getTitles = async (page: puppeteer.Page): Promise<string[]> => {
  const titles = await page.$$eval(recordSelector, (titles: Element[]) =>
    titles.map((title: any) => {
      const style = window.getComputedStyle(title.parentElement.parentElement.parentElement);

      if (style.display !== 'none') {
        return title.innerText;
      }
    })
  );

  return titles;
};
