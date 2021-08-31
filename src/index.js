import puppeteer from 'puppeteer'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
const spinner = ora(chalk.green('Fetching products...'))

const resultFoundEmojis = ['🌟', '🙂', '😄', '🤩', '😍', '🎉', '🍻', '✨']
const noResultEmojis = ['😬', '😭', '🤷', '😞', '😒', '👎', '😾', '😵']

const recordSelector =
	'#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Faktaruta > div.PT_Beskr > a'
const linkSelector =
	'#main > div.group > div.col.span_9_of_12.sok-filter-res > div > div > div.PT_Bildruta > a'
const categorySelector =
	'#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div'

const colorizedOutput = (x, y) => {
	if (x !== null && y !== null) {
		console.log(`${chalk.magentaBright(x)} - ${chalk.yellowBright(y)}`)
	}
}

;(async () => {
	try {
		spinner.start()
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.setViewport({ width: 1680, height: 920 })
		await page.goto('https://bengans.se')
		await page.focus('#sokterm')
		await page.keyboard.type(process.argv[2], { delay: 100 })
		await page.keyboard.press('Enter')
		await page.waitForNavigation({ waitUntil: 'networkidle0' })

		let categories = await page.$$eval(categorySelector, (category) =>
			category.map((cat) => {
				const style = window.getComputedStyle(cat)
				if (style.display === 'block') {
					return cat.innerText
				}
			})
		)

		categories = categories.filter((category) => category !== null)

		spinner.succeed()

		if (categories.length > 0) {
			const specificCategory = await inquirer
				.prompt([
					{
						type: 'list',
						name: 'category',
						message: chalk.yellowBright(
							'Do you want to only show a specific product type?'
						),
						choices: [
							{
								key: 'yes',
								name: chalk.green('Yes'),
								value: true,
							},
							{
								key: 'no',
								name: chalk.red('No'),
								value: false,
							},
							{
								key: 'exit',
								name: 'Exit',
								value: 'exit',
							},
						],
					},
				])
				.then((r) => {
					return r
				})

			if (specificCategory.category === 'exit') {
				browser.close()
				console.log(chalk.yellowBright('Bye 👋'))
				return
			}

			if (specificCategory.category) {
				const category = await inquirer
					.prompt([
						{
							type: 'list',
							name: 'category',
							message: 'What type of product do you want to show?',
							choices: [
								...categories,
								{
									key: 'exit',
									name: chalk.red('Exit'),
									value: 'exit',
								},
							],
						},
					])
					.then((a) => {
						return a
					})

				if (category.category === 'exit') {
					browser.close()
					console.log(chalk.yellowBright('Bye 👋'))
					return
				}

				spinner.start(`Fetching ${category.category}'s`)

				let selector

				switch (category.category) {
					case 'T-shirts':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Accessoarer':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Accessories':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Blu-Ray':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Blu-Ray 3D':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Blu-Ray+CD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD + Bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD Maxisingel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD Singel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD/DVD+Bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD+Blu-Ray':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD+DVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Dual Disc':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'DVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'DVD Audio':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'DVD Audiosingel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'DVD Singel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'DVD+CD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Häftad bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Häftad bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Hoodies':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Inbunden bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Kartonnage':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Ljudbok MP3':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'LP':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'LP+CD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'LP+DVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Maxisingel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'MC':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Merch':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Merch!!AIR8!!T-shirts':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'MusikDVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Musikvideo':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Other':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Övrigt':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Pocketbok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'SACD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Singel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Storpocket':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'T-Shirt':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'T-shirts':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'T-shirts,Merch':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'T-shirts!!AIR8!!Merch':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Tillbehör':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Ultra HD Blu-Ray':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'USB Album':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'VHS':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Vinyltillbehör':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					default:
						break
				}

				await page.click(selector)

				const titles = await page.$$eval(recordSelector, (titles) =>
					titles.map((title) => {
						const style = window.getComputedStyle(
							title.parentElement.parentElement.parentElement
						)
						if (style.display !== 'none') {
							return title.innerText
						}
					})
				)
				const links = await page.$$eval(linkSelector, (links) =>
					links.map((link) => {
						const style = window.getComputedStyle(
							link.parentElement.parentElement
						)
						if (style.display !== 'none') {
							return link.href
						}
					})
				)

				await browser.close()
				spinner.succeed()

				if (titles.length <= 0) {
					console.log(
						chalk.red(
							`No products found ${
								noResultEmojis[
									Math.floor(Math.random() * noResultEmojis.length)
								]
							}`
						)
					)
				} else {
					console.log(
						chalk.green(
							`${
								resultFoundEmojis[
									Math.floor(Math.random() * resultFoundEmojis.length)
								]
							} Found these products:`
						)
					)
					titles.map((title, index) => {
						colorizedOutput(title, links[index])
					})
				}
			} else {
				const titles = await page.$$eval(recordSelector, (recs) =>
					recs.map((rec) => rec.innerText)
				)
				const links = await page.$$eval(linkSelector, (recs) =>
					recs.map((rec) => rec.href)
				)

				await browser.close()

				if (titles.length <= 0) {
					console.log(
						chalk.red(
							`No products found ${
								noResultEmojis[
									Math.floor(Math.random() * noResultEmojis.length)
								]
							}`
						)
					)
				} else {
					console.log(
						chalk.green(
							`${
								resultFoundEmojis[
									Math.floor(Math.random() * resultFoundEmojis.length)
								]
							} Found these products:`
						)
					)
					titles.map((title, index) => {
						colorizedOutput(title, links[index])
					})
				}
			}
		} else {
			browser.close()
			console.log(
				chalk.red(
					`No products found ${
						noResultEmojis[Math.floor(Math.random() * noResultEmojis.length)]
					}`
				)
			)
			return
		}
	} catch (e) {
		console.error(e)
	}
})()
