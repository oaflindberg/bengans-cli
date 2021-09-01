import puppeteer from 'puppeteer';
import { categorySelector } from '../constants';

export const getCategories = async (page: puppeteer.Page): Promise<string[]> => {
  let categories = await page.$$eval(categorySelector, (category) =>
    category.map((cat: any) => {
      const style = window.getComputedStyle(cat);
      if (style.display === 'block') {
        return cat.innerText;
      }
    })
  );

  categories = categories.filter((category) => category !== null);

  return categories;
};
