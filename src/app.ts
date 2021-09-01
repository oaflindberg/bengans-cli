import puppeteer from 'puppeteer';
import chalk from 'chalk';
import { showResults, noResult, exit, error } from './views/index';
import { linkSelector, recordSelector } from './constants';
import {
  getCategories,
  getLinks,
  getTitles,
  init,
  selectCategory,
  specificProduct,
  spinner,
  whatCategory,
} from './utils/index';

(async () => {
  try {
    spinner.start(chalk.blueBright('Fetching products...'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await init(page);

    let categories = await getCategories(page);

    spinner.succeed();

    if (categories.length > 0) {
      const showSpecificProduct = await specificProduct();

      if (showSpecificProduct === 'exit') {
        exit(browser);
      }

      if (showSpecificProduct) {
        let category = await whatCategory(categories);

        if (category === 'exit') {
          exit(browser);
        }

        spinner.start(chalk.blueBright(`Fetching ${category}'s`));

        await selectCategory(category, page);

        const titles = await getTitles(page);
        const links = await getLinks(page);

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
          await showResults(titles, links);
        }

        await noResult(browser);
      }
    } else {
      await noResult(browser);
    }
  } catch (e) {
    error();
  }
})();
