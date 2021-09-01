import puppeteer from 'puppeteer';
import chalk from 'chalk';
import { colorizedOutput } from './utils/colorizer';
import { showResults, noResult, exit } from './views/index';
import { init } from './utils/init';
import { recordSelector, linkSelector, categorySelector, spinner } from './utils/constants';
import { specificProduct, whatCategory } from './utils/questions';

(async () => {
	try {
		spinner.start();
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await init(page);

		let categories = await page.$$eval(categorySelector, (category) =>
			category.map((cat: any) => {
				const style = window.getComputedStyle(cat);
				if (style.display === 'block') {
					return cat.innerText;
				}
			})
		);

		categories = categories.filter((category) => category !== null);

		spinner.succeed();

		if (categories.length > 0) {
			const specificCategory = await specificProduct();

			if (specificCategory.category === 'exit') {
				exit(browser);
				return;
			}

			if (specificCategory.category) {
				const category = await whatCategory(categories);

				if (category.category === 'exit') {
					exit(browser);
					return;
				}

				spinner.start(`Fetching ${category.category}'s`);

				let selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`;
				await page.click(selector);

				const titles = await page.$$eval(recordSelector, (titles) =>
					titles.map((title: any) => {
						const style = window.getComputedStyle(title.parentElement.parentElement.parentElement);
						if (style.display !== 'none') {
							return title.innerText;
						}
					})
				);
				const links = await page.$$eval(linkSelector, (links) =>
					links.map((link: any) => {
						const style = window.getComputedStyle(link.parentElement.parentElement);
						if (style.display !== 'none') {
							return link.href;
						}
					})
				);

				await browser.close();
				spinner.succeed();

				if (titles.length <= 0) {
					await noResult(browser);
					return;
				} else {
					await showResults();
					titles.map((title, index) => {
						colorizedOutput(title, links[index]);
					});
				}
			} else {
				const titles = await page.$$eval(recordSelector, (recs) => recs.map((rec: any) => rec.innerText));
				const links = await page.$$eval(linkSelector, (recs) => recs.map((rec: any) => rec.href));

				await browser.close();

				if (titles.length <= 0) {
					await noResult(browser);
				} else {
					await showResults();
					titles.map((title, index) => {
						colorizedOutput(title, links[index]);
					});
				}
			}
		} else {
			await noResult(browser);
			return;
		}
	} catch (e) {
		spinner.stop();
		console.log(chalk.red('Something went wrong. Sorry! 🤷‍'));
	}
})();
