import chalk from 'chalk'

export const colorizedOutput = (x, y) => {
	if (x !== null && y !== null) {
		console.log(`${chalk.magentaBright(x)} - ${chalk.yellowBright(y)}`)
	}
}
