import chalk from 'chalk';
import { noResultEmojis } from '../constants';
import puppeteer from 'puppeteer';

export const noResult = async (browser: puppeteer.Browser) => {
	browser.close();
	console.log(chalk.red(`No products found ${noResultEmojis[Math.floor(Math.random() * noResultEmojis.length)]}`));
	process.exit();
};
