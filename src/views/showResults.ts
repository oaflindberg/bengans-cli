import chalk from 'chalk';
import { resultFoundEmojis } from '../constants';
import { colorizedOutput } from '../utils/index';

export const showResults = async (titles: string[], links: string[]) => {
  console.log(
    chalk.green(`${resultFoundEmojis[Math.floor(Math.random() * resultFoundEmojis.length)]} Found these products:`)
  );
  titles.map((title, index) => {
    colorizedOutput(title, links[index]);
  });

  process.exit();
};
