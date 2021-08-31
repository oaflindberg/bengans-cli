import chalk from 'chalk';
import { noResultEmojis } from '../constants.js';

export const noResult = async (browser) => {
	browser.close();
	console.log(chalk.red(`No products found ${noResultEmojis[Math.floor(Math.random() * noResultEmojis.length)]}`));
};
