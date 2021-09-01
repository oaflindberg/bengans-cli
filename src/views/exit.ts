import chalk from 'chalk';
import puppeteer from 'puppeteer';

export const exit = async (browser: puppeteer.Browser) => {
	browser.close();
	console.log(chalk.yellowBright('Bye 👋'));
};
