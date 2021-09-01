import chalk from 'chalk';
import { spinner } from '../constants';

export const error = async () => {
	spinner.stop();
	console.log(chalk.red('Something went wrong. Sorry! 🤷‍'));
	process.exit();
};
