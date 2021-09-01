import puppeteer from 'puppeteer';

export const selectCategory = async (category: any, page: puppeteer.Page) => {
  let selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category}`;
  await page.click(selector);
};
