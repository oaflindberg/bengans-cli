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
	console.log(`${chalk.magentaBright(x)} - ${chalk.yellowBright(y)}`)
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
						],
					},
				])
				.then((r) => {
					return r
				})

			if (specificCategory.category) {
				const category = await inquirer
					.prompt([
						{
							type: 'list',
							name: 'category',
							message: 'What type of product do you want to show?',
							choices: categories,
						},
					])
					.then((a) => {
						return a
					})

				spinner.start(`Fetching ${category.category}'s`)

				let selector

				switch (category.category) {
					case 'Accessoarer':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD Maxisingel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD Singel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD+Blu-Ray':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'CD+DVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Inbunden bok':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Kartonnage':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'LP':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Maxisingel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'MC':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Merch':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Merchandise':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Musik Blu-Ray':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'MusikDVD':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'Singel':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					case 'T-Shirt':
						selector = `#main > div.group > div.col.span_3_of_12.sok-filter > div.group > div.group > div.col.span_6_of_12.mediaformat.${category.category}`
					default:
						break
				}

				await page.focus(selector)
				await page.keyboard.press('Enter')

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
							link.parentElement.parentElement.parentElement
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
		}
	} catch (e) {
		console.error(e)
	}
})()
