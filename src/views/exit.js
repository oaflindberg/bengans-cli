import chalk from 'chalk';

export const exit = async (browser) => {
	browser.close();
	console.log(chalk.yellowBright('Bye 👋'));
};
