import ora from 'ora';
import chalk from 'chalk';

export const resultFoundEmojis = ['🌟', '🙂', '😄', '🤩', '😍', '🎉', '🍻', '✨'];
export const noResultEmojis = ['😬', '😭', '🤷', '😞', '😒', '👎', '😾', '😵'];

export const recordSelector =
	'#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Faktaruta > div.PT_Beskr > a';
export const linkSelector = '#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Bildruta > a';
export const categorySelector = '#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div';
export const spinner = ora(chalk.green('Fetching products...'));
