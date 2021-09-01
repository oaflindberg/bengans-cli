import chalk from 'chalk';
import { spinner } from '../utils/index';

export const error = async () => {
  spinner.stop();
  console.log(chalk.red('Something went wrong. Sorry! 🤷‍'));
  process.exit();
};
