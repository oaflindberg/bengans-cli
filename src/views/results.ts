import chalk from 'chalk';
import { resultFoundEmojis } from '../utils/constants';

export const showResults = async () => {
	console.log(
		chalk.green(`${resultFoundEmojis[Math.floor(Math.random() * resultFoundEmojis.length)]} Found these products:`)
	);
};