import chalk from 'chalk';
import { noResultEmojis } from '../utils/constants';
import puppeteer from 'puppeteer';

export const noResult = async (browser: puppeteer.Browser) => {
	browser.close();
	console.log(chalk.red(`No products found ${noResultEmojis[Math.floor(Math.random() * noResultEmojis.length)]}`));
};
