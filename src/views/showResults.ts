import chalk from 'chalk';
import { resultFoundEmojis } from '../constants';
import { colorizedOutput } from '../utils/index';

export const showResults = async (titles: string[], links: string[], query: string) => {
  console.log(
    chalk.green(`${resultFoundEmojis[Math.floor(Math.random() * resultFoundEmojis.length)]} Found these products:`)
  );

  titles.map(async (title, index) => {
    let artist = title.split(' - ');
    if (query.split(' ')[0].toLowerCase() == 'the') {
      query = query.split(' ').slice(1).join(' ');
    }
    if (artist[0].toLowerCase().includes(query.toLowerCase())) {
      colorizedOutput(title, links[index]);
    }
  });

  process.exit();
};
