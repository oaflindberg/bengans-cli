import inquirer from 'inquirer';
import chalk from 'chalk';

export const specificProduct = async () => {
  const specificProduct = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'category',
        message: chalk.yellowBright('Do you want to only show a specific product type?'),
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
    .then((answer) => {
      return answer;
    });

  return specificProduct.category;
};

export const whatCategory = async (categories: string[]) => {
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
    .then((answer) => {
      return answer;
    });

  return category.category;
};
