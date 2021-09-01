import puppeteer from 'puppeteer';
import { showResults, noResult, exit, error } from './views/index';
import { recordSelector, linkSelector, spinner } from './constants';
import { getCategories, getLinks, getTitles, init, selectCategory, specificProduct, whatCategory } from './utils/index';

(async () => {
  try {
    spinner.start();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await init(page);

    let categories = await getCategories(page);

    spinner.succeed();

    if (categories.length > 0) {
      const specificCategory = await specificProduct();

      if (specificCategory.category === 'exit') {
        exit(browser);
      }

      if (specificCategory.category) {
        let category = await whatCategory(categories);

        if (category === 'exit') {
          exit(browser);
        }

        spinner.start(`Fetching ${category}'s`);

        await selectCategory(category, page);

        const titles: string[] = await getTitles(page);
        const links: string[] = await getLinks(page);

        await browser.close();
        spinner.succeed();

        if (titles.length > 0) {
          await showResults(titles, links);
        }

        await noResult(browser);
      } else {
        const titles: string[] = await page.$$eval(recordSelector, (recs) => recs.map((rec: any) => rec.innerText));
        const links: string[] = await page.$$eval(linkSelector, (recs) => recs.map((rec: any) => rec.href));

        await browser.close();

        if (titles.length > 0) {
          await noResult(browser);
        }

        await showResults(titles, links);
      }
    } else {
      await noResult(browser);
    }
  } catch (e) {
    error();
  }
})();
