import puppeteer from 'puppeteer';
import { showResults, noResult, exit, error } from './views/index';
import { recordSelector, linkSelector, categorySelector, spinner } from './constants';
import { init, specificProduct, whatCategory } from './utils/index';

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
			}

			if (specificCategory.category) {
				const category = await whatCategory(categories);

				if (category.category === 'exit') {
					exit(browser);
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
				} else {
					await showResults(titles, links);
				}
			} else {
				const titles = await page.$$eval(recordSelector, (recs) => recs.map((rec: any) => rec.innerText));
				const links = await page.$$eval(linkSelector, (recs) => recs.map((rec: any) => rec.href));

				await browser.close();

				if (titles.length <= 0) {
					await noResult(browser);
				} else {
					await showResults(titles, links);
				}
			}
		} else {
			await noResult(browser);
		}
	} catch (e) {
		error();
	}
})();
