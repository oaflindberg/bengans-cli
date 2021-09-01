import puppeteer from 'puppeteer';

export const init = async (page: puppeteer.Page) => {
	await page.setViewport({ width: 1680, height: 920 });
	await page.goto('https://bengans.se');
	await page.focus('#sokterm');
	await page.keyboard.type(process.argv[2], { delay: 100 });
	await page.keyboard.press('Enter');
	await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
