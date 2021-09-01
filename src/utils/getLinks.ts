import { linkSelector } from '../constants';
import puppeteer from 'puppeteer';

export const getLinks = async (page: puppeteer.Page): Promise<string[]> => {
  const links = await page.$$eval(linkSelector, (links: Element[]) =>
    links.map((link: any) => {
      const style = window.getComputedStyle(link.parentElement.parentElement);

      if (style.display !== 'none') {
        return link.href;
      }
    })
  );

  return links;
};
